---
name: voice-of-customer
description: "Mine real customer language from communities, reviews, and forums — build a Customer Language Bank of pain expressions, desire phrases, comparison language, and purchase triggers. Use when user mentions: voice of customer, customer language, customer words, what customers say, customer feedback, review mining, community research, pain expressions, desire expressions, trigger phrases, customer quotes, language bank, VOC, customer voice, real language, how customers talk, customer sentiment, review analysis, community mining, Reddit research, forum mining"
user-invocable: true
---

# Voice of Customer

> Mine real customer language from communities, reviews, and forums.
> Uses `WebSearch` + `WebFetch` for community research — no external MCP required. Output feeds copywriting, email, SEO, and every execution skill.

---

## Purpose

Voice of Customer answers the question **"What words do our customers actually use?"** It produces a **Customer Language Bank** with four categories:

- **Pain Expressions** — Complaints, frustrations, problem descriptions
- **Desire Expressions** — Wishes, aspirations, ideal outcomes
- **Comparison Language** — How customers evaluate and compare alternatives
- **Trigger Phrases** — What finally pushes them to buy, subscribe, or switch

The output — `research-memory/customer-language.md` — is the **language foundation** that copywriting (06), SEO (07), newsletter (08), email sequences (09), and content atomizer (10) reference to write in customers' own words.

> "Every customer photo is an ad. Every review is copy. Every unboxing video is content. You're not creating marketing — you're curating what customers already give you."

**Relationship to Audience Profiler**: Audience Profiler maps *who the customer is*. Voice of Customer captures *how the customer talks*.

---

## Modes

| Mode | When to Use | Behavior |
|------|-------------|----------|
| **Full Mining** | No `customer-language.md` exists, or it's an empty scaffold | Run all 5 steps from scratch |
| **Refresh** | `customer-language.md` already has data | Check `research-log.md` for last mining date → add new expressions or strengthen weak categories |

---

## Auto-Load Protocol

On every invocation, BEFORE any research:

1. **Check `research-memory/` directory**
2. If files exist → Read ALL `.md` files (except README.md)
3. Use loaded context to:
   - **From `customer-insight.md`**: Pull segment names, pain points, and community list → use as search keyword seeds (Step 1)
   - **From `competitive-intel.md`**: Pull competitor names → generate comparison search keywords ("[competitor] review", "[competitor] alternative")
   - Build on existing findings (deepen, not repeat)
4. **Check `brand-memory/`** (read-only) → If exists, extract product name and category from `voice-profile.md` → use in search queries
5. If `customer-language.md` has data AND `research-log.md` shows a previous mining run → **suggest Refresh mode**

---

## Input Gathering

Collect from the user conversationally. Do NOT dump a form — ask naturally.

| Field | Required | Description |
|-------|----------|-------------|
| Product / Service category | YES | What market are we mining language for? |
| Competitor names | Optional | For "[competitor] review" and "[competitor] vs" searches |
| Known communities | Optional | Reddit subs, Discord servers, forums the user already knows |
| Collection focus | Optional | Specific category to prioritize (Pain only, Triggers only, etc.) |
| Language | Optional | 결과물 작성 언어 (default: English). 검색 언어도 이에 따라 결정 |
| Research intensity | Optional | "light" / "standard" / "deep" (default: deep) — 리서치 깊이와 수집량 조절 |

**If customer-insight.md exists**, pre-fill category, segments, pain points, and communities — ask user to confirm or add.

**If competitive-intel.md exists**, extract competitor names automatically — show user and ask if any should be excluded.

**If this is a Refresh**, show current Language Bank summary (count per category) and ask: "Which category needs more expressions? Any new communities to mine?"

---

## Research Intensity

사용자가 명시적으로 요청하면 리서치 깊이를 조절합니다. 지정하지 않으면 `deep` (기본값).

