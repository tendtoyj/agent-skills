---
name: audience-profiler
description: "Profile your target audience — segments, buying journey, pain points, and media habits. Use when user mentions: audience research, customer segments, buyer persona, buyer journey, customer journey, pain points, target audience, customer profiling, audience profiling, who is my customer, media consumption, attention map, customer insight, audience analysis, ideal customer, ICP, customer needs, unmet needs, buying behavior"
user-invocable: true
---

# Audience Profiler

> Profile your target audience — segments, buying journey, pain points, and media habits.
> Uses Perplexity for deep customer research. Output feeds voice-of-customer, copy, email, and every execution skill.

---

## Purpose

Audience Profiler answers the question **"Who are we selling to?"** in deep, actionable detail. It produces:
- 2-4 prioritized buyer segments with clear profiles
- A full buying journey map for the primary segment
- Pain points classified by type, severity, and frequency
- A media consumption & attention map showing where your audience actually spends time

The output — `research-memory/customer-insight.md` — becomes the **customer foundation** that voice-of-customer, copywriting, email sequences, SEO, and all execution skills reference.

> "30-60 minutes of boring research = exceptional output for everything that follows." — The Boring Marketer

**Relationship to Market Scanner**: Market Scanner maps *the market*. Audience Profiler maps *the people in that market*.

---

## Modes

| Mode | When to Use | Behavior |
|------|-------------|----------|
| **Full Profile** | No `customer-insight.md` exists, or it's an empty scaffold | Run all 5 steps from scratch |
| **Refresh** | `customer-insight.md` already has data | Check `research-log.md` for last scan date → update only changed sections |

---

## Auto-Load Protocol

On every invocation, BEFORE any research:

1. **Check `research-memory/` directory**
2. If files exist → Read ALL `.md` files (except README.md)
3. Use loaded context to:
   - **From `market-landscape.md`**: Pull market structure, customer segments dimension, and trends → use as foundation for segment definition (Step 1)
   - **From `competitive-intel.md`**: Pull competitor target audiences → identify underserved segments and positioning gaps
   - Skip already-covered areas (avoid redundancy)
   - Build on existing findings (deepen, not repeat)
4. **Check `brand-memory/`** (read-only) → If exists, extract target audience info from `voice-profile.md` and `positioning.md` → pre-fill input fields
5. If `customer-insight.md` has data AND `research-log.md` shows a previous profile → **suggest Refresh mode**

---

## Input Gathering

Collect from the user conversationally. Do NOT dump a form — ask naturally.

| Field | Required | Description |
|-------|----------|-------------|
| Product / Service description | YES | What are you selling? |
| Known target audience | YES | Who are you currently selling to (or want to sell to)? |
| Price range / Business model | Optional | B2B high-ticket vs B2C impulse buy → affects journey complexity |
| Existing customer data | Optional | Current customer traits, popular segments, churn patterns |
| Research focus | Optional | Specific area of interest (new segment discovery, deepen existing, etc.) |
| Research intensity | Optional | "light" / "standard" / "deep" (default: deep) — 리서치 깊이와 수집량 조절 |
| Language | Optional | 결과물 작성 언어 (default: English) |

**If brand-memory/ exists**, pre-fill from `voice-profile.md` and `positioning.md` — ask user to confirm or correct.

**If market-landscape.md exists**, extract the "By Customer Segment" dimension and propose segment candidates — ask user to confirm, modify, or expand.

**If this is a Refresh**, show the current customer-insight.md summary and ask: "What has changed or what do you want to update?"

---

## Research Intensity

사용자가 명시적으로 요청하면 리서치 깊이를 조절합니다. 지정하지 않으면 `deep` (기본값).

| Level | search_context_size | 수집량 | 용도 |
|-------|--------------------|----|------|
| `light` | low | 축소 (~50%) | 빠른 감 잡기 |
| `standard` | medium | 보통 (~75%) | 일반 리서치 |
| `deep` | high | 전체 (100%) | 본격 리서치 |

> "가볍게", "빠르게", "간단히" → light / "보통으로", "적당히" → standard / 별도 지정 없음 → deep

---

## Process

### Step 1: Define Audience Segments

**Goal**: Identify 2-4 distinct buyer segments and prioritize them.

**Tool**: `perplexity_reason` (requires analytical reasoning for prioritization)

