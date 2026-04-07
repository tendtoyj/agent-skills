---
name: card-news-contents-manager
description: "Plan visual assets for card-news: select Lucide icons for feature cards and generate nanobanana image prompts for content-image cards. Use when user mentions: 카드뉴스 에셋, card news assets, 아이콘 선택, icon selection, 이미지 프롬프트, image prompt, 시각 기획, visual planning, 콘텐츠 에셋, asset planning"
user-invocable: true
---

# Card-News Contents Manager

> Plan visual assets for card-news: Lucide icon selection + AI image prompts.
> Reads reference files (lucide-icon-catalog). Produces structured output consumed by image-generator and card-news-maker.

---

## Purpose

Contents Manager bridges copy and visuals. It:
1. Inventories visual asset needs per card
2. Selects Lucide icons (with SVG paths) for content-features cards
3. Generates nanobanana prompts for content-image cards
4. Outputs a structured visual plan for downstream skills

---

## Memory Auto-Load Protocol

```
1. Load copy-writer output (structured copy markdown — provided as input)
2. Read references/lucide-icon-catalog.md ★ REQUIRED ★
   → Available icons with SVG paths by category
   → 이 파일 없이는 icon selection 불가
3. Optional: Load card-news-memory/series-config.md
   → Color theme, brand preferences
   → If missing: use default card-news palette (white/black/yellow)
4. Optional: Load creative-memory/visual-guidelines.md (read-only)
   → Color palette, image style preferences
   → If missing: use clean editorial style as default
```

**필수 파일은 lucide-icon-catalog.md뿐이다.** 나머지 로드 실패 시 기본값으로 진행.

---

## Input

| Input | Required | Source |
|-------|----------|--------|
| Approved copy (or pending copy) | Yes | copy-writer output |
| Visual guidelines | Recommended | creative-memory/visual-guidelines.md |
| Series config | Recommended | card-news-memory/series-config.md |
| Style override | Optional | User-specified visual direction |

---

## Process

### Step 1: Asset Inventory

Scan the copy-writer output and list every visual asset needed:

```markdown
## Asset Inventory

| Card | Type | Assets Needed |
|------|------|--------------|
| 1 | cover | (none — text only) |
| 2 | content-image | 1 hero image (946×576px) |
| 3 | content-features | 3 Lucide icons |
| 4 | outro | 1 outro icon/illustration |
| Total | | X images, Y icon sets |
```

---

### Step 2: Lucide Icon Selection (for content-features cards)

For each feature in a content-features card:

1. Read the `icon-hint` from copy-writer output (e.g., "heart", "clock", "shield")
2. Look up matching icons in `references/lucide-icon-catalog.md`
3. Select the best-matching icon considering:
   - Semantic relevance to the feature title/description
   - Visual consistency across the 3 icons in one card
   - Simplicity (cleaner icons render better at 32×32px)
4. Extract the full SVG path data

**Output per icon:**
```markdown
### Feature [N]: [feature-title]
- **Icon hint**: [from copy-writer]
- **Selected icon**: [lucide-icon-name]
- **SVG paths**:
  ```html
  <path d="[path-data]"/>
  ```
- **Rationale**: [why this icon fits]
```

**Icon selection rules:**
- Prefer single-path icons (simpler rendering at small sizes)
- All 3 icons in one card should have similar visual weight
- Avoid overly detailed icons — they become illegible at 32×32px
- If the icon-hint doesn't match any catalog entry, choose the closest semantic match and note the substitution

---

### Step 3: Image Prompt Generation (for content-image cards)

For each content-image card, generate a nanobanana-ready prompt:

1. Read the `image-alt` from copy-writer output
2. Analyze the card's topic from title + body text
3. Load visual guidelines for style direction
4. Compose the prompt following these rules:

**Prompt formula:**
```
[Subject/Scene] + [Style] + [Color/Mood] + [Composition] + [Technical Specs] + [Exclusions]
```

**Hard rules for card-news images:**
- **Aspect ratio**: 16:9 (946×576px area, wider than tall)
- **No text in image**: Card-news overlays its own text — images must be text-free
- **Clean editorial style**: Magazine-quality, not stock photo generic
- **Color harmony**: Match the card-news color scheme (--bg, --fg, --highlight)
- **Subject clarity**: Clear subject, not overly busy — the image shares space with title + body text

**Prompt template:**
```
[Concrete scene description]. Editorial photography style, clean composition,
soft natural lighting. Color palette: [colors from visual guidelines or series-config].
16:9 aspect ratio. No text, no watermarks, no UI elements. Professional quality,
magazine-grade. [Additional style notes from visual guidelines].
Negative: blurry, low quality, text, watermark, logo, cluttered, oversaturated
```

**Output per image:**
```markdown
### Card [N] Image: [topic]
- **Source**: image-alt: "[from copy-writer]"
- **Prompt**:
  ```
  [full nanobanana prompt]
  ```
- **Aspect ratio**: 16:9
- **Model**: auto
- **Save as**: `img-card-[N].png`
```

---

### Step 4: Outro Icon Planning

For the outro card:
- Default: Use a thematic emoji or simple illustration related to the topic
- The outro icon is 180×140px, displayed at center
- If the user has a brand icon, reference it
- Otherwise, suggest using nanobanana to generate a simple icon/illustration

```markdown
### Outro Icon
- **Concept**: [description]
- **Prompt** (if AI-generated):
  ```
  [nanobanana prompt for simple icon/illustration]
  ```
- **Alternative**: User-provided image at `[path]`
```

---

### Step 5: Output — Visual Asset Plan

Compile everything into a structured document:

```markdown
# Visual Asset Plan: [Topic]

> Date: [YYYY-MM-DD]
> Cards: [N]
> Total assets: [X images, Y icon sets]

---

## Asset Inventory
[from Step 1]

## Icons — Content-Features Cards
[from Step 2, one section per card]

## Images — Content-Image Cards
[from Step 3, one section per card]

## Outro Icon
[from Step 4]

---

## Production Notes
- Image style: [clean editorial / per visual guidelines]
- Color theme: [from series-config or visual guidelines]
- All images: 16:9, no text, magazine-grade
```

---

## What This Skill Does NOT Do

- **Generate images** → image-generator uses these prompts
- **Write copy** → copy-writer
- **Render HTML** → card-news-maker
- **Evaluate quality** → copy-evaluator

Contents Manager stays focused: **copy in → visual asset plan out**.
