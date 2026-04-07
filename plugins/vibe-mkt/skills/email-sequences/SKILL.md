---
name: email-sequences
description: "Design and write complete email sequences from strategy to full copy — welcome series, nurture flows, launch sequences, and conversion funnels. Use when user mentions: email sequence, welcome series, drip campaign, nurture flow, onboarding emails, email automation, follow-up sequence, conversion sequence, launch sequence, email funnel, autoresponder, re-engagement, win-back, upsell email"
user-invocable: true
---

# Email Sequences Skill

> **Trigger keywords**: email sequence, welcome series, drip campaign, nurture flow, onboarding emails, email automation, welcome email, follow-up sequence, conversion sequence, launch sequence, email funnel, autoresponder, re-engagement, win-back, upsell email, nurture sequence, email series, automated emails, email campaign

Design and write complete email sequences — from strategy to full copy. Automated flows that bridge the gap between "subscribed" and "purchased." Built on proven direct response methodology, updated for today's buyer psychology.

Email sequences are the automation engine of the Nurture Stack:

```
Lead Magnet download → EMAIL SEQUENCES → Newsletter → Content Atomizer
```

---

## Brand Memory Protocol

Before writing any emails, check for the `brand-memory/` directory.

- If `voice-profile.md` exists → apply tone, vocabulary, greetings style to all email copy
- If `positioning.md` exists → frame value propositions around the chosen angle
- If `audience.md` exists → tailor pain points, empathy hooks, and examples to the target
- If none exist → warn the user:

> "No brand memory found. I can still write email sequences, but they'll be generic. For best results, run **Brand Voice** and **Positioning Angles** first to establish your foundation."

Proceed with defaults if the user wants to continue anyway.

---

## Three Modes

Detect mode from user intent:

> **Mode 1 — Strategy**: Diagnose which sequences are needed. Map triggers, goals, and narrative arcs. Design the sequence architecture before writing a word.
>
> **Mode 2 — Write**: Generate complete email copy for a chosen sequence type. Every email: subject lines, preview text, body, CTA, timing, and conditions.
>
> **Mode 3 — Optimize**: Analyze and improve an existing sequence. Benchmark against industry standards, identify drop-off points, suggest A/B tests.

**Auto-detection logic:**
- "I need an email sequence" or "what emails should I send?" → Mode 1
- "Write a welcome sequence" or specifies a sequence type → Mode 2
- "My emails aren't converting" or shares existing sequence data → Mode 3
- Ambiguous → start at Mode 1, then flow into Mode 2

---

## Input Gathering

Before starting, collect (or load from brand memory):

1. **What's the trigger?** — What action starts this sequence? (e.g., "lead magnet download", "free trial signup", "cart abandonment", "purchase")
2. **What's the conversion goal?** — What should the sequence achieve? (e.g., "book a call", "purchase", "upgrade plan", "re-engage")
3. **Who is the audience?** — Who receives these emails? Load from `audience.md` or ask. What stage are they at?
4. **What's the paid offer?** — The product/service the sequence ultimately bridges to.
5. **Existing assets?** — Case studies, blog posts, testimonials, videos available for email content.
6. **Email count / timing preference?** — (Optional) If not specified, use defaults for the sequence type.
7. **Language** (Optional) — 결과물 작성 언어. Default: English.

If brand memory covers items 3-4, confirm and move on. Don't re-ask what's already documented.

---

## Mode 1: Strategy

Before writing a single email, design the sequence architecture.

### Sequence Type Selection

Choose based on the trigger event and conversion goal:

