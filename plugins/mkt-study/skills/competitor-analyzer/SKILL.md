---
name: competitor-analyzer
description: "Scrape and analyze competitor websites to extract messaging, pricing, CTAs, and social proof. Uses Firecrawl for direct web data extraction. Use when user mentions: competitor website, competitor analysis, competitor scrape, analyze competitor, competitor messaging, competitor pricing, competitor CTA, website analysis, competitor landing page, scrape competitor, competitor copy, competitor social proof, compare websites, website messaging, pricing comparison, competitor intel"
user-invocable: true
---

# Competitor Analyzer

> Scrape competitor websites to extract real messaging, pricing, CTAs, and social proof.
> Uses Firecrawl for direct web data extraction. Enriches `competitive-intel.md` with actual website data.

---

## Purpose

Competitor Analyzer bridges the gap between **what we hear about competitors** and **what they actually say on their websites**.

- `competitor-finder` (Perplexity) answers: "Who are they and what's their general positioning?"
- **`competitor-analyzer` (Firecrawl) answers: "What exact words, prices, and proof do they put on their pages?"**

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

**Finding pricing pages**: If the pricing URL isn't obvious (`/pricing`, `/plans`), use `firecrawl_map` to discover it:

```
firecrawl_map:
  url: "[competitor-homepage]"
  search: "pricing"
```

Present the scraping plan to the user for confirmation before proceeding.

---

### Step 2: Scrape Homepage Messaging

**Goal**: Extract every key messaging element from each competitor's homepage.

**Tool**: `firecrawl_scrape` with JSON format

For each competitor, use `firecrawl_scrape` with JSON format and the **Homepage Messaging Schema** (see `references/scraping-schemas.md` for full schema).

Key extraction fields: `hero_headline`, `sub_headline`, `value_proposition`, `target_audience_signals`, `cta_buttons`, `social_proof_logos`, `social_proof_testimonials`, `social_proof_metrics`, `tone_keywords`.

**If JSON extraction returns empty or minimal**: retry with `formats: ["markdown"]` and `onlyMainContent: true`, then parse manually.

**If the page requires JS rendering**: add `waitFor: 5000`.

Report progress to the user after each competitor: "Scraped [Competitor A] homepage. Moving to pricing page..."

---

### Step 3: Scrape Pricing Pages

**Goal**: Extract pricing structure, plans, and framing from each competitor.

**Tool**: `firecrawl_scrape` with JSON format and the **Pricing Page Schema** (see `references/scraping-schemas.md` for full schema).

Key extraction fields: `pricing_model`, `plans` (name, price_monthly, price_annual, key_features, limitations), `free_tier_details`, `enterprise_option`, `price_framing_tactics`.

**If no pricing page found**: note "Pricing not publicly available" — this itself is a data point (likely enterprise/sales-led model).

---

### Step 4: Cross-Competitor Analysis

**Goal**: Compare all scraped data to find patterns, positioning gaps, and opportunities.

This step uses NO MCP tools — it's pure analysis of the data collected in Steps 2-3.

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

**Language rule**: 섹션 헤더와 테이블 컬럼명은 영어로 유지합니다. 본문, 셀 값, 설명, 분석 텍스트는 사용자가 지정한 언어로 작성합니다. 언어가 지정되지 않으면 English로 작성합니다. Firecrawl에서 스크랩한 원문(headline, CTA 등)은 원래 언어 유지. 분석·패턴·갭 텍스트만 지정 언어로 작성.

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
| [YYYY-MM-DD] | competitor-analyzer | Full/Targeted/Refresh | [# competitors analyzed + key pattern summary] | Firecrawl |
```

---

## Firecrawl Tool Guide

| Tool | When to Use | This Skill |
|------|-------------|------------|
| `firecrawl_scrape` | Single page structured extraction | **Primary tool** — homepage + pricing per competitor |
| `firecrawl_map` | Discover URLs on a site | Find pricing page URL when not at `/pricing` |
| `firecrawl_extract` | Multi-URL structured extraction | Alternative for 5+ competitors (batch mode) |

**Common settings**:
- `onlyMainContent`: Always `true` — strip navigation/footer noise
- `formats`: Prefer JSON with schema for structured extraction
- `waitFor`: Add `5000` if page content loads empty (JS-rendered SPAs)
- Fallback: If JSON returns empty → switch to `["markdown"]` format and parse manually

**Error handling**:
- 403/blocked → Skip competitor, log as "access restricted"
- Timeout → Retry once with `waitFor: 10000`
- Empty content → Try `firecrawl_map` to find alternative landing page URL
- All retries fail → Skip and note in output: "Could not scrape [URL] — [reason]"

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
- **Capture visual design/screenshots** → Use `competitor-visual` (Playwright)
- **Analyze reviews or third-party mentions** → Use `competitor-finder` (Perplexity)
- **Make strategic recommendations** → Use `research-synthesizer` (cross-analysis)
- **Create battlecards or positioning docs** → Use marketing execution skills

Competitor Analyzer stays focused on **what competitors actually put on their websites** — their words, their prices, their proof.
