---
name: linear-create-issue
description: Create Linear issues quickly using Linear MCP when a user wants to capture a bug, feature, improvement, or planning task during development. Gather a clear title, TL;DR, current vs expected behavior, and relevant files; propose team/project/labels/status/priority/cycle/milestone; confirm before creating; verify the result.
---

# Create Linear Issue

## Overview
Capture a bug/feature/improvement mid-development and create a properly configured Linear issue using Linear MCP.

## Workflow

### Step 1: Ask what the issue is (most important)
- Ask for the issue/feature/improvement in one or two sentences.
- Ask for current behavior vs desired behavior (if applicable).
- Ask for any constraints or deadlines only if the issue sounds time-sensitive.

### Step 2: Fetch Linear data
- Call these MCP tools in parallel after understanding the issue:
  - `list_cycles` (teamId: Pluto AI team ID)
  - `list_milestones` (project: "Pluto Duck (Local Desktop App)")
- If the Pluto AI team ID is not known, call `list_teams` to find it, then proceed.

### Step 3: Propose configuration
Propose defaults and let the user confirm or change them.

**Defaults (use unless user requests otherwise):**
- Team: Pluto AI
- Project: Pluto Duck (Local Desktop App)
- Assignee: Yoojung Kim

**Labels (propose based on issue type):**
| Type | Labels |
|------|--------|
| Feature | `Feature` |
| Bug | `Bug` |
| Improvement | `Improvement` |
| Planning | `planning` |

Additional labels to consider:
`ui`, `agent`, `vscode`, `cli`, `icd`, `planning`, `landing page`

**Status:** Ask the user to choose:
- `Todo` (ready to work on)
- `Backlog` (not yet prioritized)

**Priority:** Propose based on severity:
- 1 = Urgent
- 2 = High
- 3 = Normal (default)
- 4 = Low

**Cycle & Milestone:** Show fetched options and ask for a selection.

### Step 4: Search for context (optional)
- Only when helpful, use `rg` to locate relevant files.
- Surface at most 3 files that are most relevant.
- Avoid deep dives; keep it fast and lightweight.

### Step 5: Final confirmation (required)
- Summarize all configured values in a clear table.
- Ask: "이대로 생성할까요?"
- Wait for explicit approval before creating the issue.

### Step 6: Create the issue
Use `create_issue` with the confirmed values:
- team: "Pluto AI"
- title: Issue title
- description: Markdown formatted (use template below)
- project: "Pluto Duck (Local Desktop App)" (or selected)
- assignee: "Yoojung Kim" (or selected)
- cycle: Selected cycle number
- labels: Selected labels
- state: "Todo" or "Backlog"
- priority: 1-4
- milestone: Selected milestone (if any)

### Step 7: Verify
- Call `get_issue` with the created issue ID.
- Show the issue URL and all configured values (title, status, priority, labels, cycle, milestone).
- Offer to update immediately if anything looks wrong.

## Issue Description Template
Use this Markdown structure when creating the description:

```
## TL;DR
<one-sentence summary>

## Current vs Expected
- Current: <what happens now>
- Expected: <what should happen>

## Context
<why this matters, extra details, repro steps if relevant>

## Relevant files (max 3)
- `path/to/file`
```

## Behavior Rules
- Ask what the issue is first.
- Use defaults unless the user requests otherwise.
- Propose labels based on issue type.
- Fetch cycles/milestones dynamically via MCP.
- Keep it fast and conversational.
- Limit context to 3 files.
