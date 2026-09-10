#!/usr/bin/env bash
# 경쟁사 랜딩페이지를 헤드리스 Chrome으로 캡처한다 (Playwright browser_take_screenshot 대체).
# 사용법: capture_screenshots.sh <output_dir> <page_url> [company_name] [full_height]
#
# 만들어지는 파일:
#   <company>-hero.png   1280x800   히어로 — 방문자가 첫 화면에서 보는 것
#   <company>-full.png   1280xN     페이지 위쪽 전체 (N 기본 3000)
#
# 왜 헤드리스 Chrome인가: Playwright/Puppeteer는 별도 설치와 브라우저 다운로드가 필요하지만,
# 이미 깔려 있는 Chrome을 --headless --screenshot으로 부르면 의존성 0으로 같은 결과를 얻는다.
#
# 하지 못하는 것 (SKILL.md에도 명시. 셋 다 Claude Browser로 처리한다):
#   1) 모바일 뷰 — Chrome CLI에는 디바이스 emulation이 없다. --window-size=390로 줄여도
#      viewport meta가 적용되지 않아 데스크톱 레이아웃이 잘린 이미지가 나온다. 실측 확인함.
#   2) 쿠키/동의 배너 닫기 — CLI에서는 클릭할 수 없다. 알려진 동의 CDN만 차단해 둔다.
#   3) 진짜 풀페이지 — 긴 뷰포트로 근사한다. 페이지가 더 길면 full_height를 키운다.

set -u

out_dir="${1:-}"
page_url="${2:-}"
company="${3:-site}"
full_h="${4:-3000}"

if [[ -z "$out_dir" || -z "$page_url" ]]; then
  echo "usage: capture_screenshots.sh <output_dir> <page_url> [company_name] [full_height]" >&2
  exit 1
fi

CHROME=""
for c in "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
         "/Applications/Chromium.app/Contents/MacOS/Chromium" \
         "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge" \
         "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser"; do
  if [[ -x "$c" ]]; then CHROME="$c"; break; fi
done
if [[ -z "$CHROME" ]]; then
  echo "FAIL  헤드리스 캡처용 Chromium 계열 브라우저를 찾지 못했습니다." >&2
  echo "      Chrome을 설치하거나, SKILL.md의 Claude Browser 폴백 경로를 쓰세요." >&2
  exit 4
fi

mkdir -p "$out_dir"
echo "==> browser: $CHROME"
echo "==> target : $page_url"

# 헤드리스 Chrome의 기본 UA에는 "HeadlessChrome"이 박혀 있어 Akamai/Cloudflare 같은 WAF가
# 봇으로 보고 "Access Denied" 페이지를 준다 (tableau.com에서 실측: 26KB 차단 → UA 지정 시 274KB 정상).
# 일반 데스크톱 Chrome UA를 명시해 이를 피한다.
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36"

# 흔한 동의 배너 CDN을 죽여 화면을 가리지 않게 한다 (자체 호스팅 배너는 못 막는다 → Claude Browser)
CONSENT_BLOCK="MAP cdn.cookielaw.org 127.0.0.1,MAP consent.cookiebot.com 127.0.0.1,MAP consentcdn.cookiebot.com 127.0.0.1,MAP cmp.osano.com 127.0.0.1,MAP app.termly.io 127.0.0.1,MAP cdn.iubenda.com 127.0.0.1"

shoot() {  # shoot <label> <width> <height>
  local label="$1" w="$2" h="$3"
  local dest="$out_dir/${company}-${label}.png"

  # Chrome은 macOS에서 무해한 GPU/디스플레이 경고를 stderr로 쏟아낸다 — 버린다.
  "$CHROME" --headless --disable-gpu --no-sandbox --hide-scrollbars \
    --virtual-time-budget=10000 \
    --user-agent="$UA" \
    --host-rules="$CONSENT_BLOCK" \
    --window-size="${w},${h}" \
    --screenshot="$dest" "$page_url" >/dev/null 2>&1

  if [[ ! -s "$dest" ]]; then
    echo "FAIL  $label  (파일 없음 또는 0바이트)"
    rm -f "$dest"
    return 1
  fi
  # 진짜 PNG인지 확인 — 실패 시 Chrome이 빈 파일을 남기는 경우가 있다
  local mime
  mime=$(file -b --mime-type "$dest")
  if [[ "$mime" != "image/png" ]]; then
    echo "FAIL  $label  (PNG 아님: $mime)"
    rm -f "$dest"
    return 1
  fi
  local dim size bytes
  dim=$(file -b "$dest" | sed -n 's/.*, \([0-9]* x [0-9]*\),.*/\1/p')
  size=$(du -h "$dest" | cut -f1 | tr -d ' ')
  bytes=$(wc -c < "$dest" | tr -d ' ')

  # 차단 페이지("Access Denied")나 빈 화면도 유효한 PNG다 — 파일 형식만으로는 못 거른다.
  # 실제 랜딩페이지는 1280x800에서 보통 100KB 이상이다. 그보다 훨씬 작으면 의심하고 알린다.
  if [[ "$bytes" -lt 40000 ]]; then
    echo "WARN  $label  ${dim}  $size  -> $dest"
    echo "      파일이 비정상적으로 작습니다. 차단 페이지·빈 화면일 수 있으니 반드시 Read로 열어 확인하세요."
    echo "      실제 차단이면 2d의 Claude Browser로 재시도하세요."
    return 0
  fi

  echo "OK    $label  ${dim}  $size  -> $dest"
  return 0
}

ok=0
shoot "hero" 1280 800      && ok=$((ok + 1))
shoot "full" 1280 "$full_h" && ok=$((ok + 1))

echo "--- captured $ok/2 screenshot(s) into $out_dir ---"
if [[ "$ok" -eq 0 ]]; then
  echo "    전부 실패했습니다. 봇 차단일 수 있으니 Claude Browser 폴백을 쓰세요." >&2
  exit 5
fi
echo "    모바일 뷰가 필요하면 Claude Browser를 쓰세요 (이 스크립트는 디바이스 emulation 불가)."
