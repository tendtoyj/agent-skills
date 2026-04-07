---
name: lead-magnet
description: "Design, validate, and build opt-in offers people actually want. Use when user mentions: lead magnet, opt-in, freebie, free offer, gated content, email capture, lead gen offer, content upgrade, free tool, free guide, checklist, calculator, audit, assessment, quiz, lead capture, free download, email list building"
user-invocable: true
---

# Lead Magnet Skill

> **Trigger keywords**: lead magnet, opt-in, freebie, free offer, gated content, email capture, lead gen offer, content upgrade, free tool, free guide, checklist, calculator, audit, assessment, quiz, opt-in offer, lead capture, email list, giveaway, downloadable, resource, free download

Design, validate, and **build** opt-in offers people actually want. This skill doesn't just brainstorm ideas — it scores them, picks the winner, and generates the actual deliverable (interactive HTML tools, markdown guides, checklists) ready to deploy.

Lead magnets are the bridge between "browsing" and "buying." They sit at the intersection of the Conversion Stack and the Nurture Stack:

```
Direct Response Copy → Frontend Design → LEAD MAGNET → Email Sequences → Nurture
```

---

## Brand Memory Protocol

Before executing, check for the `brand-memory/` directory.

- If `voice-profile.md` exists → apply tone, vocabulary, personality to all lead magnet copy
- If `positioning.md` exists → ensure the lead magnet reinforces your chosen angle
- If `audience.md` exists → tailor the hook, pain points, and value proposition to the target
- If none exist → warn the user:

> "No brand memory found. I can still create a lead magnet, but it'll be generic. For best results, run **Brand Voice** and **Positioning Angles** first."

Proceed with defaults if the user wants to continue anyway.

---

## Three Modes

This skill operates in three sequential stages. Users can start at any stage or run the full flow:

> **Mode 1 — Ideate**: Generate 3-5 lead magnet concepts of different types. Auto-score and recommend the best one.
>
> **Mode 2 — Validate**: Deep-dive validation of a chosen concept. Detailed scoring, competitive differentiation, and full outline.
>
> **Mode 3 — Build**: Create the actual deliverable — HTML tool, markdown guide, checklist — plus landing page opt-in copy and email sequence trigger.

**Auto-detection logic:**
- "I need a lead magnet" or "create an opt-in" → Mode 1 (full flow)
- "I have this idea for a lead magnet, is it any good?" → Mode 2
- "Build this lead magnet" or provides a detailed concept → Mode 3
- Ambiguous → start at Mode 1

---

## Input Gathering

Before starting, collect (or load from brand memory):

1. **What's your business?** — What you sell, what industry, what makes you different. Load from `positioning.md` if available.
2. **Who's the target audience?** — Specific person. Load from `audience.md` or ask.
3. **What's the paid offer?** — The product/service this lead magnet bridges to. What do you ultimately want them to buy?
4. **Existing content?** — Blog posts, frameworks, data, expertise that could become a lead magnet. "What do you already know that your audience needs?"
5. **Language** (Optional) — 결과물 작성 언어. Default: English.

If brand memory covers items 1-2, confirm and move on. Don't re-ask what's already documented.

---

## Mode 1: Ideate

Generate **3-5 lead magnet concepts**, each a different type. Variety is essential — never propose two concepts of the same type.

### Lead Magnet Type Catalog

When generating concepts, draw from these types. Match type to business context:

| Type | What It Is | Best When | Build Format |
|------|-----------|-----------|-------------|
| **Calculator / Interactive Tool** | User inputs data, gets personalized output | You can quantify a pain point or opportunity | HTML |
| **Checklist / Audit** | Self-assessment with scoring | Audience doesn't know their gaps | HTML |
| **Template / Swipe File** | Fill-in-the-blank ready-to-use assets | Audience needs to execute but doesn't know how | Markdown |
| **Playbook / Guide** | Comprehensive how-to document | You have deep expertise to share | Markdown |
| **Quiz / Assessment** | Branching questions → personalized result | Audience segments have different needs | HTML |
| **Toolkit / Resource List** | Curated collection of tools and resources | Audience is overwhelmed by options | Markdown |
| **Cheat Sheet** | One-page condensed reference | Topic is complex but actionable | Markdown |
| **Mini-Course / Email Course** | Multi-day drip content | You need sustained engagement | Markdown (series) |
| **Exposé / Industry Report** | Insider knowledge or data analysis | Audience suspects they're being misled | Markdown |

