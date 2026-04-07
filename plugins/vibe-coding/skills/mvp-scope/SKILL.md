---
name: mvp-scope
description: "Define MVP scope and feature boundaries. Use when user mentions: MVP, scope, 범위, what to build first, 뭐부터 만들지, feature priority, must-have, nice-to-have, 우선순위, minimum viable, 최소 기능, scope definition"
user-invocable: true
---

# MVP Scope Definition

> **Trigger keywords**: MVP, scope, 범위, what to build first, 뭐부터 만들지, feature priority, must-have, nice-to-have, 우선순위, minimum viable, 최소 기능

Define clear boundaries for your MVP. Decide what to build now and what to defer — so you ship something usable instead of building forever.

---

## Project Memory Protocol

Before executing, check for the `project-memory/` directory.

- Load `project-context.md` for service identity and concept
- Load `ux-spec.md` for feature list and user flows
- If neither exists:
  > "프로젝트 컨텍스트가 아직 없어요. `/vibe-coding:discovery`를 먼저 실행해서 프로젝트를 정의하시는 걸 추천합니다.
  > 아니면 지금 바로 MVP 범위를 정하면서 필요한 정보를 함께 정리할 수도 있어요."

---

## Step 1: Core Value Identification

"이 서비스에서 사용자가 가장 먼저 느끼길 원하는 **단 하나의 가치**는 뭔가요?

예시:
- '운동 기록을 AI가 분석해서 맞춤 루틴 제공' (핵심 가치 = AI 맞춤 추천)
- '팀 문서를 한 곳에서 관리' (핵심 가치 = 통합 문서 관리)
- '일기를 음성으로 기록하고 감정 분석' (핵심 가치 = 음성 기반 감정 인사이트)"

---

## Step 2: Minimal User Flow

"핵심 가치를 전달하기 위한 **최소 사용자 흐름**을 정의해볼게요.

사용자가 처음 들어와서 → 핵심 가치를 경험하기까지 필요한 단계만 나열해주세요.

예시:
1. 회원가입/로그인
2. 운동 기록 입력
3. AI 분석 결과 확인
4. 맞춤 루틴 제공

(이 외의 모든 것은 Post-MVP 후보입니다)"

---

## Step 3: Feature Sorting

UX 사양에서 파악된 기능들을 분류합니다.

**분류 질문:**
> "각 기능에 대해 판단해주세요:
>
> **Must-Have (없으면 MVP가 성립 안 됨):**
> - 핵심 가치를 전달하는 데 필수인가?
> - 이 없이 사용자가 서비스를 이해할 수 있는가?
>
> **Nice-to-Have (있으면 좋지만 나중에 추가 가능):**
> - 사용자 경험을 개선하지만 핵심은 아닌가?
> - 나중에 추가해도 기존 구조에 영향이 없는가?
>
> **Out of Scope (MVP에서 제외):**
> - 핵심 가치와 직접 관련이 없는가?
> - 복잡도가 높아서 일정을 위협하는가?"

### Feature Sorting Template

```
## Must-Have (MVP)
- [ ] [기능명] — [왜 필수인지]
- [ ] [기능명] — [왜 필수인지]

## Nice-to-Have (v1.1)
- [ ] [기능명] — [왜 후순위인지]
- [ ] [기능명] — [왜 후순위인지]

## Out of Scope (v2+)
- [ ] [기능명] — [왜 제외하는지]
```

---

## Step 4: Page Scope Definition

"MVP에 **꼭 필요한 페이지**만 정의해볼게요.

각 페이지에 대해:
- 페이지명과 경로
- 이 페이지가 MVP에 왜 필요한지
- 이 페이지에서 사용자가 할 수 있는 핵심 액션"

### Page Scope Template

```
## MVP Required Pages
1. **[페이지명]** (`/경로`)
   - 목적: [무엇을 위한 페이지]
   - 핵심 액션: [사용자가 할 수 있는 것]

## Deferred Pages
1. **[페이지명]** — 이유: [왜 미루는지]
```

---

## Step 5: Scope Validation

최종 확인 체크리스트:

> "정의된 MVP 범위를 확인해볼게요:
>
> ✅ **핵심 가치:** [한 문장 요약]
> ✅ **필수 기능:** [개수]개
> ✅ **필수 페이지:** [개수]개
> ✅ **최소 사용자 흐름:** [단계 수]단계
>
> ❓ **빠진 건 없나요?**
> ❓ **너무 많은 건 없나요?**
>
> MVP 원칙: '이 없이 서비스가 성립하지 않는 것'만 포함"

---

## Saving to Project Memory

After user confirms the scope:

1. Write to `project-memory/mvp-scope.md`
2. Confirm:

> ✅ MVP 범위 저장: `project-memory/mvp-scope.md`
> 이후 디자인 시스템과 코딩 프롬프트 생성 시 이 범위를 기준으로 진행합니다.

---

## Skill Chaining

After defining MVP scope:

> MVP 범위가 정의되었습니다! 다음 단계:
>
> 1. **Design System** — 디자인 시스템을 결정하세요 (색상, 타이포, 레이아웃 등)
> 2. **Prompt Generator** — 바로 코딩 프롬프트를 생성할 수도 있어요 (디자인은 기본값 사용)
>
> `/vibe-coding:orchestrator`로 전체 진행 상태를 확인할 수 있습니다.