| Type | Best When | Emails | Span | Core Purpose |
|------|-----------|--------|------|-------------|
| **Welcome** | New subscriber via lead magnet or signup | 7 | 14-21 days | Build trust → first purchase |
| **Nurture** | Welcome complete, not yet converted | 4-6 | 3-4 weeks | Deepen relationship, segment |
| **Conversion** | High-intent behavior detected | 5-7 | 10-14 days | Direct sales push |
| **Launch** | New product/offer release | 6-8 | 2-3 weeks | Build anticipation → open cart → close |
| **Re-engagement** | 30-60 days of inactivity | 3-4 | 10-14 days | Reactivate dormant subscribers |
| **Win-back** | Cancelled or churned | 3-5 | 30 days | Recover lost customers |
| **Upgrade / Upsell** | Usage milestone or success signal | 3-5 | 2-3 weeks | Expand revenue per customer |
| **Educational Drip** | Topic interest or course enrollment | 5-8 | 4-6 weeks | Teach → build authority → convert |

### Business Type Email Strategy

Different businesses need different sequence priorities:

| Business Type | Priority Sequence | Secondary | Email's Core Role |
|--------------|------------------|-----------|-------------------|
| **Info / Education** | Welcome → Educational Drip | Launch (for courses/programs) | Trust building, expertise proof |
| **Consulting / Agency** | Welcome → Nurture | Conversion (to book calls) | "I want to work with this person" |
| **E-commerce** | Welcome → Conversion | Win-back + Upsell | Revenue driver, not just nurture |
| **SaaS** | Welcome (Onboarding) → Nurture | Upgrade + Re-engagement | Trial-to-paid, activation, retention |

### Sequence Architecture

For every sequence, define before writing:

1. **Narrative arc** — What story does this sequence tell from first email to last? What's the emotional and logical progression?
2. **Journey mapping** — Map each email to a stage: awareness → consideration → decision → action
3. **Escalation logic** — How does intensity, urgency, or value build across emails? Early = give, late = ask.
4. **Success definition** — What specific action signals the sequence worked? (This becomes the exit condition.)

Output a brief strategy document with these four elements before proceeding to Mode 2.

---

## Mode 2: Write

Generate the complete sequence — every email, fully drafted, ready to deploy.

### The Welcome Sequence (Core Framework)

The 7-email welcome sequence is the flagship. Built on a proven psychological arc:

```
DELIVER → CONNECT → VALUE → VALUE → BRIDGE → SOFT → DIRECT
```

| # | Name | Day | Job | Core Principle |
|---|------|-----|-----|---------------|
| 1 | **DELIVER** | 0 | Deliver the promised asset + quick win | Instant value. "You just made a great decision." |
| 2 | **CONNECT** | 1 | Personal story — why you do this | Human connection. The person behind the brand. |
| 3 | **VALUE** | 3 | Teach something useful. No selling. | Exceed expectations. "This alone was worth subscribing." |
| 4 | **VALUE** | 5 | Another teaching moment or case study | Proof it works. "Here's how it worked for someone like you." |
| 5 | **BRIDGE** | 7 | Connect free value to paid solution | "You can go far on your own. To go faster..." |
| 6 | **SOFT** | 10 | Social proof + gentle pitch | Others sell for you. Results, not claims. |
| 7 | **DIRECT** | 14 | Clear offer with urgency | "Here's exactly what you get. Here's why now." |

**Escalation pattern**: Emails 1-4 = all give, no ask. Email 5 = bridge (give + hint). Email 6 = soft ask (proof-led). Email 7 = direct ask (offer-led).

### Other Sequence Templates

For non-Welcome sequences, follow the templates in `references/sequence-templates.md`. Each template defines the email-by-email structure, purpose, and escalation pattern.

### Per-Email Output Format

For every email in the sequence, produce all of the following:

#### Subject Line (2-3 options)
- Vary approaches: curiosity, benefit-driven, urgency, personalization, question-based
- Keep under 50 characters where possible
- Note mobile preview behavior

#### Preview Text
- 40-90 characters
- Complements the subject line (never repeats it)
- Adds context or intrigue that increases opens

#### Email Purpose
- One sentence: why this email exists and what it moves the recipient toward