**Type selection guidance:**
- Highest perceived value: Calculator/Tool, Playbook
- Easiest to create: Checklist, Cheat Sheet, Resource List
- Best for segmentation: Quiz, Audit
- Best for authority: Playbook, Exposé, Report

### Concept Output Format

For each concept, output:

```
## Concept [N]: [Name]
Type: [Type from catalog]
Hook: [One-line reason someone MUST have this right now]
Description: [2-3 sentences — what it is and what the user gets]
Bridge to Paid: [How this naturally leads to the paid offer]
```

### Auto-Score & Recommend

After presenting all concepts, score each on 5 dimensions and recommend the winner:

| Dimension | Weight | What to Evaluate |
|-----------|--------|-----------------|
| **Relevance** | 25% | Does this solve a real, immediate pain for the target audience? |
| **Perceived Value** | 25% | Would someone think "I'd pay for this"? Tools > PDFs > lists. |
| **Ease of Creation** | 15% | Can this be built well within a single session? |
| **Bridge to Paid** | 25% | Does using this naturally create desire for the paid offer? |
| **Shareability** | 10% | Would the recipient share this with peers? |

Score each 1-10 per dimension. Calculate weighted average. Present as:

```
| Concept | Relevance | Value | Ease | Bridge | Share | Total |
|---------|-----------|-------|------|--------|-------|-------|
| [Name]  | 8         | 9     | 6    | 9      | 7     | 8.2   |
```

**Recommend the highest scorer** with a 2-3 sentence explanation of why it wins. If scores are within 0.5 points, flag both and let the user choose.

**Rejection threshold**: Concepts below 6.0 should not be recommended. If all concepts score below 6.0, regenerate with different angles.

---

## Mode 2: Validate

Deep-validation of the chosen concept. Either the Mode 1 winner or a concept the user brings directly.

### Detailed Scoring

Expand each scoring dimension with specific sub-questions:

**Relevance (is this a real pain?)**
- Does the audience actively search for solutions to this problem?
- Would they describe this problem the same way we frame it?
- Is this a "today" problem or a "someday" problem?

**Perceived Value (would they pay for this?)**
- What's the closest paid alternative? (e.g., Typeform quiz = $50/month, consultant audit = $500)
- Does the format signal quality? (Interactive tool > static PDF)
- Is the result personalized to the user's situation?

**Ease of Creation (can we build this well?)**
- Can the content be generated from existing expertise/data?
- Does the format require complex interactivity? (Simple form > multi-step wizard)
- Can it be built as a single self-contained file?

**Bridge to Paid (does it create buying desire?)**
- Does using this reveal a gap only the paid offer can fill?
- Does it demonstrate your methodology without giving away the full solution?
- Score 9-10: Using this makes NOT buying feel painful
- Score 4-5: Using this satisfies the need completely (no bridge)

