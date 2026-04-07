---
name: content-atomizer
description: "Turn 1 core piece of content into 15+ platform-specific assets optimized for each platform's algorithm and audience. Use when user mentions: content atomizer, repurpose content, atomize, social media content, multi-platform, LinkedIn post, Twitter thread, Instagram carousel, Reel script, YouTube Shorts, content distribution, social assets, cross-platform, content repurposing, content multiplication"
user-invocable: true
---

# Content Atomizer Skill

> **Trigger keywords**: content atomizer, repurpose content, atomize, social media content, multi-platform, LinkedIn post, Twitter thread, Instagram carousel, Reel script, YouTube Shorts, content distribution, social assets, cross-platform, content repurposing, content multiplication, platform-specific, social media strategy, turn into social, repurpose blog, social from article, distribute content, 1 to 15, one piece many posts

Turn 1 core piece of content into 15+ platform-specific assets. Not copy-paste with different character limits — genuinely different content optimized for how each platform works, what its audience expects, and what its algorithm rewards. All while keeping your brand voice consistent.

This skill sits at the end of every content pipeline. It amplifies everything upstream:

```
Traffic Stack:   Keyword Research → SEO Content → CONTENT ATOMIZER → 15+ assets per piece
Nurture Stack:   Email Sequences → Newsletter → CONTENT ATOMIZER → email → social bridge
```

The philosophy: "One piece becomes many. Every asset compounds. The boring stuff that wins."

---

## Brand Memory Protocol

Before transforming any content, check for the `brand-memory/` directory.

- If `voice-profile.md` exists → **critical** — apply tone, vocabulary, personality to ALL 15+ outputs. This is harder than it sounds: 15 variants must all feel like the same person wrote them
- If `positioning.md` exists → frame every hook through the chosen differentiation angle
- If `audience.md` exists → adjust platform selection and tone to where the target audience actually spends time
- If `learnings.md` exists → check for past performance data — what hooks/formats worked before
- If none exist → warn the user:

> "No brand memory found. I can still atomize your content, but it won't have your brand voice, which means 15+ pieces that sound generic. For best results, run **Brand Voice** first."

Proceed with a professional-but-neutral tone if the user wants to continue anyway.

---

## Four Modes

Detect mode from user intent:

> **Mode 1 — Full Atomize**: Transform 1 core piece into 15+ assets across all 5 platforms. The default and most common use.
>
> **Mode 2 — Platform Focus**: Deep-dive into 1-2 specific platforms with more variants and A/B options.
>
> **Mode 3 — Hook Extract Only**: Pull 5-10 hooks from the content. User writes the posts themselves, or feeds hooks into other skills.
>
> **Mode 4 — Repurpose**: Take content that's already live on one platform and adapt it for others. Uses performance data if available.

**Auto-detection logic:**
- "Atomize this blog post" or "turn this into social content" → Mode 1
- "Create LinkedIn posts from this" or "I need Instagram content" → Mode 2
- "What are the key hooks in this?" or "extract the main insights" → Mode 3
- "This LinkedIn post did well, adapt it for Twitter" or "turn my newsletter into social" → Mode 4
- Ambiguous → default to Mode 1

---

## Input Gathering

Before starting, collect:

1. **The content** — Blog post, podcast transcript, video script, newsletter, case study, sales page, client work writeup. Full text or URL. Any format works.
2. **Content purpose** — What should these social posts achieve? Awareness / Lead capture / Community engagement / Direct conversion? (Shapes CTA selection.)
3. **Platform priority** (Mode 2 only) — Which 1-2 platforms? LinkedIn / Twitter-X / Instagram / Email / YouTube?
4. **Performance context** (Mode 4 only, optional) — What worked? "This LinkedIn post got 50K impressions" helps identify which hooks to double down on.
5. **Language** (Optional) — 결과물 작성 언어. Default: English. 원본 콘텐츠와 다른 언어 시장용 콘텐츠 생성 시 유용합니다.

