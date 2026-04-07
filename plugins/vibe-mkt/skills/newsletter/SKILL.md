---
name: newsletter
description: "Design, write, and optimize newsletters people actually want to read — 9 formats for recurring audience engagement. Use when user mentions: newsletter, email newsletter, weekly email, subscriber email, content newsletter, curated newsletter, story newsletter, email digest, newsletter format, newsletter template, recurring email, subscriber engagement, newsletter writing"
user-invocable: true
---

# Newsletter Skill

> **Trigger keywords**: newsletter, email newsletter, weekly email, subscriber email, content newsletter, curated newsletter, story newsletter, email digest, newsletter format, newsletter template, recurring email, subscriber engagement, newsletter strategy, newsletter writing, email content, audience engagement, newsletter issue

Design, write, and optimize newsletters that people actually want to read. 9 formats for recurring audience engagement — from curated roundups to data-driven insights. Content people actually read.

Newsletters are the ongoing engagement engine of the Nurture Stack:

```
Email Sequences (automation) → NEWSLETTER (ongoing relationship) → Content Atomizer (social reach)
```

**How newsletters differ from email sequences:** Sequences are automated one-time flows triggered by an action (subscribe → convert). Newsletters are recurring publications (weekly/biweekly/monthly). Sequences bridge "subscribed" to "purchased." Newsletters keep subscribers engaged long after the sequence ends.

---

## Brand Memory Protocol

Before writing any newsletter content, check for the `brand-memory/` directory.

- If `voice-profile.md` exists → apply tone, vocabulary, greeting/sign-off style to all newsletter copy
- If `positioning.md` exists → frame topics from the chosen positioning angle — this shapes your editorial perspective
- If `audience.md` exists → tailor topics, depth, and examples to the subscriber profile
- If none exist → warn the user:

> "No brand memory found. I can still write newsletters, but they'll be generic. For best results, run **Brand Voice** and **Positioning Angles** first to establish your foundation."

Proceed with defaults if the user wants to continue anyway.

---

## Three Modes

Detect mode from user intent:

> **Mode 1 — Strategy**: Design the newsletter architecture — format selection, editorial calendar, section structure, and growth plan.
>
> **Mode 2 — Write**: Draft a complete newsletter issue — subject line, preview text, intro, body, CTA, and Content Atomizer flags.
>
> **Mode 3 — Optimize**: Analyze an existing newsletter and suggest improvements — structure, subject lines, engagement, and format variety.

**Auto-detection logic:**
- "I want to start a newsletter" or "what newsletter format should I use?" → Mode 1
- "Write a newsletter about [topic]" or specifies a format → Mode 2
- "My newsletter open rates are low" or shares existing newsletter → Mode 3
- Ambiguous → start at Mode 1, then flow into Mode 2

---

## Input Gathering

Before starting, collect (or load from brand memory):

1. **Mode**: Strategy / Write / Optimize
2. **Format**: Which of the 9 formats? Or ask for a recommendation.
3. **Topic / Source content**: (Write mode) What's this issue about? Any blog posts, research, or experiences to draw from?
4. **Target subscribers**: Who reads this? Load from `audience.md` or ask.
5. **Frequency**: Weekly / biweekly / monthly
6. **Newsletter name**: (If it exists already)
7. **Past issues**: (Optimize mode) Share the newsletter text to review.
8. **Language** (Optional) — 결과물 작성 언어. Default: English.

If brand memory covers items 4-6, confirm and move on. Don't re-ask what's already documented.

---

## Mode 1: Strategy

Before writing a single issue, design the newsletter system.

### Format Selection

Choose based on the business type, available content, and goals. See `references/format-templates.md` for detailed templates.

| Format | Best For | Effort | Frequency | Core Strength |
|--------|----------|--------|-----------|---------------|
| **Curated** | Industry experts, connectors | Low | Weekly | Positioned as the go-to curator |
| **Story-Driven** | Personal brands, consultants | Medium | Weekly/biweekly | Highest reader loyalty |
| **How-To / Tutorial** | SaaS, educators, coaches | Medium-High | Biweekly | Immediate action value |
| **Case Study** | Agencies, consultants, SaaS | Medium | Biweekly/monthly | Evidence-based trust |
| **Behind-the-Scenes** | Founders, SaaS, creators | Medium | Monthly | Authenticity, differentiation |
| **Industry Analysis** | B2B, consultants, SaaS | Medium-High | Weekly | Thought leadership |
| **Q&A / Mailbag** | Community builders, educators | Low-Medium | Monthly | Two-way engagement |
| **Data / Research** | SaaS, researchers, analysts | High | Monthly/quarterly | Shareability, authority |
| **Hybrid** | Any business (most flexible) | Medium | Weekly | Variety + consistency |

### Business Type Newsletter Strategy