**Shareability (will they tell others?)**
- Does it produce a result worth sharing? (Score, assessment, surprising data)
- Is there a social incentive? (Benchmark comparison, bragging rights)
- Does the format naturally spread? (Tools get shared > PDFs don't)

### Competitive Differentiation

Check: "What free offers already exist in this space?" Identify:
- What competitors offer for free (and where the gaps are)
- How this concept stands apart
- What our unique angle adds (reference `positioning.md`)

### Full Outline

Generate a detailed outline of the deliverable:
- Title and subtitle
- Section-by-section breakdown
- Key content points per section
- Where the CTA to paid offer lives
- Email capture placement

After validation, ask: "Ready to build this, or want to adjust?"

---

## Mode 3: Build

Create the actual deliverable. The output depends on the lead magnet type.

### HTML Builds (Calculator, Audit, Quiz)

Generate a **single self-contained HTML file** with:

**Structure:**
- Clean, modern design (inline CSS — no external dependencies)
- Responsive layout (works on mobile, tablet, desktop)
- Brand-aligned colors and fonts (from `voice-profile.md` if available)

**Functionality:**
- Input form with clear, conversational questions
- Instant result calculation/scoring on submit
- Results displayed with interpretation and actionable next steps
- No page reload — all logic runs client-side in JavaScript

**Copy (apply brand voice throughout):**
- Compelling title using the Hook Framework
- Question labels that feel conversational, not clinical
- Result interpretation that's specific and useful
- CTA section with bridge to paid offer

**Email Capture Integration:**
- Email field appears at result stage: "Enter your email to get your full report"
- Or: "Get detailed recommendations sent to your inbox"
- Include a simple `<form>` with action placeholder for the user's email service
- Note to user: "Connect this form to your email tool (ConvertKit, Mailchimp, etc.) by updating the form action URL"

**CTA Block (after results):**
```
[Diagnosis/result summary]

Want us to fix these gaps?
[Description of paid offer — 1-2 sentences]
[CTA Button: "Book a Call" / "Get Started" / "See How"]
[Supporting line: risk reversal]
```

**Quality standards from the original demo:**
- "The copy is dialed" — every question, label, and result must be well-written
- "Not only is it comprehensive, it works" — all interactivity must function
- It should replace paid tools (Typeform, Tally) — not feel like a cheap knockoff

### Markdown Builds (Guide, Template, Cheat Sheet, Toolkit, Exposé, Mini-Course)

Generate a **complete markdown file** with:

**Structure:**
- Title + subtitle (using the Hook Framework)
- Table of contents (for guides/playbooks longer than 3 sections)
- Clear section hierarchy with actionable headers
- Executive summary / "What you'll learn" at the top

**Content principles:**
- **Actionable over theoretical**: Every section should have a "do this now" component
- **Specific over generic**: Real numbers, real examples, real steps
- **Brand voice consistent**: Tone from `voice-profile.md` applied throughout
- **AI-tell free**: No "delve", "landscape", "paradigm", "leverage", "synergy", "unleash", "game-changing"

**CTA integration (natural, not forced):**
- In-context mentions where paid offer logically extends the free content
- End-of-document CTA section: "Ready for the full solution?"
- Bridge language: "This guide shows you X. When you're ready for someone to do X for you..."

**For Mini-Course / Email Course:**
- Generate as separate markdown files: `day-1.md`, `day-2.md`, etc.
- Each day: Lesson + one actionable exercise + teaser for next day
- Final day: Bridge to paid offer

### Deployment Options

After building, provide placement recommendations:

| Placement | Best For | Implementation |
|-----------|----------|---------------|
| **Modal popup** (bottom-right) | Tools, audits, quizzes | Floating button → opens in overlay |
| **Dedicated landing page** | Guides, playbooks, courses | Standalone page with opt-in form |
| **Inline section** | Any type on existing page | Embedded within landing page content |
| **Exit popup** | High-bounce pages | Triggers on exit intent |
| **Hello bar** | Site-wide promotion | Top banner with CTA |

---

## Hook Framework

The hook is what makes someone stop and say "I need this." Every lead magnet needs a hook in the title, the opt-in copy, and the CTA.

### 6 Hook Formulas

1. **Loss Aversion**: Reveal what they're losing by not knowing
   → "Find the leaks costing you [jobs/money/time]"
   → "How much revenue are you leaving on the table?"

2. **Instant Diagnosis**: Promise immediate self-knowledge
   → "Answer [N] questions, get your score instantly"
   → "Find out in [X] minutes if your [system] is working"

3. **Industry Secret**: Expose what insiders know
   → "What your [agency/vendor/competitor] won't tell you"
   → "The [N] things [industry] doesn't want you to know"

4. **Quick Win**: Promise immediate, actionable results
   → "The [timeframe] [action] to [result]"
   → "[N] fixes you can make today to [outcome]"

5. **Benchmark**: Let them compare themselves
   → "Is your [metric] above or below average?"
   → "How does your [business/team] stack up?"

6. **Shortcut**: Compress expertise into a shortcut
   → "What took us [long time] to learn, in [short format]"
   → "The [expert]'s [cheat sheet/playbook] for [topic]"

**Combining hooks**: The best lead magnets stack two hooks. "Find the leaks costing you jobs (Loss Aversion) — answer 15 questions, get your score instantly (Instant Diagnosis)."

---

## Landing Page Opt-In Section

After building the lead magnet, generate the opt-in copy for the landing page:

```
**Headline**: [Hook-driven title — use Hook Framework]
**Subheadline**: [What they get + how fast + format]
**Bullets** (3-5 benefits):
  - [Benefit 1 — specific outcome]
  - [Benefit 2 — specific outcome]
  - [Benefit 3 — specific outcome]
**CTA Button**: [Action verb + what they get] (e.g., "Get My Free Audit")
**Supporting line**: [Risk reversal or social proof] (e.g., "Takes 2 minutes. No email required to start.")
```

If the user has already created a landing page with Direct Response Copy, match the tone and style of the existing page.

---

## Email Sequence Connection

Every lead magnet download should trigger a welcome email sequence. After building:

**Output these connection points:**

1. **Trigger definition**:
   > When someone downloads [LEAD MAGNET NAME], start the Welcome Sequence.

2. **First email draft** (DELIVER — the critical first email):
   - Subject line (3 options)
   - Body: Deliver the asset + one quick win they can act on immediately
   - CTA: "Hit reply and tell me [relevant question]" (starts relationship)
   - PS: Preview of what's coming in the next emails

3. **Sequence direction note**:
   > "The full 7-email welcome sequence (DELIVER → CONNECT → VALUE → VALUE → BRIDGE → SOFT → DIRECT) should be built with the **Email Sequences** skill. This first email is your starting point."

---

## Quality Checklist

Before delivering, self-audit every item:

- [ ] **Audience pain match**: Does this solve a pain the target audience actually has? (Check `audience.md`)
- [ ] **Brand voice**: Does all copy sound like the voice profile? (Check `voice-profile.md`)
- [ ] **Positioning alignment**: Does this reinforce the chosen angle? (Check `positioning.md`)
- [ ] **Perceived value**: Would someone think "I'd pay for this"? If not, what's missing?
- [ ] **Bridge to paid**: Does using this naturally create desire for the paid offer?
- [ ] **AI-tell free**: No "delve", "landscape", "paradigm", "leverage", "synergy", "unlock", "game-changing", "seamlessly", "tapestry"
- [ ] **HTML functional** (if applicable): All inputs work, scoring calculates correctly, results display properly
- [ ] **Email capture flow** (if applicable): The path from result → email input → CTA is smooth
- [ ] **The gut check**: "Would I trade my email for this?" If not, iterate.

If any item fails, revise before presenting.

---

## Example: Five-Minute Marketing Audit

Based on the "Boring Money" agency demo — an audit tool for trade businesses.

**Concept (Mode 1 output):**
```
## Concept 3: Five-Minute Marketing Audit
Type: Checklist / Audit
Hook: Find the leaks costing you jobs — answer 15 questions, get your score instantly
Description: A self-assessment tool that diagnoses marketing gaps across lead
response, follow-up, reviews, and online presence. Gives an instant score with
specific recommendations.
Bridge to Paid: Low scores reveal exactly what Boring Money builds — creating
natural demand for the full system.
```

**Validation score**: 8.7 (Relevance: 9, Value: 8, Ease: 8, Bridge: 10, Share: 7)

**Build (Mode 3) — Key structure:**
- 15 yes/no questions across 5 categories: Lead Response, Follow-Up System, Review Management, Online Presence, Conversion Tools
- Instant scoring: Each "no" = a leak. Category scores + overall score
- Results: "You're losing an estimated [X] jobs per month from these gaps"
- CTA: "Want us to fix these gaps? We can build the whole system — landing pages, lead response, follow-up automation, review generation — in 5 days. Book a call."
- Email capture: "Download your full report" button collects email

---

## Saving & Handoff

After building:

**Language rule**: 섹션 헤더와 테이블 컬럼명은 영어로 유지합니다. 본문, 셀 값, 설명, 분석 텍스트는 사용자가 지정한 언어로 작성합니다. 언어가 지정되지 않으면 English로 작성합니다.

1. **Save the deliverable** to the project folder:
   - HTML tools: `[name]-tool.html` (e.g., `marketing-audit-tool.html`)
   - Markdown guides: `[name]-guide.md` (e.g., `marketing-playbook-guide.md`)

2. **Save the opt-in copy** as `[name]-optin-copy.md`

3. **Suggest next steps:**

> Lead magnet is built. Here's what comes next:
>
> 1. **Email Sequences** — Build the welcome sequence triggered by this download (DELIVER → CONNECT → VALUE → VALUE → BRIDGE → SOFT → DIRECT)
> 2. **Content Atomizer** — Extract social content from your lead magnet (turn audit questions into LinkedIn posts, guide chapters into Twitter threads)
> 3. **Direct Response Copy** — If you don't have a landing page yet, create one that promotes this lead magnet
>
> Run the **Orchestrator** if you're not sure what to prioritize.