| Level | WebSearch 횟수 | WebFetch 정독 | 수집량 | 용도 |
|-------|--------------|--------------|----|------|
| `light` | Step당 1-2회 | 0-1건 | 축소 (~50%) | 빠른 감 잡기 |
| `standard` | Step당 3-4회 | 2-3건 | 보통 (~75%) | 일반 리서치 |
| `deep` | Step당 5-6회 | 4-6건 | 전체 (100%) | 본격 리서치 |

> "가볍게", "빠르게", "간단히" → light / "보통으로", "적당히" → standard / 별도 지정 없음 → deep

---

## Process

### Step 1: Load Context & Generate Search Keywords

**Goal**: Build a keyword matrix for targeted community mining.

**Actions**:
- Load all research-memory/ files
- Extract from customer-insight.md (if available):
  - Segment names → search audience context
  - Pain points → Pain Expression seed keywords
  - Community list → search scope
- Extract from competitive-intel.md (if available):
  - Competitor names → Comparison and Review keywords
- Generate the **Search Keyword Matrix**:

```
PAIN keywords:
  "[category] problems", "[category] frustrating", "[category] sucks"
  "[category] disappointed", "hate [category]", "[category] complaint"

DESIRE keywords:
  "best [category]", "[category] recommendation", "wish [category] could"
  "ideal [category]", "perfect [category] would", "[category] dream feature"

COMPARISON keywords:
  "[competitor A] vs [competitor B]", "[product] alternative"
  "switched from [competitor]", "[competitor] review honest"

TRIGGER keywords:
  "finally bought [category]", "worth it [category]"
  "what convinced me [category]", "just signed up for"
```

- If customer-language.md exists with data → switch to Refresh mode

**Output**: Keyword matrix ready for Steps 2-4.

---

### Step 2: Mine Pain Expressions

**Goal**: Collect 10-15 real phrases expressing frustration, complaints, and problems.

**Tool**: `WebSearch` → `WebFetch`

**Query pattern**:
```
What are the most common complaints and frustrations people express about [category] in online communities (Reddit, review sites, forums, social media)?

For each expression: quote the actual language, note the context, identify the source platform, rate intensity (Mild/Strong/Extreme).

Find 10-15 distinct pain expressions from [primary segment] perspective.
Include complaints about: [competitor list]
```

**Parameters**: **검색 깊이** — Research Intensity에 따라 결정 (light→WebSearch 2-3회 / standard→4-5회 + 상위 스레드 3건 WebFetch / deep→6-8회 + 상위 스레드 6건 WebFetch). **최신성** — 쿼리에 연도를 명시하고(예: "... 2025 2026"), 1년 이상 지난 스레드는 배제합니다.

**수집 목표**: light=5-7 / standard=7-10 / deep=10-15 pain expressions

---

### Step 3: Mine Desire Expressions & Comparison Language

**Goal**: Collect 8-10 desire expressions + 5-8 comparison expressions in one pass.

**Why combined**: In communities, wishes and comparisons naturally co-occur in the same threads ("I wish X could do what Y does").

**Tool**: `WebSearch` → `WebFetch`

**Query pattern**:
```
What do people say when discussing what they WANT from [category] and how they COMPARE options?

DESIRE EXPRESSIONS: "I wish [product] could...", "The perfect [category] would...", ideal outcomes, feature requests.
COMPARISON LANGUAGE: "[A] vs [B]", "I switched from X to Y because...", evaluation criteria mentioned.

For each: quote actual language, note context + source, tag as Desire or Comparison.
For comparisons: note competitors mentioned and criteria used.

Find 8-10 desire + 5-8 comparison expressions. Include: [competitor list]
```

**Parameters**: **검색 깊이** — Research Intensity에 따라 결정 (light→WebSearch 2-3회 / standard→4-5회 + 상위 스레드 3건 WebFetch / deep→6-8회 + 상위 스레드 6건 WebFetch). **최신성** — 쿼리에 연도를 명시하고(예: "... 2025 2026"), 1년 이상 지난 스레드는 배제합니다.

