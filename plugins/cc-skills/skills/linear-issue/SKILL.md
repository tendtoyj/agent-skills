---
name: linear-issue
description: Create a complete Linear issue with proper configuration while mid-development. Captures bugs, features, and improvements quickly so the user can keep working.
---

# Create Linear Issue

User is mid-development and thought of a bug/feature/improvement. Capture it fast so they can keep working.

## Your Goal

Create a complete issue with:
- Clear title
- TL;DR of what this is about
- Current state vs expected outcome
- Relevant files that need touching
- Proper configuration (project, cycle, labels, status, priority, estimate, milestone)

## Flow

### Step 0: Load project config

프로젝트 루트에서 `.claude/linear-config.json`을 찾는다.

**파일이 있으면** → 읽어서 defaults로 사용.
- 단, 필수 필드(`workspace`, `username`, `team`, `project`, `assignee`)가 누락되어 있으면 해당 필드만 사용자에게 물어서 config에 추가 저장한다.
- Step 1으로 진행.

**파일이 없으면** → 초기 설정 플로우 실행:

1. Linear MCP로 데이터를 가져온다 (병렬 호출):
   - `list_teams` → 팀 목록
   - `list_projects` → 프로젝트 목록
   - `list_users` → 멤버 목록
   - `list_issue_labels` → 라벨 목록
2. 가져온 목록을 보여주고 사용자에게 기본값을 선택하게 한다:
   - MCP workspace 이름 (예: "linear", "linear-other" — 사용 중인 Linear MCP 서버 이름)
   - git branch prefix용 username (예: "tendtoyj")
   - 기본 팀
   - 기본 프로젝트
   - 기본 담당자
   - 자주 쓸 라벨 (이슈 타입별로 분류)
   - 기본 상태 (Todo / Backlog)
   - 기본 우선순위
3. 선택 완료 후 `.claude/linear-config.json`에 저장:

```json
{
  "workspace": "linear-other",
  "username": "tendtoyj",
  "team": "팀 이름",
  "project": "프로젝트 이름",
  "assignee": "담당자 이름",
  "labels": {
    "feature": ["Feature"],
    "bug": ["Bug"],
    "improvement": ["Improvement"],
    "additional": ["ui", "agent"]
  },
  "defaultStatus": "Todo",
  "defaultPriority": 3
}
```

4. "설정 완료! 다음부터는 이 설정을 기본으로 사용합니다." 안내 후 Step 1로 진행.

### Step 1: Ask what the issue is (MOST IMPORTANT)
First, ask the user:
- What's the issue/feature/improvement?
- Current behavior vs desired behavior (if applicable)

### Step 2: Fetch Linear data
After understanding the issue, call these MCP tools in parallel:
- `list_cycles` (teamId: config의 team)
- `list_milestones` (project: config의 project)

### Step 3: Propose configuration
config에서 읽은 기본값을 바탕으로 제안하고, 사용자에게 확인/수정을 요청한다.

**기본값:** `.claude/linear-config.json`에서 로드
- Team, Project, Assignee → config 값 사용
- 사용자가 다르게 원하면 변경

**Labels:** config의 labels를 참고해서 이슈 타입에 맞게 제안.

**Status:** config의 defaultStatus를 기본으로 제안. 사용자가 선택 가능:
- `Todo` - Ready to work on
- `Backlog` - Not yet prioritized

**Priority:** config의 defaultPriority를 기본으로 제안:
- 1 = Urgent
- 2 = High
- 3 = Normal
- 4 = Low

**Estimate (Task Size):** Propose based on scope analysis, then ask user to confirm.

Use the T-shirt size scale:
| Size | Value | Guideline |
|------|-------|-----------|
| XS | 1 | Trivial fix. Single-line or config change. < 30 min. |
| S | 2 | Small, well-scoped change. 1-2 files, clear path. ~1-2 hours. |
| M | 3 | Moderate task. 2-4 files, some logic changes. ~half day. |
| L | 5 | Significant work. Multiple files/components, needs design thought. ~1 day. |
| XL | 8 | Large feature or refactor. Cross-cutting concerns, multi-phase. ~2+ days. |

How to suggest the right size:
- **Look at the number of files/components affected** — more files = bigger size
- **Consider if new patterns or abstractions are needed** — if yes, bump up one size
- **Account for testing and edge cases** — bugs with tricky reproduction = bump up
- **If unsure, lean toward one size larger** — underestimation is worse than overestimation
- **Show your reasoning briefly** when proposing (e.g., "M (3) — 2-3 files touched, straightforward logic change")

**Cycle & Milestone:** Show fetched options and ask user to select.

### Step 4: Search for context (optional)
Only when helpful:
- Grep codebase to find relevant files
- Note any risks or dependencies you spot
- Use file count and change scope to refine your estimate if needed

### Step 5: Final confirmation (REQUIRED)
Before creating the issue, show a final summary and ask for confirmation:
- Display all configured values in a clear table format, **including estimate**
- Ask "이대로 생성할까요?" and wait for user confirmation
- Only proceed to create after explicit approval

## Behavior Rules

- **Ask what the issue is FIRST** — this is the most important step (config 로드는 백그라운드에서)
- config의 기본값을 사용하되, 사용자가 원하면 언제든 변경 가능
- Propose labels based on issue type (config의 labels 참조)
- **Always suggest an estimate with brief reasoning** — never skip this field
- Fetch cycle/milestone dynamically via API
- Keep it fast and conversational
- Max 3 files in context — most relevant only
- config 수정이 필요하면 사용자에게 "설정을 업데이트할까요?" 확인 후 수정

## Submit to Linear

Once confirmed, use the Linear MCP `save_issue` tool with config 값 기반:
```
team: config.team
title: Issue title
description: Markdown formatted
project: config.project (or selected)
assignee: config.assignee (or selected)
cycle: Selected cycle number
labels: [Selected labels from config.labels]
state: config.defaultStatus or user selection
priority: config.defaultPriority or user selection
estimate: 1 | 2 | 3 | 5 | 8
milestone: Selected milestone (if any)
```

## After Creation

1. **Verify the issue** by calling `get_issue` with the created issue ID
2. Confirm the issue was created correctly by showing:
   - Issue URL
   - All configured values (title, status, priority, **estimate**, labels, cycle, milestone)
3. If anything looks wrong, offer to update it immediately
