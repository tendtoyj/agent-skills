---
name: keyword-research
description: "Find what to write and target using the 6 Circles Method for keyword discovery and content prioritization. Use when user mentions: keyword research, SEO keywords, content strategy, content planning, keyword analysis, search terms, ranking opportunities, content pillars, SEO opportunities, programmatic SEO, keyword gaps, content calendar, what to write, traffic strategy, organic traffic, long-tail keywords"
user-invocable: true
---

# Keyword Research Skill

> **Trigger keywords**: keyword research, SEO keywords, content strategy, content planning, keyword analysis, search terms, ranking opportunities, content pillars, SEO opportunities, programmatic SEO, keyword gaps, content calendar, what to write, traffic strategy, organic traffic, search volume, long-tail keywords, content prioritization, what should I write about, SEO plan, content roadmap

Find what to write, what to target, and what to publish first. This skill uses the **6 Circles Method** to surface keyword opportunities competitors miss — then turns them into a prioritized content plan with 60-90 day quick wins.

Not a keyword dump. A decision engine that tells you: "Write THIS, in THIS format, targeting THIS audience, and publish it FIRST."

This skill powers the Traffic Stack:

```
KEYWORD RESEARCH → SEO Content → Content Atomizer
Keyword strategy, gaps → Ranking content → 15+ social assets per piece
```

---

## Brand Memory Protocol

Before executing, check for the `brand-memory/` directory.

- If `positioning.md` exists → align keyword direction with the chosen positioning angle
- If `audience.md` exists → use target audience pain points and search behavior to generate seed keywords
- If `voice-profile.md` exists → consider brand tone when recommending content types
- If none exist → warn the user:

> "No brand memory found. I can still do keyword research, but it'll be less targeted. For best results, run **Brand Voice** and **Positioning Angles** first to establish your foundation."

Proceed with user-provided business context if they want to continue anyway.

---

## Three Modes

Detect mode from user intent:

> **Mode 1 — Discover**: Generate a keyword universe from business context. Score every keyword through the 6 Circles. Output a prioritized list.
>
> **Mode 2 — Strategize**: Organize keywords into content pillars. Map keywords to content types. Identify quick wins and programmatic SEO patterns. Produce a 60-90 day content roadmap.
>
> **Mode 3 — Analyze**: Compare your keyword coverage against competitors. Find content gaps across 6 dimensions. Surface opportunities they rank for and you don't.

**Auto-detection logic:**
- "What should I write about?" or "I need keyword research" → Mode 1 (full flow into Mode 2)
- "Create a content plan" or "what content should I prioritize?" → Mode 2
- "What keywords are my competitors ranking for?" or "find content gaps" → Mode 3
- Ambiguous → start at Mode 1, flow into Mode 2

---

## Input Gathering

Before starting, collect (or load from brand memory):

1. **What's your business?** — What you do, what you sell, what makes you different. Load from `positioning.md` if available.
2. **Who's the target audience?** — Specific people. Load from `audience.md` or ask. "When they have a problem, what do they type into Google?"
3. **Current website/content?** — What pages and content exist already? (Helps identify gaps vs. duplication.)
4. **Main competitors?** — 2-3 companies to benchmark against. Who shows up when your audience searches?
5. **Goal?** — What does traffic need to do: generate leads, drive sales, build authority, or grow brand awareness? (Filters keyword intent.)
6. **Market scope?** — Local (city/region) vs. national vs. global? (Critical for programmatic SEO patterns.)
7. **Language** (Optional) — 결과물 작성 언어. Default: English.

If brand memory covers items 1-2, confirm and move on. Don't re-ask what's already documented.

---

## Mode 1: Discover

Generate and score keyword opportunities using the 6 Circles Method.

### Step 1: Generate Seed Keywords

Pull from three sources:

1. **Business expertise** — Core topics you can write about with authority. From `positioning.md` and user input.
2. **Audience pain points** — What they search when they're struggling. From `audience.md` or direct input.
3. **Product/service terms** — Direct descriptions of what you offer.

