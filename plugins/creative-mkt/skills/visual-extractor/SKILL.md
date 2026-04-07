---
name: visual-extractor
description: "Extract visual brand patterns from uploaded assets (logos, social posts, screenshots, ads) and document them as structured guidelines. Use when user mentions: visual guidelines, brand visuals, color palette, typography extraction, visual identity, brand style guide, image style, visual brand, extract colors, visual analysis, brand assets, design guidelines, brand look and feel, visual direction, brand colors, logo analysis, visual consistency"
user-invocable: true
---

# Visual Extractor

> Analyze uploaded brand assets and extract visual patterns into a structured guideline document.
> This is the first Foundation skill: **visual-extractor** → framework-builder → content skills.

---

## Purpose

Words define what a brand says. Visuals define how it feels.

Visual Extractor takes your existing brand assets — logos, social posts, website screenshots, ads — and reverse-engineers the visual identity into documented guidelines. The output becomes the visual reference that every creative-mkt skill relies on:

- **post-writer** attaches visual direction notes to each post
- **image-creator** uses color palette + image style as generation constraints
- **series-planner** ensures campaign-wide visual consistency

No MCP tools needed. This skill uses Claude's multimodal image analysis to read your uploaded images directly.

---

## Modes

| Mode | When | Behavior |
|------|------|----------|
| **Full Extract** | `visual-guidelines.md` is empty or missing | Analyze all assets, build guidelines from scratch |
| **Update** | `visual-guidelines.md` already has content | Add new asset findings alongside existing guidelines |

---

## Auto-Load Protocol

On every invocation, BEFORE asking for assets:

1. Check `creative-memory/` directory exists
   - If missing → Copy from `creative-memory-template/` to create it
2. Read `creative-memory/visual-guidelines.md`
   - If populated → Suggest **Update** mode, show current summary
   - If empty/template → Proceed with **Full Extract**
3. Read `brand-memory/voice-profile.md` (read-only, if exists) → Note personality traits for cross-check in Step 4
4. Read `brand-memory/positioning.md` (read-only, if exists) → Note positioning for visual-tone alignment
5. Optionally read `research-memory/competitive-intel.md` → Competitor visual context if available

---

## Step 1: Collect Brand Assets

Ask the user to upload their brand visual assets. The more variety, the more accurate the extraction.

**Prompt**:
```
Please upload your brand visual assets — the more variety, the better.

Recommended (upload at least 3):
- Logo (primary + any variations)
- Social media posts (2-3 representative ones)
- Website screenshots (homepage + a key page)
- Ads, banners, or promotional materials
- Any other branded visuals

Also tell me:
- Brand name: ___
- Industry/category (optional): ___
- Output language (optional, default: English): ___
```

**Handling edge cases**:
- 1-2 images: Proceed, but note "Limited sample — guidelines may need refinement as more assets become available"
- No images: Stop. This skill requires visual input. Suggest: "Upload at least one branded image, or take screenshots of your website/social profiles"
- Images from multiple brands: Ask user to confirm which assets belong to their brand

**Asset classification**: As images arrive, mentally classify each as:
- Logo, Social Post, Website Screenshot, Advertisement, Packaging, Presentation, Other
- This classification guides which analysis dimensions apply per image

---

## Step 2: Extract Color Palette

Analyze ALL uploaded images to identify recurring colors. Look across multiple assets for consistency — colors that appear in 2+ assets carry more weight.

**Extract four color tiers**:

| Tier | What to Find | Where to Look |
|------|-------------|---------------|
| **Primary** | The dominant brand color | Logo, headers, CTA buttons |
| **Secondary** | Supporting color | Backgrounds, sub-elements, cards |
| **Accent** | Pop/highlight color | Links, icons, hover states, decorative elements |
| **Neutral** | Text and background base | Body text, backgrounds, borders |

**For each color, document**:
- Descriptive name (e.g., "Deep Navy", "Warm Cream")
- HEX code (best approximation from image analysis)
- RGB values
- Primary usage context (where it appears most)
- Approximate weight in overall palette (%)

