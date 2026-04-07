---
name: pm-brief
description: Generate PM-facing Korean briefings from technical plans. Use when asked to explain implementation plans to product managers, translate engineering details into business impact, summarize effort and risk, or request PM decisions.
---

# PM Brief

## Goal

Convert a technical plan into a PM-readable briefing in Korean.

## Input Handling

1. Read the provided plan document or plan text in full.
2. Ask for the plan path or full text when missing.
3. Mark missing information explicitly as assumptions.

## Workflow

1. Extract context: problem, target users, current pain, constraints.
2. Extract solution shape: phase goals, key changes, dependencies.
3. Build PM-level language: minimize jargon; use short analogies when helpful.
4. Evaluate delivery: effort level, key risks, mitigation, blockers.
5. Isolate PM decisions: trade-offs, scope choices, timeline or risk acceptance.

## Output Requirements

Always respond in Korean.
Use exactly this section order.

### 1. One-Line Summary

- One sentence: what changes and why now.

### 2. Background & Problem

- Current state.
- Problem being solved.

### 3. Proposed Approach

- Focus on "what" not implementation internals.
- Explain plan shape in plain language.

### 4. Technical Glossary (Per Phase)

- For each phase, list terms appearing in the plan.
- Format: `Term -> simple explanation`.
- Add analogy only when it improves clarity.

### 5. Expected Outcomes

- User/business-visible changes.
- Measurable outcomes when evidence exists.

### 6. Effort & Risk Assessment

- Effort: Small/Medium/Large + one-line reason.
- Key risks + mitigation.
- Dependencies/blockers.

### 7. Decision Requests

- Concrete PM decisions required.
- Phrase as clear questions.

## Quality Bar

- Keep code-level details out unless required for a decision.
- Prefer concise bullets.
- Tie every major point to business/user impact.
