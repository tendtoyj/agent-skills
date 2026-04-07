---
name: branch-making
description: Create a git branch based on a Linear issue and update the issue status to In Progress. Use when starting work on a Linear issue.
---

# Branch Making from Linear Issue

Create a git branch based on a Linear issue and update the issue status to In Progress.

## Arguments (Optional)

Linear issue ID or identifier (e.g., PLU-123 or issue UUID)

```
$ARGUMENTS
```

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

### Step 1: Identify Issue

**Case A: Argument provided**
- config.workspace의 MCP `get_issue`로 이슈를 가져온다
- Show issue info (identifier, title, status) to user and ask for confirmation
- "Create branch for this issue?"

**Case B: No argument or unclear**
- config.workspace의 MCP `list_issues`로 이슈 목록을 가져온다:
  - assignee: config.assignee
  - state: "Todo" or "Backlog" (pre-work states)
  - team: config.team
  - limit: 10
- Display fetched issues in table format:
  | # | Identifier | Title | Status | Priority |
- Ask user to select by number

### Step 2: Confirm Issue

Fetch detailed info of selected issue using config.workspace의 `get_issue`:
- Issue identifier (e.g., PLU-123)
- Issue title
- Current status
- Project, labels, etc.

### Step 3: Generate Branch Name

Generate branch name based on issue info:

**Branch name format:** `{config.username}/{issue-identifier-lowercase}-{issue-title-kebab-case}`

Example: `tendtoyj/plu-123-add-user-authentication`

**Conversion rules:**
- Convert issue identifier to lowercase
- Remove special characters from issue title
- Replace spaces with hyphens (-)
- Convert English to lowercase
- Translate Korean title to English (concise, kebab-case friendly)
- Truncate branch name to 50 characters if too long

### Step 4: Confirm Branch Name

Show the generated branch name to user and ask for confirmation:
- Display: "Branch name: `{generated-branch-name}`"
- Ask: "Proceed with this branch name?"
- If user wants to modify, allow them to provide a custom branch name

### Step 5: Ensure main is Up-to-Date & Create Branch

Before creating the branch, you **must** ensure the local main branch is in sync with origin/main.

**Procedure:**

1. **Check current working tree status**
   ```bash
   git status
   ```
   - If there are uncommitted changes, ask the user whether to stash or commit them first.

2. **Switch to main and fetch latest from origin**
   ```bash
   git checkout main
   git fetch origin main
   ```

3. **Compare local main with origin/main**
   ```bash
   git rev-list --left-right --count main...origin/main
   ```
   - Result is `0\t0` → Already in sync, proceed.
   - Local is behind (`0\tN`) → Run `git pull origin main` to update.
   - Local is ahead (`N\t0`) → Inform the user and ask whether to push before proceeding.
   - Both sides have diverged (`M\tN`) → Inform the user of the divergence and ask how to resolve (rebase, merge, or abort).

4. **Create the branch only after main is confirmed up-to-date**
   ```bash
   git checkout -b {generated-branch-name}
   ```

**Important:** Never create a branch while main is outdated. Always branch from a main that is fully synced with origin/main.

### Step 6: Update Linear Issue Status

Use config.workspace의 MCP `save_issue` tool to change the issue status to **In Progress**.

### Step 7: Display Results

After completion, display:
- Created branch name
- Linear issue URL
- Updated issue status

## Error Handling

- **Issue not found:** Ask user to verify the issue ID/identifier
- **Branch already exists:** Ask user if they want to checkout existing branch
- **Uncommitted changes exist:** Ask user to stash or commit before proceeding
- **main diverged from origin/main:** Explain the divergence to the user and let them choose between rebase, merge, or abort.
- **git fetch failed (network error):** Inform the user they may be offline and ask whether to proceed based on local main.
- **No origin remote configured:** Prompt the user to verify their remote settings first.

## Example Usage

```
/branch-making PLU-239    # When you know the issue number
/branch-making plu-123    # Lowercase works too
/branch-making            # Select from list if you don't know the number
```
