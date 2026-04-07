---
name: expert-validator
description: "Validate research findings with 3 independent expert agents — Growth Strategist, Brand Strategist, and Customer Acquisition Expert — then synthesize consensus and divergence. Use when user mentions: expert review, validate research, expert validation, second opinion, expert check, review findings, validate strategy, expert agents, consensus check, strategy validation, expert panel, peer review, quality check research, validate brief, expert checkpoint, expert review checkpoint"
user-invocable: true
---

# Expert Validator

> Validate your research strategy with 3 independent expert agents.
> Uses Task Agents for multi-perspective evaluation. Enriches `strategy-brief.md` with consensus, divergence, and confidence ratings.

---

## Purpose

Expert Validator answers the question **"Is this strategy REALLY good, or just looking good?"**

A single AI perspective creates blind spots. This skill spins up **3 specialized Task Agents** — each with a fresh context window, independent evaluation, and distinct expertise — then synthesizes where they agree and disagree.

- **Where 3 experts agree** → Strong signal. Act on it.
- **Where experts diverge** → Decision point. You choose.
- **What everyone missed** → Blind spot found. Investigate.

The output enriches `research-memory/strategy-brief.md` with `[expert-validator]` tagged sections for Expert Consensus, Expert Divergence, and Confidence Overview.

> "Consensus = signal in noise." — The Boring Marketer (Expert Review Framework)

---

## Prerequisite

**`research-synthesizer` must have run first.** This skill reads `strategy-brief.md` for the synthesized strategy to validate. If the file doesn't exist or has no content beyond the scaffold, stop and instruct the user to run `research-synthesizer` first.

Additional research-memory files (market-landscape, competitive-intel, customer-insight, customer-language) are loaded as supporting context for the expert agents.

---

## Modes

| Mode | When to Use | Behavior |
|------|-------------|----------|
| **Full Validation** | First run, or `strategy-brief.md` has no `[expert-validator]` sections | All 3 agents evaluate the entire strategy |
| **Focused Validation** | User has a specific question or decision point | All 3 agents focus on one question |
| **Re-Validation** | `[expert-validator]` sections exist but research-memory was updated | Re-run agents and update Expert sections |

---

## Auto-Load Protocol

On every invocation, BEFORE any evaluation:

1. **Check `research-memory/` directory**
2. If files exist → Read ALL `.md` files (except README.md)
3. **Critical: Read `strategy-brief.md`**
   - If file missing → STOP. Tell user: "Run research-synthesizer first to generate the strategy brief."
   - If file exists but has no substantive content → STOP. Same instruction.
4. **Check `brand-memory/`** (read-only) → If exists, include business description and positioning context in agent briefings
5. If `[expert-validator]` sections already exist in `strategy-brief.md` → **suggest Re-Validation mode**
6. Summarize what's loaded and confirm mode with user

---

## Input Gathering

Collect conversationally. Most inputs come from research-memory — just confirm with the user.

| Field | Required | Description |
|-------|----------|-------------|
| Validation mode | YES | Full / Focused / Re-Validation |
| Focus question | Focused mode only | The specific question or decision to validate |
| Business context | Optional | Current stage, resource constraints, timeline — sharpens agent evaluations |
| Language | Optional | 결과물 작성 언어 (default: English) |

**If this is Full Validation**, confirm: "I'll have 3 expert agents review your entire strategy brief. Proceed?"

**If this is Focused**, ask: "What specific question or decision do you want the experts to evaluate?"

**If this is Re-Validation**, show the current Expert sections and ask: "Research was updated. Should I re-run all 3 experts?"

---

## Process

### Step 1: Prepare Agent Briefing Packet

**Goal**: Compress all research-memory context into a focused briefing that each agent receives.

Build the briefing packet from loaded files:

```
## Briefing Packet

### Business Overview
[From brand-memory/ or user input — what the business does, stage, constraints]

### Market Context (from market-landscape.md)
- Market category: [definition]
- Market size: TAM [X], SAM [X]
- Key trends: [top 3 with opportunity/threat tags]

### Competitive Context (from competitive-intel.md)
- Competitive set: [direct + indirect competitors]
- Key gaps/opportunities: [from competitive analysis]

### Customer Context (from customer-insight.md + customer-language.md)
- Primary segment: [description]
- Top pain points: [top 3]
- Key customer language: [top phrases/expressions]

### Strategy Brief (from strategy-brief.md — FULL TEXT)
[Include the complete strategy brief content — this is what agents evaluate]

### Validation Focus
[Full: "Evaluate the entire strategy." / Focused: "Specifically evaluate: [user's question]"]
```

**Keep the packet under 3000 words** — agents work better with focused context than raw dumps.

---

### Step 2: Run 3 Expert Agents (Sequential)

Launch 3 Task Agents **sequentially**. Each receives the same briefing packet but evaluates from a distinct perspective.

