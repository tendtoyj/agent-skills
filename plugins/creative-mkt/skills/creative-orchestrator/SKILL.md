---
name: creative-orchestrator
description: "Route your creative needs to the right skills in the right order. Diagnoses what creative assets exist, what's missing, and builds the optimal skill chain for brand visual identity, storytelling, trend-powered content, and AI visual design. Use when user mentions: creative, make content, social content, what should I create, where do I start creative, creative plan, creative workflow, content workflow, full pipeline, content sprint, what creative do I need, creative status, creative orchestrator, help me create, create from scratch, social media content plan, 크리에이티브, 콘텐츠 만들어, 뭐부터 해야 해, 크리에이티브 상태, 콘텐츠 기획, 전체 파이프라인"
user-invocable: true
---

# Creative Orchestrator

> Diagnose your creative status, build the optimal skill chain, and guide execution step by step.
> No external tools — pure routing. Reads `creative-memory/` to recommend what to run and when.

---

## Purpose

Creative Orchestrator is the **traffic controller** for all 6 creative skills. It answers:

- What creative assets do I have, and what's missing?
- Which skill should I run next?
- In what order should I chain skills for my goal?
- What's stale and needs refreshing?

This skill **never creates content itself**. It reads `creative-memory/` to diagnose the current state, analyzes the user's request, and produces a step-by-step execution plan pointing to the right skills.

---

## Modes

| Mode | When to Use | Behavior |
|------|-------------|----------|
| **A: Full Pipeline** | New brand, empty creative-memory/ | Chain all skills: Foundation → Research → Content → Visual |
| **B: Content Sprint** | Foundation complete, need to produce content | Skip foundation, go straight to content + visuals |
| **C: Single Skill** | Specific task only | Route to one skill (with prerequisite check) |
| **D: Refresh** | Existing data is outdated | Re-run stale skills in Update/Refresh mode |

---

## Auto-Load Protocol

On every invocation, BEFORE any routing:

1. **Check `creative-memory/` directory**
   - If missing → Create from `creative-memory-template/`
2. **Read ALL `.md` files in `creative-memory/`** (except README.md)
3. For each file, assess:
   - **Exists?** — File present with substantive content (not just scaffold placeholders)
   - **Last updated** — Extract date from `> Last updated:` header or `creative-log.md`
   - **Richness** — Rich (detailed data) / Thin (scaffold only)
4. **Read `creative-log.md`** → Extract last execution date per skill
5. **Check `brand-memory/`** (read-only) → `voice-profile.md` + `positioning.md` availability
6. **Optionally check `research-memory/`** (read-only) → Market context availability
7. **Build Creative Status Dashboard** (see Step 1)

---

## Process

### Step 1: Build Creative Status Dashboard

Generate this dashboard from the Auto-Load data:

```
Creative Status Dashboard
══════════════════════════
🎨 Visual Guidelines       : [STATUS] [DATE_INFO]
📖 Storytelling Frameworks  : [STATUS] [DATE_INFO]
📈 Trend Angles             : [STATUS] [DATE_INFO] [FRESHNESS]
📝 Content Examples         : [STATUS] [ENTRY_COUNT]
📋 Creative Log             : [LAST_ENTRY_DATE]

External Context:
🔤 Brand Voice (brand-memory)      : [AVAILABLE / MISSING]
🎯 Positioning (brand-memory)      : [AVAILABLE / MISSING]
📊 Market Trends (research-memory) : [AVAILABLE / MISSING]
```

**Status values**:

- `✅ Complete` — File exists with substantive content
- `⚠️ Stale (Xd)` — Complete but outdated (see thresholds below)
- `❌ Missing` — File doesn't exist or is empty scaffold

**Staleness thresholds** (file-specific):

| File | Recommend | Strongly Recommend | Re-build |
|------|-----------|-------------------|----------|
| trend-angles.md | 7+ days | 14+ days | 30+ days |
| visual-guidelines.md | 30+ days | 90+ days | 180+ days |
| storytelling-frameworks.md | 30+ days | 90+ days | 180+ days |
| content-examples.md | Never stale | — | — |

**Always show the dashboard first** — it grounds the conversation in facts, not assumptions.

---

### Step 2: Analyze Request + Select Mode

Match the user's request to the right mode:

| Condition | Auto-Suggest |
|-----------|-------------|
| creative-memory/ empty + broad request ("만들어줘", "처음부터") | **Mode A: Full Pipeline** |
| creative-memory/ empty + specific skill mentioned | **Mode C: Single Skill** (but recommend Full Pipeline) |
| Foundation ✅ complete + content request | **Mode B: Content Sprint** |
| Foundation ✅ complete + specific skill needed | **Mode C: Single Skill** |
| creative-memory/ has data + "업데이트/갱신/리프레시" | **Mode D: Refresh** |
| Ambiguous request | Show dashboard → ask user to pick a mode |

**"Foundation complete"** = both `visual-guidelines.md` AND `storytelling-frameworks.md` have substantive content.

Present the suggested mode with a one-line rationale. Let the user confirm or override.

---

### Step 3: Build Execution Path

#### Skill Dependency Map

```
Group 1 — Foundation (sequential)
  visual-extractor ──→ framework-builder
    → visual-guidelines.md    → storytelling-frameworks.md

Group 2 — Research (independent, but benefits from Group 1)
  trend-scout
    → trend-angles.md

Group 3 — Content (requires Group 1 + 2)
  post-writer            OR    series-planner → post-writer × N
    → posts/[file].md            → campaigns/[file].md + posts × N

Group 4 — Visual (requires Group 3 output)
  image-creator × N
    → image files
```

Groups 1 and 2 are independent — user can choose the starting group.
Groups 3 and 4 must wait for upstream groups.

#### Mode A: Full Pipeline Path

```
📋 Full Creative Pipeline
══════════════════════════
Group 1 — Foundation
  Step 1: visual-extractor   → visual-guidelines.md
  Step 2: framework-builder  → storytelling-frameworks.md

Group 2 — Research
  Step 3: trend-scout        → trend-angles.md

Group 3 — Content
  Step 4: post-writer OR series-planner → post files

Group 4 — Visual
  Step 5: image-creator      → brand visuals

💡 Groups 1 & 2 are independent. Which group first?
```

#### Mode B: Content Sprint Path

Two sub-paths based on scope:

| User Request | Path |
|-------------|------|
| Single post ("포스트 하나") | post-writer → image-creator |
| Trend-based post ("트렌드 콘텐츠") | trend-scout → post-writer → image-creator |
| Campaign/series ("7일 캠페인") | series-planner → post-writer × N → image-creator × N |
| Trend + campaign | trend-scout → series-planner → post-writer × N → image-creator × N |

If `trend-angles.md` is stale (7+ days), recommend running trend-scout first regardless of sub-path.

#### Mode C: Single Skill Path

1. Map user request → target skill using this table:

| User Request Pattern | Target Skill | Prerequisite |
|---------------------|-------------|-------------|
| Visual guidelines, brand colors, typography | visual-extractor | None (needs image uploads) |
| Storytelling frameworks, narrative patterns | framework-builder | visual-extractor recommended |
| Trends, what's hot, trend angles | trend-scout | None |
| Write a post, social copy, caption | post-writer | guidelines + frameworks recommended |
| Campaign plan, series, multi-day content | series-planner | frameworks recommended |
| Image, visual, generate picture | image-creator | visual-guidelines recommended + copy needed |

2. Check prerequisites against dashboard status
3. If prerequisite missing → include it in the path with explanation
4. Present the path

#### Mode D: Refresh Path

1. Read `creative-log.md` → calculate days since last run per skill
2. Identify stale files using the threshold table from Step 1
3. Build refresh path — stale skills only, in dependency order
4. **Cascade rule**: If a Foundation file refreshes, flag downstream impact:
   - visual-guidelines refreshed → image-creator will use updated style on next run
   - frameworks refreshed → post-writer/series-planner will use updated patterns
   - trend-angles refreshed → new angles available for post-writer

---

### Step 4: Guide Execution

#### Initial handoff:

```
▶ Next skill: [SKILL_NAME]
  Purpose: [one-line description]
  Input needed: [what the user should prepare]

Say "[SKILL_NAME] 실행해줘" to start.
```

#### After each skill completes:

```
✅ [COMPLETED_SKILL] done → [output_file] saved

▶ Next: [NEXT_SKILL_NAME]
  Purpose: [one-line description]

Continue? Say "[NEXT_SKILL_NAME] 실행해줘"
```

