---
name: competitor-finder
description: "Identify your competitive set — direct and indirect competitors — and map their positioning, messaging, pricing, and channel activity. Use when user mentions: competitor research, competitive analysis, competitor finder, find competitors, who are my competitors, competitive set, competitive landscape, competitor mapping, competitor profiling, competitor positioning, competitive intel, competitive intelligence, market competitors, rival analysis, competition scan"
user-invocable: true
---

# Competitor Finder

> Identify your competitive set and map their positioning, messaging, pricing, and channel activity.
> Uses `WebSearch` + `WebFetch` for competitive intelligence — no external MCP required. Output is the foundation that competitor-analyzer and competitor-visual enrich.

---

## Purpose

Competitor Finder is the **starting point of competitive intelligence**. It answers:
- Who are we actually competing with? (direct AND indirect)
- How does each competitor position themselves?
- What are their core value propositions and target audiences?
- What pricing models and ranges do they use?
- Which marketing channels are they active on?
- Where are the gaps and opportunities?

The output — `research-memory/competitive-intel.md` — is the **skeleton** that two downstream skills build upon:
- **competitor-analyzer** (`WebFetch`) adds website messaging detail: headlines, CTAs, pricing pages, social proof
- **competitor-visual** (`fetch_site_assets.sh` + Claude Browser) adds design audit: screenshots, color palettes, layout patterns, visual tone

> "You can't differentiate if you don't know what you're differentiating FROM." — The Boring Marketer

---

## Modes

| Mode | When to Use | Behavior |
|------|-------------|----------|
| **Full Discovery** | No `competitive-intel.md` exists, or it's an empty scaffold | Run all 5 steps from scratch |
| **Refresh** | `competitive-intel.md` already has `[competitor-finder]` data | Check `research-log.md` for last scan date → add new competitors or update existing profiles |

---

## Auto-Load Protocol

On every invocation, BEFORE any research:

1. **Check `research-memory/` directory**
2. If files exist → Read ALL `.md` files (except README.md)
3. **Priority context from `market-landscape.md`**:
   - Market category definition → sets competitor search scope
   - Market structure (price tiers, channels) → provides classification frame
   - Market size → helps gauge competitive intensity
4. **Check `brand-memory/`** (read-only) → If exists, use business description, positioning, and target audience as self-reference context
5. If `competitive-intel.md` has `[competitor-finder]` data AND `research-log.md` shows a previous scan → **suggest Refresh mode**

**Enrichment preservation rule**: When loading existing `competitive-intel.md`, NEVER delete or overwrite sections tagged `[competitor-analyzer]` or `[competitor-visual]`. Only touch `[competitor-finder]` sections.

---

## Input Gathering

Collect from the user conversationally. Do NOT dump a form — ask naturally.

| Field | Required | Description |
|-------|----------|-------------|
| Business / Product description | YES | What does the company/product do? |
| Known competitors | Optional | Starting points for competitive mapping |
| Business model | Optional | SaaS, service, e-commerce, education, etc. — frames pricing comparison |
| Geography / Market scope | Optional | Global or specific region — bounds competitor search |
| Focus area | Optional | Pricing comparison, messaging differentiation, channel strategy, etc. |
| Research intensity | Optional | "light" / "standard" / "deep" (default: deep) — 리서치 깊이와 수집량 조절 |
| Language | Optional | 결과물 작성 언어 (default: English) |

**If brand-memory/ exists**, pre-fill business description, positioning, and target audience from `voice-profile.md` and `positioning.md` — ask user to confirm or correct.

**If market-landscape.md exists**, show the market category and structure as context: "Based on your market scan, I'll search for competitors in [category]. Does this look right?"

**If this is a Refresh**, show the current competitive set and ask: "Any new competitors to add? Or specific profiles to update?"

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

### Step 1: Load Context & Set Search Scope

**Goal**: Establish the competitive search frame using existing research.

**Actions**:
- Load all research-memory/ files
- Extract from market-landscape.md (if available):
  - Market category → primary search term
  - Price tiers → competitor classification frame
  - Channels → where to look for competitors
  - Adjacent markets → source of indirect competitors
- Extract from brand-memory/ (if available):
  - Own positioning → identify who occupies similar territory
  - Target audience → find who targets the same people
- If competitive-intel.md exists with data → switch to Refresh mode

**Output**: Clear search scope definition (category + constraints).

---

### Step 2: Identify Competitive Set (Direct + Indirect)

**Goal**: Build a comprehensive list of direct and indirect competitors with URLs.

**Tool**: `WebSearch` → `WebFetch` → 직접 추론 (classification reasoning required)

**Query pattern**:
```
Who are the main competitors for a [business description] in the [market category] space?

Identify:
1. Direct competitors (5-8): Same target audience, similar solution, same category
2. Indirect competitors (2-3): Different approach to same problem, OR adjacent category players expanding into this space

For EACH competitor, provide:
- Company name
- Website URL (homepage)
- One-line description of what they do
- Classification: direct or indirect, with reasoning
```

