---
name: competitor-visual
description: "Capture and analyze competitor landing page design patterns — color, typography, layout, visual tone, and mobile responsiveness. Use when user mentions: competitor design, visual audit, landing page design, competitor screenshots, design patterns, competitor UX, visual analysis, design comparison, competitor landing page, website design audit, competitor branding, visual tone, competitor layout"
user-invocable: true
---

# Competitor Visual

> Capture competitor landing pages with the bundled asset scripts (+ Claude Browser) and analyze design patterns — color, typography, layout, visual tone, and responsiveness.
> This is the final step in the competitive chain: competitor-finder → competitor-analyzer → **competitor-visual**.

---

## Purpose

Copy tells people what you say. Design tells people how you feel.

Competitor Visual captures what text scraping cannot — the **visual identity** of competitor landing pages. It produces:
- 랜딩페이지 스크린샷 (히어로 1280×800 + 페이지 전체 1280×3000)
- Extracted color palettes, typography stacks, and layout patterns
- A cross-competitor visual comparison matrix
- Design gaps and visual differentiation opportunities

Output enriches `research-memory/competitive-intel.md` (Design Patterns section) and saves downloaded assets + screenshots to `research-memory/assets/[company]/`.

외부 MCP(Playwright 등)는 필요하지 않습니다. 이미 설치된 Chrome을 헤드리스로 불러 랜딩페이지를 캡처하고, 모바일 뷰·배너 처리 등 상호작용이 필요할 때만 내장 Claude Browser를 씁니다.

---

## Modes

| Mode | When to Use | Behavior |
|------|-------------|----------|
| **Full Visual Audit** | Design Patterns section in `competitive-intel.md` is empty | Capture + analyze all competitors |
| **Refresh** | Design Patterns section has existing data | Re-capture specific competitors or reflect list changes |
| **Single Site** | User provides a specific URL | Analyze one site (can be non-competitor benchmark) |

---

## Auto-Load Protocol

On every invocation, BEFORE any capture:

1. **Check `research-memory/` directory**
2. If files exist → Read ALL `.md` files (except README.md)
3. **Read `competitive-intel.md`** → Extract competitor names + URLs from the Competitive Set table
4. If NO competitor URLs found → **Stop**. Tell user to run `competitor-finder` first
5. If Design Patterns section already has data → **Suggest Refresh mode**
6. **Check `brand-memory/`** (read-only) → If exists, note brand's own visual identity for comparison context

---

## Input Gathering

Collect conversationally. Most inputs auto-load from `competitive-intel.md`.

| Field | Required | Description |
|-------|----------|-------------|
| Competitor URLs | YES (auto-load) | Pulled from `competitive-intel.md`. If missing, ask user directly |
| Capture scope | Optional | Landing page only (default) / Include features + pricing / Full site |
| Focus area | Optional | Color, typography, layout, mobile, or all (default) |
| Own site URL | Optional | If provided, adds self-vs-competitor comparison |
| Language | Optional | 결과물 작성 언어 (default: English) |

**Show the extracted URL list to the user and confirm before proceeding.**

For Refresh mode: Show current Design Patterns summary and ask which competitors to update.

---

## Process

### Step 1: Extract URLs + Plan Capture

**Goal**: Build the capture target list from `competitive-intel.md`.

1. Parse the **Competitive Set** table → extract `Company` + `URL` columns
2. For each competitor, plan capture targets:
   - **Required**: Homepage / landing page (hero section)
   - **Recommended**: Features page, pricing page (if identifiable)
   - **Optional**: About page, blog (if user requests full scope)
3. Present the capture plan to user for confirmation:
   ```
   I'll capture these competitors:
   1. [Company A] — homepage, features, pricing
   2. [Company B] — homepage, pricing
   3. [Company C] — homepage, features
   Proceed?
   ```

---

### Step 2: Screenshot Capture + Design Extraction

**Goal**: 경쟁사 랜딩페이지를 실제로 캡처하고, 색·타이포 토큰과 브랜드 자산을 함께 확보합니다.

