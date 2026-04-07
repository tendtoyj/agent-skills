---
name: trend-scout
description: "Scan current industry trends and convert them into brand-aligned content angles using Perplexity. Use when user mentions: trend scout, trending topics, what's trending, trend angles, content trends, industry trends, trend research, trend scan, what's hot, trend update, refresh trends, 트렌드, 트렌드 분석, 요즘 뭐가 뜨는지, 트렌드 스캔, 트렌드 앵글, 최신 트렌드"
user-invocable: true
---

# Trend Scout

> Scan current industry trends and convert them into brand-aligned content angles.
> Uses Perplexity for trend discovery. Output feeds post-writer, series-planner, and image-creator.

---

## Purpose

Trend Scout is the **research bridge** between foundation skills (visual-extractor, framework-builder) and content skills (post-writer, series-planner). It answers:

- What topics are trending in our category RIGHT NOW?
- How can our brand authentically connect to each trend?
- Which trends are urgent vs. evergreen?
- What platform is best for each angle?

The output — `creative-memory/trend-angles.md` — becomes the **content direction layer** that post-writer and series-planner read to choose what to write about.

---

## Modes

| Mode | When to Use | Behavior |
|------|-------------|----------|
| **Full Scan** | No `trend-angles.md` exists, or it's empty/scaffold only | Run all 5 steps from scratch |
| **Refresh** | `trend-angles.md` already has data | Check `creative-log.md` for last scan date → update stale trends, preserve evergreen angles |

---

## Auto-Load Protocol

On every invocation, BEFORE any research:

1. **Check `creative-memory/` directory** → If missing, create it
2. **Read `brand-memory/voice-profile.md`** (read-only) → Brand tone for angle framing
3. **Read `brand-memory/positioning.md`** (read-only) → Core positioning = the lens for trend-to-angle conversion
4. **Read ALL `.md` files in `creative-memory/`** (except README.md) → Existing guidelines, frameworks, log
5. **Optional: Read `research-memory/market-landscape.md`** (read-only) → Market trends, seasonality context
6. If `trend-angles.md` has data AND `creative-log.md` shows a previous trend-scout run → **suggest Refresh mode**

---

## Input Gathering

Collect from the user conversationally. Do NOT dump a form — ask naturally.

| Field | Required | Description |
|-------|----------|-------------|
| Brand category / Industry | YES | What space does the brand operate in? |
| Target audience | YES | Who are we creating content for? |
| Focus keywords | Optional | Specific topics or angles to explore |
| Platform priority | Optional | Which platforms matter most? |
| Language | Optional | 결과물 작성 언어 (default: English) |

**If brand-memory/ exists**, pre-fill category and audience from `positioning.md` — ask user to confirm or correct.

**If this is a Refresh**, show the current trend-angles.md summary and ask: "Any specific direction you want to explore, or should I scan broadly for what's new?"

---

## Process

### Step 1: Context Load + Input Collection

**Goal**: Establish brand context and determine scan scope.

1. Execute Auto-Load Protocol (above)
2. Extract from `positioning.md`: brand category, core positioning, target audience, key differentiators
3. If `positioning.md` missing → ask user directly for category + positioning
4. Determine mode: Full Scan (no existing data) or Refresh (existing data found)
5. For Refresh: parse existing `trend-angles.md` to identify current trends and their dates

**Output**: Clear brand context + mode decision + scope of search.

---

### Step 2: Trend Discovery (Perplexity)

**Goal**: Identify 3-5 current trends relevant to the brand's category and audience.

**Tool**: `perplexity_ask`

**Query pattern (Full Scan)**:
```
What are the top 3-5 trending topics in the [category] space right now that brands can leverage for social media content?

For each trend:
- Name the trend in 3-5 words
- Explain why it's trending NOW (what triggered it)
- Describe who cares about this (audience overlap with [target audience])
- Estimate how long this trend will remain relevant (days, weeks, months)
- Name 1-2 platforms where this trend is most active

Focus on trends that a [brand type] brand could authentically participate in.
```

