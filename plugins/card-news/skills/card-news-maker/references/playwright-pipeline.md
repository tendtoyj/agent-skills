# Playwright Rendering Pipeline

> Step-by-step instructions for rendering card-news HTML to individual 1080×1350 PNG files.
> Uses Playwright MCP tools: `browser_navigate`, `browser_resize`, `browser_evaluate`, `browser_take_screenshot`.

---

## Prerequisites

- `cards.html` file assembled and saved to disk
- All image files (`img-card-*.png`, `outro-icon.png`) in the same directory as `cards.html`
- Each card in the HTML has a `data-card-index` attribute (1, 2, 3, ...)

---

## Pipeline Steps

### Step 1: Navigate to HTML

```
browser_navigate → file:///absolute/path/to/card-news/[topic]-[date]/cards.html
```

**Important:**
- Use absolute file path with `file://` protocol
- Ensure the path has no spaces, or URL-encode spaces as `%20`

---

### Step 2: Wait for Fonts

Google Fonts load asynchronously. Screenshots taken before fonts load will show fallback fonts.

```javascript
// browser_evaluate
await document.fonts.ready;
// Verify specific fonts loaded
const notoLoaded = document.fonts.check('700 48px "Noto Sans KR"');
const nanumLoaded = document.fonts.check('400 48px "Nanum Pen Script"');
console.log('Noto Sans KR:', notoLoaded, 'Nanum Pen Script:', nanumLoaded);
```

**If fonts fail to load:**
- Check internet connectivity (Google Fonts requires network access)
- Fallback: Embed fonts as base64 in the CSS (add to card-type-components.md if this becomes recurring)
- Wait up to 10 seconds, then proceed with available fonts

---

### Step 3: Wait for Images

Content images must fully load before screenshot.

```javascript
// browser_evaluate
const images = document.querySelectorAll('img');
const promises = Array.from(images).map(img => {
  if (img.complete) return Promise.resolve();
  return new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = resolve; // Don't block on failed images
  });
});
await Promise.all(promises);
console.log('All images loaded:', images.length);
```

---

### Step 4: Render Each Card

For each card (index 1 to N):

#### 4a: Isolate the target card

```javascript
// browser_evaluate — hide all cards except the target
const targetIndex = {{CARD_INDEX}};
document.querySelectorAll('.card').forEach((card, i) => {
  card.style.display = (i + 1 === targetIndex) ? 'flex' : 'none';
});

// Remove body padding/gap for isolated rendering
document.body.style.padding = '0';
document.body.style.gap = '0';
document.body.style.background = '#FFFFFF';

// Hide dev labels
document.querySelectorAll('.label').forEach(el => el.style.display = 'none');
```

#### 4b: Resize viewport

```
browser_resize → width: 1080, height: 1350
```

#### 4c: Take screenshot

```
browser_take_screenshot
```

Save the screenshot as `card-[INDEX].png` in the output directory.

**Screenshot naming:**
```
card-1.png  → cover
card-2.png  → first content card
...
card-N.png  → outro
```

#### 4d: Repeat for next card

Restore current card's display, hide for next iteration.

---

### Step 5: Restore Full View (Optional)

After all individual screenshots, restore the full preview:

```javascript
// browser_evaluate — show all cards again
document.querySelectorAll('.card').forEach(card => {
  card.style.display = 'flex';
});
document.body.style.padding = '48px 0';
document.body.style.gap = '48px';
document.body.style.background = '#E5E5E5';
document.querySelectorAll('.label').forEach(el => el.style.display = 'block');
```

---

## Troubleshooting

### Fonts not loading
**Symptom:** Sans-serif fallback visible, Korean characters look different.
**Fix:**
```javascript
// Force wait with timeout
await new Promise(resolve => setTimeout(resolve, 3000));
await document.fonts.ready;
```
If still failing after 5 seconds, the network may be blocking Google Fonts. Consider embedding fonts as base64.

### Images showing as gray boxes
**Symptom:** Placeholder gray (#d9d9d9) visible instead of image.
**Causes:**
1. Image file not in the correct directory
2. Relative path mismatch between HTML `src` and actual file location
3. Image failed to generate (check image-generator output)

**Fix:** Verify `src` attributes resolve from the HTML file's location:
```javascript
// browser_evaluate
document.querySelectorAll('.ci-image img').forEach(img => {
  console.log(img.src, img.complete, img.naturalWidth);
});
```

### Card height overflow
**Symptom:** Content extends beyond 1350px.
**Cause:** Copy exceeds character limits, or too many body lines.
**Fix:** This should have been caught by copy-evaluator. Check placeholder-constraints.md limits.

### Screenshots capturing wrong area
**Symptom:** Screenshot shows partial card or includes adjacent cards.
**Fix:** Ensure:
1. All other cards are `display: none`
2. Body padding/gap is `0`
3. Viewport is exactly 1080×1350
4. Use element-level screenshot if full-page fails

```javascript
// Alternative: element-level screenshot
const card = document.querySelector('[data-card-index="{{CARD_INDEX}}"]');
// Use browser_take_screenshot with element selector
```

### Blank screenshot
**Symptom:** All-white or all-gray PNG.
**Cause:** Font loading timeout caused blank render, or card display:none not toggled.
**Fix:** Add a delay after font loading, verify card visibility.

---

## Performance Notes

- Full pipeline for 4 cards typically takes 30-60 seconds
- Font loading is the main bottleneck (2-5 seconds)
- Image loading depends on file sizes
- Each screenshot takes ~1-2 seconds
- Total for 10 cards: ~2-3 minutes

---

## Output Verification Checklist

After rendering all cards:

- [ ] Each `card-[N].png` file exists and is non-empty
- [ ] File count matches expected card count
- [ ] Cover card (card-1.png) shows brand header + headline
- [ ] Content cards show title + image/features + body text
- [ ] Outro card shows closing message + account handle
- [ ] All text is rendered in correct fonts (not fallback)
- [ ] All images are visible (no gray placeholders)
- [ ] Highlight colors (yellow) are visible
- [ ] No `{{...}}` placeholder text visible in any card
- [ ] No dev labels visible in individual card PNGs