#### After all skills complete:

Summarize what was built + suggest next options: create more posts, expand to another platform, plan a campaign series, or atomize for distribution via vibe-mkt's content-atomizer.

> **Language**: 사용자가 언어를 지정하면 대시보드 및 안내 텍스트를 해당 언어로 출력합니다. 개별 스킬 호출 시 동일한 언어 설정을 전달합니다.

---

## Skill Quick-Reference

| Skill | MCP Tool | Output | Est. Time |
|-------|----------|--------|-----------|
| visual-extractor | None (multimodal) | visual-guidelines.md | 10-15 min |
| framework-builder | None (conversational) | storytelling-frameworks.md | 10-15 min |
| trend-scout | Perplexity | trend-angles.md | 5-10 min |
| post-writer | None | posts/[platform]-[topic]-[date].md | 5-10 min |
| series-planner | None | campaigns/[theme]-series-plan.md | 10-15 min |
| image-creator | nanobanana | Image files | 5-10 min/img |

---

## Cross-Plugin Connections

After creative work completes, bridge to other plugins when relevant:

| Direction | Connection | Purpose |
|-----------|-----------|---------|
| → vibe-mkt | post-writer output → content-atomizer | Repurpose across platforms |
| → vibe-mkt | image-creator output → newsletters, emails | Visual assets for text content |
| ← mkt-study | research-memory/ → trend-scout, visual-extractor | Market + competitor context |
| ← vibe-mkt | brand-memory/ → all creative skills | Voice + positioning consistency |

---

## Quality Checklist

Before presenting a creative plan, verify:

- [ ] Status Dashboard shows accurate file states and dates
- [ ] Mode selection has clear rationale tied to dashboard + user request
- [ ] Execution path respects skill dependencies (no skill before its prerequisite)
- [ ] Each step names the skill, its output, and required input
- [ ] Single Skill mode includes missing prerequisites in the path
- [ ] Refresh mode uses correct staleness thresholds (7d for trends, 30d for foundation)
- [ ] Content Sprint checks Foundation status before proceeding
- [ ] Cross-plugin connections mentioned when relevant

---

## Examples

### New Brand — Full Pipeline (Mode A)

**User**: "소셜 콘텐츠를 처음부터 만들고 싶어"

> **Dashboard**: 🎨 ❌ · 📖 ❌ · 📈 ❌ · 📝 ❌ · 🔤 ✅ · 🎯 ✅
>
> **Mode**: A — Full Pipeline (creative-memory/ is empty, brand-memory/ exists)
>
> **Plan**: visual-extractor → framework-builder → trend-scout → post-writer → image-creator
>
> **Next**: visual-extractor — "브랜드 로고, 소셜 포스트, 웹사이트 스크린샷 등을 업로드해주세요"

### Weekly Content — Content Sprint (Mode B)

**User**: "이번 주 인스타 포스트 3개 만들어줘"

> **Dashboard**: 🎨 ✅ (12d) · 📖 ✅ (12d) · 📈 ⚠️ Stale (9d) · 🔤 ✅ · 🎯 ✅
>
> **Mode**: B — Content Sprint (Foundation ✅, trend-angles slightly stale)
>
> **Plan**: trend-scout (Refresh) → post-writer × 3 → image-creator × 3
>
> **Next**: trend-scout — "트렌드 앵글을 먼저 업데이트할게요. 특별히 탐색하고 싶은 방향이 있나요?"

### Quick Image — Single Skill (Mode C)

**User**: "이 카피에 맞는 이미지만 만들어줘"

> **Dashboard**: 🎨 ✅ (5d) · 📖 ✅ (5d) · 📈 ✅ (2d)
>
> **Mode**: C — Single Skill (image-creator, all prerequisites met)
>
> **Plan**: image-creator only
>
> **Next**: image-creator — "카피를 공유해주세요. 타겟 플랫폼도 알려주세요."

---

## What This Skill Does NOT Do

- **Create content** → Use the individual skills (post-writer, image-creator, etc.)
- **Write to creative-memory/** → Each skill writes its own output; this skill only reads
- **Execute marketing** → Use vibe-mkt for text marketing assets
- **Conduct research** → Use mkt-study for market/competitor research

Creative Orchestrator stays focused on **routing** — diagnosing what's needed, building the path, and guiding execution.
