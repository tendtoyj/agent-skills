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
1. 산출물을 `ux-output/{feature-name}/screen-plans/NN_{flow-name}.md`에 저장한다.
   - `NN`은 01부터 시작하는 순번. 기존 파일이 있으면 다음 번호를 사용한다.
   - `{flow-name}`은 플로우 이름의 kebab-case (예: `01_온보딩-플로우.md`)
2. `ux-memory/activity-log.md`에 실행 기록을 추가한다:
   `| [날짜] | screen-planner | [feature-name] | ux-output/[feature-name]/screen-plans/NN_{flow-name}.md | [플랫폼, 화면 수] |`
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
        └── screen-plans/        ← this skill's output folder
            ├── 01_{flow-name}.md
            └── 02_{flow-name}.md
```

- The `{feature-name}` folder should already exist. If it doesn't, ask the user for the feature name and check if the folder was created under a different name.
- `screen-plans/` 디렉토리가 없으면 생성한다.
- 파일명은 `NN_{flow-name}.md` 형식. 기존 파일이 있으면 다음 순번을 사용한다.
- 각 파일은 incrementally 저장: first the header and screen flow, then each screen is appended as it's completed.

---

## Phase 1: Select Flow & Platform

### 1-1. Which flow?

Read `user-flows.md` and present the flow list (from the header table). Ask the user which flow they want to work on.

### 1-2. 플랫폼 확인

플로우가 선택되면, 플랫폼을 확인한다. 플랫폼이 화면 구성, 네비게이션 패턴, 인터랙션 모델을 결정하므로 반드시 먼저 확인.

1. `ux-memory/project-context.md`의 "진행 중인 Feature" 테이블에서 현재 Feature의 **플랫폼** 컬럼을 확인한다.
2. 이미 기록되어 있으면 "모바일로 진행하고 있었는데, 그대로 할까요?" 형태로 간단히 확인만 한다.
3. 비어 있으면 질문한다: "이 화면들은 어떤 플랫폼 기준으로 설계할까요? 모바일 앱 / 웹 / 반응형 / 기타"
4. 확인된 플랫폼을 `project-context.md`의 해당 Feature 행 플랫폼 컬럼에 기록한다.

플랫폼 값: `모바일(iOS/Android)`, `웹(Desktop)`, `반응형`, `기타(설명)`

---

## Phase 2: Propose Screen Flow

With the flow and platform confirmed, analyze the input documents and propose the overall screen structure. This phase has three steps: input 분석, 축 도출 & 대안 제시, 확정.

---

### Step 2-1. Input 분석 — 결정된 것과 열려 있는 것

시나리오(`user-flows.md`)와 UX Values(`ux-values.md`, `pain-points.md`)를 화면 설계 관점에서 읽고, 이미 결정된 것과 아직 열려 있는 것을 분리한다.

**이미 결정된 것:** 시나리오나 UX Values에서 화면 구조와 관련해 이미 방향이 잡힌 것들. 예:
- 큰 흐름의 순서 (시나리오에서 "인트로 → 분석 → 결과 → 추천" 순서가 명시됨)
- 특정 요소의 존재 여부 (시나리오에서 "AI 비주얼 + 유형 타이틀은 반드시 존재"로 확정됨)
- 이전 단계에서 검토 후 기각된 선택지 (시나리오에서 "인사이트마다 추천 붙이기"를 검토 후 기각 → 통합 추천으로 결정됨)

**열려 있는 것:** 단순히 "아직 안 정한 항목"이 아니라, **input 안에서 동시에 강조되지만 서로 긴장 관계에 있는 가치나 목표**를 찾아낸다. 예:

> 시나리오에서 두 가지가 동시에 강조되고 있는데, 이 둘이 사실 긴장 관계에 있어요:
>
> ▎ "유형 타이틀 + AI 비주얼 + 성격 묘사, 이 세 요소가 첫 화면에서 함께 작동해야 '와' 반응이 나옴" — 결론을 먼저 보여줘야 임팩트
>
> ▎ "하나씩 발견하는 재미가 있어야 함" + "알고 있던 것의 확인과 몰랐던 패턴의 발견이 적절히 섞여야" — 근거를 쌓아가는 과정 자체가 재미

핵심은 **왜 이것들이 동시에 만족시키기 어려운지**, 즉 긴장의 구조를 설명하는 것이다. 체크리스트가 아니라 분석이어야 한다.

**분석 결과를 사용자에게 보여주고 확인받는다.** 결정된 것을 빠뜨렸거나, 열려 있는 것의 해석이 다를 수 있으므로 반드시 확인 후 다음으로 넘어간다.

---

### Step 2-2. 축 도출 & 경험 시나리오 대안 제시

**플랫폼 가이드를 먼저 읽는다.** Phase 1에서 확인된 플랫폼에 따라 `references/mobile-design-guide.md` 또는 `references/desktop-design-guide.md`를 읽는다. 정보구조가 화면구성으로 전환되는 방식이 플랫폼마다 근본적으로 다르기 때문에, 가이드의 원칙과 제품 유형별 패턴을 이해한 상태에서 대안을 설계해야 한다.

열려 있는 긴장 관계에서 자연스럽게 축(axis)이 도출된다. 긴장이 2-3개면 축도 2-3개. 무리하게 축을 늘리지 않는다.

**축을 조합하여 경험 시나리오 대안을 만든다.** 각 대안은 "화면 몇 개"가 아니라 "사용자가 어떤 경험을 하게 되는지"를 중심으로 기술한다.

대안은 ASCII 플로우로 시각화하여 비교한다. 흐름의 차이가 한눈에 드러나도록:

```
안 A: 임팩트 우선 — 결론부터, 근거는 선택적 탐색
┌──────────┐    ┌──────────┐    ┌──────────┐
│  인트로   │───▶│결과(유형) │───▶│  추천    │
│ 분석 연출 │    │ AI비주얼  │    │ 통합제안  │
└──────────┘    │ ▼ 열기    │    └──────────┘
                │ 인사이트들 │
                └──────────┘

