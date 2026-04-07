---
name: brand-voice
description: "Extract, define, and document a brand's unique voice and personality. Use when user mentions: brand voice, tone of voice, voice profile, brand personality, style guide, brand tone, voice guide, brand style, define voice, extract voice, brand identity, voice review, voice check, brand review, on-brand, off-brand, does this sound like us, brand guidelines, messaging tone"
user-invocable: true
---

# Brand Voice Skill

> **Trigger keywords**: brand voice, tone of voice, voice profile, brand personality, style guide, brand tone, voice guide, brand style, define voice, extract voice, brand identity, voice review, voice check, brand review, on-brand, off-brand, does this sound like us

Extract, define, and document your brand's unique voice. The output becomes the foundation that every other marketing skill references — from Direct Response Copy to SEO Content to Email Sequences.

---

## Brand Memory Protocol

Before executing, check for the `brand-memory/` directory in the project root.

- If `voice-profile.md` already exists and is populated:
  - Show the user a summary of the existing profile
  - Ask: "Update the existing voice profile, or start fresh?"
- If `voice-profile.md` is empty or template-only:
  - Proceed normally — this skill will create it
- If `brand-memory/` doesn't exist:
  - Create the directory and proceed

---

## Three Modes

Detect mode from user intent:

> **Mode 1 — Content Analysis**: You already have content (blog posts, newsletters, social posts, website copy, emails). I'll analyze it and extract your brand voice.
>
> **Mode 2 — Guided Questionnaire**: You're starting from scratch or don't have existing content. I'll walk you through questions to define your brand voice.
>
> **Mode 3 — Voice Review**: You have a voice profile and want to check if a piece of content matches it. I'll audit the content and flag what's on-brand and off-brand.

**Auto-detection logic:**
- User provides content + no voice profile exists → Mode 1
- User says "I don't have content yet" → Mode 2
- User provides content + voice profile already exists + asks "does this match?" or "review this" → Mode 3
- Ambiguous → ask which mode

---

## Mode 1: Content Analysis

### Step 1 — Collect Samples

Ask the user for 2-5 content samples. These can be:
- Blog posts or articles
- Newsletter editions
- Social media posts (multiple from same brand)
- Website copy (homepage, about page, product pages)
- Email campaigns
- Video/podcast transcripts

**Prompt**: "Share 2-5 pieces of your best content — the ones that feel most 'you.' These can be blog posts, emails, social posts, website copy, or anything you've written. Paste the text or share files."

### Step 2 — Analyze Patterns

Systematically analyze the samples across these dimensions:

**Tone & Emotion**
- Overall emotional register (warm? authoritative? playful? serious?)
- How does the brand handle complexity? (simplify? embrace jargon?)
- What's the relationship to the reader? (mentor? peer? coach? friend?)

**Word Choice**
- Recurring words/phrases (these are signature vocabulary)
- Words conspicuously absent (these are intentional avoidances)
- Jargon level (technical terms used freely? always explained? avoided?)
- Sentence length patterns (short and punchy? long and flowing? mixed?)

**Structural Patterns**
- How do they open pieces? (question? bold claim? story? data?)
- How do they close? (CTA? reflection? challenge? summary?)
- Paragraph length and rhythm
- Use of lists, subheadings, formatting

**Personality Signals**
- Humor presence and type (self-deprecating? witty? sarcastic? none?)
- Use of first person (I/we) vs. second person (you)
- Level of vulnerability/personal disclosure
- Pop culture or reference style

### Step 3 — Generate Draft Profile

Based on the analysis, generate the Voice Profile (see Output Format below). Present it to the user for review.

### Step 4 — Refine

Ask: "Does this capture your brand? What feels off, and what's missing?"

Iterate until the user confirms the profile is accurate.

---

## Mode 2: Guided Questionnaire

Walk the user through these questions one at a time (not all at once). After each answer, acknowledge and build on it before asking the next.

### Question 1 — Brand Personality
"If your brand were a person at a dinner party, how would others describe them? (e.g., the smart friend who explains things simply, the bold challenger who questions everything, the calm expert everyone trusts)"

### Question 2 — Core Traits
"Pick 3-5 adjectives that define your brand's personality. Then for each one, tell me what it does NOT mean."

Example to share:
- "Confident" — but not arrogant
- "Casual" — but not sloppy
- "Direct" — but not cold

