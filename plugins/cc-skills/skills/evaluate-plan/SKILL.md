---
name: evaluate-plan
allowed-tools: Read, Glob, Edit, TodoWrite, AskUserQuestion
description: Evaluate implementation plans and report workload assessment with before/after impact analysis
---

# Update Plan

Read an implementation plan document, evaluate workload per phase, and analyze before/after impact.

## Step 1: Document Selection

If a plan path is given as an argument, use that document.
If no argument is provided:
1. Glob for .md files under `thoughts/plans/` (exclude `done/` directory)
2. Present the discovered file list via AskUserQuestion for the user to choose

## Step 2: Analysis & Evaluation

Read the selected plan document in full. Then perform the following two analyses.

### 2-A. Per-Phase Workload Assessment

Evaluate each phase along 3 axes and visualize with emoji badges.

Evaluation axes:

| Axis | Emoji | Levels |
|------|-------|--------|
| Stack | 🏗️ | `FE` — frontend only / `BE` — backend only / `FE+BE` — both / `infra` — CI, config, scripts, etc. |
| Files changed | 📁 | `1` / `2-3` / `4-5` / `6+` |
| Code complexity | 🧩 | `low` — mechanical additions/copies / `mid` — extending existing patterns, logic modifications / `high` — new patterns introduced, cascading changes across modules |
| Risk | ⚠️ | `safe` — no impact on existing behavior / `caution` — indirect impact on existing behavior possible / `risky` — core path changes, regression potential |

Overall workload (combined from 3 axes):
- 🟢 `small` — 1-2 files, low complexity, safe
- 🔵 `normal` — 2-3 files, mid complexity, safe~caution
- 🟠 `high` — 4+ files, mid~high complexity, caution
- 🔴 `very high` — 5+ files, high complexity, risky

Output format:

| Phase | Name | 🏗️ Stack | 📁 Files | 🧩 Complexity | ⚠️ Risk | Overall |
|-------|------|----------|----------|---------------|---------|---------|
| 1 | [name] | FE/BE/FE+BE/infra | N | low/mid/high | safe/caution/risky | 🟢🔵🟠🔴 level |

Below the table, provide a one-line overall difficulty summary.

### 2-B. Before/After Impact Analysis

Analyze changes from two perspectives.

**Code/Architecture perspective** — how code structure, data flow, and module relationships change:
- **Before**: current structure
- **After**: post-implementation structure
- **Key change**: the most important structural shift

**User-side feature perspective** — changes the end user would notice. If it's a pure internal refactor, state "No user-facing changes (internal structural improvement)":
- **Before**: current user experience
- **After**: post-implementation user experience

### 2-C. Per-Phase Manual Test Checklist

For each phase, list the manual tests that should be performed after the phase is complete to verify correctness.

Each test item should be:
- **Actionable** — a concrete step the tester can follow (e.g., "Open the settings page and toggle dark mode")
- **Observable** — clearly state the expected result (e.g., "All text colors should invert within 200ms")
- **Scoped** — only cover what changed in that specific phase, not prior phases

Output format:

#### Phase N: [name]
- [ ] [Action] → Expected: [observable result]
- [ ] [Action] → Expected: [observable result]
- [ ] (Regression) [Action on existing feature] → Expected: [unchanged behavior]

Include at least one regression check per phase if the phase touches existing behavior (Risk = caution or risky).

## Step 3: Discussion

Output the results of 2-A, 2-B, and 2-C in the conversation, then ask the user:
- Any disagreements with the evaluation?
- Anything to add or revise?

Iterate until the discussion is complete.

## Step 4: Update Plan Document

Once discussion is complete, ask via AskUserQuestion: "Should I add this evaluation to the plan document?"

If the user agrees, use Edit to append an `## Evaluation` section at the end of the plan document (before `## References` if it exists, otherwise at the end of file). If any plan content changes were agreed upon during discussion, apply those edits as well.

## Guidelines

- Do NOT explore the codebase. Evaluate based solely on the plan document content.
- Evaluation involves subjective judgment — always provide clear rationale so the user can agree or push back.
- Do NOT modify existing plan content. Only append the Evaluation section.
- Only edit existing Phase content if explicitly agreed upon during discussion.
