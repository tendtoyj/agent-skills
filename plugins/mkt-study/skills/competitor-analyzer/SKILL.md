---
name: competitor-analyzer
description: "Scrape and analyze competitor websites to extract messaging, pricing, CTAs, and social proof. Uses the built-in `WebFetch` tool for direct web data extraction — no external MCP required. Use when user mentions: competitor website, competitor analysis, competitor scrape, analyze competitor, competitor messaging, competitor pricing, competitor CTA, website analysis, competitor landing page, scrape competitor, competitor copy, competitor social proof, compare websites, website messaging, pricing comparison, competitor intel"
user-invocable: true
---

# Competitor Analyzer

> Scrape competitor websites to extract real messaging, pricing, CTAs, and social proof.
> Uses the built-in `WebFetch` tool for direct web data extraction — no external MCP required. Enriches `competitive-intel.md` with actual website data.

---

## Purpose

Competitor Analyzer bridges the gap between **what we hear about competitors** and **what they actually say on their websites**.

- `competitor-finder` (`WebSearch`) answers: "Who are they and what's their general positioning?"
- **`competitor-analyzer` (`WebFetch`) answers: "What exact words, prices, and proof do they put on their pages?"**

The output enriches `research-memory/competitive-intel.md` — adding `[competitor-analyzer]` tagged sections for website messaging detail, pricing intelligence, and cross-competitor patterns. This real data feeds downstream skills (brand-voice, direct-response-copy, positioning-angles) with **competitor language they can actually counter**.

---

## Prerequisite

**`competitor-finder` must have run first.** This skill reads `competitive-intel.md` to get the competitor list and URLs. If the file doesn't exist or has no URLs, stop and instruct the user to run `competitor-finder` first — or ask them to provide competitor URLs directly.

---

## Modes

| Mode | When to Use | Behavior |
|------|-------------|----------|
| **Full Analysis** | First run, or `competitive-intel.md` has no `[competitor-analyzer]` sections yet | Scrape ALL competitors in the list |
| **Targeted** | User wants to analyze specific 1-3 competitors | Scrape only the named competitors |
| **Refresh** | `[competitor-analyzer]` sections exist and need updating | Check `research-log.md` for last analysis date → re-scrape and update |

---

## Auto-Load Protocol

On every invocation, BEFORE any scraping:

1. **Check `research-memory/` directory**
2. If files exist → Read ALL `.md` files (except README.md)
3. **Critical: Read `competitive-intel.md`** → Extract competitor names and URLs
   - If file missing → STOP. Tell user: "Run competitor-finder first, or provide competitor URLs."
   - If file exists but no URLs → Ask user to provide URLs directly
4. **Check `brand-memory/`** (read-only) → If exists, note our own positioning for comparison context
5. If `[competitor-analyzer]` sections already exist in `competitive-intel.md` → **suggest Refresh mode**
6. Show the competitor list to the user and confirm which to analyze

---

## Input Gathering

Collect conversationally. Most inputs come from `competitive-intel.md` — just confirm with the user.

| Field | Required | Description |
|-------|----------|-------------|
| Analysis mode | YES | Full / Targeted / Refresh |
| Competitor URLs | Conditional | Only if not in `competitive-intel.md` |
| Analysis focus | Optional | Specific area: pricing, messaging, CTAs, all |
| Our own URL | Optional | Enables direct comparison |
| Language | Optional | 결과물 작성 언어 (default: English) |

**If competitive-intel.md has URLs**, show the list and ask: "I found these competitors. Should I analyze all of them, or specific ones?"

**If this is a Refresh**, show the last analysis date and ask: "What's changed or what should I re-check?"

---

## Process

### Step 1: Build Scraping Plan

**Goal**: Determine which competitors and which pages to scrape.

Read `competitive-intel.md` → extract competitor list with URLs.

For each competitor, plan these pages (in priority order):
1. **Homepage** (required): hero messaging, value prop, CTA, social proof
2. **Pricing page** (required): plans, pricing model, free tier, enterprise
3. **Product/Features page** (optional): feature list, differentiator claims

**Finding pricing pages**: 대부분 `/pricing` 또는 `/plans`입니다. 아니라면 이 순서로 찾습니다:

1. 홈페이지를 `WebFetch`하면서 프롬프트에 요청: `"List every navigation and footer link on this page as absolute URLs, with its anchor text. Flag any link that leads to pricing, plans, or a cost page."`
2. 그래도 없으면 `WebSearch`: `site:competitor.com pricing`
3. 그래도 없으면 "Pricing not publicly available"로 기록 — 이것 자체가 데이터 포인트입니다 (영업 주도 모델일 가능성)

Present the scraping plan to the user for confirmation before proceeding.

---

### Step 2: Scrape Homepage Messaging

**Goal**: Extract every key messaging element from each competitor's homepage.

**Tool**: `WebFetch`

경쟁사 홈페이지마다 `WebFetch`를 호출하고, **Homepage Messaging Schema**를 추출 프롬프트로 변환해 `prompt`에 넣습니다 (전체 스키마는 `references/scraping-schemas.md` 참조).

`WebFetch` 호출 예시:

```
WebFetch:
  url: "[competitor-homepage]"
  prompt: |
    이 랜딩 페이지에서 아래 항목을 추출해 JSON으로만 답하세요.
    페이지에 없는 항목은 null, 목록이 비면 []로 두고 절대 추측하지 마세요.
    문구는 원문 그대로(번역·요약 금지) 옮기세요.
    {
      "hero_headline": "가장 큰 헤드라인 한 줄",
      "sub_headline": "헤드라인 바로 아래 보조 문구",
      "value_proposition": "이 제품이 내세우는 핵심 가치 한 문장",
      "target_audience_signals": ["'for developers' 처럼 대상 독자를 드러내는 표현"],
      "cta_buttons": ["버튼에 적힌 문구 그대로"],
      "social_proof_logos": ["고객사 로고로 표시된 회사명"],
      "social_proof_testimonials": ["후기 문구 원문"],
      "social_proof_metrics": ["'10,000+ teams' 같은 수치 주장"],
      "tone_keywords": ["반복 등장하는 특징적 단어"]
    }
```

**추출이 비거나 빈약하면**: 프롬프트를 `"이 페이지의 본문 텍스트를 네비게이션·푸터 제외하고 그대로 출력하세요"`로 바꿔 다시 호출한 뒤, 결과를 직접 읽어 필드를 채웁니다.

**JS 렌더링이 필요한 SPA라 내용이 비면** (`WebFetch`는 JS를 실행하지 않습니다): Claude Browser로 넘어갑니다 —
`mcp__Claude_Browser__navigate` (url) → `mcp__Claude_Browser__get_page_text`. 렌더링된 텍스트를 받아 같은 필드를 채웁니다.

Report progress to the user after each competitor: "Scraped [Competitor A] homepage. Moving to pricing page..."

---

### Step 3: Scrape Pricing Pages

**Goal**: Extract pricing structure, plans, and framing from each competitor.

**Tool**: `WebFetch` — **Pricing Page Schema**를 추출 프롬프트로 변환해 사용합니다 (전체 스키마는 `references/scraping-schemas.md` 참조).

```
WebFetch:
  url: "[competitor-pricing-url]"
  prompt: |
    이 가격 페이지에서 아래 항목을 추출해 JSON으로만 답하세요.
    금액은 통화 기호와 단위를 그대로 유지하고, 없는 값은 null로 두세요. 추측 금지.
    {
      "pricing_model": "seat-based / usage-based / flat / tiered 중 해당하는 것",
      "plans": [{"name":"", "price_monthly":"", "price_annual":"", "key_features":[], "limitations":[]}],
      "free_tier_details": "무료 플랜/체험 조건, 없으면 null",
      "enterprise_option": "'Contact sales' 여부와 문구",
      "price_framing_tactics": ["'Most popular' 배지, 연간 할인율, 앵커링 등"]
    }
```

**가격이 토글(월/연)로 가려져 있으면**: `WebFetch`는 기본 상태만 봅니다. 두 가격이 다 필요하면 Claude Browser로 토글을 클릭한 뒤 `get_page_text`로 읽습니다.

**If no pricing page found**: note "Pricing not publicly available" — this itself is a data point (likely enterprise/sales-led model).

---

### Step 4: Cross-Competitor Analysis