| Business Type | Primary Format | Secondary | Newsletter's Job | Cadence |
|--------------|---------------|-----------|-----------------|---------|
| **Info / Education** | How-To + Story | Q&A, Data | Prove expertise → sell courses/community | Weekly |
| **Consulting / Agency** | Case Study + Story | Industry Analysis | "I want to hire this person" | Biweekly |
| **E-commerce** | Curated + BTS | How-To (product use) | Balance value + promos → drive repurchase | Weekly |
| **SaaS** | How-To + Data | BTS, Industry | Product education + community building | Biweekly |

### Section Architecture

Design the recurring structure for every issue:

1. **Fixed sections** — appear every issue (builds reader expectation):
   - Personal intro / note (2-3 sentences)
   - Main content (rotates format)
   - Signature CTA

2. **Rotating sections** — vary by issue:
   - Curated picks (3-5 links)
   - Quick win / action tip
   - Reader spotlight or Q&A
   - Data nugget or stat

3. **Consistent elements** — brand identity:
   - Greeting style (from voice profile)
   - Sign-off / signature
   - Visual anchor / header

### Editorial Calendar

Build a 10-issue plan with format rotation:

**Rotation rules:**
- Never repeat the same format 3 issues in a row (reader fatigue)
- For Hybrid: rotate the main content format
- Align with monthly themes and seasonal events
- Each issue includes estimated Content Atomizer output

**Calendar format:**

```
| # | Week | Format | Topic | Source | Atomizer Assets |
|---|------|--------|-------|--------|-----------------|
| 1 | W1 | Story-Driven | [topic] | Personal experience | LinkedIn 1, Twitter 2 |
| 2 | W2 | How-To | [topic] | Blog expansion | Carousel 1, Thread 1 |
| 3 | W3 | Case Study | [topic] | Client result | LinkedIn 1, Twitter 1 |
| 4 | W4 | Curated | [topic] | Industry links | Tweet thread 1 |
| ... |
```

### Subscriber Growth Strategy

Where do new subscribers come from?

- **Lead magnet → welcome sequence → newsletter** (primary path via Email Sequences skill)
- **Blog / SEO content → inline signup** (via SEO Content skill)
- **Social media → link in bio / post CTA** (via Content Atomizer output)
- **Cross-promotion** with complementary newsletters
- **Referral program** — "Forward to a friend" CTA in every issue

---

## Mode 2: Write

Draft a complete newsletter issue, ready to send.

### Output Structure

For every newsletter issue, produce all of the following:

#### Subject Line (3 options + psychology notes)

Generate 3 options using different approaches. For each, add a brief note explaining why it works:

1. **Curiosity gap** — "I stopped doing [X]. Here's what happened."
   → Works because the reader must open to close the loop.

2. **Direct value** — "The [tool/tactic] that saved us [time/money]"
   → Works because the benefit is specific and immediate.

3. **Specificity** — "3 lessons from [experience]" / "We analyzed [number] [things]"
   → Works because concrete numbers signal real substance.

4. **Contrarian** — "Why [common belief] is wrong"
   → Works because it challenges assumptions and provokes.

5. **Timeliness** — "What [this week's event] means for you"
   → Works because urgency creates a reason to open now.

6. **Personal / conversational** — "Quick question about your [X]"
   → Works because it feels like a message from a friend.

**Rules:**
- Under 50 characters (mobile preview)
- Vary the approach across the 3 options
- Include a recommended A/B test pair
- Design preview text to complement (never repeat) the subject line

#### Preview Text
- 40-90 characters
- Adds context or intrigue that the subject line doesn't cover
- Together, subject line + preview text = one complete message

#### Intro / Hook (2-3 sentences)

The first thing readers see. Format-specific openers:

- **Curated**: This week's theme in one line
- **Story**: A specific scene or moment
- **How-To**: The reader's problem, stated directly
- **Case Study**: The result, as a number
- **BTS**: What you're about to reveal
- **Analysis**: The news or trend, stated sharply
- **Q&A**: Thank readers + tease the best question
- **Data**: The most surprising finding
- **Hybrid**: Personal note connecting to the main piece

#### Body Sections

Follow the structure from `references/format-templates.md` for the chosen format. Apply these universal principles:

- **Short paragraphs**: 2-3 sentences maximum
- **Scannable**: Bold key phrases, use subheadings
- **Mobile-first**: Most subscribers read on phones — short lines, breathing room
- **Personalization**: Use `{{first_name}}` and other tokens where natural
- **Brand voice**: Every sentence should sound like the voice profile
- **One idea per section**: Don't try to cover everything
- **AI-tell removal**: Never use "delve", "landscape", "paradigm", "tapestry", "unleash", "leverage", "synergy", "game-changing", "seamlessly", "unlock"

#### Primary CTA

