# Content Image Patterns

> Prompt engineering patterns for card-news content images.
> Optimized for nanobanana MCP (Gemini image generation).
> All patterns target 16:9, text-free, editorial-quality output.

---

## Core Rules

1. **No text in images** — Card-news overlays its own text. Images with embedded text create visual clutter.
2. **16:9 ratio** — Maps to 946×576px embed area in content-image cards.
3. **Clean editorial style** — Magazine-grade, not stock photo generic.
4. **Color harmony** — Default card-news palette is white/black/yellow. Images should complement, not clash.
5. **Clear subject** — The image shares viewport with title + body text. Subject must read clearly at reduced attention.

---

## Prompt Formula

```
[Subject] + [Style] + [Lighting] + [Color] + [Composition] + [Ratio] + [Exclusions]
```

### Subject
Be concrete and specific. Vague subjects produce generic results.

| Bad | Good |
|-----|------|
| "economy" | "a stack of coins next to a rising graph line drawn on paper" |
| "technology" | "a sleek smartphone on a minimal white desk reflecting soft morning light" |
| "health" | "fresh green vegetables arranged artfully on a white marble countertop" |

### Style Directives
Use consistent style language across all images in one card-news set.

**Recommended styles for card-news:**
- `clean editorial photography` — Magazine-quality, studio/lifestyle
- `soft documentary style` — Real-world feel, warm
- `minimal flat lay` — Overhead shots, organized objects
- `architectural photography` — Clean lines, structural beauty
- `conceptual still life` — Metaphorical arrangements

### Lighting
- `soft natural lighting` — Default for most topics
- `studio lighting with soft shadows` — Product/object focus
- `warm golden hour light` — Emotional, warm topics
- `cool diffused daylight` — Professional, tech topics
- `dramatic side lighting` — Impact, conflict topics

### Color Guidance
Embed actual colors from the card-news theme:
```
Color palette emphasizing clean whites and blacks with warm yellow (#fff3a0) accents.
Muted, desaturated tones with pops of [accent color].
```

### Composition
- `centered composition with ample negative space` — Safe default
- `rule of thirds, subject in left third` — Dynamic
- `overhead flat lay arrangement` — Objects/food/items
- `shallow depth of field, subject isolated` — Focus on one element
- `wide establishing shot` — Scene-setting, environment

---

## Topic-Specific Templates

### Economy / Finance
```
[Financial subject: specific objects or scenes]. Clean editorial photography,
soft studio lighting. Color palette: whites, blacks, subtle gold and green accents.
Centered composition with negative space. 16:9 aspect ratio.
No text, no watermarks, no numbers on screen. Professional, magazine-grade quality.
Negative: blurry, text, watermark, logo, cluttered, stock photo feel, cheesy
```

### Technology / Digital
```
[Tech subject: specific device or concept]. Minimal product photography style,
cool diffused lighting with subtle blue tones. Color palette: clean whites,
deep blacks, subtle blue (#3B82F6) accents. Off-center composition with
generous negative space. 16:9 aspect ratio.
No text, no UI elements, no screen content. Sleek and modern.
Negative: blurry, text, watermark, busy background, dated technology, cables
```

### Health / Wellness
```
[Health subject: specific scene or objects]. Warm lifestyle photography,
soft natural light from a window. Color palette: fresh greens, clean whites,
warm wood tones. Natural, organic composition. 16:9 aspect ratio.
No text, no logos, no medical symbols. Inviting and approachable.
Negative: blurry, clinical, sterile, text, watermark, stock photo, forced smile
```

### Food / Lifestyle
```
[Food/lifestyle subject]. Overhead flat lay or 45-degree angle. Soft diffused
natural lighting. Color palette: warm earth tones, fresh ingredient colors,
clean white surface. Styled but not overly perfect. 16:9 aspect ratio.
No text, no packaging labels, no hands. Editorial food photography quality.
Negative: blurry, text, logo, artificial lighting, plastic packaging, messy
```

### Education / Knowledge
```
[Education subject: specific learning scene or objects]. Clean documentary style,
warm natural lighting. Color palette: warm whites, subtle pastels, wood tones.
Intentional composition with clear focal point. 16:9 aspect ratio.
No text on objects, no visible book titles, no faces. Thoughtful, intellectual mood.
Negative: blurry, text, watermark, cluttered desk, dark, gloomy
```

### Environment / Nature
```
[Nature subject: specific scene or element]. Landscape/nature photography,
golden hour or soft overcast light. Color palette: natural greens, earth tones,
sky blues, with warm accents. Wide composition showing environment. 16:9 aspect ratio.
No text, no signs, no people. Immersive and peaceful.
Negative: blurry, text, watermark, urban elements, pollution, litter
```

---

## Negative Prompt Library

**Always include (universal):**
```
blurry, low quality, text, watermark, logo, distorted, artifacts, oversaturated
```

**Topic-specific additions:**

| Topic | Add to Negative |
|-------|----------------|
| Finance | `cheesy, stock photo, thumbs up, money rain` |
| Technology | `dated, cables visible, cracked screen, messy desk` |
| Health | `clinical, sterile, medical instruments, forced` |
| Food | `artificial, plastic, packaging, unappetizing` |
| Education | `boring, textbook, clipart, cartoon` |
| Nature | `urban, pollution, filter-heavy, HDR` |

---

## Refinement Tips

When an image doesn't meet standards:

1. **Too generic** → Add more specific subject details ("a single espresso cup" not "coffee")
2. **Wrong mood** → Adjust lighting directive and color palette
3. **Too busy** → Add "minimal, negative space, clean background" + strengthen negative prompt
4. **Wrong composition** → Specify camera angle and framing explicitly
5. **Colors clash** → Embed specific HEX codes in the prompt
6. **Text appeared** → Strengthen "no text, no letters, no numbers, no words" in both prompt and negative

---

## Model Selection

| Scenario | Model | Rationale |
|----------|-------|-----------|
| Default | auto | Let nanobanana optimize |
| Quality-critical hero image | pro | Maximum detail and accuracy |
| Quick iteration / testing | flash | Faster generation, good enough for preview |
| Multiple variations | flash first, pro for final | Iterate cheaply, then polish |
