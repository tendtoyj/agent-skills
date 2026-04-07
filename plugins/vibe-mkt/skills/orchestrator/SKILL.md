---
name: orchestrator
description: "Marketing strategy router and diagnostic tool. Diagnoses where you are, identifies gaps, and routes to the right skill sequence. Use when user mentions: what should I do next, where do I start, what's missing, marketing strategy, skill routing, start here, orchestrate, diagnose, plan my marketing, what skills do I need, marketing system, help me decide, marketing roadmap, I don't know what to do"
user-invocable: true
---

# Strategy Orchestrator

> **Trigger keywords**: what should I do next, where do I start, what's missing, marketing strategy, skill routing, start here, orchestrate, diagnose, I don't know what to do, plan my marketing, what skills do I need, marketing system, help me decide, marketing roadmap

Your marketing GPS. Diagnoses where you are, identifies what's missing, guides research, and routes you to the right skill sequence — so you never face a blank page.

This skill does NOT generate marketing content. It diagnoses, recommends, and routes.

---

## Brand Memory Protocol — Gap Detection Mode

Unlike other skills that simply load brand memory, the Orchestrator **audits** it. This is the core diagnostic engine.

### Step 1 — Scan Brand Memory

Check for the `brand-memory/` directory in the project root. For each file, assess whether it exists AND has real content (not just template placeholders):

```
brand-memory/
├── voice-profile.md   → Brand Voice defined?
├── positioning.md     → Positioning angles defined?
├── audience.md        → Target audience documented?
├── campaigns.md       → Campaign history recorded?
└── learnings.md       → Past learnings captured?
```

### Step 2 — Scan Project Assets

Look beyond brand-memory for existing marketing materials in the project folder:

- Landing page files (HTML, copy docs)
- Email sequence drafts
- Lead magnet materials
- SEO content / blog posts
- Newsletter editions
- Social media content
- Keyword research data
- Competitor research notes

### Step 3 — Generate Status Report

Output the diagnostic in this exact format:

```
## Current Status

### What You Have
- ✅ Brand Voice — voice-profile.md (summary: "[1-line summary]")
- ✅ Positioning — positioning.md (top angle: "[angle name]")
- ✅ Landing Page — [filename] found

### What You're Missing
- ❌ Lead Magnet — No opt-in offer found. Without one, you lose visitors forever.
- ❌ Email Sequences — No automated follow-up after lead capture.
- ❌ Traffic Strategy — No keyword research or SEO content found.
- ❌ Content Distribution — No atomized social content found.
```

Always include a brief note on WHY each missing piece matters. Make the gaps feel urgent but actionable.

---

## Diagnostic Questions

Use these when insufficient context exists to make a recommendation. Ask only what you need — skip questions you can answer from the project scan.

### Question 1 — Business Context

If no brand-memory files exist and no project context is clear:

"Tell me about your business in one or two sentences:
- What do you do?
- Who do you serve?
- What makes you different?

Example: 'We're an AI marketing agency targeting local service businesses doing $2-10M in revenue. We ship faster and cheaper than traditional agencies.'"

### Question 2 — Marketing Goal

"What's your most pressing marketing need right now?

- **Build my brand foundation** — I need to define my voice and positioning
- **Get leads and customers** — I need a way to capture and convert visitors
- **Create content** — I need blog posts, newsletters, or social content
- **Drive traffic** — I need people to find me through search and social
- **Activate my email list** — I have subscribers but no system to nurture them
- **Build everything from scratch** — I need the full marketing system
- **I'm not sure** — Help me figure out what's most important"

### Question 3 — Existing Assets (if needed)

Only ask this if Questions 1-2 didn't reveal enough and the project scan came up empty:

"What marketing materials do you already have? (website, landing page, email list, blog posts, social accounts, etc.)"

---

## Research Layer

**The most important step most people skip.** Before executing any skill, guide the user through research. Research quality determines everything downstream.

> "30-60 minutes of boring research = exceptional output for everything that follows."

### When to Trigger Research

- **Always** before Foundation Stack and Conversion Stack
- **Recommended** before Traffic Stack
- **Optional** before Nurture Stack (if audience is already well-defined)