**Important — communicate HEX accuracy honestly**:
Colors extracted from image analysis are approximations, not pixel-perfect values. After presenting the palette, ask:

```
Here's the color palette I extracted. The HEX values are my best
approximation from analyzing your images.

Do you have exact brand colors (from a style guide or design file)?
If so, share them and I'll update the values. Otherwise, these
approximations work well as creative direction.
```

If the user provides exact values, use those instead.

---

## Step 3: Analyze Typography, Image Style, and Layout

Work through each dimension, drawing evidence from ALL uploaded assets.

### Typography

| Element | What to Extract |
|---------|----------------|
| **Headline font** | Serif / Sans-serif / Display / Script. Weight (Bold/Medium/Light). Case treatment (Title Case / ALL CAPS / Sentence case) |
| **Body font** | Family type. Size feel (compact/generous). Line spacing feel (tight/airy) |
| **Hierarchy** | How distinct are H1 → H2 → Body? Sharp contrast or subtle gradient? |
| **Special usage** | Any distinctive typographic choices (monospace for data, handwritten accents, etc.) |

Note: Claude identifies font *families and characteristics*, not exact font names. Frame as "Rounded sans-serif similar to Nunito" rather than claiming exact font identification.

### Image Style

| Element | What to Extract |
|---------|----------------|
| **Direction** | Photography-first / Illustration-first / Graphic/Abstract / Mixed |
| **Photo treatment** | Filter tone (warm/cool/neutral), Saturation (vivid/muted), Lighting feel (natural/studio/dramatic) |
| **Composition** | Subject focus (people/product/abstract). Framing style (close-up/wide/flat-lay). Negative space usage |
| **Graphic elements** | Icon style (line/filled/3D). Shape language (rounded/angular/organic). Pattern or texture use |

### Layout Principles

| Element | What to Extract |
|---------|----------------|
| **Grid feel** | Structured grid / Asymmetric / Free-form |
| **Whitespace** | Generous (breathing room) / Moderate / Dense (information-packed) |
| **Text-to-visual ratio** | Visual-dominant / Balanced / Text-heavy |
| **Information hierarchy** | Clear top-down / Modular cards / Scattered |

---

## Step 4: Build Do's & Don'ts + Platform Rules + Cross-Check

### Visual Do's and Don'ts

Synthesize Steps 2-3 into actionable creative rules. Each item should be specific enough that someone creating content could follow it without seeing the original assets.

Write 4-6 Do's and 4-6 Don'ts. Format:
```
Do: [specific action] — [why, based on pattern observed]
Don't: [specific action] — [why it breaks the pattern]
```

Bad example: "Do: Use brand colors" (too vague)
Good example: "Do: Use Deep Navy (#1A2B4C) for all headlines and primary CTAs — it anchors the professional tone across every touchpoint"

### Platform Visual Rules

Define how the core visual identity adapts per platform. The brand stays consistent, but execution shifts.

| Platform | Tone Shift | Key Visual Rules |
|----------|-----------|-----------------|
| Instagram | [e.g., more vibrant, lifestyle-oriented] | [e.g., 4:5 ratio preferred, text overlays minimal] |
| LinkedIn | [e.g., more polished, data-forward] | [e.g., clean backgrounds, professional photography] |
| Twitter/X | [e.g., punchier, higher contrast] | [e.g., bold single images, minimal text] |
| YouTube | [e.g., dynamic, thumbnail-optimized] | [e.g., faces + text, high contrast for small sizes] |

Only include platforms relevant to the brand. If unsure, ask the user which platforms they use.

### Brand Voice Cross-Check

If `brand-memory/voice-profile.md` was loaded, compare personality traits against visual patterns:

- **Aligned**: "Brand voice is [trait]. Visual identity reinforces this through [visual evidence]."
- **Divergent**: "Observation: Brand voice leans [trait], while visuals lean [different trait]. This could be intentional contrast or worth revisiting."

Present divergence as observation, not judgment. Intentional tension between voice and visuals (e.g., serious expertise + playful design) is a valid brand strategy.

---

## Step 5: Save to Creative Memory + Log

### Save visual-guidelines.md

