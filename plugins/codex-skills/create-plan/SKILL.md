---
name: create-plan
description: Create detailed implementation plans through an interactive, skeptical process with clear phases, decision-complete specs, and measurable acceptance criteria. Use when users ask to draft or refine technical implementation plans and save them as numbered files in thoughts/plans (NNN_title_summary.md) at a project root.
---

# Create Implementation Plan

Create detailed implementation plans through an interactive, iterative process. Be skeptical, thorough, collaborative.

## Initial Response

When invoked, respond exactly:

```text
I'll help you create a detailed implementation plan. Let me start by understanding what we're building.

Please provide:
1. The task description or requirements
2. Any relevant context, constraints, or specific requirements
3. Links to related research or previous implementations

I'll analyze this information and work with you to create a comprehensive plan.
```

Then wait for user input.

## Process Phases

### Phase 1 - Ground in Environment

- Explore first, ask second.
- Run at least one targeted non-mutating exploration pass.
- Resolve ambiguities via inspection when possible.
- Ask only what cannot be discovered.

### Phase 2 - Intent Chat

Clarify until all are explicit:
- Goal and success criteria
- Audience
- In-scope and out-of-scope
- Constraints
- Current state
- Preferences and tradeoffs

If high-impact ambiguity remains, keep asking.

### Phase 3 - Implementation Chat

Make spec decision-complete:
- Approach and architecture
- Interfaces and schemas
- Data flow
- Edge cases and failure modes
- Testing and acceptance criteria
- Rollout, monitoring, migrations, compact

Ensure each phase independently verifiable.

### Phase 4 - Detailed Plan Writing

After research completion:

1. Propose plan structure:
   ```text
   Based on the research findings, here's my proposed plan structure:

   ## Overview
   [1-2 sentence summary]

   ## Implementation Phases:
   - [ ] 1. [Phase name] - [what it accomplishes]
   - [ ] 2. [Phase name] - [what it accomplishes]
   - [ ] 3. [Phase name] - [what it accomplishes]

   Does this phasing make sense? Would you like to adjust the scope or order?
   ```
2. Ask confirmation or adjustments.
3. Iterate until confirmed.

Before writing, ensure:
- Research complete and understood.
- User confirmed structure.

### Plan File Location and Naming (Dynamic)

Default target directory:
- `<workspace_root>/thoughts/plans`

Rules:
1. Detect workspace root as current working directory unless user explicitly overrides.
2. Use `scripts/next_plan_path.py` to compute next output file path.
3. Scan `<workspace_root>/thoughts/plans` for `NNN_*.md` (`NNN` = 3 digits).
4. Choose next number as max existing + 1; if none, use `000`.
5. Generate concise title summary slug from plan title.
6. Save plan as `NNN_title_summary.md`.
7. Never write this file inside the skill folder.

Example:
- `python scripts/next_plan_path.py --workspace /path/to/repo --title "Dataset ingestion retry design"`

### Phase 5 - Review and Iterate

1. Save plan.
2. Present saved location.
3. Ask for adjustments.
4. Iterate until user satisfied.

## Questioning Guidance

### Asking Questions

- Ask only questions materially affecting the plan.
- Provide 2-4 meaningful options with one recommended default.
- If unavoidable and not representable, ask directly.

Question format:

```text
Questions:
1. [One specific question]
   Options:
   1. (Recommended) [Option + brief rationale]
   2. [Option + brief rationale]

2. [One specific question]
   Options:
   1. (Recommended) [Option + brief rationale]
   2. [Option + brief rationale]
```

### Two Kinds of Unknowns

Discoverable facts:
- Explore first.
- Ask only if multiple candidates or nothing found.

Preferences/tradeoffs:
- Ask early.
- If unanswered, proceed with recommended default and record assumption.

## Final Output

Only when decision-complete, write the plan without wrapper tags.
Save to dynamic path `NNN_title_summary.md` in `/thoughts/plans` at workspace root.

### Writing Style

- Audience: software tech lead; report-style readability.
- Keep hierarchy clear; proper indentation.
- Use tables when clarity improves.

### Rules

- Use Markdown.
- Minimize code blocks; only for exact contracts/interfaces.
- Headings in English; body in Korean; code/paths/commands in English.
- Follow template below.
- When referencing existing code, include file paths and line numbers.
- Do not ask "should I proceed?" after writing the plan.

```markdown
# [Feature/Task Name] Implementation Plan

## Overview
[Brief description of what we're implementing and why]

## Current State Analysis
[What exists now, what's missing, key constraints discovered]

## Desired End State
[Specification of the desired end state and how to verify it]

## What We're NOT Doing
[Explicitly list out-of-scope items]

## Assumptions / Defaults
[Decisions made due to missing input]

## Implementation Approach
[High-level strategy and reasoning]

## Public API / Interface Changes
[User-facing or integrator-facing changes]

---

## - [ ] Phase 1: [Descriptive Name]

### Overview
[What this phase accomplishes]

### Changes Required:

#### 1. [Component/File Group]
**File**: [path/to/file.ext]
**Changes**:
- [Change item 1]
- [Change item 2]

### Success Criteria:
- [ ] [Concrete, testable success criterion]
- [ ] [Another criterion]

---

## - [ ] Phase 2: [Descriptive Name]
[Repeat structure]

...

---

## Testing Strategy

### Unit Tests:
- [What to test]
- [Key edge cases]

### Integration Tests:
- [End-to-end scenarios]

### Manual Testing Steps:
1. [Specific verification step]
2. [Another verification step]

## Performance Considerations
[Any performance implications or optimizations needed]

## Migration Notes
[If applicable, how to handle existing data/systems]

## References

### Research Findings
- [List findings files with brief descriptions]

### Other Sources
- [List additional files read during planning]
- [Documentation consulted]
- [External resources referenced]
- [Related issues/PRs]
```

## Important Guidelines

1. Question vague requirements; surface issues early.
2. Keep a visible planning checklist.
3. Research before decisions on unfamiliar areas.
4. Keep notes factual; cite file paths and line numbers.
5. Include measurable success criteria.
6. Use code blocks only for exact contracts.
7. Make each phase independently verifiable.
8. Resolve ambiguities before finalizing; no open questions in plan.
9. List research notes and other sources in References.
10. Do not ask "should I proceed?" after the plan.
11. You are not in Plan Mode and may write plan file at any time.
