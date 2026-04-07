# Prompt Patterns for Image Creator

> Reference file for image-creator SKILL.md Step 3 (Prompt Engineering).
> Read this file when building generation prompts. It contains the full pattern library,
> style directives, color mapping, and worked examples.

---

## Table of Contents

1. [Prompt Formula](#1-prompt-formula)
2. [Style Directive Patterns](#2-style-directive-patterns)
3. [Color & Mood Mapping](#3-color--mood-mapping)
4. [Composition by Platform](#4-composition-by-platform)
5. [Negative Prompt Library](#5-negative-prompt-library)
6. [Use Case Prompt Templates](#6-use-case-prompt-templates)
7. [Prompt Refinement Tips](#7-prompt-refinement-tips)

---

## 1. Prompt Formula

Every prompt follows this structure. Order matters — subject first, negative last:

```
[Subject/Scene], [Style Directive], [Color/Mood], [Composition], [Platform Specs], [Negative Prompt]
```

**Why this order works**: Image models weight earlier tokens more heavily. The subject anchors the scene, style shapes the aesthetic, and color/mood refines the feeling. Composition and platform specs handle technical constraints. Negatives clean up at the end.

---

## 2. Style Directive Patterns

Choose the pattern that matches `visual-guidelines.md` → Image Style → Direction.

### 2.1 Photography Styles

| Style | Prompt Language | Best For |
|-------|----------------|----------|
| **Editorial** | `editorial photography, natural lighting, candid moment, shallow depth of field, 35mm film grain` | LinkedIn, brand storytelling |
| **Studio product** | `studio photography, clean white background, soft diffused lighting, product centered, high detail` | E-commerce, product features |
| **Lifestyle** | `lifestyle photography, warm natural light, real environment, authentic moment, environmental portrait` | Instagram feed, community building |
| **Architectural** | `architectural photography, clean lines, symmetry, dramatic perspective, wide angle` | Tech/SaaS, corporate |
| **Documentary** | `documentary style, raw, unposed, available light, reportage feel` | Social proof, behind-the-scenes |

### 2.2 Illustration Styles

| Style | Prompt Language | Best For |
|-------|----------------|----------|
| **Flat vector** | `flat vector illustration, clean shapes, bold colors, minimal detail, geometric` | Infographics, explainers |
| **Hand-drawn** | `hand-drawn illustration, sketch-like lines, organic textures, warm imperfect strokes` | Personal brands, education |
| **Isometric** | `isometric illustration, 3D perspective, clean lines, pastel colors, technical precision` | SaaS, process diagrams |
| **Watercolor** | `watercolor illustration, soft edges, color bleeding, organic flow, artistic` | Wellness, lifestyle brands |
| **Line art** | `minimalist line art, single continuous line, black ink on white, elegant simplicity` | Luxury, minimalist brands |

### 2.3 3D & Abstract Styles

| Style | Prompt Language | Best For |
|-------|----------------|----------|
| **Soft 3D** | `3D render, soft lighting, rounded shapes, pastel materials, clay-like texture, playful` | Tech, startup, friendly brands |
| **Glass/Chrome** | `3D render, glass and chrome materials, reflections, dark background, futuristic` | AI/tech, premium products |
| **Abstract gradient** | `abstract gradient background, flowing organic shapes, smooth color transitions, ethereal` | Quote cards, mood visuals |
| **Geometric abstract** | `geometric abstract composition, bold shapes, primary colors, Bauhaus-inspired` | Design-forward brands |
| **Paper craft** | `paper craft style, layered cut paper, depth shadows, textured surfaces, tactile` | Education, creative brands |

### 2.4 Flat & Minimal Styles

| Style | Prompt Language | Best For |
|-------|----------------|----------|
| **Swiss/clean** | `Swiss design, grid-based layout, sans-serif typography feel, high contrast, minimal` | Corporate, consulting |
| **Duotone** | `duotone color treatment, two-color palette, high contrast, graphic poster style` | Bold statements, Twitter/X |
| **Monochrome** | `monochrome, single color tones, subtle gradients, sophisticated restraint` | Luxury, premium positioning |

---

## 3. Color & Mood Mapping

### 3.1 Emotion → Color Direction

Use this table to align the copy's emotional tone with color choices. Always overlay brand colors from `visual-guidelines.md` — this table provides direction when the guidelines don't cover the specific mood.

| Copy Tone | Color Direction | Temperature | Avoid |
|-----------|----------------|-------------|-------|
| Trust / Authority | Navy, deep blue, white, slate | Cool | Neon, hot pink |
| Energy / Excitement | Orange, red, electric yellow | Warm-hot | Pastel, gray |
| Calm / Wellness | Sage green, soft blue, cream | Cool-neutral | Black, bright red |
| Innovation / Tech | Electric blue, purple, black | Cool | Brown, beige |
| Luxury / Premium | Gold, black, deep purple | Warm-cool contrast | Bright green, orange |
| Warmth / Community | Warm yellow, coral, soft cream | Warm | Cold blue, industrial gray |
| Urgency / Scarcity | Red, black, white contrast | Hot | Pastels, muted tones |
| Knowledge / Education | Teal, navy, warm white | Cool-warm balance | Aggressive reds |

### 3.2 Brand Color Integration

The most effective way to enforce brand colors in AI-generated images is to embed HEX codes directly in the prompt. Color names alone are unreliable.

**Pattern:**
```
color palette dominated by [Primary Name] (#HEX) with [Accent Name] (#HEX) highlights,
[Neutral Name] (#HEX) background tones
```

**Example:**
```
color palette dominated by deep navy (#1B2838) with warm gold (#C9A96E) accents,
soft cream (#F5F0E8) background, minimal use of other colors
```

**Tips:**
- Name 2–3 colors maximum — more creates confusion
- Specify which color goes where: "background", "accents", "primary subject"
- Use "dominated by" for the primary color, "accents" or "highlights" for secondary
- For duotone effects: "strictly two-color palette: [Color A] (#HEX) and [Color B] (#HEX)"

---

## 4. Composition by Platform

### 4.1 Square (1:1) — LinkedIn, Instagram alternate

```
Prompt addition: "square format, centered composition, balanced symmetry, ample negative space around subject"
```

**Works well with:** Single object focus, quote cards, headshots, icons. The eye naturally rests at center — use it.

**Avoid:** Panoramic scenes, horizontal storytelling, multiple scattered subjects.

### 4.2 Portrait (4:5) — Instagram Feed

```
Prompt addition: "portrait format 4:5 ratio, subject in upper third, space below for text overlay, vertical emphasis"
```

**Works well with:** People, products with height, storytelling scenes. Instagram crops to 4:5 in the grid — this maximizes real estate.

**Avoid:** Wide landscape scenes (they get squeezed). Subjects touching bottom edge (caption area).

### 4.3 Vertical (9:16) — Stories, Reels, Shorts

```
Prompt addition: "vertical format 9:16, full-height composition, stacked visual elements, clear top and bottom thirds for text zones"
```

**Works well with:** Phone-native content, tall subjects, layered information. Leave clear zones at top 10% and bottom 20% for platform UI elements.

**Avoid:** Horizontally composed scenes, small details (they vanish on mobile).

### 4.4 Landscape (16:9) — Twitter/X, YouTube Thumbnails

```
Prompt addition: "wide landscape 16:9 format, cinematic framing, rule of thirds, subject on left or right third"
```

**Works well with:** Scenes, environments, before/after, multi-element compositions. For YouTube thumbnails, ensure faces (if present) are large and expressions readable at small sizes.

**Avoid:** Tall vertical subjects without context, centered-only compositions (wastes horizontal space).

---

## 5. Negative Prompt Library

### 5.1 Universal Negatives (always include)

```
blurry, low quality, watermark, distorted, artifacts, oversaturated, pixelated, jpeg compression
```

### 5.2 Style-Specific Negatives

| If the style is... | Add to negatives |
|--------------------|-----------------|
| Photography | `cartoon, illustration, 3D render, anime, painting, digital art` |
| Illustration | `photorealistic, photograph, camera, lens flare, film grain` |
| Minimal/clean | `cluttered, busy background, excessive detail, ornate, decorative` |
| Professional | `casual, messy, low-effort, stock photo cliches, cheesy` |
| Luxury/premium | `cheap looking, plastic, neon, clip art, bright primary colors` |

### 5.3 Brand Don'ts → Negative Conversion

Read the Don'ts section from `visual-guidelines.md` and convert each into negative prompt language:

**Conversion pattern:**
```
Don't: "Use neon colors"         → Negative: "neon colors, fluorescent, electric bright"
Don't: "Use cluttered layouts"   → Negative: "cluttered, busy, overlapping elements, chaotic"
Don't: "Use stock photo cliches" → Negative: "generic stock photo, handshake, pointing at screen"
Don't: "Mix more than 3 fonts"   → Negative: "multiple font styles, mixed typography"
```

---

## 6. Use Case Prompt Templates

Each template shows the structure. Replace bracketed items with brand-specific content from visual-guidelines and copy analysis.

### 6.1 Quote Card

For posts built around a key quote, statistic, or bold statement.

```
Template:
A [style] quote card with [brand primary color] (#HEX) background,
centered text area with [typography direction] font feeling,
[mood] atmosphere, clean minimal design,
aspect ratio [ratio], high quality

Negative: cluttered, busy background, multiple fonts, handwritten unless specified,
low contrast text, hard to read
```

**Worked example (professional brand):**
```
A minimal professional quote card with deep navy (#1B2838) background,
centered text area with bold sans-serif font feeling,
confident and clean atmosphere, subtle warm gold (#C9A96E) accent line at top,
soft shadow depth, aspect ratio 1:1, high quality, sharp design

Negative: cluttered, busy background, multiple fonts, neon colors,
handwritten, low quality, watermark, blurry
```

### 6.2 Data Visualization Hero

For posts featuring statistics, comparisons, or numerical insights.

```
Template:
A [style] data visualization graphic showing [concept metaphor],
[brand colors] (#HEX) color scheme, [chart/graph type or abstract representation],
clean data presentation, modern infographic feel,
aspect ratio [ratio], high quality

Negative: messy data, illegible numbers, cluttered charts, clip art,
low quality, blurry, distorted text
```

### 6.3 Lifestyle Scene

For posts about culture, day-in-life, behind-the-scenes, or community.

```
Template:
[Scene description with specific details] in [environment],
[lighting type] lighting, [brand color tones] color grading,
[photography style], authentic and natural moment,
aspect ratio [ratio], high quality

Negative: posed, fake, stock photo, studio backdrop,
artificial, oversaturated, blurry, watermark
```

**Worked example (wellness brand):**
```
A woman practicing morning yoga on a sunlit wooden floor in a bright minimalist apartment,
warm golden hour light streaming through large windows, soft sage green (#8FA88C) and
cream (#F5F0E8) color palette, lifestyle photography, natural movement captured mid-flow,
plants and natural textures in background, aspect ratio 4:5, high quality

Negative: posed, fake smile, gym setting, dark, artificial lighting,
neon workout clothes, stock photo, blurry, watermark
```

### 6.4 Abstract Concept

For posts about ideas, strategies, or intangible concepts that need visual representation.

```
Template:
Abstract [concept] visualization, [metaphor description],
[style: gradient/geometric/organic], [brand colors] (#HEX) palette,
[mood] atmosphere, modern and sophisticated,
aspect ratio [ratio], high quality

Negative: literal interpretation, clipart, cheesy metaphors,
low quality, busy, cluttered, text, watermark
```

### 6.5 Product / Feature Highlight

For posts showcasing a product, service feature, or tool.

```
Template:
[Product/tool] [presentation style: on desk / floating / in use / hero shot],
[brand colors] (#HEX) accent lighting, [background: clean/contextual/gradient],
[style directive], professional product presentation,
aspect ratio [ratio], high quality, sharp detail

Negative: cheap looking, low resolution, blurry details,
cluttered background, bad lighting, stock photo, watermark
```

### 6.6 Before/After or Comparison

For posts contrasting two states, approaches, or outcomes.

```
Template:
Split composition showing [before state] on [left/top] and [after state] on [right/bottom],
clear visual contrast between the two sides, [brand colors] (#HEX) for the positive side,
muted tones for the negative side, clean dividing line or transition,
[style directive], aspect ratio [ratio], high quality

Negative: confusing layout, unclear comparison, blurry,
low contrast, watermark, cluttered
```

### 6.7 Storytelling Scene

For narrative posts — customer stories, founder journey, case studies.

```
Template:
[Narrative moment description with emotional detail],
[lighting that matches the emotional beat: warm/dramatic/soft],
[brand color] (#HEX) color grading, [photography/illustration style],
cinematic composition, storytelling depth,
aspect ratio [ratio], high quality

Negative: generic, emotionless, stock photo, artificial,
posed, plastic, low quality, watermark
```

---

## 7. Prompt Refinement Tips

### 7.1 Specificity Ladder

The single biggest lever for image quality is prompt specificity. Move down this ladder:

| Level | Example | Quality |
|-------|---------|---------|
| **Vague** | "a business image" | Unpredictable, generic |
| **General** | "a professional office scene with warm lighting" | Recognizable but bland |
| **Specific** | "a modern open-plan office with warm afternoon sunlight through floor-to-ceiling windows, a person working at a clean desk with a laptop" | Good, usable |
| **Precise** | "a modern open-plan office, warm golden afternoon sunlight through floor-to-ceiling windows casting long shadows, single focused entrepreneur working at a clean white desk with a silver laptop, minimal Scandinavian decor, potted monstera plant, shot from 30-degree angle, shallow depth of field, editorial photography" | Excellent, intentional |

**Rule of thumb**: If you can picture exactly one scene from the prompt, it's specific enough. If you can picture five different scenes, add more detail.

### 7.2 Style Mixing Rules

Sometimes a brand's visual identity blends styles. Handle this carefully:

**Safe to mix:**
- Photography + color grading (e.g., "editorial photography with duotone blue color treatment")
- Illustration + texture (e.g., "flat vector illustration with paper texture overlay")
- 3D + specific material (e.g., "3D render with glass and metal materials")

**Avoid mixing:**
- Photography + illustration in the same image (results in uncanny hybrid)
- Two competing photography styles (e.g., "studio product shot with documentary feel")
- Realistic + cartoon (unless the brand specifically uses this contrast)

### 7.3 Text-in-Image Considerations

Gemini models can render text in images, but reliability varies:

**When text works well:**
- Short phrases (1–5 words)
- Large, centered placement
- Simple fonts (sans-serif, all-caps)
- High contrast between text and background

**When text struggles:**
- Long sentences or paragraphs
- Small text or multiple text blocks
- Cursive, script, or decorative fonts
- Text over complex backgrounds

**Best practice**: For quote cards and text-heavy visuals, generate the background/visual separately and add text in a design tool (Canva, Figma). Mention this option to the user when text-in-image is requested.

### 7.4 Iterative Refinement

When a generated image is close but not right, don't rewrite the entire prompt. Identify the gap and adjust surgically:

| Problem | Fix |
|---------|-----|
| Colors are wrong | Strengthen HEX codes, add "strictly" before color palette |
| Too busy/cluttered | Add "minimal, clean, ample negative space" + "cluttered, busy" to negatives |
| Wrong style | Strengthen style directive, add competing styles to negatives |
| Subject is off | Rewrite subject description with more physical detail |
| Mood is wrong | Adjust lighting and color temperature descriptors |
| Composition awkward | Add explicit framing language ("rule of thirds", "centered", "left-aligned") |
| Generic/stock feel | Add "authentic, candid, natural" and negative "stock photo, generic, posed" |

**Three-attempt rule**: If three prompt adjustments don't fix the core issue, rethink the visual concept entirely rather than over-engineering the same prompt. Sometimes the metaphor needs to change, not the technical description.