One main call-to-action per issue. Format-specific CTA patterns:

| Format | CTA Pattern | Examples |
|--------|------------|---------|
| Curated | Forward / reply | "Forward to someone who needs this" |
| Story | Reply / engage | "Have a similar story? Hit reply" |
| How-To | Try it / download | "Try step 1 today — reply with results" |
| Case Study | Book / learn more | "Want similar results? Book a call" |
| BTS | Ask / reply | "What should I share next? Reply" |
| Analysis | Share / discuss | "What's your take? Reply and tell me" |
| Q&A | Submit question | "Send your question for next month" |
| Data | Download / share | "Download the full report" |
| Hybrid | Follows main format | Match to the main content block |

#### Content Atomizer Flags

Mark sections suitable for social media extraction with ⚡ flags:

- **⚡ Standalone insight or stat** → Twitter/X single tweet
- **⚡ Step-by-step process** → LinkedIn carousel, Instagram carousel
- **⚡ Contrarian claim + evidence** → LinkedIn long-form post
- **⚡ Story highlight** → Instagram story series, Twitter thread
- **⚡ Data point or finding** → Infographic source material
- **⚡ Q&A exchange** → Social media Q&A post

For each flagged section, note:
- Recommended platform(s)
- Conversion direction (long-form / carousel / thread / single post)
- Context note: must make sense without newsletter context

#### Footer
- Unsubscribe link
- Social media links
- Company info
- "Forward to a friend" prompt

### Full Issue Template

```
SUBJECT LINE OPTIONS:
A: "[option 1]" — [psychology note]
B: "[option 2]" — [psychology note]
C: "[option 3]" — [psychology note]
Recommended A/B test: A vs B

PREVIEW TEXT: "[preview text]"

---

[INTRO — 2-3 sentences, format-appropriate hook]

[BODY SECTION 1]
⚡ [flag if extractable — platform + format note]

[BODY SECTION 2]
⚡ [flag if extractable]

[BODY SECTION 3 — if applicable]

[CTA — one clear action]

[SIGN-OFF — from voice profile]

[FOOTER]
```

---

## Mode 3: Optimize

Analyze an existing newsletter against benchmarks and suggest improvements.

### Performance Benchmarks

| Metric | Good | Great | Excellent |
|--------|------|-------|-----------|
| Open Rate | 20-30% | 30-40% | 40%+ |
| Click-Through Rate | 2-4% | 4-7% | 7%+ |
| Unsubscribe Rate | <0.5% | <0.3% | <0.1% |
| Reply Rate | 1-2% | 2-5% | 5%+ |
| Forward/Share Rate | <1% | 1-3% | 3%+ |

### Format Performance Tendencies

Use to guide format selection:

- **Story-Driven**: Highest open rates, highest reply rates
- **Data / Research**: Highest share/forward rates
- **Curated**: Lowest production effort, steady open rates
- **How-To**: Highest save/bookmark rates
- **Q&A**: High reply rates, strong community signal
- **Industry Analysis**: High open rates when timely

### Diagnostic Framework

When the user shares newsletter data or past issues:

1. **Structure check**: Does it follow a clear format template? Or is it a wall of text?
2. **Subject line audit**: Are they under 50 chars? Do they vary approach? Or same formula every time?
3. **Intro strength**: Does the opening hook in 2-3 sentences? Or does it meander?
4. **CTA clarity**: One clear action? Or buried/multiple/missing?
5. **Format variety**: Are they rotating formats? Or sending the same type every issue?
6. **Benchmark comparison**: Flag any metric below the "good" range
7. **Brand voice consistency**: Does it sound like the same person every issue?

### A/B Test Suggestions

Recommend 2-3 tests:

- **Subject lines**: Curiosity vs. direct value (same body)
- **Send time**: Morning vs. evening vs. weekend
- **Length**: Short (5-min read) vs. long (15-min read)
- **Intro style**: Personal note vs. straight to content
- **CTA placement**: Mid + end vs. end only
- **Format rotation**: Test which format gets highest engagement over 8 issues

For each test: what to test, how to split, what metric decides the winner, and minimum sample size.

---

## Subject Line Formulas

Newsletter-specific formulas. Vary across issues — never repeat the same formula two issues in a row:

1. **Curiosity gap**: Creates an open loop
   → "I stopped doing [X]. Here's what happened."
   → "The email I almost didn't send"

2. **Direct value**: States what the reader gets
   → "The [tool/tactic] that saved us [specific amount]"
   → "[Specific result] in [timeframe] — here's how"

3. **Number specificity**: Concrete signals substance
   → "3 lessons from losing our biggest client"
   → "We analyzed 500 campaigns. Here's what worked."

4. **Contrarian / counterintuitive**: Challenges assumptions
   → "Why [common practice] is hurting your [metric]"
   → "Stop doing [widely accepted thing]"

