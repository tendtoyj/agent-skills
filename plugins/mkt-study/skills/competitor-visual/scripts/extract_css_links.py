#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""저장된 HTML에서 링크된 스타일시트 URL을 절대경로로 출력한다 (한 줄에 하나).
사용법: extract_css_links.py <page_url> <saved_html_path> [max]
extract_design_tokens.sh가 호출한다.
"""
import re
import sys
from urllib.parse import urljoin

# 라이브러리 CSS는 브랜드 색이 아니라 그 라이브러리의 기본 테마 색을 잔뜩 들고 온다.
# (video-js, highlight.js 테마, 그리드 프레임워크 등) 팔레트를 오염시키므로 제외한다.
# 단, Google Fonts는 브랜드의 실제 폰트 선택을 알려주므로 남긴다.
THIRD_PARTY = (
    "cdnjs.cloudflare.com", "zencdn.net", "video-js", "videojs",
    "highlight.js", "highlightjs", "flexboxgrid", "normalize.css",
    "bootstrap.min.css", "font-awesome", "fontawesome", "swiper",
    "unpkg.com", "cookieconsent", "cookie-notice", "gdpr",
)


def is_third_party(url):
    low = url.lower()
    return any(t in low for t in THIRD_PARTY)


def main():
    if len(sys.argv) < 3:
        sys.stderr.write("usage: extract_css_links.py <page_url> <saved_html_path> [max]\n")
        return 1
    base, path = sys.argv[1], sys.argv[2]
    limit = int(sys.argv[3]) if len(sys.argv) > 3 else 8

    with open(path, encoding="utf-8", errors="ignore") as fh:
        html = fh.read()

    seen = []
    for m in re.finditer(r'<link[^>]+>', html, re.I):
        tag = m.group(0)
        if not re.search(r'rel=["\'][^"\']*stylesheet', tag, re.I):
            continue
        h = re.search(r'href=["\']([^"\']+)', tag, re.I)
        if not h:
            continue
        u = urljoin(base, h.group(1).strip())
        if not u.startswith(("http://", "https://")) or u in seen:
            continue
        if is_third_party(u):
            continue
        seen.append(u)

    for u in seen[:limit]:
        print(u)
    return 0


if __name__ == "__main__":
    sys.exit(main())