**수집 목표**: desire — light=3-5 / standard=5-7 / deep=8-10, comparison — light=2-3 / standard=3-5 / deep=5-8

---

### Step 4: Mine Trigger Phrases

**Goal**: Collect 8-12 phrases describing the moment of purchase decision.

**Tool**: `WebSearch` → `WebFetch`

**Query pattern**:
```
What makes people finally decide to purchase or subscribe to [category]?

Search for phrases describing the MOMENT of decision: "I finally decided because...", "What convinced me was...", "I was on the fence until..."

Classify each by trigger type: Social Proof, Urgency, Value Realization, Risk Removal, Authority, or Scarcity.

For each: quote the expression, classify type, note source platform.
Find 8-12 trigger phrases across 3+ trigger types.
```

**Parameters**: **검색 깊이** — Research Intensity에 따라 결정 (light→WebSearch 2-3회 / standard→4-5회 + 상위 스레드 3건 WebFetch / deep→6-8회 + 상위 스레드 6건 WebFetch). **최신성** — 쿼리에 연도를 명시하고(예: "... 2025 2026"), 1년 이상 지난 스레드는 배제합니다.

**수집 목표**: light=3-5 / standard=5-8 / deep=8-12 trigger phrases

---

### Step 5: Save & Log

**Goal**: Write all findings to `research-memory/customer-language.md` and log execution.

#### 5a. Write customer-language.md

**Language rule**: 섹션 헤더와 테이블 컬럼명은 영어로 유지합니다. 본문, 셀 값, 설명, 분석 텍스트는 사용자가 지정한 언어로 작성합니다. 언어가 지정되지 않으면 English로 작성합니다.

Use the **exact schema** in `references/customer-language-schema.md`. Key rules:
- 5 sections: Pain Expressions, Desire Expressions, Comparison Language, Trigger Phrases, Community Sources
- Every expression in quotation marks with source attribution
- For Refresh: append new rows to existing tables, do NOT overwrite

#### 5b. Update research-log.md

Append one row:

```
| [YYYY-MM-DD] | voice-of-customer | Full Mining / Refresh | [X pain + Y desire + Z comparison + W trigger collected, key sources] | WebSearch + WebFetch |
```

---

## Web Research Tool Guide

이 스킬은 외부 MCP(Perplexity 등) 없이 **내장 도구만으로** 동작합니다.

| Tool | When to Use | This Skill |
|------|-------------|------------|
| `WebSearch` | 커뮤니티 스레드·리뷰 페이지 URL 발견 | Step 1 (커뮤니티 매핑), 각 Step의 1차 수집 |
| `WebFetch` | **핵심 도구** — 찾은 스레드/리뷰를 열어 원문 표현을 그대로 추출 | Step 2 (pain), Step 3 (desire + comparison), Step 4 (triggers) |

> **이 스킬에서 `WebFetch`는 선택이 아니라 필수입니다.** 이 스킬의 산출물은 요약이 아니라 **고객이 실제로 쓴 문장 그대로**입니다. 검색 스니펫은 잘려 있어 원문 표현을 살릴 수 없으므로, 반드시 스레드를 열어 읽고 인용해야 합니다.

> **Perplexity와의 차이 — 반드시 지킬 것**: `WebSearch`는 출처를 자동으로 인용해주지 않고, 결과는 제목+URL+짧은 스니펫뿐입니다.
> 1. 스니펫만 보고 수치·인용을 쓰지 마세요. 반드시 `WebFetch`로 원문을 열어 확인한 뒤 씁니다.
> 2. 모든 수치와 주장 옆에 출처 URL을 직접 적습니다.
> 3. 원문을 확인하지 못한 항목은 `[미확인]`으로 표시하고, 추정치로 채우지 않습니다.
> 4. 도메인을 좁히려면 `WebSearch`의 `allowed_domains` / `blocked_domains`를 씁니다.
> 5. `WebSearch`는 US 기준입니다. 한국 시장 조사 시 한국어 쿼리를 별도로 한 번 더 돌리세요.

