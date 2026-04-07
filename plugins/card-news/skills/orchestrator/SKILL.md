---
name: card-news-orchestrator
description: "Route your card-news production to the right skills in the right order. Diagnoses what assets exist, selects the optimal pipeline mode, and guides execution step by step. Use when user mentions: 카드뉴스, card news, 카드뉴스 만들어, 인스타 카드, instagram cards, 카드뉴스 제작, card news pipeline, 카드뉴스 파이프라인, make card news, 카드뉴스 시작, 카드뉴스 기획, 카드뉴스 렌더링, 카드뉴스 상태"
user-invocable: true
---

# Card-News Orchestrator

> Diagnose your card-news production state, select the right pipeline mode, and guide execution.
> No external tools — pure routing. Reads memory to recommend what to run and when.

---

## Purpose

Card-News Orchestrator is the **traffic controller** for the 6 card-news skills. It answers:

- What card-news assets exist, and what's missing?
- Which mode fits my current request?
- Which skill should run next?
- What's the full execution path?

This skill **never creates content itself**. It reads memory to diagnose the current state, analyzes the user's request, and produces a step-by-step execution plan pointing to the right skills.

---

## Memory Auto-Load Protocol

On every invocation, BEFORE any routing:

```
1. Check card-news-memory/ exists
   → If missing: create from card-news-memory-template/
   → If creation fails: proceed with all values as "NOT SET"
2. Try to read card-news-memory/ files:
   - series-config.md → Brand header, handle, tags, colors
   - production-log.md → Recent production history
   - copy-bank.md → Approved copy archive
   → Any file missing: mark as "NOT SET" in dashboard, continue
3. Optional: Check brand-memory/voice-profile.md → Brand tone
4. Optional: Check creative-memory/visual-guidelines.md → Visual identity
   → These directories may not exist — mark as "MISSING" and continue
```

**어떤 파일이 없어도 orchestrator는 중단하지 않는다.** Dashboard에 현재 상태를 표시하고, 사용자에게 누락된 설정을 안내한 뒤 가능한 모드로 진행한다.

---

## Modes

| Mode | Name | When to Use | Behavior |
|------|------|-------------|----------|
| **A** | Full Production | Start from scratch — topic given, no existing copy | copy-writer → copy-evaluator → contents-manager → image-generator → card-news-maker |
| **B** | Re-render | Approved copy exists, need visual output | contents-manager → image-generator → card-news-maker |
| **C** | Copy Only | Write + evaluate copy, no rendering | copy-writer → copy-evaluator |
| **D** | Quick Render | All assets ready (copy + icons + images) | card-news-maker only |

---

## Process

### Step 1: Build Production Status Dashboard

Generate from Auto-Load data:

```
Card-News Production Status
══════════════════════════════
Config:
  Series Config     : [CONFIGURED / NOT SET]
  Brand Header      : [value or MISSING]
  Account Handle    : [value or MISSING]

Recent Production:
  Last produced     : [DATE or NEVER]
  Total sets        : [N]

Assets:
  Copy Bank entries : [N] (few-shot references)

External Context:
  Brand Voice       : [AVAILABLE / MISSING]
  Visual Guidelines : [AVAILABLE / MISSING]
  Research Data     : [AVAILABLE / MISSING]
```

**Always show the dashboard first** — it grounds the conversation in facts.

---

### Step 2: Gather Input

Collect from the user:

| Input | Required | Default | Notes |
|-------|----------|---------|-------|
| Topic / Theme | Yes | — | The subject of the card-news |
| Card count | No | 4 | Range: 2~10 |
| Language | No | 한국어 | Copy language |
| Card structure | No | Auto (copy-writer decides) | Override: explicit type sequence |
| Color override | No | series-config defaults | Custom --highlight, --feature-bg, etc. |

If `series-config.md` has no brand header or handle configured, prompt the user to set them before proceeding. Write to `series-config.md` if new values are provided.

---

### Step 3: Select Mode

| Condition | Auto-Suggest |
|-----------|-------------|
| New topic, no existing copy | **Mode A: Full Production** |
| Copy exists (from copy-bank or user-provided), needs rendering | **Mode B: Re-render** |
| User wants copy only ("카피만", "글만 써줘") | **Mode C: Copy Only** |
| All assets provided (copy + images + icons) | **Mode D: Quick Render** |
| Ambiguous | Show dashboard → ask user to pick |