→ '와' 반응이 빠르게 나오지만, 인사이트 탐색이 부수적 경험이 됨

안 B: 발견 우선 — 근거를 쌓아가다 결론에서 터뜨림
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  인트로   │───▶│ 인사이트  │───▶│결과(유형) │───▶│  추천    │
│ 분석 연출 │    │하나씩 공개│    │ AI비주얼  │    │ 통합제안  │
└──────────┘    └──────────┘    └──────────┘    └──────────┘

→ 발견의 재미가 살지만, 결론까지 도달하는 인내가 필요
```

**대안 제시 원칙:**
- 각 대안의 핵심 경험 차이를 한 문장으로 요약한다
- 대안별 장단점은 사용자 경험 관점으로 기술한다 ("화면이 많다/적다"가 아니라 "탐색의 재미 vs 임팩트의 속도")
- ASCII는 대안 간 구조 차이가 있을 때만 사용한다. 차이가 미미하면 텍스트 설명으로 충분하다
- 모든 대안에서 "이미 결정된 것"은 동일하게 유지한다

**사용자와 논의한다.** 대안 중 하나를 선택하거나, 대안끼리 조합하거나, 새로운 방향을 제시할 수 있다. 확정될 때까지 함께 다듬는다.

---

### Step 2-3. 확정 & 저장

경험 시나리오가 확정되면, 이를 구체적인 화면 시퀀스로 전환한다. 화면 이름은 사용자가 그 순간 무엇을 하거나 보는지를 기술한다:
- "검색 결과" instead of "SearchResultsView"
- "첫 화면 — 내 레시피 모음" instead of "MainScreen"

`screen-plan.md`에 저장한다:
1. 헤더 (flow, platform, date)
2. Input 분석 요약 (결정된 것, 긴장 관계, 선택한 방향과 이유)
3. 확정된 화면 시퀀스 (list of screen names with one-line descriptions)

이것이 첫 저장이다 — 공통 요소와 상세 화면 스펙은 Phase 3에서 추가된다.

---

## Phase 3: Define Common Elements & Detail Each Screen

### Step 3-0. 공통 요소 정의

개별 화면 상세에 들어가기 전에, **이 플로우의 모든 화면(또는 대부분의 화면)에 공통으로 존재하는 요소**를 먼저 정의한다. 공통 요소는 한 번 정의하고 개별 화면에서는 반복하지 않는다.

**정의해야 할 것:**

- **글로벌 네비게이션** — 상단 바, 하단 탭, 사이드바 등 앱/서비스 전체에서 유지되는 네비게이션 구조. 어떤 항목이 있고, 현재 플로우에서 어느 항목이 활성 상태인지.
- **전 화면 공통 UI** — 브랜드 요소(로고, 상단 컬러 바 등), 상태 표시(로그인 상태, 알림 배지 등), 전역 액션(검색, 설정 접근 등) 처럼 화면이 바뀌어도 유지되는 요소.
- **이 플로우의 진입점** — 사용자가 이 플로우에 어디서 어떻게 들어오는지. 글로벌 네비게이션의 어떤 항목에서 진입하는지, 다른 플로우에서 넘어오는 경로가 있는지.
- **이 플로우의 이탈점** — 플로우 도중 벗어날 수 있는 경로. 글로벌 네비게이션으로 다른 섹션 이동, 뒤로가기, 홈으로 복귀 등.

**공통 요소도 "왜"를 기술한다.** "상단에 레드바가 있음"이 아니라, "상단 레드바 — 브랜드 인지를 유지하며, 현재 어떤 서비스 안에 있는지 맥락을 제공. 이 안에 [항목들]이 포함됨."

**사용자와 확인한다.** 공통 요소를 먼저 정리해서 보여주고, 빠진 것이 없는지, 특정 화면에서 숨기거나 변형해야 할 것이 있는지 확인한다.

**확인되면 `screen-plan.md`에 저장한다.** 화면 시퀀스 테이블 바로 다음, 개별 화면 스펙 이전에 "공통 요소" 섹션으로 기록한다.

---

### Step 3-1~N. 개별 화면 상세

공통 요소가 확정된 후, 화면을 하나씩 순서대로 상세화한다.

**Propose the screen's elements.** 공통 요소에 이미 정의된 것은 반복하지 않는다. 해당 화면 고유의 요소만 기술한다. 단, 공통 요소가 이 화면에서 달라지는 점이 있으면 명시한다 (예: "이 화면에서는 하단 탭 숨김 — 몰입 경험을 위해", "상단 바에 뒤로가기 버튼 추가").

For each element, describe:
- **What it is** — the element itself (e.g., "프로젝트별 레시피 그룹")
- **Why it's here** — what user need or experience it serves (e.g., "57개 레시피가 한꺼번에 나열되면 파악이 안 되므로, 의미 단위로 묶어서 '내가 뭘 갖고 있는지' 한눈에 보이게 함")
- **How the user interacts with it** — what happens when they tap/click, if applicable

**Consider platform-specific patterns.** 확인된 플랫폼의 design guide(`references/mobile-design-guide.md` 또는 `references/desktop-design-guide.md`)에서 해당 화면에 적합한 스크린 패턴과 레이아웃 패턴을 참조한다. 플랫폼의 인터랙션 특성에 맞게 요소를 설계한다.

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
- `references/mobile-design-guide.md` — 모바일 플랫폼의 화면 설계 원칙과 제품 유형별 패턴. Phase 1에서 플랫폼이 모바일로 확인되면 Phase 2 시작 전에 읽는다.
- `references/desktop-design-guide.md` — 데스크탑(웹) 플랫폼의 화면 설계 원칙과 제품 유형별 패턴. Phase 1에서 플랫폼이 웹/데스크탑으로 확인되면 Phase 2 시작 전에 읽는다.
