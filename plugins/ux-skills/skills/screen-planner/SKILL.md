---
name: screen-planner
description: Plans screens for a specific user flow — what screens are needed, what each screen contains, and what user experience each element serves. Takes user-flows.md as input and works through one flow at a time with progressive disclosure. Use this skill when the user wants to plan screens, define screen structure, break a flow into screens, plan UI screens, figure out what screens are needed, or move from user flows to screen-level planning. Also trigger when the user mentions screen plan, screen list, screen structure, page planning, or wants to go from flows to screens.
---

# Screen Planner

Takes a confirmed user flow and breaks it down into individual screens. For each screen, defines what elements it contains, what those elements mean, and what user experience they create — without going into pixel-level layout or visual design details.

## UX Memory Protocol

### 시작 시
1. `ux-memory/project-context.md`가 존재하면 읽어서 프로젝트 맥락을 로드한다.
2. 작업 대상 Feature의 기존 산출물을 `ux-output/{feature-name}/`에서 확인한다.

### 종료 시
1. 산출물을 `ux-output/{feature-name}/screen-plan.md`에 저장한다.
2. `ux-memory/activity-log.md`에 실행 기록을 추가한다:
   `| [날짜] | screen-planner | [feature-name] | ux-output/[feature-name]/screen-plan.md | [플랫폼, 화면 수] |`
3. `ux-memory/project-context.md`의 "진행 중인 Feature" 테이블을 갱신한다.

---

## Role & Principles

You have the full context from previous phases — pain points/values, ideas, and user flows. Use them to make informed proposals about screen structure.

**Core rules:**
- Progressive disclosure. Don't dump everything at once. Start with the big picture (which flow, which platform, how many screens), then go screen by screen.
- Propose with options. When there's a meaningful choice (e.g., 3 screens vs 5 screens for a flow), present alternatives with trade-offs so the user can make an informed decision.
- Focus on what and why, not how it looks. "사용자의 레시피 목록이 프로젝트별로 그루핑되어 표시됨 — 한눈에 전체 현황을 파악할 수 있도록" is the right level. "왼쪽에 사이드바가 있고 오른쪽에 카드 그리드가 3열로..." is too detailed for this stage.
- Each element should carry meaning. Don't just list UI components — explain what user experience each element serves. A search bar isn't just "검색창" — it's "이미 찾고 싶은 게 있는 사용자가 목록을 훑지 않고 바로 접근할 수 있는 진입점."
- Save incrementally. Don't wait until all screens are done.

**Conversation style:**
- Speak in Korean by default, unless the user uses another language.
- Use a natural, friendly tone — "~해요", "~할까요", "~해볼게요" style.

**Input:**

Read from the feature's `ux-output/{feature-name}/` folder:
- `user-flows.md` (required — this is the primary input)
- `pain-points.md` or `ux-values.md` (for context)
- `ideas.md` (for context)

If `user-flows.md` doesn't exist, suggest running the userflow-generator first.

**Output path:**

Save to the same feature folder that was created by brainstorming-guide and used by userflow-generator. This folder already exists in `ux-output/` — do not create a new one.

```
plugins/ux-skills/
└── ux-output/
    └── {feature-name}/          ← already exists from brainstorming-guide
        ├── pain-points.md       ← from brainstorming-guide
        ├── ux-values.md         ← from brainstorming-guide
        ├── ideas.md             ← from brainstorming-guide
        ├── user-flows.md        ← from userflow-generator
        └── screen-plan.md       ← this skill's output
```

- The `{feature-name}` folder should already exist. If it doesn't, ask the user for the feature name and check if the folder was created under a different name.
- `screen-plan.md` is saved incrementally: first the header and screen flow, then each screen is appended as it's completed.

---

## Phase 1: Select Flow & Platform

### 1-1. Which flow?

Read `user-flows.md` and present the flow list (from the header table). Ask the user which flow they want to work on.

### 1-2. Which platform?

Once the flow is selected, confirm the platform before going further:
- Mobile (iOS/Android)
- Desktop (Web)
- Responsive (both)
- Other (tablet, etc.)

The platform shapes everything downstream — screen size, navigation patterns, interaction models. Confirm it early.

---

## Phase 2: Propose Screen Flow

With the flow and platform confirmed, propose the overall screen structure.

### How to propose

**Present the screens as a sequence**, showing how the user moves through them. Use screen names that describe what the user does or sees at that moment, not technical names:
- "검색 결과" instead of "SearchResultsView"
- "첫 화면 — 내 레시피 모음" instead of "MainScreen"

**Offer alternatives when the screen count is a real choice.** For example:

> **안 A (3화면):** 목록 → 상세 → 수정. 심플하지만 상세 화면이 많은 역할을 담당하게 됨.
> **안 B (5화면):** 목록 → 상세 → 분석 → 수정 → 미리보기. 각 화면의 역할이 명확하지만 이동이 많아짐.

Don't offer alternatives for the sake of it — only when there's a genuine trade-off worth discussing. If one structure is clearly right, just propose it and explain why.

**Let the user adjust.** They might merge screens, split one, add a step, or remove one. Work through this together until the flow is confirmed.

### Save the flow structure

Once the screen flow is confirmed, create `screen-plan.md` with:
1. A header identifying the flow, platform, and date
2. The confirmed screen sequence (list of screen names with one-line descriptions)

This is the first save — detailed screen specs will be appended as they're completed.

---

## Phase 3: Detail Each Screen

Go through screens one at a time, in order. For each screen:

### How to detail a screen

**Propose the screen's elements.** For each element, describe:
- **What it is** — the element itself (e.g., "프로젝트별 레시피 그룹")
- **Why it's here** — what user need or experience it serves (e.g., "57개 레시피가 한꺼번에 나열되면 파악이 안 되므로, 의미 단위로 묶어서 '내가 뭘 갖고 있는지' 한눈에 보이게 함")
- **How the user interacts with it** — what happens when they tap/click, if applicable

**Consider platform-specific patterns.** Mobile might use bottom navigation, pull-to-refresh, swipe gestures. Desktop might use sidebar navigation, hover states, keyboard shortcuts. Don't just list components generically — think about how they work on the chosen platform.

**Note connections to other screens.** Where does the user go from here? What brings them back? Are there edge cases (empty states, error states, first-time use)?

**Discuss with the user.** After presenting the screen proposal, ask for feedback. They might want to add, remove, or rethink elements. Each screen might need a few rounds of discussion.

### Save each completed screen

When a screen is confirmed:
1. Append the detailed screen spec to `screen-plan.md`.
2. Move to the next screen.

### Screen spec format

See `references/screen-plan-example.md` for a complete example showing two screens (사진 선택, 기본 정보 입력) from the recipe app at the expected level of detail. Use it as a reference for structure, depth, and writing style.

Each screen should cover:
- **역할** — the screen's job in one sentence
- **주요 요소** — each element with what it is, why it's here, how the user interacts with it, and edge cases
- **화면 전환** — where the user came from and where they can go
- **참고** — design decisions, principles, or open questions

The key is that every element carries meaning. Don't just list UI components — explain what user experience each one creates and why it belongs on this screen. Adapt the structure to what makes sense for each screen; some screens need more detail on transitions, others on element interactions.

---

## Reference Files

- `references/screen-plan-example.md` — A complete example of a screen plan (recipe app, "레시피 공유" flow, mobile) showing the header format, screen flow table, and two detailed screen specs. Read this before writing your first screen plan to match the expected structure and depth.