If brand memory covers audience and voice, don't re-ask. Confirm and move on.

---

## Phase 1: Hook Extraction

The foundation of every transformation. Before writing a single social post, extract the core hooks — the insights that make people stop scrolling.

### Pull 5-10 Hooks from the Source Content

Read the full content. For each major section, identify the **one thing the reader should remember**. That's a hook.

**Hook extraction questions:**
- What's the most surprising claim or data point?
- What's the most counterintuitive insight?
- What personal story or example sticks?
- What practical step can someone take RIGHT NOW?
- What bold opinion would start a debate?
- What question would make the target audience say "I've wondered that too"?

### Classify Each Hook

| Hook Type | Description | Best Platforms |
|-----------|-------------|----------------|
| **Story** | Personal narrative, real example, case study moment | LinkedIn, Instagram, YouTube |
| **Data** | Surprising statistic, specific number, measurable result | LinkedIn, Twitter/X |
| **Contrarian** | Challenges common belief — "everyone says X, but actually Y" | Twitter/X, LinkedIn |
| **Question** | Provokes curiosity or self-reflection | Instagram, Twitter/X, Email |
| **Actionable** | Concrete step, tip, or method someone can use immediately | LinkedIn, Instagram, Twitter/X |
| **Bold Claim** | Strong declaration that demands attention | Twitter/X, LinkedIn |

### Hook Output Format

For each hook:

```
HOOK #[n] — [Type] [★ if primary hook]
"[The hook, written as a punchy standalone statement]"
→ Best for: [Platform 1], [Platform 2]
→ Source section: [Which part of the original]
→ Supporting evidence: [Data, quote, or example that backs this hook]
```

Rank hooks by impact — strongest first. The #1 hook leads the LinkedIn long-form post and Twitter thread.

---

## Phase 2: Platform Transformation

Transform hooks into platform-native content. Each platform gets 2-3 format variants. Every piece follows the **Hook → Body → CTA → Tags** structure adapted to the platform's culture.

**Critical rule: each platform version must be genuinely different.** Different hooks, different angles, different structures. A LinkedIn post shortened to 280 characters is NOT a tweet.

### LinkedIn — 3 Formats

**Long-form Post** (primary format):
- Length: ≤1,300 characters (the "see more" cutoff)
- First line is everything — it determines whether anyone reads the rest
- Structure:
  ```
  [Hook — one punchy line that stops the scroll]

  [Context — 2-3 short paragraphs with line breaks]
  [Each paragraph: 1-2 sentences max]

  [Insight or lesson — the "so what"]

  [CTA — question that invites comments, or direct ask]

  #Hashtag1 #Hashtag2 #Hashtag3
  ```
- Tone: Professional but human. Personal stories and lessons outperform corporate announcements
- Hashtags: 3-5, mix of industry-specific + trending

**Carousel** (slide-based):
- Slides: 8-10
- Per slide: 100-150 characters (readable at a glance)
- Structure:
  - Slide 1: Hook title (bold, attention-grabbing)
  - Slides 2-3: Problem or setup
  - Slides 4-8: Core content (one idea per slide)
  - Final slide: CTA ("Follow for more" / "Save this" / "Link in comments")
- Include visual direction notes for each slide (background color, icon suggestion, layout)

**Poll**:
- Question derived from a Contrarian or Question hook
- 3-4 options that split opinion (avoid obvious answers)
- Supporting text below the poll: 1-2 sentences on why this matters
- Polls drive comments; the question should invite people to explain their choice

### Twitter/X — 3 Formats

**Thread** (primary format):
- Length: 5-12 tweets
- Tweet 1 is the entire pitch — it must work standalone
- Structure:
  ```
  Tweet 1: [Hook — grab attention, hint at value] 🧵
  Tweet 2: [Context — why this matters]
  Tweets 3-N: [One point per tweet, each tweet stands alone]
  Final tweet: [CTA + ask for retweet of tweet 1]
  ```