**Query pattern (Refresh)**:
```
Here are the trends we identified previously for [category]:
[list existing trends from trend-angles.md]

Which of these are still relevant? What new trends have emerged since [last scan date]?
For any new trends, provide: name, trigger, audience relevance, estimated lifespan, best platforms.
```

**Parameters**:
- `search_recency_filter`: `"week"` (default) or `"month"` (if fewer than 3 results)
- `search_context_size`: `"medium"`

**Source verification**: After getting trends, use `perplexity_search` to find 1-2 credible source URLs per trend (industry publications, platform data, research reports).

**Fallback**: If fewer than 3 trends found with `"week"` filter, retry with `"month"`.

**Output**: 3-5 validated trends with sources.

---

### Step 3: Brand Angle Conversion

**Goal**: Transform each raw trend into a brand-specific content angle.

For each trend from Step 2, apply the **positioning lens**:

1. **Connection point**: How does this trend relate to our brand's core positioning?
2. **Audience hook**: What aspect of this trend would our target audience care about most?
3. **Brand voice fit**: How would we talk about this in our brand's tone? (reference `voice-profile.md`)
4. **Angle statement**: Write a one-sentence content direction that a copywriter could run with

**Urgency tagging** — assign one label per trend:

| Tag | Meaning | Action Window |
|-----|---------|---------------|
| 🔴 High | Time-sensitive, ride it NOW | Within 1 week |
| 🟡 Medium | Relevant window open | 2-4 weeks |
| 🟢 Low | Slow-burn, long shelf life | 1-2 months |

**Platform mapping** — for each angle, identify the 1-2 best platforms based on:
- Where the trend is most active
- Where the brand's audience is most engaged
- Which format best suits the angle (long-form → LinkedIn, visual → Instagram, etc.)

**Output**: 3-5 trend angles with urgency tags and platform recommendations.

---

### Step 4: Evergreen Angles

**Goal**: Add 2-3 timeless content angles derived from brand positioning.

Evergreen angles are NOT trend-dependent. They come from:
- The brand's core value proposition
- Recurring audience pain points (from `positioning.md` or `research-memory/`)
- Category fundamentals that never go out of style

For each evergreen angle, define:
- **Theme**: The broad topic area
- **Brand angle**: The brand's unique perspective on this theme
- **Best platforms**: Where this type of content performs best
- **Reuse cadence**: How often this angle can be recycled (weekly, monthly, quarterly)

**For Refresh mode**: Keep existing evergreen angles intact. Only add new ones if a clear gap is identified. Never delete existing evergreen angles — they are stable by design.

**Output**: 2-3 evergreen angles appended after current trends.

---

### Step 5: Save & Log

**Goal**: Write all findings to `creative-memory/trend-angles.md` and log the execution.

#### 5a. Write trend-angles.md

Use the exact schema below:

```markdown
# Trend Angles
> Last updated: [YYYY-MM-DD]
> Source skill: trend-scout
> Mode: [Full Scan / Refresh]

## Current Trends
| # | Trend | Brand Angle | Urgency | Best Platforms |
|---|-------|-------------|---------|----------------|
| 1 | [trend name] | [brand-specific angle statement] | 🔴/🟡/🟢 | [platform list] |
| 2 | ... | ... | ... | ... |

## Evergreen Angles
| # | Theme | Brand Angle | Best Platforms | Reuse Cadence |
|---|-------|-------------|----------------|---------------|
| 1 | [theme] | [brand-specific angle] | [platforms] | [weekly/monthly/quarterly] |

## Sources
| Trend | Source URL | Retrieved |
|-------|-----------|-----------|
| [trend name] | [URL] | [YYYY-MM-DD] |
```

