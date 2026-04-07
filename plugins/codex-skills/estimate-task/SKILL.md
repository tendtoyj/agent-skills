---
name: estimate-task
description: Analyze research documents to estimate implementation scope, complexity, risk, and work split before planning. Use when the user wants a pre-plan estimation session, task decomposition guidance, or a saved estimation document under thoughts/estimation.
---

# Estimate Task

## Goal

Estimate scope and risk from research documents, then agree on task split before create-plan.

## Guardrails

- Use research document content only.
- Do not inspect codebase for this session.
- Show evidence for each judgment.
- Flag missing info as "research gap".

## Step 1: Select Source Document

1. If an argument includes a document number, open `thoughts/research/` file starting with that number.
2. If no argument:
- List markdown files in `thoughts/research/` excluding `done/`.
- Ask user to choose one.
3. Read the selected document fully.

## Step 2: Scope and Size Analysis

Produce a table for expected changes.

| File | Change Type | Size | Summary |
|------|-------------|------|---------|
| `path/to/file` | create/modify/delete | small/medium/large | one-line change |

Include totals: number of files and create/modify/delete ratio.

## Step 3: Impact and Risk Analysis

Cover:
- Directly affected features.
- Indirectly affected features.
- Regression-prone areas.
- Behavior changes.
- Migration needs.
- Performance risk.

Risk levels:
- `낮음`: isolated change, minimal behavior impact.
- `보통`: indirect impact likely, careful validation needed.
- `높음`: core-path change, high regression potential.

## Step 4: Task Split Proposal

Recommend split when at least one condition is true:
- 5+ files changed.
- Multi-layer change (for example backend + frontend).
- At least one high-risk item.
- 2+ independently testable units.

Single-task format:

```text
✅ 단일 작업으로 진행 가능
- 예상 규모: 소/중/대
- 이유: 판단 근거
```

Split format:

```text
📋 N개 작업으로 분할 권장

작업 1: 제목
- 범위: 파일 목록
- 목표: 완료 시 변화
- 선행 조건: 없음 / 작업 N
```

Show dependency order between tasks.

## Step 5: Discussion Loop

After Steps 2-4, ask user:
- Any disagreement with analysis?
- Any missing considerations?
- Any preferred split changes?

Iterate until agreement.

## Step 6: Optional Save

Ask: "estimation 문서로 저장할까요?"
When user agrees:
1. Create `thoughts/estimation/` if missing.
2. Find next 3-digit number (starting `001`).
3. Save `thoughts/estimation/NNN_{topic_summary}.md`.

Use this template:

```markdown
---
date: YYYY-MM-DD
source_research: "NNN_topic.md"
status: estimated
---

# Estimation: Topic

## 원본 리서치
- 문서: `thoughts/research/NNN_topic.md`

## 범위 분석

## 영향 및 리스크 분석

## 작업 분할

## 논의 사항

## 다음 단계
- [ ] `create-plan` 으로 구현 계획 수립
```
