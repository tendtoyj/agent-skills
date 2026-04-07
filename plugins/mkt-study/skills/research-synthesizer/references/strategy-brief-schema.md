# Strategy Brief Output Schema

This is the exact template for `research-memory/strategy-brief.md`. Fill every section with synthesis results.

---

```markdown
# Research Strategy Brief
> Last updated: [YYYY-MM-DD]
> Source skills: research-synthesizer → expert-validator
> Data sources: market-landscape.md, competitive-intel.md, customer-insight.md[, customer-language.md]

## Executive Summary
> [research-synthesizer]

[5-7 key findings as bullet points. Each finding tags its source files, e.g., [market + competitive]]

## Cross-Analysis Insights
> [research-synthesizer]

### Opportunity Map: Market Trends × Competitive Gaps
| # | Trend | Gap | Opportunity | Urgency | Attractiveness |
|---|-------|-----|-------------|---------|----------------|
| 1 | [from market-landscape] | [from competitive-intel] | [synthesized insight] | H/M/L | H/M/L |

### Messaging Advantage: Customer Pain × Competitor Weakness
| # | Customer Pain | Competitor Weakness | Messaging Direction | Customer Language |
|---|--------------|--------------------|--------------------|-------------------|
| 1 | [from customer-insight] | [from competitive-intel] | [synthesized angle] | "[exact phrase]" or N/A |

### Entry Point: Market Structure × Audience Segments
| # | Segment | Price Tier | Channel | Sub-Category | Entry Feasibility | Priority |
|---|---------|-----------|---------|-------------|-------------------|----------|
| 1 | [from customer-insight] | [from market-landscape] | [cross-ref] | [fit] | E/M/H | 1st |

## Expert Consensus
> [expert-validator] — to be filled by expert-validator skill
<!-- This section is populated by expert-validator (Task Agents) -->

## Expert Divergence
> [expert-validator] — to be filled by expert-validator skill
<!-- This section is populated by expert-validator (Task Agents) -->

## Strategic Recommendations
> [research-synthesizer] — [expert-validator] will reinforce

| # | Recommendation | Why (Source) | Priority | Effort |
|---|---------------|-------------|----------|--------|
| 1 | [what to do] | [CA1/CA2/CA3 + specific insight] | High/Med/Low | Quick Win / Mid-term / Long-term |

## Immediate Next Steps
> [research-synthesizer]

| # | Action | Execution Skill | Input from Research | Timeline | Success Metric |
|---|--------|----------------|-------------------|----------|----------------|
| 1 | [specific action] | [e.g., 06-direct-response-copy] | [files + sections] | [1-2 weeks] | [measurable outcome] |
```

---

## Section-by-Section Guidance

### Executive Summary
- 5-7 bullet points, not 3 and not 10
- Each finding must tag source files in brackets: `[market + competitive]`, `[customer + customer-language]`
- Lead with the most actionable finding, not the most obvious
- Write for a busy stakeholder: each bullet should be self-contained

### Cross-Analysis Tables
- Every row must draw from 2+ source files (single-source = summary, not synthesis)
- Use exact data from research files, not paraphrased generalities
- If customer-language.md available, include exact phrases in quotes
- Empty cells are OK if data is thin — tag with `⚠️ Limited data`

### Expert Sections (Scaffold Only)
- Leave Expert Consensus and Expert Divergence as empty scaffolds
- Do NOT fill these — `expert-validator` handles them
- Preserve any existing expert content during Refresh

### Strategic Recommendations
- 3-5 recommendations, not more
- Each must have all 4 columns filled (What, Why, Priority, Effort)
- Priority = Urgency × Impact
- Effort categories: Quick Win (1-2 weeks), Mid-term (1-3 months), Long-term (3-6 months)

### Immediate Next Steps
- Derived from Quick Win recommendations only
- Each must link to a specific execution skill
- "Input from Research" column specifies which research-memory/ files and sections feed this action
- Timeline should be realistic given stated constraints

---

## Refresh Mode Rules

When updating an existing strategy-brief.md:

1. **DO NOT** overwrite the entire file
2. **DO NOT** touch `[expert-validator]` sections
3. Update only cross-analyses affected by changed research data
4. Append `> Updated: [date]` below changed section headers
5. Update Executive Summary to reflect new findings
6. Re-evaluate Strategic Recommendations and Next Steps if affected