5. **Timeliness**: Creates urgency to read now
   → "What [this week's news] means for your [area]"
   → "[Industry] just changed. Here's what matters."

6. **Story teaser**: Opens a narrative loop
   → "The [person] who [unexpected outcome]"
   → "Last Tuesday, everything changed"

---

## Quality Checklist

Before delivering any newsletter, self-audit every item:

- [ ] **Subject lines under 50 chars**: All 3 options checked for mobile display?
- [ ] **Format structure followed**: Does the body match the chosen format's template?
- [ ] **Intro hooks in 3 sentences or fewer**: Would you keep reading after the first 3 lines?
- [ ] **Brand voice consistent**: Does it sound like the voice profile throughout?
- [ ] **One primary CTA**: Is the desired action obvious and single?
- [ ] **Mobile-friendly**: Short paragraphs, breathing room, bold key phrases?
- [ ] **AI-tell removal**: No "delve", "landscape", "paradigm", "tapestry", "unleash", "leverage", "synergy"?
- [ ] **Content Atomizer flags present**: At least 1-2 sections marked with ⚡ for social extraction?
- [ ] **"Would I open this?"**: Subject line + preview text test — honest answer.
- [ ] **"Would I wait for the next issue?"**: Does this build an ongoing relationship, not just deliver content?

If any item fails, revise before presenting.

---

## Example: Boring Money Newsletter (Abbreviated)

**Context:**
- Business: AI marketing agency for trade businesses ($2-10M revenue)
- Subscribers: Local business owners (HVAC, plumbing, roofing, etc.)
- Positioning: "Celebrating boring businesses making real money"
- Newsletter name: Boring Money
- Format: Hybrid (Story + Case Study + Curated)
- Cadence: Weekly, Tuesdays 9 AM

### Strategy Output (Section Architecture)

**Fixed structure every issue:**
1. Personal note (2-3 sentences — Story element)
2. Main content (rotates: Case Study / How-To / Story)
3. "3 Boring Things Worth Reading" (Curated section)
4. Quick Win (one actionable tip)
5. CTA: "Reply with your biggest marketing challenge"

### Write Output (Issue #1, abbreviated)

**Subject line options:**
- A: "A Phoenix plumber fired his 4th agency" — Curiosity: who? what happened? Must open to find out.
- B: "The $0 fix that gets 35% more calls" — Value: specific, free, and quantified.
- C: "Why I only work with 'boring' businesses" — Contrarian: challenges the assumption that exciting = better.

**Recommended A/B test:** A vs B

**Preview text:** "Plus the one change you can make in 10 minutes"

**Intro:**

```
Last Tuesday, I got a call from Mike.

He runs a plumbing company in Phoenix. He'd just fired his
fourth marketing agency. "They all promise the same thing,"
he said. "None of them understand my business."

Here's what happened next.
```

**Main — Case Study (abbreviated):**
⚡ Mike's story: result first (47% more booked jobs in 60 days) → what we changed (response time + Google Business Profile) → why it worked (speed beats polish for trade businesses)
→ ⚡ LinkedIn long-form: "The $0 marketing fix most trade businesses miss"

**3 Boring Things Worth Reading:**
1. [Link] — Why plumbers are the new hot startup (with curator comment)
2. [Link] — Google's latest local search update explained
3. [Link] — The best CRM for under-$5M businesses (honest review)

**Quick Win:**
⚡ "Check your Google Business Profile right now. Is the phone number correct? Is the service area updated? 80% of the businesses I audit have at least one error. Fix it — it takes 3 minutes."
→ ⚡ Twitter single tweet

**CTA:** "What's your biggest marketing frustration? Hit reply — I read every one and it shapes what I write next."

**Sign-off:** "Keep it boring, [sender name]"

---

## Saving & Handoff

After delivering the newsletter:

**Language rule**: 섹션 헤더와 테이블 컬럼명은 영어로 유지합니다. 본문, 셀 값, 설명, 분석 텍스트는 사용자가 지정한 언어로 작성합니다. 언어가 지정되지 않으면 English로 작성합니다.

1. **Save to project folder**: `newsletter-[issue-number].md` or `newsletter-strategy.md`
2. **Update campaign tracking**: If `brand-memory/campaigns.md` exists, log the issue with date, format, subject line, and any metrics.
3. **Suggest next steps:**

> Newsletter is ready. Here's what typically comes next:
>
> 1. **Content Atomizer** — Extract the ⚡ flagged sections into social media posts (LinkedIn, Twitter, Instagram)
> 2. **SEO Content** — Turn the main newsletter content into a long-form blog post for search traffic
> 3. **Email Sequences** — If you don't have a welcome sequence feeding subscribers into this newsletter, build one
>
> Run the **Orchestrator** if you're not sure what to prioritize.