- Tone: Concise, punchy, strong opening words. No fluff
- Each tweet should be retweetable on its own
- Use line breaks for emphasis, not walls of text

**Single Tweet**:
- 280 characters max
- Use the strongest Data or Bold Claim hook
- Numbers, contrast, and specificity outperform vague statements
- No hashtags (they reduce engagement on X)

**Quote Angle**:
- Reframe a hook as a hot take or debate starter
- Pattern: "Unpopular opinion: [contrarian reframe]" or "[Surprising stat]. Here's what nobody talks about:"
- Designed to provoke replies — agreement AND disagreement

### Instagram — 3 Formats

**Carousel Script**:
- Slides: 10
- Structure mirrors LinkedIn carousel but tone is warmer, more visual-first
  - Slide 1: Hook (treat like a magazine cover)
  - Slides 2-9: Content (one idea per slide, larger text, visual emphasis)
  - Slide 10: CTA ("Save this" / "Share with someone who needs this" / "Follow @handle")
- Include visual direction: color palette notes, font style suggestions, image vs. text-only per slide
- Hashtags: 5-15, in first comment or at end of caption

**Reel Script**:
- Duration: 30-60 seconds
- Structure:
  ```
  [0-3 sec]  HOOK — attention-grabbing statement or question
             Visual: fast cut, text overlay, direct to camera
  [3-15 sec] SETUP — context, "here's the thing..."
  [15-45 sec] VALUE — core content delivery
             Visual: B-roll, screen recording, text callouts
  [45-60 sec] CTA — "Follow for more" / "Comment your answer"
  ```
- First 3 seconds decide everything. Fast cuts, bold text overlay, surprising visual
- Text overlay for every key point (many watch without sound)

**Story Series**:
- 3-5 frames
- Casual, behind-the-scenes, conversational tone
- Interactive elements on each frame: polls, quizzes, question stickers, emoji sliders
- Frame progression: Tease → Reveal → Engage → CTA
- Last frame: Link sticker or "DM me" CTA

### Email — 2 Formats

**Newsletter Section**:
- 300-500 words, self-contained
- Structure: Subject line + Preview text + Hook intro + Body + CTA
- Written so it can be dropped into a **Newsletter** skill issue as one section
- CTA: "Read the full article →" or "Reply and tell me what you think"
- Tone: Most personal channel — write like talking to one person

**Nurture Content**:
- 75-150 words — a short value-add for an **Email Sequences** touch
- One hook, one insight, one bridge to the next email
- Soft CTA — teaching moment, not a sell
- Works as the VALUE email in a welcome sequence

### YouTube — 2 Formats

**Full Script**:
- Duration: 5-15 minutes
- Structure:
  ```
  [0:00-0:30]  HOOK — "In this video, I'll show you [specific result]"
  [0:30-1:00]  INTRO — brief context, what to expect
  [1:00-X:00]  BODY — 3-5 sections with clear timestamps
  [X:00-end]   CTA — subscribe, like, next video recommendation
  ```
- Each section marked with [TIMESTAMP] for chapter markers
- Tone: Educational + energetic, not robotic

**Shorts Script**:
- Duration: <60 seconds, vertical format
- Structure:
  ```
  [0-5 sec]   HOOK — strongest single hook, text overlay
  [5-50 sec]  CONTENT — rapid delivery, one core insight
  [50-60 sec] CTA — "Follow for part 2" or "Comment your take"
  ```
- Cross-postable to Instagram Reels (design for both)
- One idea only — resist the urge to cram everything in

---

## Phase 3: Brand Voice Consistency

After writing all variants, run this check across every single piece:

### Voice Verification Checklist

1. **Vocabulary scan** — Are USE words from `voice-profile.md` present? Are AVOID words absent?
2. **Tone match** — Does each piece sound like the brand personality? Read them back-to-back: do they feel like the same person?
3. **Positioning alignment** — Is the differentiation angle from `positioning.md` reflected in the framing?
4. **AI tell removal** — Scan and remove: "delve", "landscape" (metaphorical), "paradigm", "tapestry", "unleash", "leverage" (as verb), "navigate" (metaphorical), "realm", "In today's [X]", "It's important to note"