#### Body Copy
- Full draft, ready to use
- Structure: Hook → Body → CTA
- Short paragraphs (2-3 sentences max)
- Scannable: bold key phrases where appropriate
- Personalization tokens where relevant (`{{first_name}}`, `{{company}}`)
- Brand voice applied throughout

#### Primary CTA
- Button text + destination
- One primary CTA per email (secondary only when appropriate for the stage)

#### Timing
- Days after trigger or after previous email
- Engagement-based adjustment notes (e.g., "If opened but didn't click → send 2b instead on Day 4")

#### Segment / Condition Notes
- Who receives this email vs. who skips it
- Behavioral or attribute-based conditions

### Sequence Overview Table

Present a summary table before the full drafts:

```
| # | Email Name | Subject Line (Primary) | Purpose | Day | CTA |
|---|-----------|----------------------|---------|-----|-----|
| 1 | DELIVER   | "Your [asset] is ready" | Deliver + quick win | 0 | Open/use the asset |
| 2 | CONNECT   | "Why I started [brand]" | Personal story | 1 | Reply with their story |
| ... | ... | ... | ... | ... | ... |
```

---

## Sequence Logic

Define the automation flow for every sequence. This turns emails into an intelligent system.

### Branching Conditions

Alternate paths based on engagement:

- **Opener but non-clicker**: "Opened email 2 but didn't click CTA → send email 2b (softer re-ask) instead of email 3"
- **Fast converter**: "Clicked CTA in email 1 → skip emails 2-4, jump to email 5"
- **Non-opener**: "Didn't open email 3 → resend with new subject line on Day +2"

Provide specific branching recommendations for each sequence type.

### Exit Conditions

Define when recipients leave the sequence:

- **Conversion exit**: Recipient completed the goal action (purchased, booked, upgraded) → immediately remove from sequence
- **Sequence complete**: Reached the last email without converting → move to a different sequence or ongoing newsletter
- **Negative exit**: Unsubscribed or marked as spam → remove and suppress

### Re-entry Rules

- Can someone re-enter this sequence? Under what conditions?
- Example: "If a customer churns again 90+ days later, re-enter the Win-back sequence"
- Default: No re-entry for Welcome. Conditional re-entry for Win-back and Re-engagement.

### Suppression Rules

Prevent conflicts and fatigue:

- Don't send if recipient is in another active sequence
- Don't send if unsubscribed from marketing emails
- Don't send if contacted support in the last 48 hours
- Maximum emails per week across all sequences: 3 (recommend to user)

### Flow Diagram

Produce a text-based flow diagram for the sequence:

```
[Lead magnet download] --> Email 1: DELIVER (Day 0)
                                |
                          Opened? ──Yes──> Email 2: CONNECT (Day 1)
                                |                    |
                                No             Clicked CTA?
                                |               /         \
                                v             Yes          No
                          Resend E1          [EXIT:        |
                          new subject       Converted]     v
                          (Day 2)                    Email 3: VALUE (Day 3)
                                |                          |
                                +--────────────────────> Email 4: VALUE (Day 5)
                                                           |
                                                     Email 5: BRIDGE (Day 7)
                                                           |
                                                     Email 6: SOFT (Day 10)
                                                           |
                                                     Email 7: DIRECT (Day 14)
                                                           |
                                                    [Sequence complete]
                                                     → Move to Nurture
```

---

## Mode 3: Optimize

Analyze existing sequences against industry benchmarks and suggest improvements.

### Performance Benchmarks

Use these to diagnose where a sequence is underperforming:

| Metric | Welcome | Nurture | Conversion | Launch | Re-engage | Win-back | Upsell | Edu Drip |
|--------|---------|---------|------------|--------|-----------|----------|--------|----------|
| Open rate | 50-70% | 20-30% | 25-35% | 30-50% | 15-25% | 15-20% | 25-35% | 30-45% |
| CTR | 10-20% | 3-7% | 5-10% | 5-10% | 2-5% | 2-4% | 3-7% | 5-10% |
| Conversion | 15-30% | 2-5% | 5-15% | 5-15% | 3-8% | 1-3% | 3-8% | 3-7% |
| Unsubscribe | <0.5% | <0.5% | <1% | <1% | 1-2% | 1-3% | <1% | <0.5% |