### Question 3 — Vocabulary Boundaries
"What words or phrases should your brand NEVER use? Think about competitor language, industry clichés, or tones that feel wrong."

Examples to offer: "revolutionary," "game-changing," "leverage," "synergy," "crushing it"

### Question 4 — Audience Relationship
"Who are you writing for, and how do you want them to feel after reading your content?"

Probe for:
- Primary audience (who they are, what they know)
- Desired emotional response (inspired? equipped? understood? challenged?)
- Expertise level assumption (beginner? intermediate? expert?)

### Question 5 — Anti-Examples
"Name 1-2 brands whose voice you specifically DON'T want to sound like. What about their tone feels wrong for you?"

### Question 6 — Aspirational Examples
"Name 1-2 brands (or people) whose communication style you admire. What specifically do you like about how they communicate?"

### Question 7 — Content Context
"What channels do you primarily publish on? (blog, email, LinkedIn, Twitter/X, Instagram, YouTube, podcast, etc.)"

### Question 8 — Language & Terminology Preferences
"Any specific language rules? For example: do you use Oxford commas? Contractions? Are there industry terms your audience knows well, or jargon you want to avoid? Any inclusive language preferences?"

This question is optional — skip if the user seems fatigued, and infer defaults instead.

### Question 9 — Output Language
"What language should the voice profile be written in? (e.g., English, Korean, 한국어, etc.) Default: English."

After collecting all answers, generate the Voice Profile.

---

## Output Format: Voice Profile

Generate the following sections. This becomes the `brand-memory/voice-profile.md` file.

### 1. Voice Summary
1-2 sentences capturing the essence of the brand voice. This is the "elevator pitch" for how the brand sounds.

Format:
```
Sounds like [vivid description of the brand persona] who [key behavior/attitude].
```

Example:
```
Sounds like a smart friend who's figured out what actually works
and shares it without the hype or jargon.
```

### 2. Core Personality Traits

3-5 traits, each with the "We are / We are not" framework:

```
**[Trait Name]**
- We are: [what this means in practice]
- We are not: [common misinterpretation to avoid]
- This sounds like: "[example sentence]"
- This does NOT sound like: "[counter-example sentence]"
```

### 3. Tone Spectrums

Position the brand on 6 spectrums using a 1-5 scale. Use a visual indicator.

```
Formal    [1]——[2]——[●3]——[4]——[5]  Casual
Serious   [1]——[2]——[3]——[●4]——[5]  Playful
Authority [●1]——[2]——[3]——[4]——[5]  Peer-level
Technical [1]——[2]——[3]——[●4]——[5]  Simple
Reserved  [1]——[2]——[3]——[4]——[●5]  Enthusiastic
Bold      [1]——[●2]——[3]——[4]——[5]  Subtle
```

### 4. Vocabulary Guide

Two clear lists:

**USE** — Words and phrases that embody the brand:
- List 10-15 words/phrases with brief notes on when/why to use them

**AVOID** — Words and phrases that feel off-brand:
- List 10-15 words/phrases with brief notes on why they're off-limits

### 5. Tone Adaptation Rules

How the voice adjusts across channels and situations while staying on-brand.

**By Channel:**

| Channel | Tone Shift | Example |
|---------|-----------|---------|
| Blog | [adjustment] | "[sample sentence]" |
| Email | [adjustment] | "[sample sentence]" |
| LinkedIn | [adjustment] | "[sample sentence]" |
| Twitter/X | [adjustment] | "[sample sentence]" |
| Sales/Landing Pages | [adjustment] | "[sample sentence]" |
| Support/Docs | [adjustment] | "[sample sentence]" |

Only include channels the user actually uses (from Question 7 or inferred from content).

**By Situation:**

| Situation | Tone Shift |
|-----------|-----------|
| Product launch | [how voice adapts] |
| Incident/bad news | [how voice adapts] |
| Customer success story | [how voice adapts] |
| Thought leadership | [how voice adapts] |
| Onboarding | [how voice adapts] |

Rule: Voice attributes stay fixed. Tone dials them up or down based on context.

Implementation guide — if a brand scores "bold (2)" and "warm (4)" on the spectrums:
- **Product launch**: Push bold from 2→4 (more assertive), keep warm at 4
- **Incident/bad news**: Pull bold back to 1 (measured), push warm to 5 (empathetic)
- **Thought leadership**: Push bold to 3 (confident claims), keep warm at 3 (balanced)