**핵심 순서**: 스크립트를 먼저 돌립니다 (빠르고, PNG 파일이 디스크에 남고, 경쟁사 5-8개에 반복하기 쉬움). Claude Browser는 스크립트가 못 하는 것(모바일 뷰·배너 클릭)에만 씁니다.

**먼저 스크립트 경로를 잡습니다** (프로젝트 사본 우선, 없으면 플러그인 캐시):

```bash
SCRIPTS="$( [ -d "$PWD/.claude/skills/competitor-visual/scripts" ] \
  && echo "$PWD/.claude/skills/competitor-visual/scripts" \
  || ls -d "$HOME"/.claude/plugins/cache/agentfiles/mkt-study/*/skills/competitor-visual/scripts | head -1 )"
echo "$SCRIPTS"
```

이후 명령은 모두 이 `$SCRIPTS`를 씁니다. **같은 Bash 호출 안에서** 실행해야 변수가 유지됩니다 (셸 상태는 호출 간 유지되지 않습니다).

#### 2a. 랜딩페이지 스크린샷 캡처 — 이 스킬의 핵심

렌더링된 페이지를 헤드리스 Chrome으로 캡처합니다. Playwright의 `browser_take_screenshot`을 대체하며, 별도 설치 없이 이미 깔려 있는 Chrome을 씁니다.

```bash
"$SCRIPTS/capture_screenshots.sh" "research-memory/assets/[company]" "[competitor-url]" "[company]"
```

- 인자: `<출력 디렉터리> <페이지 URL> [회사명] [full 높이, 기본 3000]`
- 결과:
  | 파일 | 크기 | 무엇을 보는가 |
  |------|------|--------------|
  | `[company]-hero.png` | 1280×800 | **가장 중요** — 방문자가 첫 화면에서 보는 것. 히어로 카피·CTA·비주얼의 위계 |
  | `[company]-full.png` | 1280×3000 | 페이지 위쪽 전체. 섹션 순서, 소셜 프루프 배치, 스크롤 서사 |
- 페이지가 3000px보다 길면 네 번째 인자를 키웁니다: `... "[company]" 6000`

**캡처한 이미지는 반드시 `Read` 도구로 직접 열어 보세요.** 이 스킬의 산출물은 파일 목록이 아니라 "무엇이 보이는가"에 대한 판단입니다.

##### 이 스크립트가 못 하는 것 → Claude Browser로

| 필요한 것 | 왜 스크립트로 안 되나 | 대응 |
|----------|---------------------|------|
| **모바일 뷰** | Chrome CLI에 디바이스 emulation이 없습니다. `--window-size=390`으로 줄여도 viewport meta가 적용되지 않아 **데스크톱 레이아웃이 잘린** 이미지가 나옵니다 (실측 확인). | 2d |
| **쿠키 배너 닫기** | CLI에서는 클릭할 수 없습니다. 알려진 동의 CDN(OneTrust·Cookiebot·Osano 등)은 차단해 두었지만, 자체 호스팅 배너는 남습니다. | 2d |
| **탭·아코디언 열기** | 상호작용 불가 | 2d |

```bash
"$SCRIPTS/fetch_site_assets.sh" "research-memory/assets/[company]" "[competitor-url]" 25
```

스크린샷은 "어떻게 보이는가"를 담고, 이 스크립트는 **원본 자산 파일**을 가져옵니다 — 로고 SVG, og:image, 제품 스크린샷 원본. 로고 형태나 이미지 스타일을 자세히 봐야 할 때 씁니다.

- 인자: `<출력 디렉터리> <페이지 URL> [최대 이미지 수, 기본 25]`
- 결과: `01-og.webp`, `02-icon.svg`, `08-logo.svg` … + `manifest.tsv`
- 파일명의 role 접두어로 자산 성격을 구분합니다:
  | role | 의미 | 분석에서의 쓸모 |
  |------|------|----------------|
  | `og` | og:image / twitter:image | **가장 중요** — 브랜드가 공유 시 보여주고 싶은 대표 비주얼 |
  | `logo` | alt·class에 logo/brand | 로고 마크, 고객사 로고 |
  | `icon` | favicon / apple-touch-icon | 브랜드 마크의 최소 단위 |
  | `img` | 본문 이미지 | 히어로·제품 스크린샷·일러스트 |
  | `css-bg` | CSS background url() | 배경 텍스처·그라디언트 이미지 |