Aim for 10-20 seed keywords across these three sources.

### Step 2: Expand

Take each seed keyword and expand in 6 directions:

| Method | Example (seed: "HVAC marketing") |
|--------|----------------------------------|
| **Modifier** | best HVAC marketing, HVAC marketing ideas, HVAC marketing agency |
| **Long-tail** | how to market HVAC business in small town |
| **Question** | how do HVAC companies get more customers? |
| **Related topic** | home services lead generation, contractor advertising |
| **Competitor-derived** | keywords competitor ranks for that relate to your seeds |
| **Programmatic pattern** | HVAC marketing in [city], HVAC marketing for [segment] |

Target: 50-100 expanded keywords from the seed set.

### Step 3: Score with 6 Circles

The 6 Circles Method evaluates every keyword through 6 lenses. A keyword that scores high across multiple circles is gold.

| Circle | The Question | Score |
|--------|-------------|-------|
| **1. Business Expertise** | Can we write about this with real authority? | H / M / L |
| **2. Audience Pain** | Does our target audience actually search this when they're hurting? | H / M / L |
| **3. Search Volume** | Is there enough monthly search traffic to matter? | H / M / L |
| **4. Competition Gap** | Are competitors missing this, or is it wide open? | H / M / L |
| **5. Purchase Intent** | Is someone searching this close to buying? | H / M / L |
| **6. Content Gap** | Are the current top results low-quality or outdated? | H / M / L |

**Scoring values**: High = 3, Medium = 2, Low = 1

**Priority Score formula** (weighted sum):

```
Priority = (Expertise × 1.0) + (Pain × 1.5) + (Volume × 1.0)
         + (Competition Gap × 1.5) + (Intent × 1.2) + (Content Gap × 0.8)
```

Weights reflect what matters most: audience fit (Pain) and ability to win (Competition Gap) outweigh raw volume.

**Priority tiers:**
- **Tier A** (top 20%): Write these first. High overlap across circles.
- **Tier B** (middle 40%): Strong candidates. Schedule after Tier A.
- **Tier C** (bottom 40%): Lower priority. Revisit if Tier A/B are complete.

**Star rule**: Any keyword scoring High on 3+ circles = ★ (top priority regardless of total score).

### Step 4: Output the Keyword Opportunity Table

Present the top 15-25 keywords:

```
| Keyword | Vol | Difficulty | Intent | 6-Circle Score | Tier | Content Type |
|---------|-----|-----------|--------|---------------|------|-------------|
| hvac marketing phoenix | M | Easy | Commercial | 14.3 ★ | A | Location page |
| how to get more plumber leads | M | Easy | Informational | 13.1 ★ | A | Blog post |
| contractor marketing agency | H | Hard | Transactional | 11.8 | B | Landing page |
```

**Intent classification**:
- **Informational**: Learning, researching ("how to", "what is", "guide")
- **Navigational**: Looking for a specific brand/site
- **Commercial**: Comparing, evaluating ("best", "vs", "review", "top")
- **Transactional**: Ready to act ("buy", "hire", "book", "pricing", "near me")

---

## Mode 2: Strategize

Turn the keyword list into an actionable content plan.

### Content Pillar Construction

Group keywords into 2-4 thematic clusters. Each cluster becomes a content pillar:

```
Pillar: [Theme Name]
├── Pillar page (comprehensive guide — targets the broadest keyword)
├── Supporting article 1 (targets a specific long-tail)
├── Supporting article 2
├── Supporting article 3
├── FAQ page (clusters question-based keywords)
└── Comparison page (vs / alternative keywords)
```

For each pillar:
- Core keyword and 5-10 supporting keywords
- Recommended content types per keyword
- Internal linking structure (supporting pages → pillar page)
- Funnel stage mapping: Awareness / Consideration / Decision

### Programmatic SEO Pattern Detection

Check if the keyword set contains repeatable patterns that can scale:

| Pattern | Template | Example | Scale Potential |
|---------|----------|---------|----------------|
| **[Service] in [Location]** | Same structure, location-specific data | "HVAC marketing in Phoenix" | 50+ cities |
| **[Product] for [Audience]** | Same structure, audience-specific angles | "CRM for freelancers" | 10-30 segments |
| **[Tool A] vs [Tool B]** | Comparison framework | "Mailchimp vs ConvertKit" | 20+ combinations |
| **[Template] for [Use Case]** | Same structure, use-case-specific | "invoice template for contractors" | 30+ use cases |
| **Best [Category] in [Location]** | List/review framework | "best marketing agency in Austin" | 50+ markets |

**Evaluation criteria for programmatic sets:**
- **Scale**: Can this generate 50+ unique pages? (If yes, worth building the template.)
- **Uniqueness**: Will each page have enough distinct content? (Avoid thin pages.)
- **Combined volume**: Individual keywords may be low, but combined across variations — is it significant?
- **Automation fit**: Can a template + data produce good pages, or does each need manual effort?

If a strong programmatic pattern is found, flag it prominently: "This is your biggest organic traffic lever."

### Quick Wins Identification

The most critical output. Quick wins = keywords you can realistically rank for within 60-90 days.

**Quick win criteria** (must meet all):
- Competition Gap = High (competitors are weak or absent)
- Search Volume ≥ Medium (enough traffic to matter)
- Content Gap = High (current top results are poor)
- Creation difficulty ≤ Medium (you can produce this content well)
- Expertise coverage = at least Medium (you can write with authority)

For each quick win, provide:
- **Target keyword** and search intent
- **Recommended content format**: Blog post, guide, comparison, location page, tool
- **Suggested title** (applying brand voice)
- **Structural outline**: H1, 3-5 H2s, estimated word count
- **PAA (People Also Ask) questions** to answer within the content
- **Lead magnet integration point**: Where to embed an opt-in (inline CTA, content upgrade, modal)
- **Estimated effort**: Low / Medium / High

```
### Quick Win #1: [Keyword]
Intent: [Type] | Volume: [H/M/L] | Competition: [Easy]
Format: [Content type] | Effort: [Low/Med]

**Suggested title**: "[Title applying brand voice]"

**Outline**:
- H1: [Title]
- H2: [Subtopic 1]
- H2: [Subtopic 2]
- H2: [Subtopic 3]
- H2: FAQ (answer PAA questions)
- [Lead Magnet CTA: embed [lead magnet name] opt-in here]

**Target**: ~[N] words | **PAA to answer**: [list 3-5 questions]
```

This format is designed to hand off directly to the **SEO Content** skill.

### 60-90 Day Content Roadmap

Organize everything into a time-based execution plan:

```
Week 1-2:   Quick Wins 1-3 (lowest effort, fastest potential impact)
Week 3-4:   Quick Wins 4-6 + begin Pillar Page 1
Week 5-8:   Pillar 1 supporting content + Quick Wins 7-10
Week 9-12:  Pillar 2 launch + Programmatic SEO set (if applicable)
Ongoing:    4-8 pieces per month, performance review, adjust priorities
```

**Publishing principles** (non-negotiable):
- Don't publish everything at once. Consistent velocity signals authority to search engines.
- One excellent piece beats five mediocre ones. Quality > quantity.
- Every piece gets a human checkpoint before publishing: fact-check claims, add unique perspective, remove AI tells.
- Monitor what performs and adjust the plan monthly. The roadmap is a starting point, not a fixed contract.

---

## Mode 3: Analyze

Compare your keyword position against competitors. Find the gaps they've covered that you haven't.

### Competitor Keyword Comparison

For each competitor (2-3), analyze:

| Dimension | What to Check |
|-----------|--------------|
| **Keyword overlap** | Which keywords do you both target? Who ranks higher? |
| **Keyword gaps** | What do they rank for that you don't cover at all? |
| **Content depth** | How deep is their content? Average word count, topic breadth, publishing frequency. |
| **SERP features** | Do they own featured snippets, People Also Ask, or image packs? |
| **Backlink signals** | What kind of content earns them links? Can you create something better? |

