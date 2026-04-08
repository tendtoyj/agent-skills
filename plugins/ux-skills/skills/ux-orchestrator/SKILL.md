---
name: ux-orchestrator
description: "UX 스킬 라우터 겸 진단 도구. 프로젝트 상태를 스캔하고, 부족한 부분을 진단하고, 다음에 실행할 스킬을 추천한다. 사용 시점: 다음에 뭐 해야 해, 어디서부터 시작해, UX 진행 상태, 뭐부터 하면 돼, what should I do next, ux status, 스킬 추천, 현재 상태, 진행 상황 등의 요청이 있을 때."
user-invocable: true
---

# UX Orchestrator

> **Trigger keywords**: 다음에 뭐 해야 해, 어디서부터 시작해, UX 진행 상태, 뭐부터 하면 돼, what should I do next, ux status, 스킬 추천, 현재 상태, 진행 상황, 뭐 하면 좋을까

UX 프로젝트의 GPS. 현재 상태를 진단하고, 부족한 부분을 찾고, 다음에 실행할 스킬을 추천한다.

이 스킬은 컨텐츠를 **직접 생성하지 않는다**. 진단하고, 추천하고, 라우팅만 한다.

---

## General Rules

- 사용자와 대화할 때는 친근하게 "~해요", "~하세요", "~해주세요" 말투를 사용하고 간결하게 말한다.
- 모든 대화는 사용자가 다른 언어를 요청하지 않는 한 한국어로 진행한다.
- 스킬 추천 시 반드시 **왜 이걸 먼저 해야 하는지** 이유를 포함한다.
- 사용자가 다른 스킬을 원하면 존중한다 — 강제하지 않는다.

---

## UX Memory Protocol — Gap Detection Mode

다른 스킬이 메모리를 단순히 로드하는 것과 달리, 오케스트레이터는 메모리를 **감사(audit)**한다.

### Step 1 — UX Memory 스캔

`ux-memory/` 디렉토리를 확인한다. 각 파일이 존재하는지, 실제 내용이 있는지(템플릿 상태가 아닌지) 평가한다:

```
ux-memory/
├── project-context.md   → 프로젝트 맥락 정의됨?
└── activity-log.md      → 실행 이력 기록됨?
```

**`ux-memory/`가 없거나 `project-context.md`가 비어있으면** → context-setup부터 실행하도록 안내하고 종료.

> "프로젝트 컨텍스트가 아직 없네요. 먼저 `/ux-skills:context-setup`을 실행해서 프로젝트 맥락을 세팅해주세요."

### Step 2 — UX Output 스캔

`ux-output/` 디렉토리의 모든 산출물을 스캔한다:

**Feature 폴더 스캔:**

각 `ux-output/{feature-name}/` 폴더에서:

| 파일 | 생성 스킬 | 상태 |
|------|----------|------|
| `pain-points.md` 또는 `ux-values.md` | brainstorming-guide | ✅ / ❌ |
| `ideas.md` | brainstorming-guide | ✅ / ❌ / N/A (value path) |
| `persona.md` | persona-maker | ✅ / ❌ |
| `user-flows.md` | userflow-generator | ✅ / ❌ |
| `screen-plans/` | screen-planner | ✅ N개 / ❌ |
| `designs/*/design-plan.md` | design-plan | ✅ N개 / ❌ |
| `designs/*/design-implement.md` | design-implement | ✅ N개 / ❌ |

**Research 폴더 스캔:**

각 `ux-output/research/{research-name}/` 폴더에서:

| 파일 | 생성 스킬 | 상태 |
|------|----------|------|
| `research-plan.md` | ur-planner | ✅ / ❌ |
| `survey.md` | survey-maker | ✅ / ❌ |
| `interview-guide.md` | interview-helper | ✅ / ❌ |

### Step 3 — 상태 리포트 생성

다음 형식으로 진단 결과를 출력한다:

```
## 현재 상태

### 프로젝트
서비스: [서비스명] | 도메인: [도메인] | 단계: [현재 단계]

### Feature 진행 상황
- ✅ onboarding-flow
  Brainstorming ✅ → Userflow ✅ → Screen Plans ❌ → Design Plans ❌ → Design Implements ❌
  
- ✅ search-redesign
  Brainstorming ✅ → Persona ✅ → Userflow ❌

### Research 진행 상황
- ✅ onboarding-research
  UR Plan ✅ → Survey ✅ → Interview Guide ❌

### 아직 시작하지 않은 작업
- ❌ 신규 Feature나 Research가 없습니다.
```

각 미완료 항목에는 **왜 이것이 필요한지** 한 줄 설명을 포함한다.

---

## 진단 질문

스캔만으로 사용자의 의도를 파악하기 어려울 때 사용한다. 스캔으로 답할 수 있는 질문은 건너뛴다.

### 질문 1 — 목표

```
지금 가장 필요한 게 뭔가요?

- **새 기능 기획** — 새로운 Feature를 브레인스토밍부터 시작하고 싶어요
- **기존 기능 이어서** — 진행 중인 Feature의 다음 단계를 하고 싶어요
- **사용자 리서치** — 리서치 계획을 세우거나, 설문/인터뷰를 준비하고 싶어요
- **모르겠어요** — 뭐부터 하면 좋을지 알려주세요
```

### 질문 2 — 대상 (필요 시)

Feature나 Research가 여러 개 진행 중인 경우:

```
어떤 Feature/Research를 이어서 하고 싶으세요?
- onboarding-flow (Brainstorming ✅ → Userflow ✅)
- search-redesign (Brainstorming ✅ → Persona ✅)
- onboarding-research (UR Plan ✅ → Survey ✅)
```

---

## 스킬 라우팅 매트릭스

### Route A: 빠른 설계

**조건**: 새 기능 기획, 설계까지 빠르게 진행하고 싶을 때

```
Step 1: BRAINSTORMING
  → /ux-skills:brainstorming-guide
  → 저장: ux-output/{feature}/pain-points.md + ideas.md (pain path) 또는 ux-values.md (value path)

Step 2: USERFLOW
  → /ux-skills:userflow-generator
  → 저장: ux-output/{feature}/user-flows.md

Step 3: SCREEN PLAN
  → /ux-skills:screen-planner
  → 저장: ux-output/{feature}/screen-plans/NN_{flow-name}.md

Step 4: DESIGN PLAN (선택)
  → /ux-skills:design-plan
  → 저장: ux-output/{feature}/designs/NN_{screen-name}/design-plan.md
  → 디자인 스크린샷이 있을 때, 디자인 시스템 매핑 & 갭 분석

Step 5: DESIGN IMPLEMENT (선택)
  → /ux-skills:design-implement
  → 저장: ux-output/{feature}/designs/NN_{screen-name}/design-implement.md
  → design-plan이 있을 때, 시각적 프론트엔드 구현
```

### Route B: 리서치 연결

**조건**: 기능 방향을 잡은 후 사용자 검증이 필요할 때

```
Step 1: BRAINSTORMING
  → /ux-skills:brainstorming-guide
  → 저장: ux-output/{feature}/pain-points.md + ideas.md (pain path) 또는 ux-values.md (value path)

Step 2: USERFLOW
  → /ux-skills:userflow-generator
  → 저장: ux-output/{feature}/user-flows.md

Step 3: UR PLAN
  → /ux-skills:ur-planner
  → 저장: ux-output/research/{research}/research-plan.md

Step 4: SURVEY / INTERVIEW
  → /ux-skills:survey-maker 또는 /ux-skills:interview-helper
  → 저장: ux-output/research/{research}/survey.md 또는 interview-guide.md
```

### Route C: 사용자 중심 설계

**조건**: 페르소나를 기반으로 설계를 진행하고 싶을 때

