---
name: direct-response-copy
description: "Write conversion-focused copy for landing pages, sales pages, ads, and emails using proven direct response methodology. Use when user mentions: direct response, copywriting, landing page copy, sales page, sales copy, ad copy, headline, CTA, conversion copy, persuasion, landing page, hero section, call to action, write copy, page copy, ad headline, sales letter"
user-invocable: true
---

# Direct Response Copy Skill

> **Trigger keywords**: direct response, copywriting, landing page copy, sales page, sales copy, ad copy, headline, CTA, conversion copy, persuasion, landing page, hero section, call to action, write copy, page copy, ad headline, sales letter

Write conversion-focused copy for landing pages, sales pages, ads, and emails. Built on 100+ years of direct response methodology — Schwartz, Ogilvy, Halbert, Hopkins — updated for today's internet and elevated with your brand voice.

---

## Brand Memory Protocol

Before writing any copy, check for the `brand-memory/` directory.

- If `voice-profile.md` exists → apply tone, vocabulary, personality to all output
- If `positioning.md` exists → use the chosen angle as the copy's strategic foundation
- If `audience.md` exists → tailor language, pain points, and examples to the target
- If none exist → warn the user:

> "No brand memory found. I can still write copy, but it'll be generic. For best results, run **Brand Voice** (02) and **Positioning Angles** (03) first."

Proceed with defaults if the user wants to continue anyway.

---

## Four Modes

Detect mode from user intent:

> **Mode 1 — Landing Page** (default): Full-page conversion copy. Headlines, hero, problem/solution, social proof, founder story, CTAs.
>
> **Mode 2 — Sales Page**: Long-form persuasion. Everything in Landing Page plus guarantee, pricing stack, bonuses, urgency.
>
> **Mode 3 — Ad Copy**: Short-form hooks for Meta, Google, LinkedIn. Multiple variants for A/B testing.
>
> **Mode 4 — Email Copy**: Single sales/launch email. Subject lines, body, PS line.

**Auto-detection logic:**
- "write a landing page" or "website copy" → Mode 1
- "sales page" or "long-form sales letter" → Mode 2
- "ad copy" or "write ads" or mentions Meta/Google/LinkedIn → Mode 3
- "sales email" or "launch email" or "promo email" → Mode 4
- Ambiguous → default to Mode 1 (most common), confirm with user

---

## Input Gathering

Before writing, collect (or load from brand memory):

1. **What are you selling?** — Product, service, or lead magnet. What does the customer get?
2. **Who is the target?** — Specific audience. Load from `audience.md` or ask.
3. **Positioning angle** — Load from `positioning.md` or ask: "What makes this different from alternatives?"
4. **Market awareness level** — Assess or ask (see Schwartz framework below). This determines the entire copy strategy.
5. **Social proof available?** — Testimonials, stats, logos, case studies. "Share what you have; I'll work with it."
6. **Language** (Optional) — 결과물 작성 언어. Default: English.

If brand memory files cover items 2-3, confirm them and move on. Don't re-ask what's already documented.

---

## Core Methodology

Four frameworks inform every piece of copy this skill produces. They're not applied in isolation — they layer together.

### Schwartz: 5 Levels of Market Awareness

This determines **how** you open and **what** you emphasize. Assess the audience's current awareness, then match the copy strategy:

| Level | Audience State | Copy Strategy | Headline Approach |
|-------|---------------|---------------|-------------------|
| 1. Unaware | Don't know they have a problem | Educate through story or shock | Lead with story or surprising fact |
| 2. Problem-Aware | Know the pain, not the solution | Agitate the pain, empathize deeply | Name their exact frustration |
| 3. Solution-Aware | Know solutions exist, not yours | Differentiate your mechanism | Lead with your unique approach |
| 4. Product-Aware | Know your product, haven't bought | Overcome objections with proof | Lead with social proof or comparison |
| 5. Most Aware | Ready to buy, need a push | Make the offer irresistible | Lead with offer, price, urgency |

