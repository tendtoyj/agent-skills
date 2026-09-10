#!/usr/bin/env bash
# 경쟁사 페이지의 HTML + 링크된 CSS를 모아 색상·폰트 토큰을 뽑는다.
# 사용법: extract_design_tokens.sh <output_dir> <page_url>
# 출력: <output_dir>/design-tokens.txt  (색 팔레트, 브랜드 색 변수, 폰트 스택, 폰트 크기)
#
# Playwright의 browser_evaluate + getComputedStyle 대체다.
# 소스 CSS 기반이라 실제 적용값과 100% 같지는 않지만, 브랜드가 정의한 팔레트 전체가 보인다.
# 정확한 적용값이 필요하면 SKILL.md의 Claude Browser javascript_tool 경로를 쓸 것.

set -u

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
out_dir="${1:-}"
page_url="${2:-}"

if [[ -z "$out_dir" || -z "$page_url" ]]; then
  echo "usage: extract_design_tokens.sh <output_dir> <page_url>" >&2
  exit 1
fi

mkdir -p "$out_dir"
bundle="$out_dir/.css_bundle.txt"
report="$out_dir/design-tokens.txt"
html="$out_dir/.page.html"

UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"

echo "==> fetching page: $page_url"
code=$(curl -s -L --max-time 60 -A "$UA" -w "%{http_code}" -o "$html" "$page_url")
if [[ "$code" != "200" ]]; then
  echo "FAIL  page  http=$code  $page_url" >&2
  rm -f "$html"
  exit 2
fi

# HTML 자체(인라인 <style>, style 속성)를 먼저 담고, 링크된 스타일시트를 이어 붙인다
cp "$html" "$bundle"

css_urls=$(python3 "$script_dir/extract_css_links.py" "$page_url" "$html" 8)

n=0
while IFS= read -r cssurl; do
  [[ -z "${cssurl:-}" ]] && continue
  n=$((n + 1))
  echo "    + css: $cssurl"
  curl -s -L --max-time 30 -A "$UA" -e "$page_url" "$cssurl" >> "$bundle" 2>/dev/null || true
  printf '\n' >> "$bundle"
done <<< "$css_urls"

echo "==> bundled HTML + $n stylesheet(s)"
python3 "$script_dir/extract_design_tokens.py" "$bundle" | tee "$report"

rm -f "$html" "$bundle"
echo
echo "--- saved -> $report ---"
