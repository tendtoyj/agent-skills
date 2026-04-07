---
name: card-news-image-generator
description: "Generate content images for card-news using nanobanana MCP (Gemini image generation). Produces 16:9 editorial images for content-image cards — no text, clean style. Use when user mentions: 카드뉴스 이미지, card news image, 콘텐츠 이미지, content image, 카드뉴스 사진, generate card image, 이미지 생성, AI 이미지"
user-invocable: true
---

# Card-News Image Generator

> Generate content images for card-news using nanobanana MCP.
> One tool (nanobanana), one output (16:9 editorial PNG files).

---

## Purpose

Image Generator produces the visual assets that go into `content-image` card types. It:
1. Receives image prompts from contents-manager
2. Validates prompts against card-news image requirements
3. Generates images via nanobanana MCP
4. Saves output files for card-news-maker to embed

---

## Memory Auto-Load Protocol

```
1. Load contents-manager output (Visual Asset Plan — provided as input)
   → Image prompts, aspect ratios, save paths
2. Read references/content-image-patterns.md
   → Prompt refinement patterns and style templates
   → If missing: use the built-in prompt formula in Step 1
3. Optional: Load card-news-memory/series-config.md
   → Color theme overrides
   → If missing: use default palette (white/black/yellow #fff3a0)
4. Optional: Load creative-memory/visual-guidelines.md (read-only)
   → If missing: use clean editorial style as default
```

**필수 입력은 contents-manager output뿐이다.** 나머지 파일 로드 실패 시 기본값으로 진행.

---

## Input

| Input | Required | Source |
|-------|----------|--------|
| Visual Asset Plan | Yes | contents-manager output |
| Visual guidelines | Recommended | creative-memory/visual-guidelines.md |
| Style override | Optional | User preference |

---

## Process

### Step 1: Prompt Review

For each image prompt from the Visual Asset Plan, verify:

**Hard requirements checklist:**
- [ ] Aspect ratio is 16:9
- [ ] Prompt explicitly states "no text"
- [ ] No watermark/logo instructions
- [ ] Subject is clearly described (not vague)
- [ ] Style direction is present (editorial, clean, etc.)
- [ ] Negative prompt includes standard exclusions

**If any requirement is missing, add it before generation.**

---

### Step 2: Generate Images

Call nanobanana MCP `generate_image` for each prompt.

**Generation parameters:**

| Parameter | Value |
|-----------|-------|
| Aspect ratio | 16:9 |
| Model | auto (default) or pro for quality-critical images |
| Max attempts | 3 per image |

**Generation sequence:**
1. Call `generate_image` with the reviewed prompt
2. Evaluate the result:
   - Subject clear and relevant to topic?
   - No unintended text or artifacts?
   - Color palette harmonious with card-news theme?
   - Composition works at 946×576px (the embed area)?
3. If result is unsatisfactory:
   - Adjust prompt (add specificity, strengthen style directive)
   - Retry (up to 3 attempts total)
4. If still unsatisfactory after 3 attempts:
   - Report to user with the best result + prompt used
   - Suggest alternative approaches (different angle, different subject)

**Quality checks per image:**
- No text visible in the image
- No watermarks or logos
- Clean composition (not overly busy)
- Subject recognizable at card-news display size
- Colors don't clash with the white/black/yellow card-news theme

---

### Step 3: Generate Outro Icon (if requested)

If the Visual Asset Plan includes an outro icon prompt:
1. Generate using nanobanana with the specified prompt
2. Target: simple, iconic, suitable for 180×140px display
3. Style: clean illustration or icon, minimal detail

---

### Step 4: Save Files

Save each generated image to the project output directory:

**File naming convention:**
```
[project]/card-news/[topic]-[YYYY-MM-DD]/img-card-[N].png
```

**Outro icon:**
```
[project]/card-news/[topic]-[YYYY-MM-DD]/outro-icon.png
```

**Example:**
```
card-news/ai-trends-2026-02-25/img-card-2.png
card-news/ai-trends-2026-02-25/img-card-3.png
card-news/ai-trends-2026-02-25/outro-icon.png
```

---

### Step 5: Output Report

```markdown
# Image Generation Report: [Topic]

> Date: [YYYY-MM-DD]
> Images generated: [N]
> All images: 16:9, no text, editorial style

## Generated Images

### Card [N] — [topic]
- **File**: `[path]`
- **Prompt used**: [final prompt]
- **Model**: [auto/pro/flash]
- **Attempts**: [N]
- **Status**: Success / Partial (notes)

[Repeat for each image]

### Outro Icon
- **File**: `[path]`
- **Status**: [Generated / User-provided / Skipped]

## Production Notes
- [Any quality concerns or user action needed]
```

---

## nanobanana MCP Reference

| Parameter | Spec |
|-----------|------|
| Tool | `generate_image` |
| Models | Gemini 3 Pro (quality) / Gemini 2.5 Flash (speed) |
| Default model | auto |
| Max resolution | 4K (Pro) / 1024px (Flash) |
| Prompt limit | 8,192 characters |

---

## What This Skill Does NOT Do

- **Plan visual assets** → contents-manager creates the prompts
- **Write copy** → copy-writer
- **Render final cards** → card-news-maker
- **Edit or retouch images** → out of scope

Image Generator stays focused: **prompts in → PNG files out**.
