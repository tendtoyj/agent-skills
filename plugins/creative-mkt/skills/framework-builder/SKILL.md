---
name: framework-builder
description: "Build and customize storytelling frameworks (HSO, PAS, AIDA, BAB, etc.) tailored to your brand voice. Use when user mentions: storytelling framework, content framework, narrative pattern, story structure, HSO, PAS, AIDA, BAB, brand storytelling, content template, writing framework, post structure, content formula, hook pattern, how to structure posts, define my content style, set up frameworks"
user-invocable: true
---

# Framework Builder

> **Trigger keywords**: storytelling framework, content framework, narrative pattern, story structure, HSO, PAS, AIDA, BAB, brand storytelling, content template, writing framework, post structure, content formula, hook pattern

Build a set of storytelling frameworks customized for your brand. The output becomes the structural foundation that post-writer and series-planner use to produce consistent, high-performing content.

Think of frameworks as reusable narrative blueprints. A framework like "Hook → Story → Offer" tells you *what goes where* in a piece of content, while your brand voice tells you *how it sounds*. This skill bridges the two — taking proven structures and tuning them so they feel unmistakably like your brand.

---

## Creative Memory Protocol

Before executing, check for the `creative-memory/` directory in the project root.

- If `storytelling-frameworks.md` already exists and is populated:
  - Show the user a summary of the existing frameworks
  - Ask: "Add new frameworks, refine existing ones, or start fresh?"
- If `storytelling-frameworks.md` is empty or template-only:
  - Proceed with Full Build mode
- If `creative-memory/` doesn't exist:
  - Create the directory and proceed

### Required Context

Load these files (read-only) before starting:

1. **`brand-memory/voice-profile.md`** — essential for customization. If missing, warn the user: "No brand voice profile found. I can still build frameworks, but they'll be generic until you run the brand-voice skill. Want to continue anyway?"
2. **`brand-memory/positioning.md`** — message pillars help map frameworks to brand angles. If missing, proceed without.
3. **`creative-memory/content-examples.md`** — if populated, use as source material for extracting brand-specific patterns.

---

## Two Modes

Detect mode from context:

> **Mode 1 — Full Build**: No frameworks exist yet. I'll select 3-4 proven frameworks that fit your brand, customize each one to your voice, and (if you have example content) extract any unique patterns your brand already uses naturally.
>
> **Mode 2 — Refine**: You already have frameworks. I'll add new ones, adjust existing ones based on what's been working, or extract new patterns from recent content.

**Auto-detection logic:**
- `storytelling-frameworks.md` empty or absent → Mode 1
- `storytelling-frameworks.md` populated + user says "add" or "update" → Mode 2
- User provides new content examples + existing frameworks → Mode 2
- Ambiguous → ask which mode

---

## Mode 1: Full Build

### Step 1 — Gather Context

Load creative-memory/ and brand-memory/ files per the protocol above.

If brand-memory is available, extract:
- **Tone traits** (e.g., "confident but not arrogant," "practitioner, not preacher")
- **Vocabulary style** (jargon-heavy vs. plain language)
- **Audience relationship** (mentor? peer? coach?)

Then ask the user:

**"What platforms do you primarily publish on?"** (LinkedIn, Twitter/X, Instagram, YouTube, Email, etc.)
- This determines which framework shapes work best — LinkedIn rewards longer narrative arcs, Twitter/X needs punchier structures.

**"What's your main content goal?"** (awareness, trust-building, conversion, education, community)
- Different goals favor different frameworks — conversion content needs a clear offer step, education content needs demonstration.

**"Do you have examples of posts that performed well?"** (paste or describe)
- If yes, these feed into Step 3 for pattern extraction.
- If no, that's fine — we'll build from proven universals.

**"What language should the frameworks be written in?"** (Default: English)
- This determines the language for framework descriptions, skeleton examples, and selection guide text.

### Step 2 — Select and Customize Core Frameworks

Choose 3-4 frameworks from the catalog below based on brand fit. The selection criteria:

1. **Voice compatibility** — does the framework's rhythm match the brand's tone? A bold, contrarian brand suits PAS (agitate the problem); a warm, educational brand suits EDU.
2. **Platform fit** — does the structure work on the user's primary platforms?
3. **Goal alignment** — does the framework naturally lead to the content goal?

#### Framework Catalog

**HSO — Hook → Story → Offer**
Best for: conversion, launches, email, LinkedIn longform.
Structure: Open with an attention-grabbing hook, build narrative tension through a personal or customer story, close with a clear offer or CTA.
Personality: Works across most brand voices — the "story" middle section is where brand personality shines.

**PAS — Problem → Agitate → Solution**
Best for: pain-point content, awareness, Twitter/X, Instagram singles.
Structure: Name a specific problem your audience faces, intensify it by showing what happens if unaddressed, present your approach as the resolution.
Personality: Strong fit for brands with a direct, honest voice. Weak fit for overly positive/aspirational brands (the "agitate" step requires discomfort).