**Query pattern**:
```
Who are the distinct buyer segments for [product/service] in the [market category] market?

For each segment, define:
- Demographics: age range, role/title, company size (if B2B), geography
- Key characteristics: behavioral patterns, tech savviness, buying habits
- Estimated relative size: approximate % of the addressable market
- Accessibility: how easy to reach through digital marketing channels (easy/medium/hard)
- Willingness to pay: price sensitivity level (high/medium/low)

Prioritize segments by: size x accessibility x willingness to pay.
Identify 2-4 distinct segments — not overlapping personas.
Base this on real market data, not hypothetical archetypes.
```

**Parameters**:
- `search_context_size`: Research Intensity에 따라 결정 (light→"low" / standard→"medium" / deep→"high")

**If market-landscape.md loaded**: Append to query — "The market structure shows these customer dimensions: [paste By Customer Segment section]. Build on this foundation."

**Output**: 세그먼트 수는 intensity에 따라 결정 (light=2 / standard=2-3 / deep=2-4), 각 세그먼트에 완전한 프로필 포함.

---

### Step 2: Map Buying Journey (Primary Segment)

**Goal**: Map the complete buying journey for the #1 priority segment across 4 stages.

**Tool**: `perplexity_reason` (requires journey reasoning)

**Query pattern**:
```
Map the complete buying journey for [primary segment description] purchasing [product/service type].

For each stage:

AWARENESS:
- What triggers problem recognition?
- Where do they first look for information?
- Key touchpoints at this stage
- Typical duration

CONSIDERATION:
- What alternatives do they compare?
- What are their evaluation criteria (top 3-5)?
- Key touchpoints and channels used for research
- Main barriers or hesitations

DECISION:
- What triggers the final purchase decision?
- Who else influences or approves the decision?
- What are the final objections or friction points?
- Typical timeline from consideration to purchase

POST-PURCHASE:
- How do they measure success?
- What are the biggest churn/disappointment risks?
- What drives referrals or word-of-mouth?
- When do they become repeat buyers?

Cite real examples or data where possible.
```

**Parameters**:
- `search_context_size`: Research Intensity에 따라 결정 (light→"low" / standard→"medium" / deep→"high")

**Output**: 4-stage journey map with triggers, touchpoints, barriers, and timelines for each stage.

---

### Step 3: Pain Points & Unmet Needs

**Goal**: Catalog pain points across all segments, classified by type and severity.

**Tool**: `perplexity_ask` (fact-based collection from communities and reviews)

**Query pattern**:
```
What are the biggest pain points and unmet needs for [audience segments from Step 1] when it comes to [product/service category]?

Categorize into three types:

1. FUNCTIONAL PAINS — What current solutions fail to do. Inefficiencies, missing features, poor UX.
2. EMOTIONAL PAINS — Frustrations, anxieties, fears related to the problem or buying process.
3. SOCIAL PAINS — Peer comparison pressure, status concerns, belonging needs, professional image.

For each pain point:
- Rate severity: High / Medium / Low
- Rate frequency: Constant / Intermittent / Event-driven
- Note which segment(s) feel it most
- Cite sources: community discussions, reviews, surveys, industry reports

Also identify UNMET NEEDS — gaps that no current solution adequately addresses.
```

**Parameters**:
- `search_recency_filter`: "year"
- `search_context_size`: Research Intensity에 따라 결정 (light→"low" / standard→"medium" / deep→"high")

> light일 경우 severity High인 pain point 위주로 수집합니다.

**If competitive-intel.md loaded**: Append — "Known competitors include [list]. Identify pain points that these competitors fail to solve."

**Output**: Categorized pain points with severity/frequency tags + unmet needs (market gaps).

---

### Step 4: Media Consumption & Attention Map

**Goal**: Map where the primary segment spends time and attention online.

**Tool**: `perplexity_ask` (current data on media habits)

