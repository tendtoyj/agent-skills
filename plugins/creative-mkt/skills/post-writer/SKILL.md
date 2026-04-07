---
name: post-writer
description: "Write a single platform-optimized social post with storytelling framework, brand voice, and visual direction notes. Produces ready-to-post copy for one platform. No MCP tools — pure creative writing powered by creative-memory context. Use when user mentions: social post, write a post, LinkedIn post, Twitter post, tweet, Instagram caption, Instagram carousel, reel script, YouTube script, YouTube shorts, email nurture, platform content, social copy, draft a post, create a post, write for LinkedIn, write for Instagram, write for Twitter, 소셜 포스트, 포스트 작성, 인스타 포스트, 링크드인 포스트, content writing, platform-native, social media copy, post for [platform], one post"
user-invocable: true
---

# Post Writer

> **Trigger keywords**: social post, write a post, LinkedIn post, Twitter post, Instagram caption, carousel, reel script, YouTube script, email nurture, social copy, draft a post, create a post, platform content, 소셜 포스트, 포스트 작성

Write a single post for a single platform — from scratch, not from existing content. The post is grounded in storytelling frameworks, aligned to brand voice, and includes visual direction notes that image-creator can use downstream.

This skill is the **execution layer** in the creative stack. It takes a topic, picks (or receives) a framework, and produces one complete, platform-native post with copy + visual direction.

```
series-planner  → "Post 3/7: Use PAS, topic = AI tool fatigue"
                         ↓
post-writer     → Full LinkedIn post + visual direction notes
                         ↓
image-creator   → Branded visual from the direction notes
```

It also works standalone — a user says "write me a LinkedIn post about X" and post-writer handles everything.

**What this skill does NOT do:**
- Repurpose existing content → use **content-atomizer** (vibe-mkt)
- Plan multi-post campaigns → use **series-planner**
- Research trends → use **trend-scout**
- Build frameworks → use **framework-builder**

---

## Memory Auto-Load Protocol

Run this before writing anything. It ensures brand consistency and leverages existing creative assets.

```
1. Check creative-memory/ exists → if not, create from creative-memory-template/
2. Load brand-memory/voice-profile.md         (brand tone — read-only)
3. Load brand-memory/positioning.md           (message framing — read-only)
4. Load ALL .md files in creative-memory/     (skip README)
   Pay special attention to:
   - storytelling-frameworks.md  → framework selection
   - trend-angles.md            → trend connection opportunities
   - content-examples.md        → few-shot style reference
5. Optionally load research-memory/customer-language.md (customer voice)
```

Access rules:

| Memory folder | Permission |
|---------------|------------|
| `research-memory/` | Read-only |
| `brand-memory/` | Read-only |
| `creative-memory/` | Read & Write |

**Missing memory handling:**

- `voice-profile.md` missing → warn: "No brand voice found. The post will sound professional but generic. Run the brand-voice skill first for a distinctive voice. Continue anyway?"
- `storytelling-frameworks.md` empty → use the built-in fallback mapping (see Step 1). Recommend running framework-builder afterward.
- `visual-guidelines.md` empty → visual direction notes will be generic (composition only, no brand colors/fonts). Recommend running visual-extractor.

---

## Two Modes

### Mode A — Full Write
creative-memory is populated. Frameworks, visual guidelines, and brand voice are available.
Run all 5 steps. This is the default and most common mode.

### Mode B — Quick Draft
creative-memory is empty or partially populated.
Use built-in fallback framework mapping. Produce copy with generic tone and minimal visual notes.
After delivery, recommend: "For stronger results, run framework-builder and visual-extractor first."

Auto-detection:
- `storytelling-frameworks.md` populated + `voice-profile.md` present → Mode A
- Either missing → Mode B
- User explicitly says "quick" or "just draft something" → Mode B

---

## Input Gathering

Collect before starting:

| Field | Required | Description |
|-------|----------|-------------|
| Topic / direction | ✅ | What the post is about — a theme, a message, or a specific angle |
| Target platform | ✅ | LinkedIn / Twitter·X / Instagram / YouTube / Email |
| Format | Optional | Sub-format within the platform (e.g., carousel vs. reel). Auto-recommend if omitted |
| Purpose | Optional | Awareness / Engagement / Lead Capture / Conversion. Shapes CTA. Default: Awareness |
| Framework | Optional | Specific framework from storytelling-frameworks.md. Auto-match if omitted |
| Trend connection | Optional | Link to a specific trend from trend-angles.md |
| Tone shift | Optional | Adjust from brand default (e.g., "more casual", "more urgent") |
| Language | Optional | 포스트 작성 언어 (default: English) |

**When called from series-planner:** Most fields arrive pre-filled (framework, hook direction, visual direction, CTA type). Skip the gathering step — go straight to Step 1 with the provided brief.

---