Neither attribute ever disappears. The balance shifts.

### 6. Style Rules

Key grammar and formatting decisions. Keep this concise (5-8 rules). Point to `references/style-guide-checklist.md` for the full list.

Example:
```
- Oxford comma: Yes
- Contractions: Use freely (we're, you'll, it's)
- Headings: Sentence case
- Numbers: Spell out 1-9, numerals for 10+
- Exclamation marks: Max 1 per piece, never in headlines
- Emoji: LinkedIn/social only, max 2 per post
```

### 7. Do's and Don'ts

Concrete content creation guidelines:

**Do:**
- [specific actionable guideline]
- [specific actionable guideline]
- [specific actionable guideline]

**Don't:**
- [specific thing to avoid]
- [specific thing to avoid]
- [specific thing to avoid]

Aim for 5-8 items per list, drawn directly from the analysis or questionnaire answers.

---

## Saving to Brand Memory

After the user approves the voice profile:

**Language rule**: 섹션 헤더와 테이블 컬럼명은 영어로 유지합니다. 본문, 셀 값, 설명, 분석 텍스트는 사용자가 지정한 언어로 작성합니다. 언어가 지정되지 않으면 English로 작성합니다.

1. Write the complete profile to `brand-memory/voice-profile.md`
2. If `brand-memory/audience.md` is empty and audience information was gathered, offer to populate it too
3. Confirm save with:

> ✅ Voice profile saved to `brand-memory/voice-profile.md`
> All marketing skills will now reference this profile automatically.

If a voice profile already exists:
- Show a diff summary (what changed)
- Ask for confirmation before overwriting

---

## Example Output (Abbreviated)

Below is a condensed example to illustrate the expected quality and format.

```markdown
# Brand Voice Profile

> Auto-loaded by all Vibe Marketing skills.

## Voice Summary
Sounds like a smart friend who's figured out what actually works
and is sharing it without the hype — grounded, practical, and
quietly confident.

## Core Personality Traits

**Confidently Boring**
- We are: Proud of fundamentals. Lean into the unsexy stuff that compounds.
- We are not: Dull or lifeless. "Boring" is a badge, not an apology.
- This sounds like: "The boring stuff is what actually builds businesses."
- This does NOT sound like: "Here's another groundbreaking hack to 10x your growth!"

**Practitioner, Not Preacher**
- We are: Speaking from doing. Every piece of advice comes from real execution.
- We are not: Theoretical or credential-driven. No "according to studies" without skin in the game.
- This sounds like: "We tested this on 3 client sites last month. Here's what happened."
- This does NOT sound like: "Research suggests that best practices indicate..."

**Accessible Expert**
- We are: Deep expertise delivered like helping a smart friend.
- We are not: Dumbed-down or condescending. Respect the reader's intelligence.
- This sounds like: "Here's how this works and why it matters for your revenue."
- This does NOT sound like: "Allow me to elucidate the intricacies of this methodology."

## Tone Spectrums

Formal    [1]——[2]——[3]——[●4]——[5]  Casual
Serious   [1]——[2]——[●3]——[4]——[5]  Playful
Authority [1]——[●2]——[3]——[4]——[5]  Peer-level
Technical [1]——[2]——[3]——[●4]——[5]  Simple
Reserved  [1]——[2]——[3]——[●4]——[5]  Enthusiastic
Bold      [1]——[●2]——[3]——[4]——[5]  Subtle

## Vocabulary Guide

### USE
- "boring" — our brand identity, wear it proudly
- "compound" / "compounds" — our core philosophy
- "actually works" — cuts through hype
- specific numbers — "47% increase" not "significant growth"
- "test," "measure," "iterate" — practitioner language

### AVOID
- "revolutionary" / "game-changing" — hype words
- "crushing it" / "killing it" — bro-marketing tone
- "leverage" / "synergy" — corporate speak
- "easy" / "simple" — dismisses the work involved
- "guru" / "ninja" / "rockstar" — cringe titles

## Tone Adaptation Rules

### By Channel
| Channel | Tone Shift | Example |
|---------|-----------|---------|
| Blog | More conversational, teaching mode | "Let's break down why this actually matters for your pipeline." |
| Email | Warmer, more personal | "I tested this last week — thought you'd want to see the results." |
| LinkedIn | Slightly more polished, thought-leader | "3 things we learned from 50 campaigns this quarter." |
| Twitter/X | Punchier, more contrarian edge | "Your landing page has 3 seconds. Stop wasting them." |

### By Situation
| Situation | Tone Shift |
|-----------|-----------|
| Product launch | Dial up confidence; stay grounded (no hype) |
| Bad news | Dial up warmth and directness; be transparent |
| Case study | Let results speak; celebrate the client not ourselves |
| Thought leadership | Dial up contrarian edge; back it with evidence |

## Style Rules
- Oxford comma: Yes
- Contractions: Use freely
- Headings: Sentence case
- Numbers: Spell out 1-9, numerals for 10+
- Exclamation marks: Max 1 per piece, never in headlines

## Do's and Don'ts

**Do:**
- Lead with practical, actionable advice
- Use specific numbers over vague claims
- Write like you're explaining to a smart friend
- Show your work (share real examples, real results)
- Challenge conventional wisdom with evidence

**Don't:**
- Use hype language or empty superlatives
- Talk about theory without execution proof
- Condescend or over-simplify
- Chase trends just because they're trending
- Use corporate buzzwords or filler phrases
```