### Research Template A — Market & Competitor Research

**Use before**: Foundation Stack, full system builds, entering a new market

**Tools**: Perplexity MCP (deep research), web search (quick lookups), or manual research

```
Research the following for [BUSINESS/MARKET]:

1. Market landscape
   - Who are the main players?
   - What are they saying and how are they positioned?
   - What's the market size and growth trajectory?

2. Competitor analysis
   - Top 3-5 direct competitors
   - Their messaging, pricing, and positioning
   - Gaps in their offerings or communication

3. Customer language
   - What words does the target audience use to describe their problems?
   - What do they search for?
   - What questions do they ask in forums, communities, or reviews?

4. Positioning opportunities
   - Where do competitors cluster? Where are the gaps?
   - What's underserved in this market?
   - What angles are no one taking?

Save findings as .md files in your project folder.
```

### Research Template B — Competitor Website Analysis

**Use before**: Conversion Stack, landing page creation, design work

**Tools**: Playwright MCP (screenshots/browsing), Firecrawl (bulk scraping), or manual browsing

```
Analyze competitor websites for [BUSINESS/MARKET]:

1. Messaging & copy
   - Headlines, value propositions, CTAs
   - How they describe their solution
   - Objection handling and social proof placement

2. Design patterns
   - Page structure and layout
   - Visual style and brand feel
   - Mobile experience

3. Conversion elements
   - Lead capture methods (forms, popups, lead magnets)
   - Pricing presentation
   - Trust signals (testimonials, logos, guarantees)

Save screenshots and analysis notes to your project folder.
```

### Research Template C — Content & Keyword Research

**Use before**: Traffic Stack, content planning, SEO work

**Tools**: Perplexity MCP (trends/gap analysis), Firecrawl (competitor content scraping), or manual research

```
Research content opportunities for [BUSINESS/MARKET]:

1. Keyword landscape
   - What terms does the target audience search?
   - Which keywords have low competition but decent volume?
   - What questions appear in "People Also Ask"?

2. Competitor content
   - What topics do competitors cover well?
   - Where are the content gaps?
   - What formats perform best? (blog, video, tools, etc.)

3. Top-performing content
   - What existing content in this niche gets the most engagement?
   - What angles or hooks drive shares?

Organize results for input into the Keyword Research skill.
```

### Skip Research Option

If the user says they've already done research, or provides research files:

"Great — I see you've got research covered. Let's jump straight to skill execution."

Load any existing research files for context and proceed to the recommended skill sequence.

---

## The 5-Stage Build Sequence

Every marketing system follows this progression. Skip a stage and everything downstream suffers.

```
01 RESEARCH    → Deep context. Market, competitors, customer language. (30-60 min)
02 FOUNDATION  → Voice + positioning. Who you are, how you're different.
03 STRUCTURE   → Keywords + content pillars. What to create, what to target.
04 ASSETS      → Landing pages, emails, lead magnets, content. Methodology-driven.
05 ITERATION   → Expert review, rejection cycles, quality gates. First drafts are starting points.
```

The routes below map specific goals to this sequence — some start at Stage 1, others skip to where you left off.

---

## Skill Routing Logic

Based on the user's goal and current status, recommend one of these sequences. Each sequence includes the research phase, skill chain, and checkpoint opportunities.

### Route 1: Build Brand Foundation / Prepare to Launch

**Trigger**: User needs brand identity, starting from scratch, preparing to launch

```
Step 1: RESEARCH
  → Template A (Market & Competitor Research)
  → Template B (Competitor Website Analysis)

Step 2: FOUNDATION
  → brand-voice          Create voice profile → saves to brand-memory/
  → positioning-angles   Find differentiation → saves to brand-memory/

  ⟐ CHECKPOINT — Review voice + angles before writing copy

Step 3: ASSETS
  → direct-response-copy  Write landing page copy using voice + positioning
  → lead-magnet           Design opt-in offer to capture visitors
  → email-sequences       Build welcome sequence for new leads

Step 4: ITERATION
  → Expert Review (optional) — spin up task-based agents to critique
```

