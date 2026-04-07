---
name: peer-review
description: Critically evaluate peer-review findings against the actual codebase and architecture before accepting them. Use when a user provides external review comments/findings and needs a validated summary of confirmed vs rejected issues plus a prioritized fix plan.
---

# Peer Review

Validate peer-review findings with code evidence. Do not trust findings at face value.

## Input Contract

Require explicit peer-review findings as an input argument.

Expected input block:

```text
Findings from peer review:

<user-provided findings>
```

If findings are missing, empty, or placeholder-only, stop and ask:

```text
Peer-review findings missing. Please paste the review findings to validate.
```

Do not continue analysis until findings are provided.

## Evaluation Rules

For each finding:

1. Verify existence in real code.
2. If not valid, explain why it is not an issue.
3. If valid, assess severity and impact.
4. Capture concrete evidence (file paths, relevant lines, behavior).

Treat reviewer context as potentially incomplete:
- Reviewer may miss historical decisions.
- Reviewer may misread architecture boundaries.
- Reviewer may describe symptoms, not root causes.

Reject findings that are contradicted by code behavior or existing safeguards.

## Analysis Process

1. Parse each finding into a discrete item.
2. Inspect related code paths and tests.
3. Confirm or reject each finding with evidence.
4. For confirmed issues, assign priority based on user impact, correctness risk, and blast radius.
5. Build a fix plan ordered by priority.

If evidence is inconclusive, mark as `Needs Follow-up` and state exactly what is missing.

## Output Format

Return all sections below.

### 1) Valid Findings (Confirmed Issues)
- Finding
- Why valid
- Evidence
- Severity (`Critical` | `High` | `Medium` | `Low`)

### 2) Invalid Findings (Rejected)
- Finding
- Why invalid
- Evidence or architectural clarification

### 3) Prioritized Action Plan
- Ordered list for confirmed issues only
- Root-cause-first fixes
- Suggested validation/tests per action

## Quality Bar

- No assumption-only conclusions.
- No generic statements without code evidence.
- Distinguish bug, intentional behavior, and tradeoff.
- Prefer root-cause fixes over local patches.