**For Refresh mode**: Do NOT overwrite the entire file. Update the Current Trends table (replace stale trends, add new ones). Keep Evergreen Angles section intact unless explicitly adding new ones. Append `> Refreshed: [date]` below the header.

**Language rule**: 섹션 헤더와 테이블 컬럼명은 영어로 유지합니다. 본문, 셀 값, 설명, 분석 텍스트는 사용자가 지정한 언어로 작성합니다. 언어가 지정되지 않으면 English로 작성합니다.

#### 5b. Update creative-log.md

Append one row:

```
| [YYYY-MM-DD] | trend-scout | Full Scan / Refresh | [brief summary: e.g., "Found 4 trends: AI content tools, micro-communities, ..."] | Perplexity |
```

---

## Perplexity MCP Tool Guide

| Tool | When to Use | This Skill |
|------|-------------|------------|
| `perplexity_ask` | Fast Q&A, current trends, factual | Step 2 main discovery |
| `perplexity_search` | Find specific URLs, verify sources | Step 2 source verification |

**Common parameters**:
- `search_recency_filter`: `"week"` for trends (default), `"month"` if results are sparse
- `search_context_size`: `"medium"` — trends need current data but not deep analysis

**Query best practices**:
- Always include the exact brand category in every query
- Specify "for social media content" to get actionable trends (not just news)
- Ask for estimated trend lifespan — crucial for urgency tagging
- One discovery query + one verification query per run (minimize API calls)
- For Refresh: provide existing trend list so Perplexity can identify what's new vs. stale
- Language: 사용자가 English 외 언어를 지정한 경우, 모든 query 끝에 "Respond in [language]."를 추가

---

## Memory Access Rules

| Memory | Permission | Purpose |
|--------|-----------|---------|
| `brand-memory/positioning.md` | **Read-only** | Core lens for trend → angle conversion |
| `brand-memory/voice-profile.md` | **Read-only** | Tone consistency for angle framing |
| `research-memory/market-landscape.md` | **Read-only** | Market context, seasonality awareness |
| `creative-memory/trend-angles.md` | **Read & Write** | Primary output file |
| `creative-memory/creative-log.md` | **Write (append)** | Execution history |

**NEVER write to brand-memory/ or research-memory/.** These are owned by vibe-mkt and mkt-study respectively.

---

## Error Handling

| Scenario | Response |
|----------|----------|
| Perplexity MCP unavailable | Inform user → generate evergreen angles only from positioning.md |
| `positioning.md` not found | Ask user directly for brand category + positioning → proceed |
| Fewer than 3 trends found | Expand: widen recency filter from `"week"` → `"month"`, broaden category keywords |
| Existing `trend-angles.md` unparseable | Suggest Full Scan mode to rebuild from scratch |
| Source verification returns no URLs | Keep the trend but mark source as "Perplexity synthesis (no direct URL)" |

---

## Quality Checklist

Before saving, verify:

- [ ] At least 3 current trends identified with brand angles
- [ ] Every trend has an urgency tag (🔴/🟡/🟢) and platform recommendation
- [ ] At least 2 evergreen angles included
- [ ] All angles are filtered through brand positioning (not generic trend descriptions)
- [ ] Sources section has at least 1 URL per trend (or explicit "no direct URL" note)
- [ ] `creative-log.md` updated with execution record
- [ ] brand-memory/ was read-only (no writes)
- [ ] For Refresh: existing evergreen angles preserved, only stale trends replaced

---

## What This Skill Does NOT Do

- **Write social posts** → Use `post-writer` (consumes this output)
- **Plan campaigns** → Use `series-planner` (consumes this output)
- **Generate images** → Use `image-creator` (downstream)
- **Deep market research** → Use `market-scanner` from mkt-study plugin
- **Competitor analysis** → Use `competitor-analyzer` from mkt-study plugin

Trend Scout stays focused on **discovering trends and converting them into brand content angles** — nothing more.