---

## Mode 3: Voice Review

Use this mode when a voice profile already exists and the user wants to check content against it.

### Step 1 — Load Voice Profile

Load `brand-memory/voice-profile.md`. If it doesn't exist or is empty, tell the user:

> "No voice profile found. Run Mode 1 or Mode 2 first to create one, then I can review content against it."

### Step 2 — Receive Content

Ask: "Paste the content you want me to review, or share the file."

Accept any format: draft blog post, email, social post, landing page copy, ad copy, etc.

### Step 3 — Audit Against Profile

Score the content across these 5 dimensions. For each, give a rating (On-brand / Mostly on-brand / Off-brand) with specific evidence.

**1. Personality Alignment**
- Does the content reflect the Core Personality Traits?
- Quote specific lines that match or clash

**2. Tone Spectrum Check**
- Does the tone land in the right zone on each spectrum?
- Flag if content is too formal/casual, too technical/simple, etc. relative to the profile

**3. Vocabulary Compliance**
- Any USE words present? (good)
- Any AVOID words present? (flag them)
- Suggest replacements for off-brand words

**4. Channel Fit**
- Is the tone adapted correctly for the target channel?
- Reference the Tone Adaptation Rules

**5. Style Rules**
- Check against the Style Rules (oxford comma, contractions, headings, etc.)
- Flag violations

### Step 4 — Deliver Report

Format:

```
## Voice Review Report

**Overall**: [On-brand / Mostly on-brand / Needs work]

### What's working
- [specific strengths with quotes]

### What needs adjustment
- [specific issues with quotes + suggested rewrites]

### Vocabulary flags
| Found (off-brand) | Suggested replacement |
|---|---|
| "[word]" | "[alternative]" |
```

### Step 5 — Offer Rewrite

After the report, ask:

> "Want me to rewrite the flagged sections to match your brand voice?"

If yes, rewrite only the off-brand sections, preserving the rest. Show before/after for each change.

---

## Advanced: Style Guide Reference

For teams that need detailed editorial standards beyond the core voice profile, a comprehensive checklist is available:

→ `skills/brand-voice/references/style-guide-checklist.md`

This covers: grammar & mechanics (10 rule categories), formatting conventions, punctuation policies, terminology standards, inclusive language guide, and channel-specific style notes.

**When to offer this**: Always offer after saving the voice profile, especially if the user mentioned team collaboration, content at scale, or multiple writers.

> "Your voice profile is saved. Want me to also generate a detailed style guide? This is especially useful if multiple people create content for your brand — it covers grammar rules, formatting, inclusive language, and terminology standards."

---

## Skill Chaining

After creating the voice profile, suggest next steps:

> Your brand voice is defined. Here's what to do next:
>
> 1. **Positioning Angles** (03) — Find your differentiation angles using 8 frameworks
> 2. **Direct Response Copy** (06) — Write landing page copy in your new voice
> 3. **Content Atomizer** (10) — Transform existing content to match this voice
>
> Run the **Orchestrator** (01) if you're not sure which skill to use next.
