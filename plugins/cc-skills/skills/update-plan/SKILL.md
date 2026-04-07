---
name: update-plan
description: Validate and improve existing implementation plans by cross-checking plan content against the real codebase, identifying missing details and risks, proposing concrete fixes, confirming unresolved decisions with the user, and updating the selected plan file in place. Use when users ask to review, verify, refine, or patch an existing plan in thoughts/plans.
---

# Update Plan

Validate one existing plan document against the current codebase, then improve the plan in place after user confirmation.

## Initial Response

When invoked, respond exactly:

```text
I will validate and improve an existing plan file.

Please provide one of:
1. Plan number (NNN)
2. Exact plan file path

If you do not provide one, I will list available plan files (excluding thoughts/plans/done) and ask you to choose.
```

Then proceed based on user input.

## Plan File Resolution

1. Resolve workspace root as current working directory unless user explicitly overrides.
2. Scan `<workspace_root>/thoughts/plans` for `NNN_*.md`.
3. Exclude all files under `<workspace_root>/thoughts/plans/done`.
4. If selector is an exact file path:
   - Use it if it exists and is not under `thoughts/plans/done`.
   - If under `done`, reject and ask for another target.
5. If selector is `NNN`:
   - Match `thoughts/plans/{NNN}_*.md` excluding `done`.
   - If no match, report and request another selector.
   - If multiple matches, list exact files and ask user to choose one.
6. If selector is missing:
   - List candidates (excluding `done`) and ask user to choose one exact file.

## Process Phases

### Phase 1 - Load and Decompose Plan

Extract the plan into a verification checklist:
- phase goals and success criteria
- referenced files/components/modules
- API/interface/schema claims
- assumptions and constraints
- test strategy and acceptance checks
- rollout/migration/monitoring notes

### Phase 2 - Ground in Codebase

- Verify checklist items against real code.
- Prefer non-mutating exploration (`rg`, targeted reads, safe git inspection).
- Record evidence with file paths and line numbers.

### Phase 3 - Gap and Risk Analysis

Classify findings as:
1. `Verified` - plan item matches existing implementation.
2. `Gap` - missing details or missing implementation context.
3. `Conflict` - plan contradicts current code behavior/structure.
4. `Sequence Risk` - phase order likely causes blockers/regressions.
5. `Test Gap` - insufficient regression/unit/integration/e2e coverage.
6. `Decision Needed` - requires user confirmation or product choice.

### Phase 4 - Propose Plan Improvements

Before editing, present:
1. Findings (ordered by severity and impact)
2. Proposed edits (section-by-section)
3. Explicit user decisions required

### Phase 5 - Confirm with User

- Ask only questions that materially change the plan.
- Provide 2-4 options, include one recommended default.
- If user gives no preference, apply recommended default and record assumption.

Question format:

```text
Questions:
1. [Specific decision]
   Options:
   1. (Recommended) [Option + short rationale]
   2. [Option + short rationale]
```

### Phase 6 - Update Plan In Place

After confirmation:
1. Edit the selected plan file in place.
2. Preserve existing structure when possible.
3. Make success criteria concrete and verifiable.
4. Add missing edge cases and failure modes.
5. Strengthen testing section with regression prevention.
6. Resolve contradictions or mark explicit assumptions.
7. Keep phases independently verifiable.

## Output Contract

### Before Confirmation

Provide three sections:
1. `Findings`
2. `Proposed Updates`
3. `Questions`

### After Confirmation

Provide:
1. updated plan file path
2. concise change summary
3. residual risks/open assumptions
4. recommended next validation step

## Rules

1. Work on plan quality, not implementation code changes.
2. Cite concrete evidence (file paths and line numbers).
3. Prefer root-cause planning fixes, not cosmetic wording only.
4. Keep edits small, reviewable, and decision-complete.
5. Never move plan files into `done` automatically.
6. Never rename target file unless user explicitly asks.