Output a comparison table:

```
| Dimension | You | Competitor A | Competitor B | Gap/Opportunity |
|-----------|-----|-------------|-------------|-----------------|
| Keywords ranking | ~50 | ~200 | ~120 | Major gap |
| Content pieces | 15 | 80 | 45 | Need volume |
| Avg. content depth | 1,200 words | 2,000 words | 800 words | B is beatable |
| SERP features owned | 2 | 15 | 5 | Snippet opportunity |
| Publishing frequency | 2/month | 8/month | 4/month | Increase cadence |
```

### Content Gap Analysis (6 Dimensions)

Go deeper than keywords — analyze what's *missing* from your content ecosystem:

1. **Topic gaps** — Subjects competitors cover that you don't. Direct opportunities.
2. **Format gaps** — Content types competitors use that you lack (videos, tools, comparisons, glossaries).
3. **Funnel gaps** — Missing content at specific buyer stages (lots of awareness content but nothing for decision stage).
4. **Freshness gaps** — Your existing content that hasn't been updated in 12+ months.
5. **Depth gaps** — Pages under 500 words that lack substance versus competitor deep-dives.
6. **SERP feature gaps** — Featured snippets, PAA boxes, or image packs your competitors own.

For each gap, output:

```
| Gap Type | Topic/Area | Why It Matters | Priority | Effort |
|----------|-----------|---------------|----------|--------|
| Topic | "contractor SEO guide" | Competitor A ranks #3, we have nothing | High | Medium |
| Format | Video tutorials | Competitor B gets 40% traffic from YouTube | Medium | High |
| Funnel | Pricing comparisons | Nothing for decision-stage searchers | High | Low |
```

### Gap → Opportunity Conversion

Turn every significant gap into a concrete content recommendation:
- Target keyword and intent
- Recommended format and word count
- How it connects to existing content pillars
- Priority tier (A/B/C based on 6 Circles scoring)

---

## Business Type Strategy Guide

Different businesses need different keyword strategies:

| Business Type | SEO Role | Intent Focus | Programmatic Fit | Pillar Direction |
|--------------|----------|-------------|-----------------|-----------------|
| **Info / Education** | Secondary (Traffic → Nurture) | Informational | Medium (topic expansion) | How-to guides, tutorials, courses |
| **Consulting / Agency** | Primary (Foundation → Traffic) | Commercial | High ([service] in [location]) | Expertise proof, case studies, comparisons |
| **E-commerce** | Primary (Conversion → Traffic) | Transactional | High ([product] for [audience]) | Product comparisons, reviews, categories |
| **SaaS** | Secondary (Traffic = SEO) | Commercial + Informational | Medium ([tool] vs [tool]) | Feature comparisons, integrations, use cases |

Use this to calibrate the overall strategy: which intent types to prioritize, whether programmatic SEO is viable, and what content pillars look like.

---

## Quality Checklist

Before delivering, self-audit:

- [ ] **6 Circles applied**: Every keyword scored across all 6 dimensions? No guessing.
- [ ] **Quick wins identified**: At least 3 keywords with clear path to ranking in 60-90 days?
- [ ] **Content pillars formed**: 2-4 focused themes, not 10 scattered topics?
- [ ] **Programmatic patterns checked**: If applicable, pattern + scale assessment included?
- [ ] **Intent classified**: Every keyword tagged as Informational / Commercial / Transactional?
- [ ] **Business type aligned**: Strategy matches the business model (not generic advice)?
- [ ] **Zero-to-one value**: Does this give a clear starting point, not information overload?
- [ ] **Roadmap is realistic**: Publishing cadence the user can actually maintain?
- [ ] **SEO Content handoff ready**: Quick wins include structural outlines (H1, H2s, word count, PAA)?
- [ ] **AI-tell free**: No "delve", "landscape", "paradigm", "leverage", "synergy", "tapestry", "unleash"
- [ ] **Human checkpoint noted**: Reminder that all content needs fact-checking before publishing?