**Query pattern**:
```
Where does [primary segment description] spend time online and what media do they consume related to [product/service category]?

Map these 5 dimensions:

1. SOCIAL PLATFORMS: Which ones they use, and how — consume (scroll/read), engage (comment/share), or create (post/publish). Rank by time spent.

2. CONTENT FORMAT PREFERENCES: Rank these by preference — short video, long video, newsletter, blog post, podcast, social post, webinar, course/tutorial.

3. COMMUNITIES: Specific online communities — Reddit subreddits, Slack/Discord groups, Facebook groups, forums, membership communities. Name specific ones.

4. INFLUENCERS & MEDIA: Key thought leaders, publications, newsletters, YouTube channels they follow in this space. Name specific ones.

5. SEARCH BEHAVIOR: How they find information — Google, YouTube, ChatGPT/AI, Reddit, TikTok, asking peers, etc. What's their default "search engine" for this topic?

Cite any available research, surveys, or data on this audience's media habits.
```

**Parameters**:
- `search_recency_filter`: "month"
- `search_context_size`: Research Intensity에 따라 결정 (light→"low" / standard→"medium" / deep→"high")

**Output**: 5-dimension attention map with specific platform/community/influencer names.

---

### Step 5: Save & Log

**Goal**: Write all findings to `research-memory/customer-insight.md` and log the execution.

#### 5a. Write customer-insight.md

**Language rule**: 섹션 헤더와 테이블 컬럼명은 영어로 유지합니다. 본문, 셀 값, 설명, 분석 텍스트는 사용자가 지정한 언어로 작성합니다. 언어가 지정되지 않으면 English로 작성합니다.

Use the exact schema below. Fill every section with Step 1-4 findings.

```markdown
# Customer Insight
> Last updated: [YYYY-MM-DD]
> Source skill: audience-profiler

## Audience Segments
| Priority | Segment | Description | Size (Relative) | Accessibility | Willingness to Pay |
|----------|---------|-------------|-----------------|---------------|-------------------|
| 1 (Primary) | [name] | [one-line] | [%] | [easy/med/hard] | [high/med/low] |
| 2 | [name] | [one-line] | [%] | [easy/med/hard] | [high/med/low] |

### Segment 1: [Name] — Primary
**Demographics**: [age, role, company size, geography]
**Characteristics**: [behavioral patterns, tech savviness, buying habits]
**Why Primary**: [size x accessibility x willingness to pay reasoning]

### Segment 2: [Name]
**Demographics**: [age, role, company size, geography]
**Characteristics**: [behavioral patterns, tech savviness, buying habits]

[Repeat for segments 3-4 if applicable]

## Customer Journey Map (Primary Segment)

### Awareness
- **Triggers**: [what makes them realize the problem]
- **Information seeking**: [where they look first]
- **Touchpoints**: [channels/platforms at this stage]
- **Duration**: [typical time in this stage]

### Consideration
- **Alternatives compared**: [what they evaluate]
- **Evaluation criteria**: [how they judge options]
- **Touchpoints**: [channels/platforms at this stage]
- **Barriers**: [what slows them down]

### Decision
- **Purchase triggers**: [what tips them over]
- **Decision makers**: [who else is involved]
- **Key barriers**: [final objections]
- **Typical timeline**: [consideration to purchase]

### Post-Purchase
- **Success criteria**: [how they measure value]
- **Churn risks**: [what causes disappointment]
- **Referral drivers**: [what triggers word-of-mouth]

## Pain Points & Unmet Needs

### Functional Pains
| Pain Point | Severity | Frequency | Segments Affected | Current Solutions Failing |
|------------|----------|-----------|-------------------|--------------------------|
| [pain] | High/Med/Low | Constant/Intermittent/Event | [segments] | [how solutions fail] |

### Emotional Pains
| Pain Point | Severity | Frequency | Segments Affected | Underlying Fear/Frustration |
|------------|----------|-----------|-------------------|---------------------------|
| [pain] | High/Med/Low | Constant/Intermittent/Event | [segments] | [emotion] |

### Social Pains
| Pain Point | Severity | Frequency | Segments Affected | Social Dynamic |
|------------|----------|-----------|-------------------|---------------|
| [pain] | High/Med/Low | Constant/Intermittent/Event | [segments] | [dynamic] |

### Unmet Needs (Market Gaps)
[Needs that no current solution adequately addresses — these are positioning opportunities]

## Media Consumption & Attention Map

### Social Platforms
| Platform | Usage Type | Time Spent | Relevance to Marketing |
|----------|-----------|------------|----------------------|
| [platform] | Consume/Engage/Create | High/Med/Low | [why it matters] |

### Content Format Preferences
[Ranked list: #1 format > #2 > #3 > ... with brief note on each]

### Communities
| Community | Platform | Activity Type | Size/Activity Level |
|-----------|----------|--------------|-------------------|
| [name] | Reddit/Slack/Discord/FB | Active/Lurk | [size if known] |

### Influencers & Media
[Key thought leaders, publications, newsletters, channels — with names]

### Search Behavior
[Default "search engine" for this topic, alternative channels, search patterns]
```