Adjust benchmarks based on industry and audience context.

### Diagnostic Framework

When the user shares performance data:

1. **Compare to benchmarks**: Flag any metric below the range
2. **Identify drop-off points**: Where in the sequence do people stop engaging?
3. **Diagnose root causes**:
   - Low opens → subject line problem (test new approaches)
   - Opens but low clicks → body copy or CTA problem (relevance, clarity)
   - Clicks but no conversion → landing page or offer problem (beyond email)
   - High unsubscribes → frequency, relevance, or expectation mismatch
4. **Prescribe fixes**: Specific changes for each problem email

### A/B Test Suggestions

Recommend 2-3 tests per sequence:

- **Subject lines**: Curiosity vs. benefit vs. urgency (same body)
- **CTA text**: Specific action vs. generic ("Book my call" vs. "Learn more")
- **Send time**: Morning vs. afternoon vs. evening
- **Email length**: Short (under 150 words) vs. long (300+ words)
- **Personalization**: With name vs. without, dynamic content vs. static

For each test: what to test, how to split (50/50), what metric decides the winner, and minimum sample size.

### Metrics to Track

- **Per-email**: Open rate, click-through rate, unsubscribe rate
- **Sequence-level**: Overall conversion rate, average time to conversion, biggest drop-off point
- **Review cadence**: Weekly for the first month, then monthly

---

## Subject Line Formulas

Use across all sequence types. Vary approaches across the sequence — don't repeat the same formula:

1. **Curiosity gap**: Creates an open loop the reader must close
   → "The one thing nobody tells you about [topic]"
   → "I was wrong about [assumption]"

2. **Direct benefit**: States exactly what they get
   → "The [timeframe] fix for [specific problem]"
   → "[Specific result] — here's how"

3. **Personal / Conversational**: Feels like a message from a friend
   → "Quick question about your [thing]"
   → "This reminded me of you"

4. **Social proof**: Leverages others' results
   → "How [person/company] [achieved result]"
   → "[Number] people already [did this thing]"

5. **Urgency / Scarcity**: Time-based pressure (use sparingly — only in SOFT and DIRECT emails)
   → "[Timeframe] left to [get benefit]"
   → "Last chance: [specific offer]"

6. **Story teaser**: Opens a narrative loop
   → "The plumber who [unexpected outcome]"
   → "I almost didn't send this email"

---

## Quality Checklist

Before delivering any sequence, self-audit every item:

- [ ] **One purpose per email**: Does each email have a single, clear job? No hybrid emails trying to do everything.
- [ ] **Escalation arc**: Does intensity build gradually? Giving before asking? No hard sell before email 5.
- [ ] **Subject lines under 50 chars**: Will they display fully on mobile?
- [ ] **Brand voice match**: Does every email sound like the voice profile? (Check vocabulary, tone, personality)
- [ ] **AI-tell removal**: No "delve", "landscape", "paradigm", "leverage", "synergy", "unlock", "game-changing", "seamlessly", "tapestry", "unleash"
- [ ] **CTA clarity**: One primary CTA per email. Is it obvious what happens when they click?
- [ ] **Timing is realistic**: Not too frequent (fatigue) or too spread out (forgotten)?
- [ ] **Exit condition defined**: What action ends the sequence? Is it clearly configured?
- [ ] **DELIVER email delivers instantly**: Does email 1 provide real value in the first 30 seconds?
- [ ] **The inbox test**: "Would I open this? Would I read past the first line? Would I click?" If any answer is no, revise.

If any item fails, revise before presenting.

---

## Example: Boring Money Welcome Sequence (Abbreviated)

