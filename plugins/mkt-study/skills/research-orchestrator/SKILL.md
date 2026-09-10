---
name: research-orchestrator
description: "Route your research needs to the right skills in the right order. Diagnoses what research you need, builds an optimal skill chain, and guides execution step by step. Use when user mentions: research, start research, what research do I need, research plan, research roadmap, full research, market research, competitive research, customer research, research orchestrator, which research skill, help me research, research strategy, research workflow, run all research, research from scratch, do research, begin research, research overview, research status"
user-invocable: true
---

# Research Orchestrator

> Diagnose your research needs, build the optimal skill chain, and guide execution step by step.
> No external tools — pure routing. Reads `research-memory/` status to recommend what to run and when.

---

## Purpose

Research Orchestrator is the **traffic controller** for all 8 research skills. It answers:
- What research do I need right now?
- What's already done, and what's missing?
- In what order should I run the skills?
- What's stale and needs refreshing?

This skill **never conducts research itself**. It reads `research-memory/` to diagnose the current state, analyzes the user's request, and produces a step-by-step execution plan pointing to the right skills.

> "Doing research without a plan is like shopping without a list — you'll miss what matters and waste time on what doesn't."

---

## Modes

| Mode | When to Use | Behavior |
|------|-------------|----------|
| **A: Full Research** | New brand/product, empty research-memory/ | Chain all 8 skills in dependency order |
| **B: Focused Research** | Specific question or area needed | Select 1-3 skills based on request |
| **C: Refresh** | Existing research is outdated | Re-run stale skills in Refresh mode |
| **D: Validate** | Strategy brief exists, need expert check | Run expert-validator only |

---

## Auto-Load Protocol

On every invocation, BEFORE any routing:

1. **Check `research-memory/` directory**
2. If files exist → Read ALL `.md` files (except README.md)
3. For each file, assess:
   - **Exists?** — File present with substantive content (not just scaffold headers)
   - **Last updated** — Extract date from `> Last updated:` header or `research-log.md`
   - **Richness** — Rich (detailed data) / Adequate / Thin (scaffold only)
   - **Enrichment status** — For `competitive-intel.md`: which skills have contributed? (`[competitor-finder]` / `[competitor-analyzer]` / `[competitor-visual]`)
   - **Expert validation** — For `strategy-brief.md`: are `[expert-validator]` sections populated?
4. Read `research-log.md` → Extract last execution date per skill
5. **Check `brand-memory/`** (read-only) → If exists, use business context to pre-fill recommendations
6. **Build Status Dashboard** (see Step 1 below)

---

## Process

### Step 1: Build Status Dashboard

**Goal**: Show the user exactly where their research stands.

Generate this dashboard from the Auto-Load data:

```
Research Status Dashboard
══════════════════════════
📊 Market Landscape    : [STATUS] [DATE_INFO]
🏢 Competitive Intel   : [STATUS] [DATE_INFO] [ENRICHMENT_INFO]
👥 Customer Insight    : [STATUS] [DATE_INFO]
💬 Customer Language   : [STATUS] [DATE_INFO]
📋 Strategy Brief      : [STATUS] [DATE_INFO] [VALIDATION_INFO]
📝 Research Log        : [LAST_ENTRY_DATE]
```

**Status values**:
- `✅ Complete` — File exists with substantive content
- `⚠️ Stale (Xd ago)` — Complete but outdated (30+ days)
- `⚠️ Partial` — File exists but missing sections (e.g., competitive-intel with finder only)
- `❌ Missing` — File doesn't exist or is empty scaffold

**Staleness thresholds**:
- 30+ days → "Update recommended"
- 90+ days → "Update strongly recommended"
- 180+ days → "Re-research needed"

**Always show the dashboard first** — it grounds the conversation in facts, not assumptions.

---

### Step 2: Analyze Request + Select Mode

**Goal**: Match the user's request to the right mode.

| Condition | Auto-Suggest |
|-----------|-------------|
| research-memory/ empty or missing + broad request | **Mode A: Full Research** |
| research-memory/ empty + specific area mentioned | **Mode B: Focused** (but recommend Full) |
| research-memory/ has data + specific area mentioned | **Mode B: Focused** |
| research-memory/ has data + "update"/"refresh"/"renew" | **Mode C: Refresh** |
| strategy-brief.md exists + "validate"/"review"/"check" | **Mode D: Validate** |
| Ambiguous request | Show dashboard → ask user to choose |

Present the suggested mode with a one-line rationale. Let the user confirm or override.

---

### Step 3: Build Execution Path

**Goal**: Generate the ordered list of skills to run, respecting dependencies.

#### Skill Dependency Map