**Goal**: Compare all scraped data to find patterns, positioning gaps, and opportunities.

This step uses NO web tools — it's pure analysis of the data collected in Steps 2-3.

Apply these frameworks:

**A. Messaging Matrix**

| Dimension | Competitor A | Competitor B | Competitor C |
|-----------|-------------|-------------|-------------|
| Hero Headline | [verbatim] | [verbatim] | [verbatim] |
| Value Proposition | [summary] | [summary] | [summary] |
| Primary CTA | [verbatim] | [verbatim] | [verbatim] |
| Tone / Voice | [keywords] | [keywords] | [keywords] |
| Social Proof Type | [type] | [type] | [type] |
| Pricing Model | [model] | [model] | [model] |

**B. Value Proposition Comparison** (per competitor)

- **Promise**: What outcome do they promise?
- **Evidence**: How do they prove it? (data, testimonials, demos)
- **Mechanism**: How does their product deliver? (the "how it works")
- **Uniqueness**: What do they claim only they can do?

**C. Narrative Analysis** (per competitor)

- **Villain**: What enemy do they position against? (legacy tools, complexity, cost, status quo)
- **Hero**: Who is the hero? (customer, product, team)
- **Transformation**: What before → after do they promise?
- **Stakes**: What happens if you don't act?

**D. Gaps & Opportunities**

Look for:
- Messaging blind spots: claims NO competitor makes that customers care about
- Price gaps: underserved price tiers
- CTA weakness: unclear or generic calls to action
- Social proof gaps: types of proof nobody uses (e.g., ROI data, case studies)
- Tone uniformity: if everyone sounds the same, there's room to stand out

---

### Step 5: Save & Log

**Goal**: Write all findings to `competitive-intel.md` as enrichment and log the execution.

#### 5a. Enrich competitive-intel.md

**Language rule**: 섹션 헤더와 테이블 컬럼명은 영어로 유지합니다. 본문, 셀 값, 설명, 분석 텍스트는 사용자가 지정한 언어로 작성합니다. 언어가 지정되지 않으면 English로 작성합니다. 웹에서 수집한 원문(headline, CTA 등)은 원래 언어 유지. 분석·패턴·갭 텍스트만 지정 언어로 작성.

**CRITICAL**: Do NOT delete or modify any `[competitor-finder]` or `[competitor-visual]` tagged sections. Only add/update `[competitor-analyzer]` sections.

Append or update these sections:

```markdown
## Website Messaging Detail  [competitor-analyzer]
> Last enriched: [YYYY-MM-DD]

### [Competitor Name]
- **URL**: [scraped URL]
- **Hero Headline**: "[exact text]"
- **Sub-headline**: "[exact text]"
- **Value Proposition**: [analysis]
- **Target Audience Signals**: [signals from copy]
- **Primary CTA**: "[button text]"  |  Secondary: "[button text]"
- **Social Proof**: [type + key content]
- **Tone**: [3-5 keywords]

[Repeat for each competitor]

## Pricing Intelligence  [competitor-analyzer]
> Last enriched: [YYYY-MM-DD]

| Competitor | Model | Lowest | Highest | Free Tier | Enterprise |
|-----------|-------|--------|---------|-----------|-----------|
| [Name] | [type] | [price] | [price] | [Y/N] | [Y/N] |

### [Competitor Name] — Pricing Detail
[Plan structure, framing tactics, key differentiating features per tier]

[Repeat for each competitor]

## Messaging Patterns  [competitor-analyzer]
> Last enriched: [YYYY-MM-DD]

### Messaging Matrix
[Step 4-A table]

### Value Proposition Comparison
[Step 4-B findings per competitor]

### Narrative Analysis
[Step 4-C findings per competitor]

## Gaps & Opportunities  [competitor-analyzer]
> Last enriched: [YYYY-MM-DD]

[Step 4-D findings — append to any existing gaps from competitor-finder, do NOT delete them]
```

**For Refresh mode**: Update only the `[competitor-analyzer]` sections. Change `> Last enriched:` date. Never touch `[competitor-finder]` or `[competitor-visual]` content.

#### 5b. Update research-log.md

Append one row:

```
| [YYYY-MM-DD] | competitor-analyzer | Full/Targeted/Refresh | [# competitors analyzed + key pattern summary] | WebFetch |
```

