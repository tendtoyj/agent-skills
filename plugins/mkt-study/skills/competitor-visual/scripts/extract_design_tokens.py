#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""HTML + CSS 텍스트에서 색상·폰트 토큰을 빈도순으로 뽑는다.
사용법: extract_design_tokens.py <css_bundle_path>

Playwright의 getComputedStyle을 쓸 수 없을 때의 대체 수단이다.
소스 CSS를 읽는 방식이라 "실제로 화면에 적용된 값"과 100% 일치하지는 않는다.
대신 브랜드가 정의해 둔 팔레트 전체가 보이므로, 팔레트 파악에는 오히려 유리하다.
정확한 적용 값이 필요하면 SKILL.md의 Claude Browser javascript_tool 경로를 쓸 것.
"""
import re
import sys
from collections import Counter

# 색이 아닌 흔한 노이즈: 완전 투명, 그리고 리셋 CSS의 기본 흑백
NOISE = {"#fff", "#ffffff", "#000", "#000000"}


def norm_hex(h):
    h = h.lower()
    if len(h) == 4:  # #abc -> #aabbcc
        h = "#" + "".join(c * 2 for c in h[1:])
    return h


def rgb_to_hex(m):
    try:
        parts = [p.strip() for p in m.split(",")]
        r, g, b = (int(float(p)) for p in parts[:3])
        return "#%02x%02x%02x" % (r, g, b)
    except (ValueError, IndexError):
        return None


def main():
    if len(sys.argv) != 2:
        sys.stderr.write("usage: extract_design_tokens.py <css_bundle_path>\n")
        return 1
    with open(sys.argv[1], encoding="utf-8", errors="ignore") as fh:
        css = fh.read()

    colors = Counter()
    for h in re.findall(r'#[0-9a-fA-F]{3}\b|#[0-9a-fA-F]{6}\b', css):
        colors[norm_hex(h)] += 1
    for m in re.findall(r'rgba?\(([^)]+)\)', css):
        hx = rgb_to_hex(m)
        if hx:
            colors[hx] += 1

    fonts = Counter()
    for m in re.findall(r'font-family\s*:\s*([^;{}]+)', css, re.I):
        # 따옴표 안에 쉼표가 들어가므로 문자 클래스로 자르면 스택이 잘린다. 통째로 받고 정리한다.
        stack = m.replace("!important", "").strip().strip("'\"").strip()
        stack = re.sub(r'\s+', " ", stack)
        # var(--x) 참조나 inherit 같은 건 실제 폰트명이 아니다
        if not stack or stack.lower() in ("inherit", "initial", "unset", "revert") or stack.startswith("var("):
            continue
        fonts[stack[:90]] += 1

    sizes = Counter()
    for m in re.findall(r'font-size\s*:\s*([0-9.]+(?:px|rem|em))', css, re.I):
        sizes[m] += 1

    # CSS 커스텀 프로퍼티는 브랜드가 직접 이름 붙인 토큰이라 팔레트 파악에 가장 값지다
    variables = re.findall(r'(--[a-z0-9-]*(?:color|bg|brand|primary|accent|text|surface)[a-z0-9-]*)\s*:\s*([^;}]+)', css, re.I)

    print("## Color palette (빈도순, 흑백 제외)")
    ranked = [(c, n) for c, n in colors.most_common(200) if c not in NOISE]
    for c, n in ranked[:20]:
        print("  %-9s  x%d" % (c, n))
    if not ranked:
        print("  (없음 — 인라인 스타일 없는 SPA일 수 있음)")

    print("\n## Named design tokens (브랜드가 직접 이름 붙인 색·타입 변수)")
    # Tailwind 등 프레임워크가 심는 기본 팔레트는 브랜드 토큰이 아니다 — 걸러낸다.
    FRAMEWORK = ("--tw-", "--bs-", "--color-gray", "--color-neutral", "--color-slate",
                 "--color-zinc", "--color-stone", "--color-black", "--color-white")
    seen = set()
    for name, val in variables:
        key = name.lower()
        if key in seen or key.startswith(FRAMEWORK):
            continue
        v = val.strip()
        if v.lower() in ("initial", "inherit", "unset", "none", ""):
            continue
        seen.add(key)
        print("  %-32s = %s" % (name, val.strip()[:60]))
        if len(seen) >= 25:
            break
    if not seen:
        print("  (없음)")

    print("\n## Font stacks (빈도순)")
    for f, n in fonts.most_common(10):
        print("  x%-4d %s" % (n, f))
    if not fonts:
        print("  (없음)")

    print("\n## Font sizes (빈도순)")
    print("  " + ", ".join("%s(x%d)" % (s, n) for s, n in sizes.most_common(14)) or "  (없음)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