```
Step 1: BRAINSTORMING
  → /ux-skills:brainstorming-guide
  → 저장: ux-output/{feature}/pain-points.md + ideas.md (pain path) 또는 ux-values.md (value path)

Step 2: PERSONA
  → /ux-skills:persona-maker
  → 저장: ux-output/{feature}/persona.md

Step 3: USERFLOW
  → /ux-skills:userflow-generator
  → 저장: ux-output/{feature}/user-flows.md

Step 4: SCREEN PLAN
  → /ux-skills:screen-planner
  → 저장: ux-output/{feature}/screen-plans/NN_{flow-name}.md

Step 5: DESIGN PLAN (선택)
  → /ux-skills:design-plan
  → 저장: ux-output/{feature}/designs/NN_{screen-name}/design-plan.md

Step 6: DESIGN IMPLEMENT (선택)
  → /ux-skills:design-implement
  → 저장: ux-output/{feature}/designs/NN_{screen-name}/design-implement.md
```

### Route D: 리서치 우선

**조건**: 아이디어 검증을 위한 리서치부터 시작하고 싶을 때

```
Step 1: BRAINSTORMING
  → /ux-skills:brainstorming-guide
  → 저장: ux-output/{feature}/pain-points.md + ideas.md (pain path) 또는 ux-values.md (value path)

Step 2: UR PLAN
  → /ux-skills:ur-planner
  → 저장: ux-output/research/{research}/research-plan.md

Step 3: SURVEY / INTERVIEW
  → /ux-skills:survey-maker 또는 /ux-skills:interview-helper
  → 저장: ux-output/research/{research}/survey.md 또는 interview-guide.md
```

### Route E: 기존 작업 이어서

**조건**: 이미 진행 중인 Feature나 Research의 다음 단계

스캔 결과를 바탕으로 부족한 다음 단계를 자동으로 추천한다:

| 현재 상태 | 추천 다음 스킬 |
|----------|--------------|
| Brainstorming만 완료 | Userflow Generator 또는 Persona Maker 또는 UR Plan |
| Brainstorming + Persona 완료 | Userflow Generator |
| Brainstorming + Userflow 완료 | Screen Planner 또는 UR Plan |
| Brainstorming + Userflow + Screen Plan 완료 | Design Plan (디자인 스크린샷 있을 때) |
| Brainstorming + Userflow + Screen Plan + Design Plan 완료 | Design Implement |
| UR Plan만 완료 | Survey Maker 또는 Interview Helper |

다음 스킬이 여러 개 가능한 경우, 선택지를 제시하고 사용자가 고르도록 한다:

> "유저플로우까지 완성되었네요. 다음은 어떤 방향으로 가실래요?"
> 1. **Screen Planner** — 바로 화면 설계로 넘어가기
> 2. **UR Plan** — 설계 전에 사용자 검증 계획 세우기

---

## 출력 형식

모든 오케스트레이터 응답은 다음 구조를 따른다:

```
## 현재 상태
[Gap Detection 결과 — 완료/미완료]

## 추천 다음 단계
목표: [사용자 목표]

### Step 1: [스킬명]
[왜 이걸 먼저 해야 하는지]
[스킬 실행 프롬프트]

### Step 2: [스킬명]
[왜 다음에 이걸 해야 하는지]
[스킬 실행 프롬프트]

## 전체 로드맵
[Feature명]:  ✅ Brainstorming → ✅ Userflow → → Screen Plans (현재 단계) → Design Plans → Design Implements
[Research명]: ✅ UR Plan → → Survey (현재 단계)
```

### 스킬 실행 프롬프트

추천하는 각 스킬에 대해 바로 사용할 수 있는 프롬프트를 제공한다:

```
"/ux-skills:[skill-name]을 실행해주세요.
컨텍스트: [프로젝트 요약]
대상: [feature 또는 research 이름]
목표: [기대 결과]
참조: ux-memory/ 파일 확인"
```

---

## 재방문 & 스킬 체이닝

사용자가 오케스트레이터를 다시 실행하면, 항상 `ux-memory/`와 `ux-output/`을 새로 스캔한다. 이전과 달라진 점을 보여주고, 다음 단계를 추천한다.

오케스트레이터는 파일을 통해 컨텍스트를 기억한다. 대화 히스토리에 의존하지 않는다. 스킬 사이에서 돌아올 홈 베이스 — "다음에 뭐 하면 돼?"라고 말하면 전체 진단을 다시 실행한다.

---

## Reference Files

이 스킬은 별도의 참고 파일이 없다. `ux-memory/`와 `ux-output/`을 스캔하여 진단한다.