### Platform Tone Calibration

The brand voice core stays constant. Only the expression intensity adjusts:

| Platform | Voice Retention | Adjustment |
|----------|----------------|------------|
| LinkedIn | 100% | Professional expression of brand personality |
| Email | 100% | Most personal — like writing to a friend who happens to be a customer |
| Twitter/X | 90% | +10% more direct, witty, compressed |
| YouTube | 90% | +10% more educational, energetic |
| Instagram | 80% | +20% more accessible, visual-first language |

The shift is subtle. "Confidently Boring" on LinkedIn sounds like quiet authority. On Instagram, it sounds like the friend who cuts through the noise. Same personality, different room.

---

## Phase 4: Platform Optimization

### Hashtag Strategy

| Platform | Count | Strategy |
|----------|-------|----------|
| LinkedIn | 3-5 | Mix: 2 industry + 1-2 trending + 1 branded |
| Twitter/X | 0-1 | Hashtags reduce engagement; use sparingly or skip |
| Instagram | 5-15 | In first comment or caption end. Mix niche + broad |

### Engagement Hooks

Every piece needs a reason for the audience to interact — not just consume:

- **LinkedIn**: End with a question. "What's your experience with this?" / "Agree or disagree?"
- **Twitter/X**: Invite replies. "What would you add?" / "Hot take — change my mind"
- **Instagram**: Use CTAs native to the platform. "Save this for later" / "Tag someone who needs this" / "What's your answer? 👇"
- **Email**: Ask for reply. "Hit reply and tell me" — the single most powerful email CTA
- **YouTube**: "Subscribe if this was useful" + "Comment your biggest takeaway"

### Lead Capture Integration

Every atomized piece should connect back to the CAPTURE stage of the Traffic Flywheel:

- **LinkedIn/Twitter**: "Link in comments" or "DM me [keyword] for the free [lead magnet]"
- **Instagram**: "Link in bio" (update bio link to point to the lead magnet)
- **Email**: Direct CTA link to the lead magnet landing page
- **YouTube**: "Link in description" + pinned comment with the lead magnet URL

---

## Output Structure

### File Organization

```
atomized-content/
├── hooks-extracted.md              ← 5-10 hooks with classification
├── linkedin/
│   ├── long-form-post.md
│   ├── carousel.md
│   └── poll.md
├── twitter/
│   ├── thread.md
│   ├── single-tweet.md
│   └── quote-angle.md
├── instagram/
│   ├── carousel-script.md
│   ├── reel-script.md
│   └── story-series.md
├── email/
│   ├── newsletter-section.md
│   └── nurture-content.md
├── youtube/
│   ├── full-script.md
│   └── shorts-script.md
└── posting-checklist.md            ← Batch posting schedule + notes
```

### Each File Contains
- **Ready-to-post copy** — paste directly into the platform
- **Platform specs** — character count, image dimensions needed, hashtags
- **Posting note** — recommended time, engagement strategy, any images/visuals to create
- **Source hook** — which hook this piece is built from (for tracking what works)

---

## Quality Checklist

Before delivering, self-audit every piece:

- [ ] **Hook extraction complete** — 5-10 hooks identified, typed, and ranked
- [ ] **Asset count met** — Full Atomize mode produces 13-15 individual pieces
- [ ] **Platform rules followed** — character limits, format requirements, hashtag counts
- [ ] **Each piece is genuinely different** — not the same text at different lengths
- [ ] **Brand voice consistent** — all 15 pieces sound like the same person
- [ ] **AI tells removed** — no "delve", "landscape", "paradigm", "tapestry", "unleash"
- [ ] **CTA in every piece** — platform-appropriate engagement hook
- [ ] **Hashtags/tags included** — per platform strategy
- [ ] **Lead capture linked** — at least 3 pieces connect to a lead magnet or opt-in
- [ ] **Posting checklist generated** — schedule, timing notes, visual requirements