## Process (5 Steps)

### Step 1: Framework Selection

If a framework was specified (by user or series-planner), use it directly.

If not, auto-match using this logic:

1. **Check storytelling-frameworks.md** — read the "Framework Selection Guide" table. Match by platform + purpose. If a clear winner exists, use it.

2. **If frameworks.md is empty, use the fallback map:**

| Platform | Purpose | Primary Framework | Alternative |
|----------|---------|-------------------|-------------|
| LinkedIn | Awareness | HSO (Hook→Story→Offer) | PAS |
| LinkedIn | Engagement | PAS (Problem→Agitate→Solve) | Contrarian Hook |
| LinkedIn | Lead Capture | PAS | AIDA |
| Twitter/X | Awareness | Bold Claim | Contrarian Hook |
| Twitter/X | Engagement | Question opener | Contrarian Hook |
| Instagram Carousel | Education | Step-by-Step | Listicle |
| Instagram Reel | Awareness | Hook→Value→CTA (3-act) | Compressed HSO |
| YouTube Full | Education | AIDA | Problem→Solution |
| YouTube Shorts | Awareness | Hook→Value→CTA | Bold Claim |
| Email Newsletter | Nurture | Story→Lesson→Bridge | HSO |
| Email Nurture | Conversion | PAS | AIDA |

3. **Check trend-angles.md** — if a trend naturally fits the topic, note the connection. Don't force it — a trend connection should feel organic, not shoe-horned.

Tell the user which framework you've selected and why, before writing. If they want a different one, switch.

### Step 2: Write Copy

Follow the selected framework's structure step by step. For each structural element (hook, story, agitate, solution, CTA, etc.), write platform-native copy.

**Platform rules** — read `references/platform-specs.md` for the full spec. Key principles:

- **LinkedIn**: First line is everything — it decides "see more" clicks. Keep under 1,300 chars. Short paragraphs (1-2 sentences), generous line breaks. Professional but human.
- **Twitter/X thread**: Tweet 1 must work standalone. Each tweet retweetable on its own. 5-12 tweets. No hashtags (they reduce engagement on X).
- **Twitter/X single**: 280 chars max. Numbers, contrast, specificity.
- **Instagram carousel**: 8-10 slides. Slide 1 = magazine cover hook. 100-150 chars per slide. Final slide = CTA.
- **Instagram reel**: 30-60 sec. First 3 seconds are the only ones that matter. Text overlay every key point.
- **YouTube full**: 5-15 min script. HOOK in first 30 sec with specific result promise. Timestamp markers.
- **YouTube shorts**: <60 sec. One idea only. Cross-postable to Reels.
- **Email newsletter section**: 300-500 words. Most personal tone. Subject line + preview text + body + CTA.
- **Email nurture**: 75-150 words. One hook, one insight, one bridge. Soft CTA.

**Voice application:**
- Apply `voice-profile.md` vocabulary (USE words in, AVOID words out)
- Apply `positioning.md` framing — every post should reflect the brand's differentiation angle
- If `customer-language.md` is available, weave in 1-2 expressions from the customer's actual words. This is what separates resonant copy from generic output.