- `manifest.tsv`에 파일명·출처 URL·role·크기가 기록되므로, 분석 시 **어떤 이미지가 어디서 왔는지** 추적할 수 있습니다.
- 내려받은 이미지는 `Read` 도구로 직접 열어 보세요 — 색감·구도·톤을 눈으로 확인해야 합니다.

#### 2b. 색상·타이포 토큰 추출

```bash
# $SCRIPTS가 이 Bash 호출에 없으면 위 resolver를 다시 실행하세요
"$SCRIPTS/extract_design_tokens.sh" "research-memory/assets/[company]" "[competitor-url]"
```

페이지 HTML + 링크된 스타일시트를 모아 아래를 출력하고 `design-tokens.txt`로 저장합니다:
- **Color palette** — HEX 빈도순 (순수 흑백 제외). 최빈 색이 대개 브랜드 컬러입니다.
- **Named design tokens** — `--color-brand`, `--color-accent` 같이 브랜드가 직접 이름 붙인 변수. **가장 신뢰도 높은 근거**입니다.
- **Font stacks** — 빈도순 폰트 스택
- **Font sizes** — 타입 스케일

> 스크립트는 video-js·highlight.js 같은 서드파티 라이브러리 CSS와 Tailwind 기본 팔레트(`--tw-*`, `--color-gray-*`)를 자동으로 걸러내, 브랜드 고유 값만 남깁니다.

#### 2c. 브랜드 이미지 자산 다운로드 — 로고·og:image 원본이 필요할 때

스크린샷(2a)이 "어떻게 보이는가"를 담는다면, 이 스크립트는 **원본 자산 파일**을 가져옵니다 — 로고 SVG, og:image, 제품 스크린샷 원본. 로고 형태나 이미지 스타일을 확대해 봐야 할 때 씁니다.

```bash
"$SCRIPTS/fetch_site_assets.sh" "research-memory/assets/[company]" "[competitor-url]" 25
```

- 인자: `<출력 디렉터리> <페이지 URL> [최대 이미지 수, 기본 25]`
- 결과: `01-og.webp`, `02-icon.svg`, `08-logo.svg` … + `manifest.tsv`
- 파일명의 role 접두어로 자산 성격을 구분합니다:
  | role | 의미 | 분석에서의 쓸모 |
  |------|------|----------------|
  | `og` | og:image / twitter:image | **가장 중요** — 브랜드가 공유 시 보여주고 싶은 대표 비주얼 |
  | `logo` | alt·class에 logo/brand | 로고 마크, 고객사 로고 |
  | `icon` | favicon / apple-touch-icon | 브랜드 마크의 최소 단위 |
  | `img` | 본문 이미지 | 히어로·제품 스크린샷·일러스트 |
  | `css-bg` | CSS background url() | 배경 텍스처·그라디언트 이미지 |
- `manifest.tsv`에 파일명·출처 URL·role·크기가 기록되므로, **어떤 이미지가 어디서 왔는지** 추적할 수 있습니다.
- 이 스크립트는 JS를 실행하지 않습니다. 자산이 0건이면 SPA일 가능성이 크지만, **2a의 스크린샷은 정상일 수 있습니다** (헤드리스 Chrome은 JS를 실행하므로).

#### 2d. Claude Browser — 스크립트가 못 하는 것

모바일 뷰, 쿠키 배너가 가린 히어로, 탭 전환 — 스크립트가 못 하는 것만 여기서 처리합니다.

