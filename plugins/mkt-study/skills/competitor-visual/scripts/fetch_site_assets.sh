#!/usr/bin/env bash
# 경쟁사 랜딩 페이지에서 브랜드 이미지 자산을 뽑아 내려받는다.
# 사용법: fetch_site_assets.sh <output_dir> <page_url> [max_images]
#
# 하는 일:
#   1) 페이지 HTML을 받아 og:image, 로고, 히어로 <img>, CSS background url() 등의 이미지 URL 추출
#      (추출은 옆에 있는 extract_image_urls.py가 담당)
#   2) 순서대로 내려받으면서 실제 파일 타입(MIME)을 확인 — 이미지가 아니면 삭제
#   3) manifest.tsv에 "파일명 / 출처 URL / 역할 / 크기"를 기록
#
# 다운로드 직후 바로 검증하는 이유: 깨진 링크나 HTML 에러 페이지가 이미지인 척 저장되는 일이
# 잦아서, 여기서 걸러내야 이후 디자인 분석 단계에서 헛수고를 막을 수 있다.
#
# 한계: JS를 실행하지 않는다. 자산이 거의 안 잡히면 SPA일 가능성이 크므로
# SKILL.md의 Claude Browser 폴백 경로를 쓸 것.

set -u

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

out_dir="${1:-}"
page_url="${2:-}"
max_images="${3:-25}"

if [[ -z "$out_dir" || -z "$page_url" ]]; then
  echo "usage: fetch_site_assets.sh <output_dir> <page_url> [max_images]" >&2
  exit 1
fi

mkdir -p "$out_dir"
html="$out_dir/.page.html"
urlfile="$out_dir/.urls.tsv"
manifest="$out_dir/manifest.tsv"

UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"

echo "==> fetching page: $page_url"
code=$(curl -s -L --max-time 60 -A "$UA" -w "%{http_code}" -o "$html" "$page_url")
if [[ "$code" != "200" ]]; then
  echo "FAIL  page  http=$code  $page_url" >&2
  rm -f "$html"
  exit 2
fi

python3 "$script_dir/extract_image_urls.py" "$page_url" "$html" > "$urlfile"

if [[ ! -s "$urlfile" ]]; then
  echo "==> no image URLs found — JS 렌더링 SPA일 가능성이 큽니다. Claude Browser 폴백을 쓰세요." >&2
  rm -f "$html" "$urlfile"
  exit 3
fi

printf 'file\tsource_url\trole\tsize\n' > "$manifest"

i=0
ok=0
while IFS=$'\t' read -r role url; do
  [[ -z "${url:-}" ]] && continue
  if [[ "$ok" -ge "$max_images" ]]; then break; fi
  i=$((i + 1))
  idx=$(printf "%02d" "$i")
  tmp="$out_dir/.tmp_$idx"

  code=$(curl -s -L --max-time 60 -A "$UA" -e "$page_url" -w "%{http_code}" -o "$tmp" "$url")
  if [[ "$code" != "200" ]]; then
    echo "FAIL  $idx  http=$code  $url"
    rm -f "$tmp"
    continue
  fi

  # 실제 파일 타입으로 확장자 결정 (HTML 에러 페이지 등은 걸러낸다)
  mime=$(file -b --mime-type "$tmp")
  case "$mime" in
    image/jpeg)             ext="jpg" ;;
    image/png)              ext="png" ;;
    image/gif)              ext="gif" ;;
    image/webp)             ext="webp" ;;
    image/svg+xml|text/xml) ext="svg" ;;
    image/vnd.microsoft.icon|image/x-icon) ext="ico" ;;
    *)
      echo "SKIP  $idx  not-an-image ($mime)  $url"
      rm -f "$tmp"
      continue
      ;;
  esac

  # 추적 픽셀이나 아이콘 파편 같은 1KB 미만 파일은 디자인 분석에 쓸모가 없다 (SVG는 예외)
  bytes=$(wc -c < "$tmp" | tr -d ' ')
  if [[ "$bytes" -lt 1024 && "$ext" != "svg" && "$ext" != "ico" ]]; then
    echo "SKIP  $idx  too-small (${bytes}B)  $url"
    rm -f "$tmp"
    continue
  fi

  dest="$out_dir/${idx}-${role}.${ext}"
  mv "$tmp" "$dest"
  size=$(du -h "$dest" | cut -f1 | tr -d ' ')
  printf '%s\t%s\t%s\t%s\n' "$(basename "$dest")" "$url" "$role" "$size" >> "$manifest"
  echo "OK    $idx  $mime  $size  -> $dest"
  ok=$((ok + 1))
done < "$urlfile"

rm -f "$html" "$urlfile"
echo "--- downloaded $ok image(s) into $out_dir (manifest: $manifest) ---"
