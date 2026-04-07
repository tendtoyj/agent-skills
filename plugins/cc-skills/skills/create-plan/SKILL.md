---
name: create-plan
allowed-tools: Read, Glob, Grep, Task, TodoWrite, Write, Bash(ls:*), Bash(tree:*), Bash(mkdir:*), AskUserQuestion
description: Create detailed implementation plans through interactive process
---

# Create Implementation Plan

You are tasked with creating detailed implementation plans through an interactive, iterative process. You should be skeptical, thorough, and work collaboratively with the user to produce high-quality technical specifications.

## Initial Response

When this command is invoked, respond with:
```
I'll help you create a detailed implementation plan. Let me start by understanding what we're building.

Please provide:
1. The task description or requirements
2. Any relevant context, constraints, or specific requirements
3. Links to related research or previous implementations

I'll analyze this information and work with you to create a comprehensive plan.
```

Then wait for the user's input.

## Process Steps

### Step 1: Context Gathering & Initial Analysis

1. **Read all mentioned files immediately and FULLY**
2. **Spawn initial research tasks to gather context**:
   - Use codebase-locator to find all related files
   - Use codebase-analyzer to understand current implementation
   - Use pattern-finder to find similar features to model after

3. **Present informed understanding and focused questions**:
   Based on research, present findings and ask only questions that require human judgment

### Step 2: Research & Discovery

1. **Create a research todo list** using TodoWrite to track exploration tasks
2. **Spawn parallel sub-tasks for comprehensive research**
3. **Wait for ALL sub-tasks to complete** before proceeding
4. **Present findings and design options** with pros/cons

### Step 3: Plan Structure Development

Once aligned on approach:
```
Here's my proposed plan structure:

## Overview
[1-2 sentence summary]

## Implementation Phases:
- [ ] 1. [Phase name] - [what it accomplishes]
- [ ] 2. [Phase name] - [what it accomplishes]
- [ ] 3. [Phase name] - [what it accomplishes]

Does this phasing make sense?
```

### Step 4: Detailed Plan Writing

Write the plan to `thoughts/plans/NNN_{descriptive_name}.md` where NNN is a 3-digit sequential number (001, 002, etc.):

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

## Implementation Approach
[High-level strategy and reasoning]

## - [ ] Phase 1: [Descriptive Name]

### Overview
[What this phase accomplishes]

### Changes Required:

#### 1. [Component/File Group]
**File**: `path/to/file.ext`
**Changes**: [Summary of changes]

### Success Criteria:

#### Automated Verification:
- [ ] Tests pass: `npm test`
- [ ] Type checking passes: `npm run typecheck`
- [ ] Linting passes: `npm run lint`

#### Manual Verification:
- [ ] Feature works as expected in UI
- [ ] Performance is acceptable
- [ ] No regressions in related features

---

## - [ ] Phase 2: [Descriptive Name]
[Similar structure...]

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
- [List of files read during planning]
- [Documentation consulted]
- [External resources referenced]
- [Related issues/PRs]
```

### Step 5: Review and Iterate

1. Save the plan and present location to user
2. Iterate based on feedback
3. Continue refining until satisfied

## Important Guidelines

1. **Be Skeptical**: Question vague requirements, identify issues early
2. **Be Interactive**: Get buy-in at each major step
3. **Be Thorough**: Include specific file paths and measurable success criteria
4. **Be Practical**: Focus on incremental, testable changes
5. **Track Progress**: Use TodoWrite throughout planning
6. **No Open Questions**: Resolve all questions before finalizing plan
7. **Ignore Other Plans**: Do NOT read or reference other existing plan files in `thoughts/plans/`
8. **Cite Sources**: At the end of the plan document, include a "References" section listing all sources consulted during planning (e.g., files read, documentation, external resources, related issues/PRs)
9. **Minimize Code in Plans**: Plans are blueprints, not implementations. Only include code blocks when:
   - Defining API contracts or interfaces that must be exact
   - Logic is too tricky to explain clearly in words
   - A brief example significantly clarifies the intended approach

   For everything else, describe changes in plain language (e.g., "Add a validation function that checks X and Y" rather than writing the function).