If any item fails, fix it before presenting.

---

## Example: Full Atomize (Abbreviated)

**Source**: "HVAC Marketing in Phoenix" blog post (from **SEO Content** output)
**Brand**: Boring Business Marketing — "Confidently Boring" voice — "The Overlooked Champion" positioning

### Hook Extraction

```
HOOK #1 — Story ★
"We told a $4M HVAC company their marketing was boring. They said 'perfect.'"
→ Best for: LinkedIn, YouTube

HOOK #2 — Data
"$443K in 8 months. Not from a viral moment — from compounding the fundamentals."
→ Best for: LinkedIn, Twitter/X

HOOK #3 — Contrarian
"Everyone's chasing AI hype. We're chasing your HVAC leads."
→ Best for: Twitter/X, LinkedIn

HOOK #4 — Actionable
"5 things Phoenix HVAC companies should check in their Google listing today."
→ Best for: Instagram carousel, LinkedIn carousel

HOOK #5 — Question
"When's the last time your marketing agency understood a compressor?"
→ Best for: Instagram, Twitter/X
```

### LinkedIn Long-form (Hook #1)

```
We told a $4M HVAC company their marketing was boring.

They said "perfect."

Here's what we mean by boring:
→ Actually showing up when someone searches "HVAC repair Phoenix"
→ Following up with leads the same day, not next week
→ Running the same proven ad for 6 months instead of chasing trends

The result? $443K in 8 months.

Not from a viral moment.
From compounding the fundamentals.

What's the most "boring" tactic that actually works in your business?

#HVACMarketing #LocalSEO #BoringWorks
```

### Twitter Thread (Hooks #1 + #2)

```
Tweet 1: We told a $4M HVAC company their marketing was boring.

They said "perfect."

Here's what happened next 🧵

Tweet 2: Most agencies pitch HVAC companies the same playbook they use for DTC brands.

That's like wearing a tuxedo to fix a furnace.

Tweet 3: We did three "boring" things:

- Showed up on Google when people search "HVAC repair Phoenix"
- Followed up same day
- Ran the same proven ad for 6 months

Tweet 4: The result?

$443K in 8 months.

From compounding fundamentals.

Tweet 5: Your industry isn't sexy. Your marketing can be.

What boring tactic actually works in your business? ↓
```

### Instagram Reel Script (Hook #5)

```
[0-3 sec] "When's the last time your marketing agency understood a compressor?"
→ Visual: Close-up of HVAC unit, text overlay with the question

[3-15 sec] "Most marketing agencies have no idea what your customers actually need."
→ Visual: Cut to talking head, casual setting

[15-45 sec] "Here's what works for HVAC companies in Phoenix:
Show up when they search. Follow up fast. Stop chasing trends."
→ Visual: Screen recording of Google search, fast cuts between examples

[45-60 sec] "We did this for one company. $443K in 8 months. Link in bio."
→ Visual: Number counter animation, logo reveal, CTA overlay
```

---

## Saving & Handoff

After delivering all atomized content:

**Language rule**: 섹션 헤더와 테이블 컬럼명은 영어로 유지합니다. 본문, 셀 값, 설명, 분석 텍스트는 사용자가 지정한 언어로 작성합니다. 언어가 지정되지 않으면 English로 작성합니다.

1. Save the full output folder to the project directory
2. Include the posting checklist with recommended scheduling
3. Suggest next steps:

> "Your 15+ pieces are ready. After posting:
>
> 1. **Track what works** — which hooks get engagement? Which platforms perform? Note winners in `brand-memory/learnings.md`
> 2. **Newsletter** — Feature the best-performing social angle in your next newsletter edition
> 3. **Repeat the flywheel** — grab your next piece of content and run it through again. Consistency compounds."

4. Update `brand-memory/campaigns.md` with:
   - Source content title
   - Platforms published to
   - Number of assets created
   - Top-performing hooks (add later as data comes in)
