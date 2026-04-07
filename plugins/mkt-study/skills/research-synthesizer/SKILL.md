---
name: research-synthesizer
description: "Cross-analyze your market, competitive, and customer research into a unified strategy brief with actionable recommendations. Use when user mentions: strategy brief, research synthesis, cross-analysis, strategic recommendations, synthesize research, combine research, research summary, strategy recommendations, strategic insights, research brief, action plan from research, what does our research tell us, connect the dots, research report, wrap up research"
user-invocable: true
---

# Research Synthesizer

> Cross-analyze your market, competitive, and customer research into a unified strategy brief.
> No external tools — pure synthesis of research-memory/ data. Output bridges research → execution.

---

## Purpose

Research Synthesizer is the **bridge between research and action**. It answers:
- What do all our research findings mean *when connected together*?
- Where do market trends, competitive gaps, and customer needs *intersect*?
- What should we do first, and why?

The output — `research-memory/strategy-brief.md` — translates scattered research data into a **unified strategy** that every execution skill (copy, SEO, email, lead magnet, etc.) can act on.

> "Lots of research without synthesis is just a pile of data." — The Boring Marketer

**Key distinction**: This skill creates NO new data. It reads everything in research-memory/ and finds the **connections** that individual skills cannot see on their own.

**Enrichment chain**: This skill → `expert-validator` (adds expert consensus/divergence).

---

## Modes

| Mode | When to Use | Behavior |
|------|-------------|----------|
| **Full Synthesis** | No `strategy-brief.md` exists, or it's an empty scaffold | Run all 5 steps from scratch |
| **Refresh** | `strategy-brief.md` already has data | Check `research-log.md` for files updated since last synthesis → re-run affected cross-analyses only |

---

## Auto-Load Protocol

On every invocation, BEFORE any analysis:

1. **Check `research-memory/` directory**
2. If files exist → Read ALL `.md` files (except README.md)
3. **Verify required files exist AND have substantive content**:
   - `market-landscape.md` — REQUIRED (market definition, size, trends, structure)
   - `competitive-intel.md` — REQUIRED (competitive set, positioning, channels)
   - `customer-insight.md` — REQUIRED (segments, journey, pain points)
   - `customer-language.md` — OPTIONAL (enriches Cross-Analysis 2 with real customer phrases)
4. **If any REQUIRED file is missing or empty scaffold**:
   - Name the missing file(s) and the skill that produces it
   - Suggest: "Run [skill-name] first, then come back for synthesis"
   - **STOP** — do not attempt partial synthesis
5. **Assess data richness** for each file: Rich / Adequate / Thin
   - Tag thin sections: "Cross-analysis may be limited here — consider re-running [skill] for deeper data"
6. **Check `brand-memory/`** (read-only) → If exists, use positioning and voice info to align recommendations with brand direction
7. If `strategy-brief.md` has data → **suggest Refresh mode**

---

## Input Gathering

This skill requires **minimal user input** — research-memory/ is the primary data source.

| Field | Required | Description |
|-------|----------|-------------|
| Business goal | Optional | Current priority (growth, market entry, pivot, retention) — shapes recommendation priority |
| Analysis focus | Optional | Specific cross-analysis area (e.g., "pricing vs competitors", "messaging-market fit") |
| Constraints | Optional | Budget, team size, timeline — grounds Next Steps in reality |
| Language | Optional | 결과물 작성 언어 (default: English) |

**If brand-memory/ exists**, auto-extract business context — no need to ask.

**If this is a Refresh**, show which research files changed since last synthesis and ask: "Want me to update the affected sections?"

---

## Process

### Step 1: Load & Validate Research Data

**Goal**: Load all research-memory/ files and confirm sufficient data for cross-analysis.

1. Read all `.md` files in `research-memory/`
2. Verify 3 required files have content (not just scaffold headers)
3. From each file, extract key data points needed for cross-analysis:
   - **market-landscape.md** → Macro Trends (opportunity/threat tags), Market Structure Map, Seasonality
   - **competitive-intel.md** → Competitive Set, Positioning Matrix, Channel Activity Matrix, Gaps & Opportunities
   - **customer-insight.md** → Audience Segments (with priority), Pain Points & Unmet Needs, Media Consumption Map
   - **customer-language.md** (if exists) → Pain Expressions, Desire Expressions, Trigger Phrases
4. Tag each data area: Rich / Adequate / Thin
5. If brand-memory/ exists → load positioning, target audience, brand voice for alignment check
6. For Refresh mode → compare `research-log.md` timestamps to identify what changed

**Output**: Data inventory with richness assessment. Proceed to Step 2 only if all 3 required files pass.

---

### Step 2: Cross-Analysis (3 Matrices)