Present the suggested mode with a one-line rationale. Let the user confirm or override.

---

### Step 4: Build Execution Path

#### Skill Dependency Map

```
              ┌──────────────┐
              │ orchestrator │  ← you are here
              └──────┬───────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            │
 ┌────────────┐ ┌──────────────┐ │
 │ copy-writer│ │contents-mgr  │ │
 └─────┬──────┘ └──────┬───────┘ │
       │               │         │
       ▼               │         │
┌───────────────┐      │         │
│copy-evaluator │      │         │
└───────┬───────┘      │         │
        │ PASS         ▼         ▼
        │     ┌──────────────┐ ┌──────────────┐
        └────>│card-news-maker│ │image-generator│
              └──────────────┘ └──────────────┘
```

#### Mode A: Full Production

```
Full Production Pipeline
══════════════════════════
Step 1: copy-writer        → Card structure + all copy
Step 2: copy-evaluator     → Quality gate (PASS / REVISION)
        ↳ REVISION → back to copy-writer with feedback
Step 3: contents-manager   → Icon selection + image prompts
Step 4: image-generator    → AI image generation (nanobanana)
Step 5: card-news-maker    → HTML assembly + Playwright render → PNG

Note: Steps 1-2 and Step 3 can run in parallel.
      Step 4 needs Step 3 output. Step 5 needs all previous outputs.
```

#### Mode B: Re-render

```
Re-render Pipeline
══════════════════════════
Step 1: contents-manager   → Icon selection + image prompts
Step 2: image-generator    → AI image generation
Step 3: card-news-maker    → HTML assembly + render → PNG
```

#### Mode C: Copy Only

```
Copy Only Pipeline
══════════════════════════
Step 1: copy-writer        → Card structure + all copy
Step 2: copy-evaluator     → Quality gate
        ↳ REVISION → back to copy-writer
```

#### Mode D: Quick Render

```
Quick Render Pipeline
══════════════════════════
Step 1: card-news-maker    → HTML assembly + render → PNG
```

---

### Step 5: Guide Execution

#### Initial handoff:

```
▶ Next skill: [SKILL_NAME]
  Purpose: [one-line description]
  Input needed: [what to prepare]

Say "[SKILL_NAME] 실행해줘" to start.
```

#### After each skill completes:

```
✅ [COMPLETED_SKILL] done → [output description]

▶ Next: [NEXT_SKILL_NAME]
  Purpose: [one-line description]

Continue? Say "[NEXT_SKILL_NAME] 실행해줘"
```

#### After all skills complete:

Summarize what was produced:
- Number of cards rendered
- Output path
- Log entry in production-log.md

Suggest next options: make another set, modify copy, change theme, export for different platform.

---

## Skill Quick-Reference

| Skill | MCP Tool | Output |
|-------|----------|--------|
| copy-writer | None | Structured copy markdown |
| copy-evaluator | None | PASS / PASS WITH NOTES / REVISION |
| contents-manager | None | Icon SVGs + image prompts |
| image-generator | nanobanana | PNG image files |
| card-news-maker | Playwright | Assembled HTML + card PNG files (1080x1350) |

---

## Cross-Plugin Connections

| Direction | Connection | Purpose |
|-----------|-----------|---------|
| ← brand-memory | voice-profile.md → copy-writer, copy-evaluator | Brand voice consistency |
| ← creative-memory | visual-guidelines.md → contents-manager, image-generator | Visual identity |
| ← research-memory | topic research → copy-writer | Research-backed content |
| → creative-mkt | card images → image-creator for variations | Visual asset reuse |

---

## What This Skill Does NOT Do

- **Write copy** → copy-writer
- **Evaluate copy** → copy-evaluator
- **Plan visual assets** → contents-manager
- **Generate images** → image-generator
- **Render HTML/PNG** → card-news-maker
- **Create content of any kind** → It only routes and coordinates

Card-News Orchestrator stays focused on **routing** — diagnosing, planning, and guiding.