**BAB — Before → After → Bridge**
Best for: transformation stories, case studies, LinkedIn, email.
Structure: Paint the "before" state (pain/frustration), show the "after" state (desired outcome), then reveal the bridge (how to get there).
Personality: Excellent for practitioner brands that can show real results. The contrast creates inherent drama without hype.

**AIDA — Attention → Interest → Desire → Action**
Best for: ads, landing pages, sales copy, product launches.
Structure: Grab attention, build interest with benefits, create desire with social proof or specifics, drive action with CTA.
Personality: More structured/sales-oriented. Works when the brand can be assertive without feeling pushy.

**EDU — Educate → Demonstrate → Utilize**
Best for: thought leadership, tutorials, LinkedIn, YouTube, newsletters.
Structure: Teach a concept or insight, show it in action with a concrete example, give the audience a way to apply it immediately.
Personality: Natural fit for expert/authority brands. The "demonstrate" step is where credibility is built.

**4Ps — Promise → Picture → Proof → Push**
Best for: evidence-based persuasion, B2B, LinkedIn, email sequences.
Structure: Make a bold promise, paint a vivid picture of the outcome, back it with proof (data, testimonial, case), push toward action.
Personality: Works for data-driven, results-oriented brands. Requires real proof — don't use if you only have vague claims.

**PASO — Problem → Amplify → Story → Offer**
Best for: long-form sales content, email sequences, launch campaigns.
Structure: Like PAS, but adds a story between the amplification and the offer. The story humanizes the solution.
Personality: Works for brands that use personal narrative heavily. The extra story step needs genuine material.

For each selected framework, customize it:

- **Rewrite each step** in the brand's voice. "Hook" for a bold brand means something different than "Hook" for a warm, educational brand.
- **Define hook patterns** specific to this brand (questions? bold claims? counter-intuitive data? personal anecdotes?)
- **Define CTA style** (soft ask? direct? community-oriented?)
- **Add tone notes** — what to lean into, what to avoid within this structure
- **Show a skeleton example** using the brand's actual voice

### Step 3 — Extract Brand-Specific Patterns (Conditional)

This step runs only if `content-examples.md` has entries OR the user provides example content.

Analyze the provided content for recurring structural patterns that don't fit neatly into any standard framework. Look for:

- **Opening patterns** — do they always start with a question? A contrarian statement? A data point?
- **Transition patterns** — how do they move from hook to body? Abruptly? With a bridge sentence?
- **Closing patterns** — CTA style, sign-off, callback to the opening?
- **Unique structural fingerprints** — a consistent 3-part rhythm, always including a "myth vs. reality" turn, etc.

If a distinctive pattern emerges:
1. **Name it** — give it a memorable label that captures the essence (e.g., "Myth-Bust" for a brand that always opens with conventional wisdom then dismantles it)
2. **Define its structure** — 3-5 steps, clearly described
3. **Explain why it works** — what about this pattern makes it effective for this specific brand and audience
4. **Write a reuse guide** — when to deploy it, what topics suit it, what to watch out for

If no clear patterns emerge, skip this — don't force it. Tell the user: "I didn't find a strong recurring pattern in the examples. As you create more content with post-writer, save the ones that perform well to content-examples.md. Once you have 5-10 examples, run framework-builder in Refine mode and I'll look for patterns again."

### Step 4 — Map Frameworks to Platforms and Purposes

Create a selection guide that post-writer can reference automatically:

| Framework | Best Platforms | Best Purposes | Brand Fit | Format Match |
|-----------|---------------|--------------|-----------|-------------|
| [name] | [platforms] | [purposes] | ★ to ★★★ | [longform/short/carousel/thread] |

For each framework, also note:
- **When to pick this over alternatives** — "Use HSO when you have a personal story to tell. Use PAS when leading with audience pain."
- **Platform adaptations** — "On Twitter/X, compress the Story step to 1-2 tweets. On LinkedIn, expand it with specific details."

### Step 5 — Save and Log

Write the complete output to `creative-memory/storytelling-frameworks.md` using the schema below.

**Language rule**: 섹션 헤더와 테이블 컬럼명은 영어로 유지합니다. 본문, 셀 값, 설명, 분석 텍스트는 사용자가 지정한 언어로 작성합니다. 언어가 지정되지 않으면 English로 작성합니다.

Add a log entry to `creative-memory/creative-log.md`:

| Date | Skill | Scope | Key Changes | Tools Used |
|------|-------|-------|-------------|------------|
| [today] | framework-builder | Full Build | [N] core frameworks + [N] brand patterns defined | None |

Confirm save:

> ✅ Storytelling frameworks saved to `creative-memory/storytelling-frameworks.md`
> Post-writer and series-planner will now reference these frameworks automatically.

---

