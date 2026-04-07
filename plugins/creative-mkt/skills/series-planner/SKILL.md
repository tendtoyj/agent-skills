---
name: series-planner
description: "Plan multi-post content series and campaigns with narrative arc design, per-post structure, framework mapping, and publishing schedules. Use when user mentions: series, campaign, content calendar, multi-post plan, launch campaign, 7-day series, content series, sequential posts, campaign planner, weekly content plan, editorial calendar, drip content, or any request involving planning more than one connected post around a theme."
user-invocable: true
---

# Series Planner

Plan a multi-post content series around a single theme. Design the narrative arc, define per-post structure with framework mapping, and produce a publishing schedule.

**Role boundary**: This skill plans the series — it does not write post copy. Each post's actual copy is written by **post-writer**. The orchestrator chains `series-planner → post-writer × N` when full execution is needed.

---

## Memory Auto-Load Protocol

Run this before any work. It ensures brand consistency and reuse of existing creative assets.

```
1. Check creative-memory/ exists → if not, create from creative-memory-template/
2. Load brand-memory/voice-profile.md        (brand tone — read-only)
3. Load brand-memory/positioning.md          (message framing — read-only)
4. Load ALL .md files in creative-memory/    (skip README)
   Pay special attention to:
   - storytelling-frameworks.md  → framework mapping
   - trend-angles.md             → trend integration
   - content-examples.md         → reference for strong campaign structures
5. Optionally load research-memory/customer-language.md (customer voice)
```

Access rules:

| Memory folder | Permission |
|---------------|------------|
| `research-memory/` | Read-only |
| `brand-memory/` | Read-only |
| `creative-memory/` | Read & Write |

---

## Two Modes

### Mode A — Full Plan
Use when creating a new campaign series from scratch.
Run all 5 steps below. Output: a new campaign plan file.

### Mode B — Refresh
Use when modifying an existing campaign plan (add/remove posts, adjust schedule, swap frameworks).
Load the existing plan file → apply changes → save updated version.

---

## Process (5 Steps)

### Step 1: Context Load + Campaign Briefing

After the memory auto-load, gather these from the user:

| Required | Description |
|----------|-------------|
| Campaign theme | The central topic tying the series together |
| Series length | Number of posts or time span (e.g. 7 posts, 2 weeks) |
| Target platform | Primary channel (Instagram, LinkedIn, Twitter/X, etc.) |
| Campaign goal | What the series should achieve (awareness, conversion, community) |
| Language | Optional | 캠페인 콘텐츠 작성 언어 (default: English). post-writer에 전달됩니다. |

Optional inputs: specific framework preferences, start date / posting frequency, cross-platform notes.

Also review `trend-angles.md` (produced by **trend-scout**) — identify any current trend that naturally fits the campaign theme and could amplify relevance. If `trend-angles.md` is empty, suggest the user run trend-scout first for richer campaign angles.

### Step 2: Narrative Arc Design

A series is more than a list of posts — it is a story with rhythm. Design the arc before defining individual posts.

**Choose an arc type** based on the campaign goal and theme:

| Arc type | Best for | Structure example |
|----------|----------|-------------------|
| **Build-up** | Product launches, event countdowns | Hint → Teaser → Feature reveal → Testimonial → Launch |
| **Episodic** | Education series, tip series | Independent topics connected by a shared theme |
| **Transformation** | Brand stories, customer success | Before → Problem → Attempt → Change → After |
| **Countdown** | Sales, launches, events | D-7 → D-5 → D-3 → D-1 → D-Day |

**Map the emotional curve.** Good series avoid flat energy — they create rhythm. A typical curve: curiosity → empathy → trust → action. But feel free to add dips and peaks depending on the series length. A 3-post mini series can be simpler; a 14-post campaign needs variation to maintain engagement.

**Define hook-to-hook continuity.** Each post should end with a reason to watch for the next one — a question, a cliffhanger, a promise. This is what turns isolated posts into an actual series.

### Step 3: Per-Post Structure

For each post in the series, define:

| Field | Description |
|-------|-------------|
| **Post #/N + Title** | Position in the series and a working title |
| **Key message** | The single thing this post communicates |
| **Framework** | Selected from `storytelling-frameworks.md` (see mapping guide below) |
| **Hook direction** | The opening line / scene concept (not the final copy — that's post-writer's job) |
| **Visual direction** | Notes for image-creator, referencing `visual-guidelines.md` |
| **CTA** | Next-post teaser or specific action |
| **Connection** | How this post links to the previous and next one |

**Framework-to-position mapping guide.** Different positions in the arc call for different storytelling approaches:

| Series position | Purpose | Recommended framework type |
|-----------------|---------|---------------------------|
| Opening post(s) | Grab attention, raise a question | Curiosity-driven (PAS, question-based) |
| Middle posts | Build depth, earn trust | Storytelling (HSO, Before/After) |
| Climax post | Peak impact, core message | Evidence-based (social proof, data) |
| Closing post(s) | Drive action, leave impression | CTA-focused (direct offer, limited-time) |

If `storytelling-frameworks.md` has specific frameworks defined, match them to positions. If it's empty, use the general types above as guidance and note that framework-builder should be run later for richer mapping.

### Step 4: Publishing Schedule

Create the schedule with:

- Date, time, and platform for each post
- General best-time-to-post guidance (the user can override based on their analytics):
  - LinkedIn: Tue–Thu, 8–10am or 12pm
  - Instagram: Mon–Fri, 11am–1pm or 7–9pm
  - Twitter/X: Mon–Fri, 8–10am or 12–1pm
- Preparation checklist per post: copy status, visual status, approval status
- Cross-platform adaptation notes if the series spans multiple channels

**Series length guidance.** Adapt detail level to series size:
- **Short (3–5 posts)**: Each post can carry more weight; arc can be simple.
- **Medium (6–14 posts)**: Needs clear sub-themes or chapters within the arc; include 1–2 "breathing room" posts (lighter content between heavy ones).
- **Long (15+ posts)**: Divide into phases; recap/summary posts every 5–7 posts; consider a mid-series engagement check-in.

### Step 5: Save + Log

Save the campaign plan to: `[project]/campaigns/[theme]-series-plan.md`

**Language rule**: 섹션 헤더와 테이블 컬럼명은 영어로 유지합니다. 본문, 셀 값, 설명, 분석 텍스트는 사용자가 지정한 언어로 작성합니다. 언어가 지정되지 않으면 English로 작성합니다.

Use the output template below. The file should be self-contained — anyone reading it should understand the full campaign without needing to ask questions.

Append to `creative-log.md`:
```
| [date] | series-planner | [theme] [N]posts [platform] | Full Plan | None |
```

If the campaign structure is particularly well-designed (strong arc, creative framework choices), save a condensed version to `content-examples.md` with the `[series-planner]` tag. Never delete existing entries from other skills.

---

## Output Template

```markdown
# [Campaign Theme] Series Plan
> Created: [date]
> Platform: [platform]
> Duration: [N posts over N days]
> Goal: [campaign goal]
> Source skill: series-planner

## Campaign Overview
### Theme & Core Message
[What this campaign is about and the single overarching message]

### Target Audience
[Who this is for, referencing brand-memory/positioning.md if available]

### Success Metrics
[How to measure if the campaign worked — engagement, reach, conversions, etc.]

## Narrative Arc
### Arc Type: [Build-up / Episodic / Transformation / Countdown]
### Emotional Journey: [e.g. curiosity → empathy → trust → action]

### Series Flow
[Post 1 title] → [Post 2 title] → ... → [Post N title]
[Brief description of the arc progression]

---

## Post Breakdown

### Post 1/N: [Title]
- **Date**: [YYYY-MM-DD] [Time]
- **Key Message**: [one sentence]
- **Framework**: [framework name]
- **Hook Direction**: [opening concept — not final copy]
- **Visual Direction**: [image-creator guidance]
- **CTA**: [action or next-post teaser]
- **→ Next**: [connection to Post 2]

### Post 2/N: [Title]
...

---

## Publishing Schedule

| # | Date | Time | Platform | Title | Copy | Visual | Approved |
|---|------|------|----------|-------|------|--------|----------|
| 1 | YYYY-MM-DD | HH:MM | [platform] | [title] | ☐ | ☐ | ☐ |

## Cross-Platform Notes
[Only if the campaign spans multiple platforms — adaptation guidance per channel]
```

---

## Enrichment Rules

When saving to `content-examples.md`:
- Tag every entry with `[series-planner]`
- Append only — never delete entries tagged `[post-writer]` or any other skill
- Include: arc type, post count, platform, and a one-line summary of why the structure worked

---

## Quality Checklist

Before delivering the plan, verify:

- [ ] Each post stands alone as valuable content (not just filler to reach the post count)
- [ ] Post-to-post connections are explicit — the reader knows why this post follows that one
- [ ] The emotional curve has rhythm — not a flat line, not monotonically rising
- [ ] CTAs align with the overall campaign goal, not just generic "follow for more"
- [ ] The plan gives post-writer enough direction to write without guessing
- [ ] Visual direction notes are concrete enough for image-creator to act on
- [ ] The schedule is realistic given the content production timeline