If any item fails, revise before presenting.

---

## Example: Boring Money Agency

Based on the "Boring Money" demo — an AI marketing agency for trade businesses.

**Input:**
- Business: AI marketing agency targeting $2-10M local service businesses
- Audience: HVAC, plumbing, roofing, electrician business owners
- Positioning: "You've fired enough marketing agencies. Try the one that delivers in days not months."
- Competitors: Scorpion, ServiceTitan Marketing
- Goal: Organic traffic → lead magnet → consultation booking
- Market: US, city-level local targeting

### Discover Output (6 Circles Scoring)

| Keyword | Exp | Pain | Vol | Comp Gap | Intent | Content Gap | Score | Tier |
|---------|-----|------|-----|----------|--------|-------------|-------|------|
| HVAC marketing in Phoenix | H | H | M | H | Commercial | H | 15.3 | ★ A |
| plumber SEO near me | H | H | L | H | Commercial | H | 13.8 | ★ A |
| how to get more HVAC leads | H | H | M | M | Informational | M | 12.6 | A |
| contractor marketing agency | M | H | H | L | Transactional | L | 10.4 | B |
| best marketing for roofers | H | H | L | H | Commercial | M | 13.1 | ★ A |
| home services advertising cost | M | H | M | M | Commercial | H | 12.5 | A |

### Strategize Output

**Programmatic SEO pattern detected:**

`[trade] marketing in [city]`
- Trades: HVAC, plumbing, roofing, electrician, landscaping (5)
- Cities: Phoenix, Dallas, Houston, Atlanta, Denver... (50+)
- Potential: 250+ pages from one template
- Individual volume: Low per keyword, but combined = significant long-tail traffic
- **"This is your biggest organic traffic lever."**

**Quick Win #1: "HVAC marketing in Phoenix"**

Intent: Commercial | Volume: Medium | Competition: Easy
Format: Local SEO guide | Effort: Medium

**Suggested title**: "HVAC Marketing in Phoenix: The No-BS Guide to Getting More Jobs"

**Outline**:
- H1: HVAC Marketing in Phoenix: The No-BS Guide to Getting More Jobs
- H2: Why Phoenix HVAC Companies Are Losing Jobs to Competitors Online
- H2: 5 Marketing Strategies That Actually Work for Phoenix HVAC
- H2: How to Choose a Marketing Partner (Without Getting Burned Again)
- H2: FAQ — What Phoenix HVAC Owners Ask About Marketing
- [Lead Magnet CTA: embed Five-Minute Marketing Audit modal here]

**Target**: ~2,000 words | **PAA**: "How much should HVAC companies spend on marketing?", "Do HVAC companies need SEO?", "What is the best advertising for HVAC?"

→ Hand this directly to the **SEO Content** skill to write the full page.

---

## Saving & Handoff

After completing keyword research:

**Language rule**: 섹션 헤더와 테이블 컬럼명은 영어로 유지합니다. 본문, 셀 값, 설명, 분석 텍스트는 사용자가 지정한 언어로 작성합니다. 언어가 지정되지 않으면 English로 작성합니다.

1. **Save outputs** to the project folder:
   - Keyword list: `keyword-opportunities.md`
   - Content plan: `content-roadmap.md`
   - Competitor analysis (if Mode 3): `competitor-keyword-analysis.md`

2. **Update brand memory**: If `brand-memory/campaigns.md` exists, log the keyword strategy with date, target keywords, and planned content.

3. **Suggest next steps:**

> Keyword research is complete. Here's what comes next:
>
> 1. **SEO Content** — Write the quick win pages using the outlines above. Start with Quick Win #1.
> 2. **Content Atomizer** — Turn each published piece into 15+ social assets.
> 3. **Lead Magnet** — If you don't have one yet, build the opt-in offer that captures traffic from these pages.
>
> Run the **Orchestrator** if you're not sure what to prioritize.