**Default assumption**: Most audiences are Level 2-3. Adjust based on context.

### Ogilvy: Research-Driven Persuasion

- **The headline carries 80% of the weight.** Spend disproportionate effort here. Always provide 3 options.
- **Specificity beats generality.** "37% faster" beats "much faster." "$4,200 saved per month" beats "save money."
- **Long copy sells when every sentence earns the next.** Don't cut for brevity — cut boring.
- **Sell the result, not the product.** The customer buys the transformation, not the mechanism.

### Halbert: Story-Driven Structure

- **AIDA flow**: Attention → Interest → Desire → Action. Every section serves one of these.
- **Star-Story-Solution**: Introduce a character (the customer or founder) → tell their struggle → reveal the solution.
- **The Founder Story technique**: A personal narrative of why this business exists. Builds trust through vulnerability and shared values. Not a bio — a connection moment.

### Hopkins: Scientific Advertising

- **Always provide 3 headline options.** Testing reveals winners; intuition doesn't.
- **Specificity sells.** Concrete numbers, timeframes, and outcomes. Never vague promises.
- **Offer service, not product.** Frame everything as what you do FOR the customer.

---

## Mode 1: Landing Page (9-Section Blueprint)

Generate copy section by section. Each section has a job. No section is optional for a full landing page, but mark sections that can be shortened for simpler pages.

### Section 1 — Hero

**Job**: Stop the scroll. Make them feel understood in 3 seconds.