### Route 2: Get Leads and Customers

**Trigger**: User has brand foundation but needs conversion mechanism

**Prerequisite**: Brand Voice and Positioning should exist. If not, suggest Route 1 first.

```
Step 1: RESEARCH
  → Template B (Competitor Website Analysis — focus on conversion elements)

Step 2: CONVERSION
  → lead-magnet           Design and build an opt-in offer
  → direct-response-copy  Write landing page copy for the offer

  ⟐ CHECKPOINT — Review offer + copy before building email flows

Step 3: NURTURE
  → email-sequences       Welcome sequence + conversion sequence
  → content-atomizer      Distribute offer across social channels
```

### Route 3: Create Content

**Trigger**: User needs content — blog posts, newsletters, social media, etc.

```
Step 1: RESEARCH
  → Template C (Content & Keyword Research)

Step 2: STRATEGY
  → keyword-research      Find priority topics using 6 Circles Method
                              Organize into content pillars

Step 3: EXECUTION
  → seo-content           Write search-optimized articles
  → content-atomizer      Transform each piece into 15+ social assets
  → newsletter            Establish recurring content channel

  ⟐ CHECKPOINT — Review first batch before scaling production
```

### Route 4: Drive Traffic

**Trigger**: User has assets but needs visitors

```
Step 1: RESEARCH
  → Template C (Content & Keyword Research — focus on SEO gaps)
  → Template B (Competitor ad/landing page analysis)

Step 2: ORGANIC TRAFFIC
  → keyword-research      Identify quick wins + strategic keywords
  → seo-content           Create ranking content
  → Programmatic SEO patterns (e.g., "[service] in [city]" pages)

Step 3: DISTRIBUTION
  → content-atomizer      1 piece → 15+ platform-specific assets

  ⟐ CHECKPOINT — Monitor initial results before scaling
```

### Route 5: Activate Email List

**Trigger**: User has subscribers but no nurture system

```
Step 1: RESEARCH
  → Competitor email strategy analysis (sign up for their lists)
  → Newsletter benchmarks in the niche

Step 2: SEQUENCES
  → email-sequences       Build welcome, nurture, and conversion flows

Step 3: ENGAGEMENT
  → newsletter            Choose format, create template, plan calendar
  → content-atomizer      Bridge email content to social channels
```

### Route 6: Full System Build

**Trigger**: User wants everything, starting from zero

```
PHASE 1 — RESEARCH (invest 30-60 min) → Template A + B + C
PHASE 2 — FOUNDATION → brand-voice → positioning-angles ⟐ CHECKPOINT
PHASE 3 — CONVERSION → direct-response-copy → lead-magnet → email-sequences ⟐ CHECKPOINT
PHASE 4 — TRAFFIC → keyword-research → seo-content → content-atomizer ⟐ CHECKPOINT
PHASE 5 — ENGAGEMENT → newsletter → Final review + iteration
```

---

## Business Type Guide

Different business types need different stack priorities. After identifying the business type, emphasize the recommended sequence.

### Info / Education
*Courses, coaching, communities, digital products*

**Unique challenges**: Selling transformation (not tangible product), building authority before the ask, the "guru skepticism" problem, competing with free content, high-ticket requires high trust.

**Primary**: Foundation → Conversion
**Secondary**: Traffic → Nurture
**Key positioning directions**: Anti-Guru ("Not another marketing bro promising 10x"), Methodology Transfer ("What took me 5 years, packaged for you")

### Consulting / Agency

**Primary**: Foundation → Traffic
**Secondary**: Nurture → Conversion
**Focus**: Prove expertise through content, case studies, SEO-driven inbound pipeline. Build thought leadership with newsletter.

### E-commerce

**Primary**: Conversion → Traffic
**Secondary**: Nurture (email focus)
**Focus**: Product photos/video, programmatic SEO (product + location pages), DTC ad strategy, post-purchase email sequences.

### SaaS

**Primary**: Conversion → Nurture
**Secondary**: Traffic (SEO)
**Focus**: Free trial funnel, onboarding email sequences, keyword-driven content marketing, feature comparison pages.