**모바일 뷰** (진짜 디바이스 emulation — Android UA + 터치 + viewport meta 적용):
```
mcp__Claude_Browser__navigate       → url: [competitor-url]
mcp__Claude_Browser__resize_window  → preset: "mobile"
mcp__Claude_Browser__navigate       → url: [competitor-url]   (재로드 — 로드 시점 분기가 다시 돌게)
mcp__Claude_Browser__computer       → action: "screenshot"
mcp__Claude_Browser__resize_window  → preset: "desktop"       (원상 복구 — 반드시)
```

**쿠키 배너가 히어로를 가릴 때**:
```
mcp__Claude_Browser__find      → query: "Reject" 또는 "Decline"
mcp__Claude_Browser__computer  → action: "left_click", ref: [찾은 ref]
mcp__Claude_Browser__computer  → action: "screenshot"
```
> 개인정보 보호 원칙상 **비필수 쿠키는 거부**를 선택합니다. 거부 버튼이 없을 때만 닫기/수락을 씁니다.

**적용된 색·폰트가 정확히 필요할 때** (소스 CSS가 아니라 computed 값):
```
mcp__Claude_Browser__javascript_tool → action: "javascript_exec", text:
  (() => {
    const b = getComputedStyle(document.body);
    const hero = document.querySelector('[class*="hero"], header, .banner, main > section:first-child');
    const hs = hero ? getComputedStyle(hero) : {};
    const cta = document.querySelector('a[class*="btn"], button[class*="btn"], .cta, [class*="cta"]');
    const cs = cta ? getComputedStyle(cta) : {};
    const heads = ['h1','h2','h3'].map(t => {
      const el = document.querySelector(t); if (!el) return null;
      const s = getComputedStyle(el);
      return { tag: t, font: s.fontFamily, size: s.fontSize, weight: s.fontWeight };
    }).filter(Boolean);
    return { bodyBg: b.backgroundColor, bodyColor: b.color, bodyFont: b.fontFamily,
             heroBg: hs.backgroundColor || 'N/A',
             ctaBg: cs.backgroundColor || 'N/A', ctaColor: cs.color || 'N/A',
             headings: heads };
  })()
```

> **주의**: Claude Browser 스크린샷은 분석용으로 화면에 오지만 **디스크에 파일로 저장되지 않습니다.** 보관해야 할 캡처는 2a의 스크립트로 남기세요.

#### 2e. 추가 페이지

features/pricing 페이지도 범위에 있으면 같은 URL로 2a·2b를 반복합니다 (출력 디렉터리는 `assets/[company]/pricing` 등으로 분리).

#### 오류 처리

| 증상 | 원인 | 대응 |
|------|------|------|
| 스크린샷이 빈 화면 | 봇 차단 또는 로딩 지연 | `full_height`를 낮춰 재시도 → 안 되면 2d Claude Browser |
| `exit 3` / 자산 0개 | JS 렌더링 SPA (`fetch_site_assets.sh`는 JS 미실행) | 스크린샷은 정상일 수 있음. 자산이 필요하면 2d |
| `FAIL page http=403` | 봇 차단 | 2d Claude Browser로 재시도 → 그래도 막히면 skip + "access restricted" 기록 |
| 색 팔레트가 비었음 | CSS가 JS로 주입됨 | 2d의 `javascript_tool` computed style 경로 사용 |
| CAPTCHA | — | **우회하지 않습니다.** 해당 경쟁사는 skip하고 분석에 명시 |

**모든 산출물 저장 위치**: `research-memory/assets/[company-name]/` (경쟁사별 하위 디렉터리)

---

### Step 3: Analyze Design Patterns

**Goal**: Synthesize screenshots + extracted CSS data into structured design analysis.

For each competitor, analyze:

| Dimension | What to Document |
|-----------|-----------------|
| **Color Palette** | Primary, secondary, accent colors (HEX). Strategy: warm/cool, high/low contrast, monochrome/complementary |
| **Typography** | Heading font, body font, size hierarchy (h1 → h2 → body), readability |
| **Hero Section** | Type: centered / left-aligned / full-screen image / video. Key elements present |
| **Layout Pattern** | Number of sections, scroll depth, grid structure, whitespace usage |
| **Visual Tone** | Minimal vs rich, corporate vs friendly, tech vs emotional, illustration vs photography |
| **CTA Design** | Button color, size, placement, repetition count, contrast against background |
| **Social Proof** | Format: logo bar, testimonial cards, stats badges, case study links |
| **Mobile Quality** | Responsive: Good (adapts well) / Basic (works but not optimized) / Poor (broken) |