```
market-scanner ─────────────────────────────────────┐
  → market-landscape.md                              │
                                                     │
competitor-finder ──┬── competitor-analyzer           │
  → competitive-    │     → enriches messaging/CTA   ├─→ research-synthesizer
     intel.md       │                                │      → strategy-brief.md
     (skeleton)     └── competitor-visual             │           │
                          → enriches design/visual    │           ▼
                                                     │    expert-validator
audience-profiler ──── voice-of-customer             │      → enriches strategy
  → customer-           → customer-language.md       │         -brief.md
     insight.md                                      │
                                                     │
                    ────────────────────────────────────┘
```

**Group independence** (for Mode A):
- Group 1 (Market): `market-scanner` — no prerequisites
- Group 2 (Competition): `competitor-finder` → `competitor-analyzer` → `competitor-visual` — sequential chain
- Group 3 (Customer): `audience-profiler` → `voice-of-customer` — sequential chain
- Group 4 (Synthesis): `research-synthesizer` → `expert-validator` — requires Groups 1+2+3

Groups 1, 2, 3 are independent of each other — user can choose the starting group.

#### Mode A: Full Research Path

Present the complete chain:

```
📋 Full Research Plan
═════════════════════
Group 1 — Market
  Step 1: market-scanner → market-landscape.md

Group 2 — Competition
  Step 2: competitor-finder → competitive-intel.md (skeleton)
  Step 3: competitor-analyzer → competitive-intel.md (+messaging)
  Step 4: competitor-visual → competitive-intel.md (+design)

Group 3 — Customer
  Step 5: audience-profiler → customer-insight.md
  Step 6: voice-of-customer → customer-language.md

Group 4 — Synthesis (after Groups 1-3)
  Step 7: research-synthesizer → strategy-brief.md
  Step 8: expert-validator → strategy-brief.md (+expert review)

💡 Groups 1-3 are independent. Which group would you like to start with?
```

#### Mode B: Focused Research Path

1. Map user request to target skill(s) using this table:

| User Request Pattern | Target Skill | Prerequisite |
|---------------------|-------------|-------------|
| Market size, trends, structure | market-scanner | None |
| Find competitors, competitive set | competitor-finder | None |
| Competitor website, messaging, pricing | competitor-analyzer | competitor-finder ✅ |
| Competitor design, visual, screenshots | competitor-visual | competitor-finder ✅ |
| Target audience, segments, journey | audience-profiler | None |
| Customer language, reviews, community | voice-of-customer | audience-profiler recommended |
| Strategy brief, cross-analysis, synthesis | research-synthesizer | market-scanner + competitor-finder + audience-profiler ✅ |
| Expert review, validate strategy | expert-validator | research-synthesizer ✅ |

2. Check prerequisites against dashboard status
3. If prerequisite missing → include it in the path
4. Present the focused path

#### Mode C: Refresh Path

1. Read `research-log.md` → calculate days since last run per skill
2. Identify stale skills (30/90/180-day thresholds)
3. Build refresh path — stale skills only, in dependency order
4. **Cascade rule**: If a data-producing skill refreshes, downstream synthesis may need refresh too:
   - market-landscape refreshed → flag research-synthesizer for refresh
   - competitive-intel refreshed → flag research-synthesizer for refresh
   - customer-insight refreshed → flag voice-of-customer + research-synthesizer for refresh

#### Mode D: Validate Path

1. Check `strategy-brief.md` exists with content
2. If YES → direct to `expert-validator`
3. If NO → explain prerequisite chain: `research-synthesizer` first (and its prerequisites if missing)

---

### Step 4: Guide Execution

**Goal**: Hand off to the first skill and provide ongoing navigation.

> **Language**: 사용자가 언어를 지정하면 대시보드 및 안내 텍스트를 해당 언어로 출력합니다. 개별 스킬 호출 시 동일한 언어 설정을 전달합니다.

#### Initial handoff:

```
▶ Next skill: [SKILL_NAME]
  Purpose: [one-line description]
  Input needed: [what the user should prepare]

Say "[SKILL_NAME] 실행해줘" to start.
```

#### After each skill completes:

Provide a transition prompt:

```
✅ [COMPLETED_SKILL] done → [output_file] saved

▶ Next: [NEXT_SKILL_NAME]
  Purpose: [one-line description]

Continue? Say "[NEXT_SKILL_NAME] 실행해줘"
```

#### After all research skills complete:

If `strategy-brief.md` exists with Next Steps → bridge to marketing execution:

```
🎯 Research complete! Your strategy brief recommends:
  1. [Next Step 1] → [marketing skill name]
  2. [Next Step 2] → [marketing skill name]
  3. [Next Step 3] → [marketing skill name]

Ready to execute? Pick a next step to start.
```