This is the **core** of the skill. Each cross-analysis combines TWO OR MORE data sources to reveal insights that no single source shows alone.

#### Cross-Analysis 1: Market Trends × Competitive Gaps → **Opportunities to Seize Now**

Connect:
- Macro Trends tagged as "Opportunity" (from market-landscape.md)
- Gaps & Opportunities + Channel Activity gaps (from competitive-intel.md)

**Analysis framework**:
```
For each Opportunity trend:
→ Is there a competitive gap aligned with this trend?
→ If YES: This is a "seize now" opportunity
→ Rate: Urgency (High/Med/Low) based on trend timeframe + gap openness
→ Rate: Attractiveness (High/Med/Low) based on market size of trend + depth of gap
```

**Output format**:

| # | Trend | Gap | Opportunity | Urgency | Attractiveness |
|---|-------|-----|-------------|---------|----------------|
| 1 | [from market-landscape] | [from competitive-intel] | [synthesized insight] | H/M/L | H/M/L |

---

#### Cross-Analysis 2: Customer Pain × Competitor Weakness → **Messaging We Can Own**

Connect:
- Pain Points & Unmet Needs (from customer-insight.md)
- Positioning Matrix weaknesses + Messaging gaps (from competitive-intel.md)
- Customer Language (from customer-language.md, if available)

**Analysis framework**:
```
For each High-severity Pain Point:
→ Which competitors address this? Which don't?
→ If UNDERSERVED: This is a messaging opportunity
→ Find matching customer language (exact phrases from customer-language.md)
→ Draft a messaging direction that speaks to the pain in customer's own words
```

**Output format**:

| # | Customer Pain | Competitor Weakness | Messaging Direction | Customer Language |
|---|--------------|--------------------|--------------------|-------------------|
| 1 | [from customer-insight] | [from competitive-intel] | [synthesized messaging angle] | "[exact phrase]" or N/A |

---

#### Cross-Analysis 3: Market Structure × Audience Segments → **Best Entry Point**

Connect:
- Market Structure Map — price tiers, channels, sub-categories (from market-landscape.md)
- Audience Segments with priority ranking (from customer-insight.md)

**Analysis framework**:
```
For the Primary Segment:
→ Which price tier do they occupy? Is this tier crowded or open?
→ Which channels are they on? (cross-ref with Media Consumption Map)
→ Which sub-category aligns best with their needs?
→ Rate entry feasibility: Easy / Moderate / Hard

Repeat for Segment 2 if data is sufficient.
```

**Output format**:

| # | Segment | Price Tier | Channel | Sub-Category | Entry Feasibility | Priority |
|---|---------|-----------|---------|-------------|-------------------|----------|
| 1 | [from customer-insight] | [from market-landscape] | [cross-ref] | [fit] | E/M/H | 1st |

---

### Step 3: Strategic Recommendations (3-5)

**Goal**: Distill cross-analyses into 3-5 actionable strategic recommendations.

For each recommendation, provide:

| Element | Description |
|---------|-------------|
| **What** | Specific action to take |
| **Why** | Which cross-analysis (CA1/CA2/CA3) + specific insight supports this |
| **Priority** | High / Medium / Low — based on urgency × impact |
| **Effort** | Quick Win (1-2 weeks) / Mid-term (1-3 months) / Long-term (3-6 months) |

**Prioritization logic**:
- High Priority + Quick Win → Do first
- High Priority + Long-term → Plan now, start building
- Medium Priority + Quick Win → Easy wins to stack
- Low Priority → Park for later

If user provided business goals → weight recommendations toward that goal.
If brand-memory/ loaded → check each recommendation against brand positioning for consistency.

---

### Step 4: Immediate Next Steps (3-5)

**Goal**: Turn the highest-priority Quick Win recommendations into concrete action items linked to execution skills.

For each Next Step:

| Element | Description |
|---------|-------------|
| **Action** | Specific, concrete task ("Write landing page targeting [segment] with [messaging angle]") |
| **Execution Skill** | Which marketing skill to use (e.g., `06-direct-response-copy`, `05-lead-magnet`) |
| **Input from Research** | What research data feeds this action (specific files + sections) |
| **Timeline** | Estimated time to complete |
| **Success Metric** | How to measure if it worked |

**Skill connection map**: `03-positioning-angles` (positioning) · `06-direct-response-copy` (landing pages/ads) · `05-lead-magnet` (free offers) · `09-email-sequences` (email flows) · `07-seo-content` (SEO articles) · `08-newsletter` (newsletter) · `10-content-atomizer` (repurposing) · `04-keyword-research` (keywords)

---

### Step 5: Save & Log