Then build the **cross-competitor comparison**:
- What patterns do ALL competitors share? (industry norms)
- What does only ONE competitor do differently? (differentiation)
- What does NOBODY do? (visual white space = opportunity)

---

### Step 4: Enrich competitive-intel.md + Save + Log

**Goal**: Write findings into the correct sections of `competitive-intel.md` without touching other skills' content.

#### 4a. Enrichment Rules

- **NEVER modify** sections tagged `[competitor-finder]` or `[competitor-analyzer]`
- **ONLY write to** sections tagged `[competitor-visual]`:
  - `## Design Patterns & Visual Audit [competitor-visual]`
- **Append to** `## Gaps & Opportunities` — add design-related opportunities with `[competitor-visual]` tag, keep existing items

**Language rule**: 섹션 헤더와 테이블 컬럼명은 영어로 유지합니다. 본문, 셀 값, 설명, 분석 텍스트는 사용자가 지정한 언어로 작성합니다. 언어가 지정되지 않으면 English로 작성합니다. 추출된 CSS 데이터(HEX, font name 등)는 원래 형태 유지. 분석 텍스트만 지정 언어로 작성.

#### 4b. Write Design Patterns Section

Replace the `## Design Patterns & Visual Audit [competitor-visual]` section with:

```markdown
## Design Patterns & Visual Audit [competitor-visual]

> Last updated: [YYYY-MM-DD]
> Screenshots: research-skills/screenshots/

### Visual Comparison Matrix

| Competitor | Colors | Typography | Hero Type | Visual Tone | CTA | Mobile |
|-----------|--------|------------|-----------|-------------|-----|--------|
| [name] | [primary HEX] | [heading font] | [type] | [tone] | [color, style] | Good/Basic/Poor |

### [Competitor Name]
- **Color Palette**: Primary [hex], Secondary [hex], Accent [hex]
- **Color Strategy**: [warm/cool, high/low contrast]
- **Typography**: Heading: [font], Body: [font]
- **Hero Section**: [type], [key elements]
- **Layout**: [sections, scroll depth, grid]
- **Visual Tone**: [description]
- **CTA Design**: [color, placement, repetition]
- **Social Proof**: [format]
- **Mobile**: [quality assessment]
- **Screenshots**: `screenshots/[name]/hero.png`, `screenshots/[name]/full.png`

(Repeat for each competitor)

### Design Trends Across Competitors
- **Shared patterns**: [what most competitors do]
- **Differentiators**: [unique approaches by specific competitors]
- **White space**: [what nobody does — opportunity for our brand]
```

#### 4c. Update Gaps & Opportunities

Append design-relevant gaps (do NOT delete existing rows):

```markdown
| [next #] | [design gap description] [competitor-visual] | [evidence from visual audit] | [priority] |
```

#### 4d. Update research-log.md

Append one row:

```
| [YYYY-MM-DD] | competitor-visual | Full Audit / Refresh / Single | [# competitors captured, key visual findings] | capture_screenshots.sh + Claude Browser |
```

---

## Tool Reference

외부 MCP(Playwright 등) 없이 **번들 스크립트 + 내장 도구**로 동작합니다.

### 번들 스크립트 (`scripts/`) — 주 경로

