---
name: competitor-visual
description: "Capture and analyze competitor landing page design patterns — color, typography, layout, visual tone, and mobile responsiveness. Use when user mentions: competitor design, visual audit, landing page design, competitor screenshots, design patterns, competitor UX, visual analysis, design comparison, competitor landing page, website design audit, competitor branding, visual tone, competitor layout"
user-invocable: true
---

# Competitor Visual

> Capture competitor landing pages with Playwright and analyze design patterns — color, typography, layout, visual tone, and responsiveness.
> This is the final step in the competitive chain: competitor-finder → competitor-analyzer → **competitor-visual**.

---

## Purpose

Copy tells people what you say. Design tells people how you feel.

Competitor Visual captures what text scraping cannot — the **visual identity** of competitor landing pages. It produces:
- Screenshots of hero sections, feature pages, and pricing pages
- Extracted color palettes, typography stacks, and layout patterns
- A cross-competitor visual comparison matrix
- Design gaps and visual differentiation opportunities

Output enriches `research-memory/competitive-intel.md` (Design Patterns section) and saves screenshots to `research-skills/screenshots/`.

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

### Step 2: Playwright Screenshot Capture

**Goal**: Navigate to each competitor site and capture screenshots + extract CSS data.

For each competitor site, execute this sequence:

#### 2a. Desktop Capture (1280×800)

```
browser_resize → width: 1280, height: 800
browser_navigate → competitor URL
browser_wait_for → time: 3  (allow content to load)
browser_take_screenshot → filename: "screenshots/[company]-hero.png"
browser_take_screenshot → fullPage: true, filename: "screenshots/[company]-full.png"
```

If cookie/consent banner appears:
```
browser_snapshot → find dismiss/accept button
browser_click → close the banner
browser_take_screenshot → re-capture without banner
```

#### 2b. Extract Design Tokens (CSS)

Use `browser_evaluate` to programmatically extract color and typography data:

**Color extraction**:
```javascript
() => {
  const body = getComputedStyle(document.body);
  const hero = document.querySelector('[class*="hero"], header, .banner, main > section:first-child');
  const hs = hero ? getComputedStyle(hero) : {};
  const cta = document.querySelector('a[class*="btn"], button[class*="btn"], .cta, [class*="cta"]');
  const cs = cta ? getComputedStyle(cta) : {};
  return {
    bodyBg: body.backgroundColor, bodyColor: body.color,
    heroBg: hs.backgroundColor || 'N/A',
    ctaBg: cs.backgroundColor || 'N/A', ctaColor: cs.color || 'N/A',
    fontFamily: body.fontFamily
  };
}
```

**Typography extraction**:
```javascript
() => {
  const tags = ['h1','h2','h3'].map(t => {
    const el = document.querySelector(t);
    if (!el) return null;
    const s = getComputedStyle(el);
    return { tag: t, font: s.fontFamily, size: s.fontSize, weight: s.fontWeight };
  }).filter(Boolean);
  const b = getComputedStyle(document.body);
  return { headings: tags, bodyFont: b.fontFamily, bodySize: b.fontSize };
}
```

#### 2c. Mobile Capture (optional — 390×844)

```
browser_resize → width: 390, height: 844
browser_wait_for → time: 2
browser_take_screenshot → filename: "screenshots/[company]-mobile.png"
browser_resize → width: 1280, height: 800  (reset)
```

#### 2d. Additional Pages

If capture scope includes features/pricing:
```
browser_navigate → [features URL]
browser_wait_for → time: 3
browser_take_screenshot → filename: "screenshots/[company]-features.png"
```

Repeat for pricing page if applicable.

**Error handling**: If a site blocks access, times out, or triggers CAPTCHA → skip that competitor, note it in the analysis, and move to the next.

**Save all screenshots** to `research-skills/screenshots/[company-name]/` (create subdirectory per competitor).

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
| [YYYY-MM-DD] | competitor-visual | Full Audit / Refresh / Single | [# competitors captured, key visual findings] | Playwright |
```

---

## Playwright Tool Reference

| Tool | Purpose | When |
|------|---------|------|
| `browser_navigate` | Go to URL | Every competitor site |
| `browser_take_screenshot` | Capture viewport or full page | Hero, features, pricing, mobile |
| `browser_snapshot` | Get accessibility tree | Find dismiss buttons, understand structure |
| `browser_resize` | Change viewport size | Desktop (1280×800) ↔ Mobile (390×844) |
| `browser_evaluate` | Run JavaScript | Extract colors, fonts via getComputedStyle |
| `browser_click` | Click elements | Dismiss cookie banners, navigate tabs |
| `browser_wait_for` | Wait for content | Allow pages to fully render |

**Tips**:
- Always wait 2-3 seconds after navigation for content to load
- Cookie banners: use `browser_snapshot` to find the dismiss button, then `browser_click`
- If a site blocks or CAPTCHAs → skip and note in analysis
- Save screenshots with descriptive names: `[company]-hero.png`, `[company]-mobile.png`
- Reset viewport to 1280×800 after mobile captures

---

## Quality Checklist

Before saving, verify:

- [ ] Every competitor in the Competitive Set has at least a hero screenshot
- [ ] CSS-extracted colors include HEX values (not just rgb strings — convert if needed)
- [ ] Typography documents both heading and body fonts
- [ ] Visual Comparison Matrix covers all analyzed competitors
- [ ] "Design Trends Across Competitors" section identifies at least 1 shared pattern and 1 opportunity
- [ ] Existing `[competitor-finder]` and `[competitor-analyzer]` sections are untouched
- [ ] Screenshots saved to `research-skills/screenshots/[company]/`
- [ ] `research-log.md` updated with execution record

---

## What This Skill Does NOT Do

- **Text/messaging analysis** → Use `competitor-analyzer` (Firecrawl)
- **Competitor discovery** → Use `competitor-finder` (Perplexity)
- **Brand voice definition** → Use `brand-voice` (marketing skill)
- **Design system generation** → Out of scope. This skill observes, not creates

Competitor Visual stays focused on **how competitors look** — color, type, layout, tone.