**Parameters**:
- **검색 깊이**: Research Intensity에 따라 결정 (light→WebSearch 1-2회 / standard→WebSearch 3-4회 + 상위 출처 2건 WebFetch / deep→WebSearch 5-6회 + 상위 출처 4-5건 WebFetch)

**경쟁사 수집 목표**: light=3-5 direct + 1-2 indirect / standard=4-6 direct + 2 indirect / deep=5-8 direct + 2-3 indirect

**If user provided known competitors**: Include them in the query as starting points and 검색으로 검증하고 확장합니다: "I already know about [names]. Who else competes in this space?"

**Output**: Competitive set table — names, URLs, descriptions, classifications.

---

### Step 3: Build Competitor Profiles (Positioning, Messaging, Pricing)

**Goal**: Map each competitor's basic positioning, value proposition, audience, and pricing.

**Tool**: `WebSearch` → `WebFetch` (factual data collection)

**Query pattern**:
```
For each of these competitors in the [market category]:
[list competitor names from Step 2]

Analyze each one:
1. Positioning: How do they describe themselves? (tagline, hero headline, or elevator pitch)
2. Core value propositions: Top 2-3 benefits they emphasize
3. Target audience: Who are they built for? (job titles, company sizes, demographics)
4. Pricing model: Free / Freemium / Subscription / One-time / Enterprise
5. Price range: Approximate price points or tiers

Cite their website or recent coverage as source for each data point.
```

**Parameters**:
- **검색 깊이**: Research Intensity에 따라 결정 (light→WebSearch 1-2회 / standard→WebSearch 3-4회 + 상위 출처 2건 WebFetch / deep→WebSearch 5-6회 + 상위 출처 4-5건 WebFetch)

> light일 경우 상위 경쟁사 위주로 프로필을 작성합니다 (전체 대상이 아닌 핵심 경쟁사 중심).

**If competitors are numerous (8+)**: Split into two queries to avoid shallow coverage.

**Output**: Positioning & Messaging Matrix for all competitors.

---

### Step 4: Channel Activity + Gap Analysis

**Goal**: Map competitors' marketing channel presence and identify whitespace opportunities.

**Tool**: `WebSearch` → `WebFetch`

**Query pattern**:
```
What marketing channels are these [market category] competitors most active on?
[list competitor names]

For each competitor, assess presence and activity level on:
- Content marketing (blog, YouTube, podcast)
- Social media (which platforms, approximate follower counts or engagement level)
- SEO / Paid advertising
- Email / Newsletter
- Community / Events

Rate each: Strong / Moderate / Weak / Absent

Then identify:
1. Underserved channels: Which channels do MOST competitors neglect?
2. Positioning whitespace: What positioning angles are unclaimed?
3. Messaging gaps: What customer needs are competitors NOT addressing in their messaging?
```

**Parameters**:
- **최신성**: 쿼리에 연도 + "latest" / "recent"를 넣습니다 (예: "... 2026 latest"). 검색 결과의 게시일을 확인해 최근 3개월 밖 자료는 배제합니다.
- **검색 깊이**: Research Intensity에 따라 결정 (light→WebSearch 1-2회 / standard→WebSearch 3-4회 + 상위 출처 2건 WebFetch / deep→WebSearch 5-6회 + 상위 출처 4-5건 WebFetch)

**Output**: Channel Activity Matrix + Gaps & Opportunities section.

---

### Step 5: Save & Log

**Goal**: Write all findings to `research-memory/competitive-intel.md` and log execution.

#### 5a. Write competitive-intel.md

**Language rule**: 섹션 헤더와 테이블 컬럼명은 영어로 유지합니다. 본문, 셀 값, 설명, 분석 텍스트는 사용자가 지정한 언어로 작성합니다. 언어가 지정되지 않으면 English로 작성합니다.

Use the **exact schema** in `references/competitive-intel-schema.md`. Key rules:
- Tag every section you write with `[competitor-finder]`
- Leave `[competitor-analyzer]` and `[competitor-visual]` sections as empty scaffolds with HTML comments
- For Refresh: update only `[competitor-finder]` sections; NEVER touch other skills' sections

#### 5b. Update research-log.md

Append one row:
```
| [YYYY-MM-DD] | competitor-finder | Full Discovery / Refresh | [X direct + Y indirect identified, key gaps] | WebSearch + WebFetch |
```

---

## Web Research Tool Guide

이 스킬은 외부 MCP(Perplexity 등) 없이 **내장 도구만으로** 동작합니다.