**Depth & recency**:
- 검색 깊이: Research Intensity 레벨에 따라 결정 — 위 Research Intensity 테이블 참조
- 최신성: 쿼리에 "2025 2026"을 명시 — 현재 카피에는 최근 표현이 가장 유효합니다
- 커뮤니티 직격 쿼리 패턴:
  - `site:reddit.com [카테고리] frustrated OR "so annoying" OR "wish it could"`
  - `site:news.ycombinator.com [카테고리]`
  - `site:g2.com [경쟁사명] reviews` / `site:capterra.com [경쟁사명] reviews`
  - 한국 커뮤니티: 별도로 한국어 쿼리 (`WebSearch`는 US 기준이라 한국어 쿼리를 따로 돌려야 합니다)

**Query best practices**:
- Always include the product category in every query
- Ask for ACTUAL phrases, not summaries — emphasize "quote the real language"
- Include competitor names to surface comparison discussions
- One category per query (pain, desire+comparison, triggers) — don't combine all in one call
- Request source attribution for every expression
- Language: 사용자가 English 외 언어를 지정한 경우, 모든 query 끝에 "Respond in [language]."를 추가

---

## Quality Checklist

Before saving, verify:

- [ ] Pain expressions 최소 5개 (light) ~ 15개 (deep) 수집 (with intensity ratings)
- [ ] Desire expressions 최소 3개 (light) ~ 10개 (deep) 수집
- [ ] Comparison expressions 최소 2개 (light) ~ 8개 (deep) 수집, competitor names and criteria 포함
- [ ] Trigger phrases 최소 3개 (light) ~ 12개 (deep) 수집, 3+ trigger types
- [ ] Every expression includes source platform/community
- [ ] Community Sources table lists all mined sources with URLs where available
- [ ] Expressions read like real human language (not AI-summarized)
- [ ] 모든 수치·주장에 출처 URL이 붙어 있다 (WebSearch는 자동 인용을 해주지 않으므로 직접 기재)
- [ ] research-log.md updated with execution record
- [ ] If Refresh: existing expressions preserved, new ones appended

---

## Example (Abbreviated)

**Input**: "AI marketing education / skill packs for solo marketers"

> **Pain Expressions**:
> - "I've installed 10 AI tools and ended up only using ChatGPT" (Reddit r/marketing, Strong)
> - "Everything AI writes sounds the same — that generic LinkedIn tone" (Twitter, Strong)
> - "Spent more time writing prompts than actually writing the copy" (HN, Mild)
>
> **Desire Expressions**:
> - "I just want copy-paste prompts that actually work for my niche" (Reddit)
> - "Wish there was a system, not just random tips scattered across YouTube" (Twitter)
>
> **Comparison Language**:
> - "DigitalMarketer's content was made pre-AI so it feels outdated now"
> - "Demand Curve is great for growth but weak on content marketing side"
>
> **Trigger Phrases**:
> - "$199 is less than one month of agency fees and I keep it forever" (Value Realization)
> - "Three people in my Twitter feed recommended it in one week" (Social Proof)

---

## What This Skill Does NOT Do

- **Customer profiling / segmentation** → Use `audience-profiler` (maps who they are)
- **Competitor identification** → Use `competitor-finder` (identifies the players)
- **Website scraping for competitor copy** → Use `competitor-analyzer` (`WebFetch`)
- **Strategic recommendations** → Use `research-synthesizer` (reads this output)
- **Market sizing / trends** → Use `market-scanner`

Voice of Customer stays focused on **capturing real language** — the exact words, phrases, and expressions customers use when they complain, wish, compare, and decide.