**Format auto-recommend** (when user didn't specify):
- LinkedIn → Long-form post (most versatile)
- Twitter/X → Thread (if topic has depth) or Single tweet (if it's one sharp insight)
- Instagram → Carousel (educational topics) or Reel script (stories/demos)
- YouTube → Shorts (single insight) or Full script (deep topic)
- Email → Newsletter section (standalone value) or Nurture (part of a sequence)

### Step 3: Visual Direction Notes

Based on `visual-guidelines.md`, write actionable direction for image-creator or a designer.

**Per-format visual notes:**

| Format | Visual direction includes |
|--------|--------------------------|
| LinkedIn long-form | 1 hero image: color palette, composition, text overlay suggestion |
| LinkedIn carousel | Per-slide: key text, layout direction, color, visual emphasis |
| Twitter/X | Image recommendation (include or skip), composition if included |
| Instagram carousel | Per-slide: headline text, layout, background, icon/illustration suggestions |
| Instagram reel | Per-scene: camera direction, text overlay, transition notes |
| YouTube | Thumbnail direction + key scene visuals |
| Email | Header image direction (if applicable) |

**Structure the notes like this:**

```
### Visual Direction
Based on: visual-guidelines.md

- **Color**: [Primary/accent from palette + mood]
- **Typography**: [Headline treatment, body style]
- **Composition**: [Layout, visual hierarchy, key focal point]
- **Mood**: [Emotional tone the visual should convey]
- **Text overlay**: [Key phrase to feature visually, if any]
- **Format**: [Dimensions from platform-specs.md]
```

If `visual-guidelines.md` is empty → provide composition and mood notes only, skip brand-specific color/font direction. Note: "Visual direction is generic — run visual-extractor for branded visuals."

### Step 4: Quality Audit

Before delivering, run these checks and fix any failures:

**Copy checks:**
- [ ] Platform character/duration limit respected (see platform-specs.md)
- [ ] Framework structure followed — every step of the chosen framework is present
- [ ] Hook/first line stops the scroll (would YOU stop scrolling for this?)
- [ ] CTA included and matches the stated purpose
- [ ] Hashtags follow platform strategy (LinkedIn: 3-5, Twitter: 0-1, Instagram: 5-15)

**Voice checks:**
- [ ] Brand USE words present (from voice-profile.md)
- [ ] Brand AVOID words absent
- [ ] Positioning angle reflected in framing (from positioning.md)

**AI slop removal — scan and eliminate:**
"delve", "landscape" (metaphorical), "paradigm", "tapestry", "unleash", "leverage" (as verb), "navigate" (metaphorical), "realm", "In today's [X]", "It's important to note", "game-changer", "cutting-edge", "revolutionize", "harness", "synergy", "dive into", "unpack", "at the end of the day"

Also remove any words in the AVOID list from voice-profile.md.

**Structural checks:**
- [ ] Post reads naturally — not like a template with blanks filled in
- [ ] Each sentence earns its place — no filler, no padding
- [ ] The post would make sense to someone who knows nothing about the brand

If any check fails, fix it. Don't present a post that fails quality audit.

### Step 5: Save + Log

Save the post to: `[project]/posts/[platform]-[topic-slug]-[YYYY-MM-DD].md`

**Language rule**: 섹션 헤더와 테이블 컬럼명은 영어로 유지합니다. 본문, 셀 값, 설명, 분석 텍스트는 사용자가 지정한 언어로 작성합니다. 언어가 지정되지 않으면 English로 작성합니다.

Use the output template below.

Append to `creative-memory/creative-log.md`:

```
| [date] | post-writer | [Platform] [Format] — [Topic] | [Framework], [Trend if any] | None |
```

**Enrichment rule**: If the user approves the post without changes (or says something positive), save a condensed version to `creative-memory/content-examples.md` with the `[post-writer]` tag. Include: platform, framework used, the hook line, and why it works. Never delete entries from other skills.

---

## Output Template

```markdown
# [Platform] Post — [Topic]
> Date: [YYYY-MM-DD]
> Platform: [LinkedIn / Twitter·X / Instagram / YouTube / Email]
> Format: [Long-form / Carousel / Thread / Single / Reel Script / Shorts / Newsletter / Nurture]
> Framework: [Framework name]
> Trend: [Connected trend, or "None"]
> Purpose: [Awareness / Engagement / Lead Capture / Conversion]

---

## Copy

[Complete, ready-to-post copy in platform-native format]

---

## Hashtags / Tags

[Platform-appropriate hashtags, or "N/A" for Twitter/X]

---

## Visual Direction
> Based on: visual-guidelines.md [or "General — run visual-extractor for branded visuals"]

- **Color**: [palette direction]
- **Typography**: [headline/body treatment]
- **Composition**: [layout, focal point, hierarchy]
- **Mood**: [emotional tone]
- **Text overlay**: [key phrase, if any]
- **Dimensions**: [from platform-specs.md]

[For carousel/reel: per-slide or per-scene breakdown]

---

## Posting Notes

- **Best time**: [from learnings.md if available, else general guidance]
- **Engagement strategy**: [platform-specific tip]
- **Lead capture**: [CTA link direction, if purpose = Lead Capture]

---

## Meta

- **Framework mapping**: [which part of the copy maps to which framework step]
- **Customer language used**: [expressions from customer-language.md, if any]
- **Quality audit**: PASSED
```

---

## Skill Chaining

After delivering a post, suggest relevant next steps based on what happened:

> **Post delivered.** Here's what you can do next:
>
> - **Image Creator** — turn the visual direction into a branded image
> - **Series Planner** — build a multi-post campaign around this theme
> - **Content Atomizer** (vibe-mkt) — adapt this post for other platforms
> - **Trend Scout** — find trending angles for your next post
>
> Save posts that perform well to `creative-memory/content-examples.md` — the more examples I have, the better the next post gets.

---

## Quality Checklist (Self-Audit Before Delivery)

- [ ] Hook/first line is genuinely attention-grabbing
- [ ] Framework structure is complete (no missing steps)
- [ ] Platform format rules followed (character limits, slide counts, durations)
- [ ] Brand voice is consistent (USE words present, AVOID words absent)
- [ ] Positioning angle is reflected (not just mentioned — woven into the framing)
- [ ] CTA matches the stated purpose
- [ ] AI slop words eliminated
- [ ] Visual direction is specific enough for image-creator to act on
- [ ] The post sounds like a person wrote it, not a template engine
- [ ] Customer language integrated where available