| Script | 하는 일 | 출력 |
|--------|---------|------|
| `capture_screenshots.sh <out_dir> <url> [company] [h]` | **랜딩페이지 스크린샷** — 헤드리스 Chrome, hero + full | `[company]-hero.png`, `[company]-full.png` |
| `fetch_site_assets.sh <out_dir> <url> [max]` | 페이지에서 og:image·로고·이미지·CSS 배경을 찾아 내려받고 MIME 검증 | 번호순 이미지 파일 + `manifest.tsv` |
| `extract_design_tokens.sh <out_dir> <url>` | HTML + 링크된 CSS를 모아 색·폰트 토큰 추출 | `design-tokens.txt` |
| `extract_image_urls.py <url> <html>` | (내부 헬퍼) HTML → 이미지 URL 목록 | stdout `role<TAB>url` |
| `extract_css_links.py <url> <html> [max]` | (내부 헬퍼) HTML → 스타일시트 URL, 서드파티 제외 | stdout URL 목록 |
| `extract_design_tokens.py <css_bundle>` | (내부 헬퍼) CSS 텍스트 → 팔레트·폰트 리포트 | stdout 리포트 |

스크립트를 먼저 쓰는 이유: 빠르고, 실제 파일이 디스크에 남아 나중에 다시 볼 수 있고, 경쟁사 5-8개에 반복하기 쉽습니다.

### Claude Browser (`mcp__Claude_Browser__*`) — 보조 경로

| Tool | Purpose | When |
|------|---------|------|
| `navigate` | URL 이동 | 렌더링 화면이 필요할 때 |
| `computer` (`action: "screenshot"`) | 화면 캡처 | 히어로·레이아웃 육안 확인 |
| `resize_window` | 뷰포트 변경 (`preset: "mobile"` / `"desktop"`) | 반응형 확인 |
| `javascript_tool` | getComputedStyle 실행 | **적용된** 색·폰트가 필요할 때 |
| `find` + `computer(left_click)` | 요소 탐색·클릭 | 쿠키 배너 처리, 탭 전환 |
| `get_page_text` | 렌더링된 텍스트 추출 | SPA에서 스크립트가 빈 결과일 때 |

**Tips**:
- **스크립트 → 브라우저** 순서를 지키세요. 브라우저부터 열면 느리고 자산 파일이 안 남습니다.
- 내려받은 이미지는 `Read`로 직접 열어 보세요. 파일 목록만 보고 디자인을 논하지 않습니다.
- 소스 CSS 팔레트(`design-tokens.txt`)와 computed style은 다를 수 있습니다. 충돌하면 computed 값이 맞습니다.
- 모바일 캡처 후 `preset: "desktop"`으로 **반드시** 되돌립니다.
- 쿠키 배너는 **비필수 거부**를 우선 선택합니다.
- CAPTCHA·봇 차단은 **우회하지 않습니다.** skip하고 분석에 명시합니다.

---

## Quality Checklist

Before saving, verify:

- [ ] Competitive Set의 모든 경쟁사에 대해 **hero 스크린샷**이 캡처됐다
- [ ] 캡처한 스크린샷을 `Read`로 실제로 열어서 봤다 (파일 목록만 보고 판단하지 않았다)
- [ ] 색상은 HEX로 기록했다 (`design-tokens.txt` 또는 computed style 기준). 근거 출처(스크립트/브라우저)를 함께 적었다
- [ ] Typography documents both heading and body fonts
- [ ] Visual Comparison Matrix covers all analyzed competitors
- [ ] "Design Trends Across Competitors" section identifies at least 1 shared pattern and 1 opportunity
- [ ] Existing `[competitor-finder]` and `[competitor-analyzer]` sections are untouched
- [ ] 스크린샷·자산이 `research-memory/assets/[company]/`에 저장됐다
- [ ] 모바일 반응형을 언급했다면 Claude Browser로 실제 확인한 결과다 (스크립트 캡처는 모바일 불가)
- [ ] `research-log.md` updated with execution record

---

## What This Skill Does NOT Do

- **Text/messaging analysis** → Use `competitor-analyzer` (`WebFetch`)
- **Competitor discovery** → Use `competitor-finder` (`WebSearch`)
- **Brand voice definition** → Use `brand-voice` (marketing skill)
- **Design system generation** → Out of scope. This skill observes, not creates

Competitor Visual stays focused on **how competitors look** — color, type, layout, tone.