---

## Expert Review Checkpoint

At each ⟐ CHECKPOINT in the routes above, offer the user a quality gate.

### When to Checkpoint

- After copy — before design
- After strategy — before execution
- After design — before launch
- Before any high-stakes decision

### How to Run an Expert Review

"Want a quality check before moving on? I can spin up task-based agents to review from different expert perspectives."

Prompt template:
```
Spin up task-based agents to review this:
1. [Industry] Growth Expert  2. Conversion Expert
3. Brand Voice Expert  4. SEO Specialist  5. [Custom]
Each analyzes independently. Synthesize: Where do they agree? What needs work?
```

Checkpoints are recommended, not required — the user can always skip.

---

## Output Format

Every Orchestrator response follows this structure:

> **Language**: 사용자가 언어를 지정하면 대시보드 및 안내 텍스트를 해당 언어로 출력합니다. 개별 스킬 호출 시 동일한 언어 설정을 전달합니다.

```
## Current Status
[Gap detection results — what you have / what you're missing]

## Recommended Next Steps
Business type: [type] | Goal: [goal]

### Step 1: [Research or first skill]
[Specific instructions or research template]
[Prompt to invoke the skill]

### Step 2: [Next skill]
[Why this comes next]
[Prompt to invoke the skill]

### Step 3: [Next skill]
...

## Full Roadmap
[Visual representation of the complete recommended sequence,
 with ✅ for completed steps and → for current/next step]

Foundation:  ✅ Brand Voice → ✅ Positioning → ...
Conversion:  → Direct Response Copy → Lead Magnet → Email Sequences
Traffic:     ○ Keyword Research → ○ SEO Content → ○ Content Atomizer
Engagement:  ○ Newsletter
```

### Skill Invocation Prompts

For each recommended skill, provide a ready-to-use prompt the user can copy:

```
"Use the [skill name] skill.
Context: [brief business context]
Goal: [specific output expected]
Brand voice: Reference brand-memory/voice-profile.md
[Any additional context or inputs needed]"
```

---

## Example

**User input**: "I'm building an AI marketing agency targeting boring local businesses doing $2-10M. I've got a landing page with positioning and brand voice done. What should I do next?"

**Orchestrator output**:

```
## Current Status

### What You Have
- ✅ Brand Voice — voice-profile.md found
- ✅ Positioning — positioning.md found
- ✅ Landing Page — detected in project

### What You're Missing
- ❌ Lead Magnet — Without one, visitors leave forever.
- ❌ Email Sequences — Leads go cold without automated follow-up.
- ❌ Traffic Strategy — No system to drive people to the landing page.

## Recommended Next Steps
Business type: Consulting/Agency | Goal: Lead capture + traffic

### Step 1: Build a Lead Magnet
> "Use the Lead Magnet skill. My agency helps boring local businesses
> ($2-10M) with AI-powered marketing. We ship in days, not months.
> Generate concepts, score each, and build the best one."

### Step 2: Write Email Sequences
> "Use the Email Sequences skill. Trigger: [lead magnet] download.
> Goal: Build trust, then book a call. Brand voice: Reference
> voice-profile.md. Write 7-email welcome sequence:
> DELIVER → CONNECT → VALUE → VALUE → BRIDGE → SOFT → DIRECT"

### Step 3: Drive Traffic
> "Use the Keyword Research skill. Find programmatic SEO opportunities
> for '[service] marketing in [city]' patterns. Quick wins for 60-90 days."

## Full Roadmap
Foundation:  ✅ Brand Voice → ✅ Positioning
Conversion:  ✅ Landing Page → Lead Magnet → Email Sequences
Traffic:     → Keyword Research → SEO Content → Content Atomizer
Engagement:  ○ Newsletter
```

---

## Returning Users & Skill Chaining

When the user invokes the Orchestrator again, always start with a fresh scan of brand-memory/ and the project folder. Show what's changed, celebrate progress ("Nice — you've built [X] since last time"), and recommend the next step.

The Orchestrator remembers context through files, not conversation history. It's the home base you return to between skills — just say "What should I do next?" to re-run the full diagnosis.