## Mode 2: Refine

For updating existing frameworks:

1. Load current `storytelling-frameworks.md` and show summary
2. Ask what the user wants to change:
   - "Add a new framework"
   - "Adjust an existing framework" (show list)
   - "Extract patterns from new content examples"
   - "Update the selection guide"
3. Execute only the relevant step(s) from Mode 1
4. Update `storytelling-frameworks.md` — never delete existing frameworks unless user explicitly asks. Add new ones, modify changed ones, update the selection guide.
5. Log with Scope: "Refine" and describe specific changes

---

## Output Schema

The saved file follows this structure:

```markdown
# Storytelling Frameworks
> Last updated: [date]
> Source skill: framework-builder

## Core Frameworks

### [Framework Name] — [Abbreviated Structure]
- **Structure**:
  1. [Step]: [Brand-customized description of what to do at this step]
  2. [Step]: [Brand-customized description]
  3. [Step]: [Brand-customized description]
- **Hook patterns**: [2-3 specific hook types this brand should use with this framework]
- **CTA style**: [How this brand closes within this framework]
- **Best platforms**: [platforms]
- **Best purposes**: [purposes]
- **Tone notes**: [What to emphasize / what to avoid]
- **Skeleton example**:
  > [Step 1]: "[example in brand voice]"
  > [Step 2]: "[example in brand voice]"
  > [Step 3]: "[example in brand voice]"

[Repeat for each core framework]

## Brand-Specific Patterns

### [Custom Pattern Name]
- **Structure**:
  1. [Step 1]
  2. [Step 2]
  3. [Step 3]
- **Why it works**: [Analysis of effectiveness for this brand]
- **Source**: [Which content examples this was extracted from]
- **Best platforms**: [platforms]
- **Reuse guide**: [When to use, topics that suit it, pitfalls]
- **Example**: [Abbreviated real content showing the pattern]

## Framework Selection Guide

| Framework | Best Platforms | Best Purposes | Brand Fit | Format Match |
|-----------|---------------|--------------|-----------|-------------|
| [name] | [platforms] | [purposes] | ★-★★★ | [formats] |

### When to Use What
- [Situation] → [Framework] because [reason]
- [Situation] → [Framework] because [reason]
```

---

## Example (Abbreviated)

For a brand with a "practitioner, anti-hype, data-driven" voice:

```markdown
## Core Frameworks

### PAS — Problem → Agitate → Solution
- **Structure**:
  1. Problem: Name a specific frustration — not a vague pain, but something they experienced this week
  2. Agitate: Share what happens when you ignore it — use your own past mistakes, not hypothetical doom
  3. Solution: What actually worked — with numbers if possible, no vague "just do X"
- **Hook patterns**: "You're still [common mistake]", "Everyone says [conventional wisdom]. Here's why that's wrong."
- **CTA style**: Soft — "Try this next week and see what happens"
- **Best platforms**: Twitter/X, Instagram
- **Best purposes**: Awareness, community engagement
- **Tone notes**: The "agitate" step should feel empathetic (I've been there), not fear-mongering
- **Skeleton example**:
  > Problem: "You're spending 3 hours writing social posts that get 12 likes."
  > Agitate: "I did this for 6 months. 200+ hours, zero leads."
  > Solution: "Then I tried one thing: frameworks. Same time, 10x engagement. Here's the exact process..."

### BAB — Before → After → Bridge
- **Structure**:
  1. Before: The messy reality — specific, relatable, a little painful
  2. After: The result — concrete numbers or tangible change
  3. Bridge: The how — your approach, step by step
- **Hook patterns**: "6 months ago, [painful reality]", "[Metric] went from X to Y"
- **CTA style**: Evidence-based — "Here's the spreadsheet/template/process"
- ...

## Brand-Specific Patterns

### "Myth-Bust"
- **Structure**:
  1. Conventional wisdom: State what "everyone knows"
  2. Counter-evidence: Your data or experience that contradicts it
  3. Real method: What actually works instead
  4. Proof: Specific results from using the real method
- **Why it works**: This brand's audience is tired of recycled advice. Starting with "you've been told X" then proving it wrong signals credibility and original thinking.
- **Source**: Extracted from top 5 LinkedIn posts by engagement
- **Best platforms**: LinkedIn, Twitter/X threads, newsletters
- **Reuse guide**: Use when you have genuine data contradicting a common belief. Don't force it — a weak "myth" undermines the whole structure.
```

---

## Skill Chaining

After building frameworks, suggest next steps:

> Your storytelling frameworks are defined. Here's what to do next:
>
> 1. **Post Writer** — Pick a topic and I'll write a post using one of your frameworks
> 2. **Series Planner** — Design a multi-post campaign combining different frameworks
> 3. **Trend Scout** — Find current trends, then use your frameworks to turn them into content angles
>
> Run the **Creative Orchestrator** if you're not sure which to pick.