---

## Web Extraction Tool Guide

이 스킬은 외부 MCP(Firecrawl 등) 없이 **내장 도구만으로** 동작합니다.

| Tool | When to Use | This Skill |
|------|-------------|------------|
| `WebFetch` | 페이지 1개를 열어 프롬프트로 구조화 추출 | **주력 도구** — 경쟁사별 홈페이지 + 가격 페이지 |
| `WebSearch` | 페이지 URL을 못 찾을 때 (`site:` 쿼리) | 가격/기능 페이지 탐색 |
| Claude Browser (`mcp__Claude_Browser__*`) | JS 렌더링 필요, 토글·탭 조작 필요 | `WebFetch`가 빈 결과를 줄 때의 폴백 |

**Firecrawl과의 차이 — 반드시 알아둘 것**:
- `WebFetch`는 **JS를 실행하지 않습니다.** Next.js/React SPA가 클라이언트 렌더링만 하면 본문이 비어 옵니다 → Claude Browser로 폴백.
- JSON 스키마를 **강제할 수 없습니다.** 프롬프트로 요청할 뿐이므로, 돌아온 값이 스키마를 지켰는지 직접 확인하세요.
- `onlyMainContent` 같은 옵션이 없습니다. 대신 프롬프트에 `"네비게이션과 푸터는 제외하세요"`를 넣습니다.
- **환각 방지가 최우선**: 프롬프트에 항상 `"페이지에 없으면 null. 절대 추측하지 마세요."`를 넣고, 헤드라인·CTA·후기는 `"원문 그대로"`를 명시하세요. 이 스킬의 가치는 정확한 원문에 있습니다.

**Error handling**:
- 403 / 봇 차단 → Claude Browser로 재시도. 그래도 막히면 skip하고 "access restricted"로 기록
- 빈 본문 → (1) 프롬프트를 "본문 텍스트 그대로 출력"으로 완화 → (2) Claude Browser `navigate` + `get_page_text`
- 페이지 없음(404) → `WebSearch site:competitor.com [키워드]`로 대체 URL 탐색
- 전부 실패 → skip하고 산출물에 명시: "Could not fetch [URL] — [reason]"

---

## Quality Checklist

Before saving, verify:

- [ ] Hero headlines recorded **verbatim** (not paraphrased or translated)
- [ ] CTA button text recorded **exactly as shown** on the page
- [ ] Pricing includes currency, billing cycle, and scrape date
- [ ] Messaging Matrix includes at least 3 competitors
- [ ] All `[competitor-analyzer]` sections have `> Last enriched:` date
- [ ] Existing `[competitor-finder]` sections are untouched
- [ ] Failed scrapes are documented (URL + reason)
- [ ] `research-log.md` has new execution record

---

## Example (Abbreviated)

**Input**: competitive-intel.md has 3 competitors with URLs.

> **Competitor A** (homepage scrape):
> - Hero: "The all-in-one marketing platform for growing businesses"
> - CTA: "Start Free Trial" | "See Pricing"
> - Social Proof: "Trusted by 5,000+ businesses" + 6 logos
> - Tone: confident, action-oriented, aspirational
>
> **Competitor A** (pricing scrape):
> - Model: Freemium + 3-tier subscription
> - Free: 500 contacts, basic email
> - Growth: $49/mo | Pro: $149/mo | Enterprise: "Talk to Sales"
>
> **Cross-analysis pattern**:
> - All 3 use "all-in-one" messaging → weak differentiation
> - Nobody targets solo creators specifically → positioning gap
> - $10-40/mo price tier is empty → pricing opportunity

---

## What This Skill Does NOT Do

- **Find competitors** → Use `competitor-finder` (this skill needs URLs as input)
- **Capture visual design/screenshots** → Use `competitor-visual` (asset download + Claude Browser)
- **Analyze reviews or third-party mentions** → Use `competitor-finder` (`WebSearch`)
- **Make strategic recommendations** → Use `research-synthesizer` (cross-analysis)
- **Create battlecards or positioning docs** → Use marketing execution skills

Competitor Analyzer stays focused on **what competitors actually put on their websites** — their words, their prices, their proof.