**IMPORTANT**: Do NOT pass one agent's output to the next. Each agent must evaluate independently with a fresh context.

#### Agent 1: Growth Strategist

**Task tool call**:
```
Task(
  subagent_type: "general-purpose",
  description: "Growth Strategist evaluation",
  prompt: [see Agent Prompt Template below, filled for Growth Strategist]
)
```

**Perspective**: Market entry timing, Go-To-Market direction, growth levers

**Evaluation questions**:
1. Is the market entry timing right given market maturity and trends?
2. Is the recommended GTM approach realistic given competitive intensity and resources?
3. What is the single strongest growth lever available?
4. What growth opportunity did the strategy miss?
5. What is the biggest growth risk?

---

#### Agent 2: Brand Strategist

**Task tool call**:
```
Task(
  subagent_type: "general-purpose",
  description: "Brand Strategist evaluation",
  prompt: [see Agent Prompt Template below, filled for Brand Strategist]
)
```

**Perspective**: Positioning opportunity, messaging angles, tone direction

**Evaluation questions**:
1. Does the identified positioning align with actual market gaps?
2. Does the messaging reflect how customers actually talk? (cross-check customer-language)
3. Is the differentiation point clear and defensible vs. competitors?
4. Is the brand tone appropriate for the target audience?
5. What positioning opportunity did the strategy miss?

---

#### Agent 3: Customer Acquisition Expert

**Task tool call**:
```
Task(
  subagent_type: "general-purpose",
  description: "Acquisition Expert evaluation",
  prompt: [see Agent Prompt Template below, filled for Acquisition Expert]
)
```

**Perspective**: Channel priorities, early traffic strategy, quick wins

**Evaluation questions**:
1. Do the recommended channels match where the audience actually spends time?
2. Is the early traffic/lead strategy realistic for the business stage?
3. What can be done in 30 days for a quick win?
4. Is the approach CAC-efficient for this business model?
5. What channel or tactic did the strategy miss?

---

#### Agent Prompt Template

Use this template for all 3 agents. Fill `[ROLE]`, `[PERSPECTIVE]`, and `[QUESTIONS]` per agent.

```
You are a [ROLE] with 15+ years of experience in [PERSPECTIVE].

## Your Briefing
[INSERT FULL BRIEFING PACKET FROM STEP 1]

## Your Task
Evaluate the strategy brief from your specialized perspective.

Answer these 5 questions:
[INSERT 5 EVALUATION QUESTIONS]

## Output Format (follow EXACTLY)

### Strengths
[2-3 strategy elements you agree with. Be specific — reference data from the brief.]

### Concerns
[2-3 issues or risks. Explain WHY with evidence from the brief.]

### Missing
[1-2 blind spots the strategy overlooked. What should have been considered?]

### Recommendation
[Your single most important recommendation. One sentence, actionable.]

### Confidence
[High / Medium / Low] — [One sentence explaining your confidence level]

## Rules
- Be SPECIFIC and ACTIONABLE — no generic advice
- Reference actual data from the briefing (market numbers, competitor names, customer language)
- If you disagree with a recommendation, explain WHY with evidence
- Do NOT hedge everything — take clear positions
- Write your evaluation in [user's specified language]. If no language specified, use English.
- Keep total output under 400 words
```

---

### Step 3: Synthesize Consensus & Divergence

**Goal**: Analyze all 3 agent outputs and extract signal from noise.

After collecting all 3 evaluations, synthesize directly (no additional agents needed):

#### 3a. Expert Consensus

Scan all 3 outputs for **agreement**:

- **Strong Signal** ⭐ (3/3 agree): All three experts highlight the same strength, concern, or recommendation
- **Moderate Signal** (2/3 agree): Two experts align on a point

For each consensus point:
- State the point clearly
- Note which agents agree
- Summarize the shared reasoning

#### 3b. Expert Divergence

Scan for **conflicting positions**:

- Identify points where agents disagree or contradict each other
- Present BOTH sides with their reasoning
- Note the implication for decision-making — what does the user need to decide?

#### 3c. Confidence Overview

Compile confidence ratings:

| Expert | Confidence | Key Reason |
|--------|-----------|------------|
| Growth Strategist | [H/M/L] | [one-line reason] |
| Brand Strategist | [H/M/L] | [one-line reason] |
| Acquisition Expert | [H/M/L] | [one-line reason] |
| **Overall** | **[H/M/L]** | [synthesized judgment] |

Overall confidence rule:
- 3× High = **High**
- 2× High + 1× Medium = **High**
- Mixed = **Medium**
- Any Low = **Medium** (flag the concern)
- 2+ Low = **Low** (strategy needs rework)

#### 3d. Recommendations Reinforcement