**Context:**
- Business: AI marketing agency for trade businesses ($2-10M revenue)
- Lead magnet: Five-Minute Marketing Audit
- Goal: Book a consultation call
- Positioning: "You've fired enough marketing agencies. Try the one that delivers in days not months."

### Sequence Overview

| # | Name | Day | Subject Line | Purpose | CTA |
|---|------|-----|-------------|---------|-----|
| 1 | DELIVER | 0 | Your audit results + the #1 fix | Deliver asset + quick win | Review full results |
| 2 | CONNECT | 1 | Why I only work with "boring" businesses | Founder story | Reply with their story |
| 3 | VALUE | 3 | The 10-min fix that gets you 35% more jobs | Actionable tip | Try the fix |
| 4 | VALUE | 5 | How a Phoenix plumber went from hoping to choosing | Case study | Read full story |
| 5 | BRIDGE | 7 | DIY vs. done-for-you: the math | Bridge to paid | Calculate their ROI |
| 6 | SOFT | 10 | 3 businesses, 5 days, real numbers | Social proof | See the results |
| 7 | DIRECT | 14 | This week: free marketing system blueprint | Direct offer | Book a call |

### Email 1 — DELIVER (Day 0)

**Subject line options:**
- A: "Your audit results + the #1 fix"
- B: "You scored {{score}} — here's what it means"
- C: "The marketing leak that's costing you the most"

**Preview text:** "Plus the one change you can make in 10 minutes"

**Purpose:** Deliver the audit results, highlight the biggest gap, and provide one actionable quick win.

**Body:**

```
Hey {{first_name}},

Your Five-Minute Marketing Audit results are in.

You scored {{score}} out of 100. Here's the headline: your biggest
leak is {{top_gap_category}}.

For most trade businesses doing $2-10M, this single gap costs
3-5 jobs per month. Not because the leads don't exist — because
they slip through before anyone responds.

Here's your quick win (takes about 10 minutes):

{{specific_actionable_tip_based_on_top_gap}}

That alone should start making a difference this week.

Tomorrow, I'll share why I decided to build Boring Money specifically
for businesses like yours. Short version: the "cool" agencies don't
deserve you.

Talk soon,
{{sender_name}}
```

**CTA:** "View your full audit results →" (links to saved results page)

**Timing:** Immediately after lead magnet completion

---

## Platform Setup Checklist

When no email marketing tool is integrated, provide a copy-paste-ready setup guide:

1. **Create the automation** in your email platform (ConvertKit, Mailchimp, ActiveCampaign, etc.)
2. **Set the enrollment trigger** (e.g., "subscribed to [tag/list]" or "submitted [form]")
3. **Add each email** with the specified delays between them
4. **Configure branching** and exit conditions using the platform's visual flow builder
5. **Set up conversion tracking** for the primary goal action
6. **Test the full sequence** by enrolling yourself before going live

---

## Saving & Handoff

After delivering the sequence:

**Language rule**: 섹션 헤더와 테이블 컬럼명은 영어로 유지합니다. 본문, 셀 값, 설명, 분석 텍스트는 사용자가 지정한 언어로 작성합니다. 언어가 지정되지 않으면 English로 작성합니다.

1. **Save to project folder**: `[sequence-type]-email-sequence.md` (e.g., `welcome-email-sequence.md`)
2. **Update campaign tracking**: If `brand-memory/campaigns.md` exists, log the sequence with trigger, goal, email count, and launch date.
3. **Suggest next steps:**

> Email sequence is ready. Here's what typically comes next:
>
> 1. **Newsletter** — Set up ongoing engagement for subscribers who complete the welcome sequence
> 2. **Content Atomizer** — Extract social content from your email copy (subject lines → tweets, stories → LinkedIn posts)
> 3. **Lead Magnet** — If you don't have a lead magnet yet, build the opt-in offer that triggers this sequence
>
> Run the **Orchestrator** if you're not sure what to prioritize.