Output:
- **3 headline options** (each using a different approach from the Headline Formulas)
- **Subheadline** (elaborates on the winning headline — 1-2 sentences)
- **Primary CTA button** text + supporting line below it
- **Visual direction** (what image/video would pair — describe, don't generate)

### Section 2 — Problem

**Job**: Make the reader think "this person gets me."

- Paint the current painful reality. Use "Here's what it looks like for most [audience]..." pattern
- Use specific scenarios, not abstract pain. Show the Monday morning, the awkward meeting, the spreadsheet from hell
- 3-5 concrete pain points their audience will nod along to
- Emotional resonance > comprehensiveness. Pick the pains that sting most

### Section 3 — Solution

**Job**: Introduce your approach as the new way.

- Frame as "The [adjective] way" or "What changes when..."
- Describe the approach, not the product features. Mechanism over specifications
- Contrast with the old way implicitly (the pain from Section 2)

### Section 4 — Mechanism

**Job**: Build credibility by explaining how/why it works.

- Process steps, methodology, or technology — whatever makes the solution believable
- Keep it concrete: "We do X, which causes Y, so you get Z"
- Diagrams or step descriptions (1→2→3 format) work well here

### Section 5 — Differentiators

**Job**: Answer "why you and not [alternative]?"

- **Comparison table**: Us vs. Traditional/Competitor approach (side-by-side)
- **"Everything you get" list**: Tangible deliverables or features, benefit-framed
- Use specific numbers for contrast (time, cost, scope)

### Section 6 — Social Proof

**Job**: Let others sell for you.

- If testimonials exist → use them with specific results mentioned
- If no testimonials yet → use stats, methodological proof, or borrowed credibility
- Format options: quote blocks, mini case studies, logo bars, "as seen in" rows

### Section 7 — Founder Story

**Job**: Create personal connection. Build trust through shared values.

- Use Halbert's Star-Story-Solution: Who are you → What did you see that bothered you → What did you build
- Write in first person. Show vulnerability. Show conviction.
- End with a bridge: the personal "why" connects to the product's "what"

### Section 8 — FAQ

**Job**: Handle objections disguised as questions.

- 5-7 questions. Each one is secretly an objection:
  - Price → "What does it cost?" (reframe as value/ROI)
  - Risk → "What if it doesn't work?" (guarantee, refund, proof)
  - Fit → "Is this right for me?" (qualify the ideal customer)
  - Time → "How long until I see results?" (set realistic timeline)
  - Trust → "Why should I trust you?" (credibility, track record)

### Section 9 — Final CTA

**Job**: Close with clarity and confidence.

- Restate the core transformation in one line
- Primary CTA button (same as hero — consistency builds trust)
- Risk-reversal line below CTA ("No credit card required" / "Cancel anytime" / "30-day guarantee")
- Optional urgency if genuine (limited spots, deadline, price increase)

---

## Mode 2: Sales Page

Everything in Mode 1, plus these additional sections inserted before the Final CTA:

- **Guarantee / Risk Reversal**: Money-back, time-back, or performance guarantee. Be specific about terms.
- **Offer Stack / Pricing**: What's included, total value vs. price, payment options.
- **Bonuses**: 2-3 extras that complement the main offer. Each with its own headline + benefit.
- **Urgency / Scarcity**: Only if real. Deadline, limited seats, price increase date.
- Extended Founder Story (longer narrative, more vulnerability).
- More Social Proof sections (distribute throughout, not just one block).

---

## Mode 3: Ad Copy

Generate **5+ variants** for the specified platform.

**Per variant:**
```
Hook (1 line — stop the scroll)
Body (2-4 lines — problem + solution + proof)
CTA (1 line — clear next step)
```

**Platform adjustments:**
- **Meta (Facebook/Instagram)**: Conversational, emotional hooks. Body can be 3-5 lines. "Learn more" or "Get started" CTAs
- **Google Search**: Keyword-forward. Headline max 30 chars × 3. Description max 90 chars × 2
- **LinkedIn**: Professional but human. Can be longer. Thought-leadership angle works

After generating variants, add:
- **A/B test notes**: Which variants test different variables (hook style, proof type, CTA approach)
- **Recommended starting pair**: Which 2 to test first and why

---

## Mode 4: Email Copy

**Output:**
- **Subject lines** (3 options — curiosity, benefit, urgency)
- **Preview text** (complements subject, doesn't repeat it)
- **Body copy**: Opening hook → Problem agitation → Solution introduction → Proof point → CTA
- **PS line**: Additional persuasion element (social proof, bonus, deadline)

Keep body scannable: short paragraphs (1-3 sentences), bold key phrases, one clear CTA.

---

## Headline Formulas

Use these to generate the 3 headline options. Each option should use a different formula:

1. **Transformation**: "You've [pain experience] enough. [New promise]."
   → "You've fired enough marketing agencies. Try the one that delivers in days not months."

2. **Specificity**: "How to [achieve result] without [common obstacle]"
   → "How to fill your pipeline without cold calling or paying $10K/month retainers"

3. **Contrarian**: "Stop [common approach]. Start [better approach]."
   → "Stop chasing hacks. Start building systems that compound."

4. **Curiosity gap**: "The [unexpected adjective] reason your [thing] isn't [desired result]"
   → "The boring reason your landing page isn't converting"

5. **Social proof**: "How [X people/companies] [achieved result] in [timeframe]"
   → "How 47 trade businesses doubled their leads in 90 days"

6. **Direct benefit**: "[Primary benefit] for [specific audience]"
   → "AI-powered marketing for plumbers, HVAC, and electricians doing $2-10M"

7. **Before/After**: "From [painful state] to [desired state]"
   → "From hoping the phone rings to controlling when it rings."

---

## Quality Checklist

Before delivering final copy, self-audit against every item:

- [ ] **Brand voice match**: Does this sound like the voice profile? (Check vocabulary, tone, personality)
- [ ] **Positioning angle threaded throughout**: Is the core angle present in hero, problem, solution, and CTA?
- [ ] **Specificity check**: Are there concrete numbers, timeframes, or outcomes? (Ogilvy/Hopkins)
- [ ] **Headline weight**: Do the headlines carry the page? Would someone click based on headline alone?
- [ ] **AI-tell removal**: No "delve", "landscape", "paradigm", "leverage", "synergy", "unlock", "game-changing", "revolutionize", "seamlessly", "tapestry", "unleash"
- [ ] **CTA clarity**: Is it obvious what happens when they click? Is there risk-reversal nearby?
- [ ] **Founder Story authenticity**: Does it feel like a real person, not a corporate bio?
- [ ] **Quality gate**: Would you actually send this to prospects? If not, what needs to change?

If any item fails, revise before presenting.

---

## Example Output (Abbreviated)

Based on the "Boring Money" agency demo — an AI marketing agency for trade businesses.

```markdown
## Hero

**Headline Option A** (Transformation):
You've fired enough marketing agencies.
Try the one that delivers in days, not months.

**Headline Option B** (Specificity):
AI-powered marketing for plumbers, HVAC, roofers, and electricians
doing $2-10M.

**Headline Option C** (Contrarian):
Stop paying $15K/month for agencies that don't understand your business.

**Subheadline**:
Complete marketing systems — landing pages, lead response, follow-up
automation, and review generation — shipped in 5 days. Not 5 months.

**CTA**: See what we build for you →
**Supporting line**: No contracts. No retainers. Just the work that matters.

---

## Problem

Here's what it looks like for most trade businesses:

You're doing $4M in revenue. 15% net margins. Zero debt. You're one of
the healthiest businesses in your city — and every marketing agency
treats you like an afterthought.

They pitch you the same playbook they use for DTC brands and tech
startups. The last agency took 8 weeks to launch a campaign that
generated 3 leads. Your nephew could have done better with a
Facebook post.

Meanwhile, the phone rings when it feels like it. You chase estimates
you'll never close. And the "marketing" is a logo on your truck
and a prayer.

---

## Founder Story

Every marketing agency wants to work with the next Uber. The AI
startup. The DTC brand with a $50 million raise.

You're doing $4 million in revenue with 15% net margins and zero debt.
You're the most financially healthy business they'll ever meet — and
they don't know how to talk to you.

I started Boring Money because I got tired of watching the most
solid businesses in America get ignored by an industry chasing
"sexy" clients. Your business isn't sexy. But your margins are
beautiful, your customers are loyal, and your growth potential
is massive.

We built our entire system around one idea: the overlooked businesses
deserve the best marketing. Not recycled startup playbooks. Not
$15K retainers for logo tweaks. Real systems that fill your pipeline
and let you pick which jobs to take.

---

## Differentiators

| | Traditional Agency | Boring Money |
|---|---|---|
| Timeline | 6-8 weeks to launch | 5 days |
| Cost | $5-10K/month retainer | Fraction of the cost |
| What you get | Strategy deck + meetings | Shipped landing page + lead system |
| Who it's for | "Any business" | Trade businesses, $2-10M |
| First results | "Give it 6 months" | Week 1 |
```

---

## Saving & Handoff

After delivering copy:

**Language rule**: 섹션 헤더와 테이블 컬럼명은 영어로 유지합니다. 본문, 셀 값, 설명, 분석 텍스트는 사용자가 지정한 언어로 작성합니다. 언어가 지정되지 않으면 English로 작성합니다.

1. Save to the project folder as `[page-name]-copy.md` (e.g., `landing-page-copy.md`)
2. If the user has Frontend Design skill available, suggest:

> "Copy is ready. Want to bring this to life? Run the **Frontend Design** skill to generate a production-ready page from this copy."

3. If a lead magnet or email sequence is mentioned, suggest:

> "Your landing page needs somewhere to send conversions. Consider running **Lead Magnet** (05) for an opt-in offer, then **Email Sequences** (09) for the follow-up flow."

---

## Skill Chaining

After writing copy, suggest next steps based on what's missing:

> Copy is done. Here's what typically comes next:
>
> 1. **Frontend Design** — Turn this copy into a production-ready page
> 2. **Lead Magnet** (05) — Create the opt-in offer your landing page promotes
> 3. **Email Sequences** (09) — Build the follow-up flow for new leads
> 4. **Content Atomizer** (10) — Extract social content from your landing page copy
>
> Run the **Orchestrator** (01) if you're not sure which to prioritize.