| Tool | When to Use | This Skill |
|------|-------------|------------|
| `WebSearch` | 경쟁사 후보 발견, 비교 글·리스티클 수집 | Step 2 (경쟁 세트), Step 4 (채널 활동) |
| `WebFetch` | 경쟁사 홈페이지·About·비교 기사를 열어 포지셔닝 확인 | Step 3 (프로필 작성) |
| 직접 추론 | direct/indirect 분류, 갭 도출 (`perplexity_reason` 대체) | Step 2 분류 단계 |

> **Perplexity와의 차이 — 반드시 지킬 것**: `WebSearch`는 출처를 자동으로 인용해주지 않고, 결과는 제목+URL+짧은 스니펫뿐입니다.
> 1. 스니펫만 보고 수치·인용을 쓰지 마세요. 반드시 `WebFetch`로 원문을 열어 확인한 뒤 씁니다.
> 2. 모든 수치와 주장 옆에 출처 URL을 직접 적습니다.
> 3. 원문을 확인하지 못한 항목은 `[미확인]`으로 표시하고, 추정치로 채우지 않습니다.
> 4. 도메인을 좁히려면 `WebSearch`의 `allowed_domains` / `blocked_domains`를 씁니다.
> 5. `WebSearch`는 US 기준입니다. 한국 시장 조사 시 한국어 쿼리를 별도로 한 번 더 돌리세요.

**Depth & recency**:
- 검색 깊이: Research Intensity 레벨에 따라 결정 — 위 Research Intensity 테이블 참조
- 최신성: Step 4(채널 활동)는 쿼리에 "2026 latest"를 명시. Step 2-3은 연도 명시 불필요
- 경쟁사 발굴에 잘 듣는 쿼리 패턴:
  - `"[제품 카테고리]" alternatives 2026`
  - `"[알고 있는 경쟁사]" vs` / `best [카테고리] tools 2026`
  - `site:g2.com [카테고리]` — G2 카테고리 페이지가 경쟁 세트를 통째로 보여줍니다
  - `site:news.ycombinator.com "[카테고리]"` — 개발자 대상 제품이면 특히 유효
- **필수**: Step 3에서 각 경쟁사의 **웹사이트 URL을 반드시 확보**하세요. competitor-analyzer와 competitor-visual이 이 URL에 전적으로 의존합니다.

**Query best practices**:
- Include market category in every query (from market-landscape.md or user input)
- Always request website URLs — competitor-analyzer and competitor-visual depend on them
- Ask for source citations for positioning claims
- One topic per query: Don't combine competitor identification + profiling in one call
- For 8+ competitors, split profiling into two queries to ensure depth
- Language: 사용자가 English 외 언어를 지정한 경우, 모든 query 끝에 "Respond in [language]."를 추가

---

## Quality Checklist

Before saving, verify:

- [ ] Direct 경쟁사 최소 3개 (light) ~ 8개 (deep) 식별 (with URLs)
- [ ] Indirect 경쟁사 최소 1개 (light) ~ 3개 (deep) 식별 (with URLs)
- [ ] Every competitor has: positioning, value props, target audience, pricing
- [ ] Channel Activity Matrix covers at least 4 of 5 channel types
- [ ] Gaps & Opportunities section has at least one finding per sub-section
- [ ] All sections tagged with `[competitor-finder]`
- [ ] Downstream sections (`[competitor-analyzer]`, `[competitor-visual]`) are empty scaffolds
- [ ] 모든 수치·주장에 출처 URL이 붙어 있다 (WebSearch는 자동 인용을 해주지 않으므로 직접 기재)
- [ ] research-log.md updated with execution record
- [ ] Competitor URLs are valid homepage links (not 404s or redirects)

---

## Example (Abbreviated)

**Input**: "Marketing education business selling AI-powered skill packs to solo marketers and small teams."

> **Direct Competitors** (5):
> 1. Marketing Examined (Alex Garcia) — Newsletter-based marketing education
> 2. CopyBlogger — Content marketing & copywriting education platform
> 3. DigitalMarketer — Comprehensive digital marketing training + certifications
> 4. Demand Curve — Growth marketing education (YC-backed)
> 5. MarketingProfs — B2B marketing education + events
>
> **Indirect Competitors** (2):
> 1. ChatGPT / Claude — AI directly performing marketing tasks (substitutes education)
> 2. Canva — Design tool with built-in marketing education content
>
> **Key Gaps**:
> - No competitor offers "AI + marketing" skill packs as a combined product
> - Newsletter-based education is crowded; actionable skill/template bundles are rare
> - Most competitors weak on community-driven learning

---

## What This Skill Does NOT Do

- **Website scraping / messaging detail** → Use `competitor-analyzer` (`WebFetch`)
- **Screenshots / design patterns** → Use `competitor-visual` (asset download + Claude Browser)
- **Customer profiling** → Use `audience-profiler`
- **Customer language mining** → Use `voice-of-customer`
- **Strategic recommendations** → Use `research-synthesizer` (reads this output)

Competitor Finder stays focused on **who the competitors are** and **how they position at a high level** — the foundation for deeper competitive analysis.