Review the existing Strategic Recommendations in `strategy-brief.md`:
- Which ones are validated by expert consensus? Mark them.
- Which ones are challenged? Note the concern.
- Are there NEW recommendations from the experts? Add them.
- Re-prioritize based on consensus strength.

---

### Step 4: Save & Log

**Goal**: Write expert sections to `strategy-brief.md` and log execution.

#### 4a. Enrich strategy-brief.md

**Language rule**: 섹션 헤더와 테이블 컬럼명은 영어로 유지합니다. 본문, 셀 값, 설명, 분석 텍스트는 사용자가 지정한 언어로 작성합니다. 언어가 지정되지 않으면 English로 작성합니다.

Add or update these sections with `[expert-validator]` tags. **Do NOT delete any existing content** — only add/update expert sections.

```markdown
## Expert Consensus
> Source: [expert-validator] | Validated: [YYYY-MM-DD]

### Strong Signals (3/3 agree)
1. [consensus point] — Growth ✓ Brand ✓ Acquisition ✓
   > [shared reasoning summary]

### Moderate Signals (2/3 agree)
1. [consensus point] — [Agent A] ✓ [Agent B] ✓
   > [shared reasoning summary]

## Expert Divergence
> Source: [expert-validator] | Validated: [YYYY-MM-DD]

### [Topic of disagreement]
- **[Agent A]**: [position + reasoning]
- **[Agent B]**: [opposing position + reasoning]
- **Decision needed**: [what the user should decide]

## Confidence Overview
> Source: [expert-validator] | Validated: [YYYY-MM-DD]

| Expert | Confidence | Key Reason |
|--------|-----------|------------|
| Growth Strategist | [H/M/L] | [reason] |
| Brand Strategist | [H/M/L] | [reason] |
| Acquisition Expert | [H/M/L] | [reason] |
| **Overall** | **[H/M/L]** | [synthesized] |
```

Also update `## Strategic Recommendations` — append `[expert-validator]` annotations to existing items and add new expert-sourced recommendations.

**For Re-Validation**: Replace existing `[expert-validator]` sections entirely. Append `> Re-validated: [date]` to each section header.

#### 4b. Update research-log.md

Append one row:

```
| [YYYY-MM-DD] | expert-validator | Full / Focused / Re-Validation | [key consensus points summary] | Task Agents ×3 |
```

---

## Quality Checklist

Before saving, verify:

- [ ] All 3 agents ran independently (no cross-contamination of outputs)
- [ ] Consensus section identifies at least 1 Strong Signal or 2+ Moderate Signals
- [ ] Divergence section is populated (if all 3 agree on everything, note "No significant divergence")
- [ ] Each consensus/divergence point references specific data (not generic)
- [ ] Confidence overview includes all 3 agents + overall rating
- [ ] Existing strategy-brief.md content is preserved (enrichment only)
- [ ] All expert sections have `[expert-validator]` source tags
- [ ] Strategic Recommendations updated with expert annotations
- [ ] research-log.md updated with execution record

---

## Example (Abbreviated)

**Input**: Full Validation of marketing education business strategy.

> **Agent 1 (Growth Strategist)**:
> - Strengths: AI marketing education timing is strong — creator economy CAGR 12-15%
> - Concerns: $199 price point faces heavy competition from free content; conversion path unclear
> - Missing: No paid acquisition strategy as growth lever
> - Confidence: Medium — timing good, but monetization path needs work
>
> **Agent 2 (Brand Strategist)**:
> - Strengths: "Boring" positioning is sharp differentiation in hype-heavy AI market
> - Concerns: "Boring" may conflict with premium perception if expanding upmarket
> - Missing: No voice-of-customer language validation on the "boring" resonance
> - Confidence: High — positioning angle is clear and defensible
>
> **Agent 3 (Acquisition Expert)**:
> - Strengths: SEO + newsletter first strategy fits solo-operator resources
> - Concerns: YouTube absence is the biggest missed channel — top search engine for tutorials
> - Missing: No referral or affiliate strategy for low-CAC growth
> - Confidence: Medium — channel mix is too narrow
>
> **Strong Signal** ⭐: "AI-fatigued practitioner" is the right primary segment (3/3)
> **Strong Signal** ⭐: SEO is the right anchor channel (3/3)
> **Divergence**: Pricing — Growth says lower entry + upsell, Brand says hold premium position
> **Overall Confidence**: Medium — strategy direction solid, execution gaps need addressing

---

## What This Skill Does NOT Do

- **Generate strategy** → Use `research-synthesizer` (creates the strategy brief this skill validates)
- **Conduct new research** → Use `market-scanner`, `competitor-finder`, `audience-profiler`, etc.
- **Execute marketing** → Use execution skills (brand-voice, copy, email, SEO, etc.)
- **Replace human judgment** → Expert agents provide perspectives; the user makes the final call

Expert Validator is a **quality gate** — it stress-tests strategy before execution begins.