**Goal**: Write all findings to `research-memory/strategy-brief.md` and log the execution.

#### 5a. Write strategy-brief.md

**Language rule**: 섹션 헤더와 테이블 컬럼명은 영어로 유지합니다. 본문, 셀 값, 설명, 분석 텍스트는 사용자가 지정한 언어로 작성합니다. 언어가 지정되지 않으면 English로 작성합니다.

Use the exact schema from `references/strategy-brief-schema.md`. Key rules:
- Tag every authored section with `[research-synthesizer]`
- Leave `[expert-validator]` sections (Expert Consensus, Expert Divergence) as empty scaffold
- Executive Summary: 5-7 findings, each with source file tags like `[market + competitive]`
- Cross-Analysis tables: Use Step 2 output formats
- Strategic Recommendations: Use Step 3 format (What / Why / Priority / Effort)
- Immediate Next Steps: Use Step 4 format (Action / Skill / Input / Timeline / Metric)

**For Refresh mode**: Do NOT overwrite the entire file. Update only sections affected by changed research data. Preserve all `[expert-validator]` sections untouched. Append `> Updated: [date]` below changed section headers.

#### 5b. Update research-log.md

Append one row to the log:

```
| [YYYY-MM-DD] | research-synthesizer | Full Synthesis / Refresh | [key insights summary] | None (internal analysis) |
```

---

## Analysis Quality Standards

**Good synthesis** = connects 2+ sources → points to specific action → uses concrete data → acknowledges gaps.

**Bad synthesis** (avoid) = restates single-source findings as "insights" → makes unsourced claims → generic recommendations like "improve marketing."

**Data gaps**: Tag thin cells with `⚠️ Limited data — run [skill] for deeper insight`. Never fabricate connections. 2 strong cross-analyses + 1 flagged > 3 weak ones.

---

## Quality Checklist

Before saving, verify:

- [ ] All 3 cross-analyses completed (CA1: Trends×Gaps, CA2: Pain×Weakness, CA3: Structure×Segments)
- [ ] Each cross-analysis connects 2+ data sources (not single-source summaries)
- [ ] Every insight traces back to specific files and sections in research-memory/
- [ ] Executive Summary has 5-7 findings with source file tags
- [ ] 3-5 strategic recommendations, each with What/Why/Priority/Effort
- [ ] 3-5 next steps linked to specific execution skills
- [ ] Data gaps flagged honestly (not papered over)
- [ ] `[research-synthesizer]` tag on all authored sections
- [ ] `[expert-validator]` sections left as empty scaffold
- [ ] research-log.md updated with execution record

---

## Example (Abbreviated)

**Context**: research-memory/ contains data from market-scanner, competitor-finder, competitor-analyzer, audience-profiler, and voice-of-customer — all about "Marketing skill packs for solo marketers."

> **Executive Summary**:
> 1. AI marketing education market growing 12-15% CAGR, but "ready-to-use skill packs" is an empty niche [market + competitive]
> 2. Top competitor weakness: all teach theory, none provide plug-and-play execution templates [competitive + customer]
> 3. Primary segment (solo marketers, 25-40) converts via newsletter → free resource → purchase [customer]
> 4. Customer language centers on "just tell me what to do" — execution anxiety is the #1 pain [customer-language + customer]
> 5. Twitter/X and newsletter are the highest-ROI channels; competitors underinvest in email [competitive + customer]
>
> **CA1 — Opportunity**: AI democratization trend (🟢) × No "AI + templates" competitor = "The AI Marketing Execution Pack" positioning
>
> **CA2 — Messaging**: "I learn but can't apply" pain × Competitors only teach theory = "Stop learning. Start doing." (customer phrase: "just give me something I can copy-paste")
>
> **CA3 — Entry Point**: Solo marketers (Primary) × $99-$299 tier × Newsletter channel = DTC newsletter funnel as entry
>
> **Next Steps**:
> 1. Write landing page with "Stop learning, start doing" angle → `06-direct-response-copy`
> 2. Create free "5 AI Marketing Templates" lead magnet → `05-lead-magnet`
> 3. Build welcome email sequence (newsletter → free → paid) → `09-email-sequences`

---

## What This Skill Does NOT Do

- **Collect new data** → This skill reads existing research-memory/ ONLY. For new data, run the appropriate research skill.
- **Expert validation** → Use `expert-validator` (adds multi-agent expert review)
- **Market research** → Use `market-scanner`, `competitor-finder`, `audience-profiler`, `voice-of-customer`
- **Execute marketing** → Use execution skills (copy, SEO, email, etc.) — this skill tells you WHAT to execute and WHY

Research Synthesizer stays focused on **connecting dots** — finding the strategic meaning where different research streams intersect.