Write the complete guideline document to `creative-memory/visual-guidelines.md` using this structure:

```markdown
# Visual Brand Guidelines
> Last updated: [YYYY-MM-DD]
> Source skill: visual-extractor
> Assets analyzed: [N] ([asset types listed])

## Color Palette

### Primary: [Name] #HEX (R, G, B)
- Usage: [where it appears]
- Weight: ~[N]% of brand visuals

### Secondary: [Name] #HEX (R, G, B)
- Usage: [where it appears]

### Accent: [Name] #HEX (R, G, B)
- Usage: [where it appears]

### Neutral: [Name] #HEX (R, G, B)
- Usage: [where it appears]

> Note: HEX values are approximations from image analysis unless
> confirmed by the user with exact brand specifications.

## Typography
### Headline: [family type] — [weight], [case treatment]
### Body: [family type] — [size feel], [spacing feel]
### Hierarchy: [description of contrast between levels]

## Image Style
### Direction: [primary direction]
- Photo treatment: [filter, saturation, lighting]
- Composition: [subject, framing, space]
- Graphic elements: [icon style, shapes]

## Layout Principles
- Grid: [pattern]
- Whitespace: [philosophy]
- Text-to-visual: [ratio]
- Hierarchy: [pattern]

## Do's and Don'ts
### Do
- [specific guideline] — [reason]

### Don't
- [specific guideline] — [reason]

## Platform Visual Rules
| Platform | Tone Shift | Key Visual Rules |
|----------|-----------|-----------------|

## Voice-Visual Alignment
[Cross-check results from Step 4, if brand-memory was available]
```

### Update Mode Behavior

When in **Update** mode:
- Read existing `visual-guidelines.md` first
- Add new observations from fresh assets alongside existing content
- If new findings conflict with existing guidelines, present both and ask the user which to keep
- Never silently overwrite — always note what changed

**Language rule**: 섹션 헤더와 테이블 컬럼명은 영어로 유지합니다. 본문, 셀 값, 설명, 분석 텍스트는 사용자가 지정한 언어로 작성합니다. 언어가 지정되지 않으면 English로 작성합니다.

### Log the execution

Append one row to `creative-memory/creative-log.md`:

```
| [YYYY-MM-DD] | visual-extractor | [Full/Update] | [N assets analyzed; key findings summary] | Claude multimodal |
```

---

## Quality Checklist

Before saving, verify:

- [ ] All four color tiers defined (Primary / Secondary / Accent / Neutral)
- [ ] Each color has HEX + usage context
- [ ] HEX approximation disclaimer included
- [ ] Typography covers at least Headline + Body
- [ ] Image Style has Direction + at least one sub-dimension
- [ ] Do's and Don'ts are specific and actionable (not generic)
- [ ] Platform Visual Rules included for user's active platforms
- [ ] Voice-Visual cross-check performed (if brand-memory exists)
- [ ] creative-log.md updated

---

## What This Skill Does NOT Do

- **Scrape websites for visuals** → Upload screenshots instead, or reference mkt-study's `competitor-visual` output
- **Generate new visual assets** → That's `image-creator`'s job
- **Review creative work against guidelines** → Future `creative-reviewer` skill
- **Analyze competitor visuals** → Use `competitor-visual` in the mkt-study plugin
- **Write to brand-memory/** → Read-only access. Visual guidelines live in creative-memory/

Visual Extractor stays focused on one thing: **turning your existing brand assets into documented visual guidelines**.

---

## Skill Chaining

After running Visual Extractor, here's what to do next:

**→ Framework Builder**: Now that visual identity is defined, build storytelling frameworks aligned with your visual style. The frameworks will reference your visual tone when recommending content structures.

**→ Post Writer**: Every post created by post-writer will auto-load your visual guidelines and attach a "Visual Direction" note — ensuring the copy aligns with the visual identity.

**→ Image Creator**: Your guidelines become the style reference for AI-generated visuals. Colors, image style, and layout principles constrain the generation prompt.

**→ Full Pipeline**: If this is your first time, the orchestrator will suggest: visual-extractor → framework-builder → trend-scout → post-writer → image-creator.
