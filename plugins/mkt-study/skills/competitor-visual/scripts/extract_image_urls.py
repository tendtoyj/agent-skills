#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""저장된 HTML에서 이미지 URL을 뽑아 "<role>\t<absolute_url>" 형식으로 출력한다.
fetch_site_assets.sh가 호출한다. 단독 실행도 가능:
    extract_image_urls.py <page_url> <saved_html_path>

role은 이후 디자인 분석에서 자산의 성격을 구분하는 데 쓴다:
  og      — og:image / twitter:image (브랜드가 가장 보여주고 싶은 한 장)
  icon    — favicon / apple-touch-icon
  logo    — alt·class에 logo/brand가 들어간 <img>
  img     — 그 외 본문 이미지
  css-bg  — CSS background url()
"""
import re
import sys
from urllib.parse import urljoin, urlsplit


def extract(base, html):
    found, seen = [], set()

    def add(role, u):
        if not u:
            return
        u = u.strip().strip("\"'")
        if not u or u.startswith(("data:", "javascript:", "#")):
            return
        u = urljoin(base, u)
        if urlsplit(u).scheme not in ("http", "https"):
            return
        if u in seen:
            return
        seen.add(u)
        found.append((role, u))

    # og:image를 맨 앞에 둔다 — 보통 그 브랜드의 대표 비주얼이다.
    for m in re.finditer(r'<meta[^>]+(?:property|name)=["\'](?:og:image|twitter:image)["\'][^>]*>', html, re.I):
        c = re.search(r'content=["\']([^"\']+)', m.group(0), re.I)
        if c:
            add("og", c.group(1))

    for m in re.finditer(r'<link[^>]+rel=["\'][^"\']*icon[^"\']*["\'][^>]*>', html, re.I):
        h = re.search(r'href=["\']([^"\']+)', m.group(0), re.I)
        if h:
            add("icon", h.group(1))

    for m in re.finditer(r'<img[^>]+>', html, re.I):
        tag = m.group(0)
        low = tag.lower()
        role = "logo" if ("logo" in low or "brand" in low) else "img"
        s = re.search(r'\ssrc=["\']([^"\']+)', tag, re.I)
        if s:
            add(role, s.group(1))
        ss = re.search(r'srcset=["\']([^"\']+)', tag, re.I)
        if ss:  # srcset의 마지막 후보가 보통 최고 해상도
            cands = [c.strip().split()[0] for c in ss.group(1).split(",") if c.strip()]
            if cands:
                add(role, cands[-1])

    for m in re.finditer(r'<source[^>]+srcset=["\']([^"\']+)', html, re.I):
        cands = [c.strip().split()[0] for c in m.group(1).split(",") if c.strip()]
        if cands:
            add("img", cands[-1])

    for m in re.finditer(r'url\(\s*([^)]+?)\s*\)', html, re.I):
        add("css-bg", m.group(1))

    return found


def main():
    if len(sys.argv) != 3:
        sys.stderr.write("usage: extract_image_urls.py <page_url> <saved_html_path>\n")
        return 1
    base, path = sys.argv[1], sys.argv[2]
    with open(path, encoding="utf-8", errors="ignore") as fh:
        html = fh.read()
    for role, url in extract(base, html):
        print("%s\t%s" % (role, url))
    return 0


if __name__ == "__main__":
    sys.exit(main())