---

## Skill Quick-Reference

> **모든 스킬이 외부 MCP 없이 동작합니다.** Perplexity·Firecrawl·Playwright 의존성은 내장 도구(`WebSearch`/`WebFetch`/Claude Browser)와 번들 스크립트로 대체되어 있습니다.

| Skill | Tools | Output | Time Est. |
|-------|-------|--------|-----------|
| market-scanner | `WebSearch` + `WebFetch` | market-landscape.md | 5-10 min |
| competitor-finder | `WebSearch` + `WebFetch` | competitive-intel.md (skeleton) | 5-10 min |
| competitor-analyzer | `WebFetch` (+ Claude Browser 폴백) | competitive-intel.md (+messaging) | 10-15 min |
| competitor-visual | `scripts/*.sh` (+ Claude Browser 폴백) | competitive-intel.md (+design) | 10-15 min |
| audience-profiler | `WebSearch` + `WebFetch` | customer-insight.md | 5-10 min |
| voice-of-customer | `WebSearch` + `WebFetch` | customer-language.md | 5-10 min |
| research-synthesizer | None | strategy-brief.md | 5-10 min |
| expert-validator | Task Agents | strategy-brief.md (+expert) | 10-15 min |

---

## Quality Checklist

Before presenting a research plan, verify:

- [ ] Status Dashboard shown with accurate file states and dates
- [ ] Mode selection has clear rationale tied to dashboard state + user request
- [ ] Execution path respects all skill dependencies (no skill runs before its prerequisite)
- [ ] Each step in the path names the skill, its output, and what the user needs to provide
- [ ] Focused mode includes missing prerequisites in the path
- [ ] Refresh mode uses staleness thresholds consistently (30/90/180 days)
- [ ] Refresh cascade logic applied (upstream refresh → downstream re-synthesis flagged)
- [ ] Post-completion bridge to marketing execution skills (when strategy-brief.md has Next Steps)

---

## Example: Full Research (Abbreviated)

**User**: "우리 브랜드 리서치를 처음부터 해야 하는데"

> **Dashboard**:
> 📊 Market Landscape: ❌ Missing · 🏢 Competitive Intel: ❌ Missing · 👥 Customer Insight: ❌ Missing · 💬 Customer Language: ❌ Missing · 📋 Strategy Brief: ❌ Missing
>
> **Mode**: A — Full Research (research-memory/ is empty)
>
> **Plan**: market-scanner → competitor-finder → competitor-analyzer → competitor-visual → audience-profiler → voice-of-customer → research-synthesizer → expert-validator
>
> **Next**: market-scanner — "비즈니스/제품 설명을 알려주시면 시작합니다."

---

## Example: Focused Research (Abbreviated)

**User**: "경쟁사 웹사이트 메시징을 좀 더 깊게 분석해줘"

> **Dashboard**:
> 📊 Market Landscape: ✅ Complete (2025-01-15) · 🏢 Competitive Intel: ✅ Complete (2025-01-12) · ...
>
> **Mode**: B — Focused (competitor-analyzer targets website messaging)
> **Prerequisite**: competitor-finder ✅ already complete
>
> **Plan**: competitor-analyzer only
> **Post-completion**: "competitive-intel.md가 업데이트되었습니다. research-synthesizer로 전략 브리프도 갱신할까요?"

---

## Example: Refresh (Abbreviated)

**User**: "3개월 전 리서치인데 업데이트 필요해"

> **Dashboard**:
> 📊 Market Landscape: ⚠️ Stale (95d) · 🏢 Competitive Intel: ⚠️ Stale (92d) · 👥 Customer Insight: ⚠️ Stale (90d) · 💬 Customer Language: ✅ 45d · 📋 Strategy Brief: ⚠️ Stale (88d)
>
> **Mode**: C — Refresh (3 files exceed 90-day threshold)
> **Plan**: market-scanner (Refresh) → competitor-finder (Refresh) → audience-profiler (Refresh) → research-synthesizer (Refresh)
> **Cascade**: Strategy brief refresh needed because 3 upstream sources refreshed.

---

## What This Skill Does NOT Do

- **Conduct research** → Use the individual research skills (market-scanner, competitor-finder, etc.)
- **Write to research-memory/** → Each skill writes its own output; this skill only reads
- **Execute marketing** → Use execution skills (brand-voice, copy, SEO, email, etc.)
- **Replace skill selection judgment** → It recommends; the user decides

Research Orchestrator stays focused on **routing** — diagnosing what's needed, building the path, and guiding execution.