**For Refresh mode**: Do NOT overwrite the entire file. Update only the sections that changed. Append `> Updated: [date]` below the section header for each changed section.

#### 5b. Update research-log.md

Append one row to the log:

```
| [YYYY-MM-DD] | audience-profiler | Full Profile / Refresh | [brief summary of key findings or changes] | Perplexity |
```

---

## Perplexity MCP Tool Guide

| Tool | When to Use | This Skill |
|------|-------------|------------|
| `perplexity_reason` | Analytical reasoning, prioritization | Step 1 (segment definition + ranking), Step 2 (journey mapping) |
| `perplexity_ask` | Factual Q&A, current data | Step 3 (pain points), Step 4 (media consumption) |
| `perplexity_search` | Find specific URLs/reports | Only if Steps 1-4 need survey/report source verification |

**Common parameters**:
- `search_context_size`: Research Intensity 레벨에 따라 결정 — 위 Research Intensity 테이블 참조
- `search_recency_filter`: `"month"` for media habits (Step 4), `"year"` for pain points (Step 3)

**Query best practices**:
- Be specific: Include the exact segment description in every query
- Ask for sources: Always request citations from communities, surveys, reports
- One topic per query: Don't combine segments + journey + pain points in one call
- Name names: Ask for specific communities, influencers, platforms — not generic categories
- Language: 사용자가 English 외 언어를 지정한 경우, 모든 query 끝에 "Respond in [language]."를 추가

---

## Quality Checklist

Before saving, verify:

- [ ] 세그먼트 최소 2개 (light) ~ 4개 (deep) 식별, 각각 demographics + characteristics + size estimate 포함
- [ ] Segments are PRIORITIZED with clear #1 primary segment
- [ ] Journey map covers all 4 stages (Awareness → Consideration → Decision → Post-Purchase)
- [ ] Journey map includes triggers, touchpoints, barriers, and timelines for each stage
- [ ] Pain points classified into 3 types (functional, emotional, social)
- [ ] Each pain point has severity AND frequency tags
- [ ] Unmet needs section identifies genuine market gaps
- [ ] Media map names SPECIFIC platforms, communities, and influencers (not generic)
- [ ] All Perplexity responses include source citations
- [ ] research-log.md updated with execution record

---

## Example (Abbreviated)

**Input**: "Marketing skill packs ($199) for solo marketers who want to use AI for marketing."

> **Segment 1 (Primary)**: Solo Marketers / Freelancers — 1-5yr experience, 25-40, $3K-$10K/mo revenue. AI-curious but overwhelmed. Size: ~45%, Accessibility: Easy, WTP: Medium.
>
> **Segment 2**: Small Agency Owners — 2-10 person team, $200K-$1M revenue, need to scale without hiring. Size: ~25%, Accessibility: Medium, WTP: High.
>
> **Journey (Segment 1)**: Awareness via Twitter/X AI marketing posts → Consideration comparing 3-4 courses on Reddit → Decision triggered by price < $200 + money-back guarantee → Post-Purchase success = first client win using the skills.
>
> **Top Pain Points**: Functional: tool overload, don't know which AI stack works (High/Constant). Emotional: "falling behind" anxiety as peers adopt AI (High/Constant). Social: need to prove AI competence to clients (Medium/Intermittent).
>
> **Media Map**: Twitter/X (Consume+Engage), YouTube (Consume), Reddit r/marketing (Engage). Newsletter > YouTube > Podcast preference. Communities: Indie Hackers, r/marketing, marketing Discord servers.

---

## What This Skill Does NOT Do

- **Customer language mining** → Use `voice-of-customer` (collects actual words/phrases customers use)
- **Market sizing** → Use `market-scanner` (maps market, not people)
- **Competitor analysis** → Use `competitor-finder` / `competitor-analyzer`
- **Strategic recommendations** → Use `research-synthesizer` (reads this output)

Audience Profiler stays focused on **understanding the people** — who they are, how they buy, what hurts, and where they pay attention.
