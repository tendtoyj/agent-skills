---
name: design-plan
description: Analyzes a design (screenshot or Figma link) against the project's existing styles/components, then produces a component tree with gap classification and phased implementation steps. Use this skill when the user wants to plan implementation of a designed screen, check design system coverage, or bridge design to code. Also trigger when the user mentions design plan, component mapping, style gap, design-to-code, or screen implementation planning.
---

# Design Plan

디자인(스크린샷 또는 Figma)을 분석하여, 프로젝트의 기존 스타일/컴포넌트와 대조하고, 구현 계획까지 산출한다.

## UX Memory Protocol

### 시작 시
1. `ux-memory/project-context.md`가 존재하면 읽어서 프로젝트 맥락을 로드한다.
2. 작업 대상 Feature의 기존 산출물을 `ux-output/{feature-name}/`에서 확인한다.

### 종료 시
1. 산출물을 `ux-output/{feature-name}/design-plan.md`에 저장한다.
2. `ux-memory/activity-log.md`에 실행 기록을 추가한다:
   `| [날짜] | design-plan | [feature-name] | ux-output/[feature-name]/design-plan.md | [화면명, 요약] |`
3. `ux-memory/project-context.md`의 "진행 중인 Feature" 테이블을 갱신한다.

---

## Role & Principles

- 디자인 원본 기반. 추측하지 않는다.
- 기존 시스템 우선. 새로 만들기 전에 기존 것의 변형/조합을 먼저 검토한다.
- 갭은 구체적으로. "새로 필요"로 끝내지 않고, 어떻게 추가할지까지 제안한다.
- 모르면 모른다고. 판단 불가한 부분은 명시하고 확인 방법을 안내한다.
- Korean by default. 친근한 "~해요" 톤.

---

## Input

### 1. 디자인 소스 — 다음 중 하나 이상

**A) 스크린샷** — 사용자가 업로드한 이미지. Read로 시각 분석.

**B) Figma 링크** — figma-remote MCP 사용:
1. URL에서 fileKey, nodeId 파싱 (nodeId의 `-` → `:` 변환, branch URL이면 branchKey를 fileKey로)
2. `mcp__figma-remote__get_design_context`로 디자인 정보 획득
3. `mcp__figma-remote__get_screenshot`으로 시각 확인
4. 필요 시 `mcp__figma-remote__get_metadata`

둘 다 없으면 요청: "스크린샷을 업로드하거나 Figma 링크를 공유해주세요."

### 2. 참조 소스 — 프로젝트의 기존 스타일/컴포넌트 정의

형태는 프로젝트마다 다르다:

| 유형 | 예시 | 읽는 방법 |
|------|------|----------|
| 카탈로그 문서 | `docs/montage-catalog.md` | Read |
| 토큰/스타일 코드 | `src/styles/tokens.ts` | Read |
| 컴포넌트 코드 | `src/components/` | Glob + Read |
| 디자인 명세 | `design/spec.md` | Read |
| Figma 디자인 시스템 | Figma 링크 | figma-remote MCP |

사용자가 지정하지 않으면 질문한다. 확인된 경로는 `project-context.md` 맥락 메모에 기록해 재활용.

---

## Phase 1: 입력 로드

1. 디자인 소스를 확보하고 Feature에 연결한다. `screen-plan.md`가 있으면 설계 의도도 파악.
2. 참조 소스를 읽고 간단히 요약 공유.
3. **분석 모드**를 확인한다.

### 분석 모드

사용자가 미리 지정하지 않았으면 질문한다:

> "디자인을 어떤 수준으로 분석할까요?"
> 1. **픽셀 퍼펙트** — 색상, 타이포, 간격, 무드 등 시각적 디테일까지 그대로 구현
> 2. **와이어프레임** — 레이아웃 구조, 기능 요소, 콘텐츠만 참고. 스타일은 기존 디자인 시스템을 따름

모드에 따라 Phase 2의 분석 범위가 달라진다:

| | 픽셀 퍼펙트 | 와이어프레임 |
|---|---|---|
| 레이아웃 구조 | ✅ | ✅ |
| 기능 요소 (버튼, 입력 등) | ✅ | ✅ |
| 콘텐츠 구조 | ✅ | ✅ |
| 색상/타이포/간격 토큰 대조 | ✅ | ❌ 기존 시스템 따름 |
| 시각적 무드/스타일링 | ✅ | ❌ 기존 시스템 따름 |
| 아이콘/일러스트 스타일 | ✅ | ❌ |

**와이어프레임 모드**에서는 🆕 분류가 컴포넌트 구조 차원에서만 발생한다. 색상이나 타이포가 디자인과 다르더라도 기존 토큰을 사용하므로 갭으로 잡지 않는다.

---

## Phase 2: 분석 & 구현 계획

디자인 분석, 참조 대조, 구현 계획을 한 번에 수행한다. 산출물은 4개 블록으로 구성된다.

### 블록 1: 화면 조립 구조

디자인의 모든 요소를 컴포넌트 트리로 구조화한다. 각 노드에 분류를 표기하고, 🆕나 ✅ 변형인 경우 매칭/제안을 인라인으로 붙인다.

**분류 기준:**

| 표기 | 의미 |
|------|------|
| ✅ | 기존 컴포넌트/토큰으로 구현 가능 |
| ✅ 변형 | 기존 컴포넌트에 variant/prop 추가로 구현 가능 |
| 🆕 | 새 컴포넌트/토큰 정의 필요 |
| ❓ | 디자인만으로 판단 불가, 추가 정보 필요 |

```
Screen: 입맛 프로필
├── Header ✅
│   ├── IconButton(back) ✅
│   ├── Title("입맛 프로필") ✅ heading-lg
│   └── IconButton(edit) ✅ 변형 — icon-only variant 추가 필요
├── ProfileCard 🆕 — Avatar + UserInfo 조합, 기존 Card 확장
│   ├── Avatar ✅ size="lg"
│   └── Typography(name) ✅ body-bold
├── TasteSection
│   ├── SectionTitle ✅
│   ├── TagGroup 🆕 — 기존 Tag를 감싸서 selectable 지원
│   │   └── Tag ✅ (× N)
│   └── SpectrumBar 🆕 — 양극단 라벨 + 위치 표시, 유사 패턴 없음
│   └── 태그 선택 방식 ❓ — 단일/복수? (블로커)
└── BottomCTA
    └── Button("저장") ✅ variant="primary"

커버리지: 전체 12개 — ✅ 8개 / 🆕 3개 / ❓ 1개
```

### 블록 2: 🆕 신규 항목 상세

트리에서 🆕로 표기된 항목의 상세 정의.

각 항목마다:
- **역할** — 한 줄
- **Props** — 주요 인터페이스
- **기존 시스템과의 관계** — 어떤 기존 컴포넌트를 조합/확장하는지
- **재사용성** — 이 화면만? 다른 화면에서도?

새 토큰이 필요한 경우도 여기에 포함:
- **토큰명** (기존 네이밍 규칙 기반) + **추정 값** + **용도**

### 블록 3: ❓ 미해결 항목

트리에서 ❓로 표기된 항목 정리.

| 항목 | 영향 범위 | 블로커 여부 | 확인 방법 |
|------|----------|-----------|----------|
| 태그 선택 방식 | TagGroup props | 블로커 | 디자이너 확인 |
| CTA 고정 여부 | 레이아웃 구조 | 나중 가능 | 디자이너 확인 |

### 블록 4: 구현 단계

위 분석을 바탕으로 실제 구현 순서를 정리한다.

```
## 단계 1: 준비 — 토큰 & 변형 추가
- 신규 토큰 추가: [목록]
- 기존 컴포넌트 변형 추가: [목록]
- 완료 기준: 기존 사용처 영향 없음 확인

## 단계 2: 신규 컴포넌트 개발
- [컴포넌트명]: [역할 한 줄]
- [컴포넌트명]: [역할 한 줄]
- 완료 기준: 단독 렌더링 확인

## 단계 3: 화면 조립
- 블록 1의 트리대로 화면 구성
- 완료 기준: 디자인과 시각적으로 일치
```

---

### Phase 2 산출 후 → 사용자 확인

Phase 2의 4개 블록을 사용자에게 보여주고 피드백을 받는다:
- 빠뜨린 요소가 없는지
- 분류(✅/🆕/❓) 판단이 맞는지
- 구현 단계의 우선순위가 적절한지
- ❓ 항목 중 바로 답할 수 있는 것이 있는지

사용자 피드백을 반영하여 수정한 뒤 Phase 3으로 넘어간다.

---

## Phase 3: 저장

사용자 확인이 완료되면 `design-plan.md`에 저장한다.

### 산출물 구조

```markdown
# Design Plan — {화면명}

## 기본 정보
- Feature: {feature-name}
- 화면: {screen-name}
- 분석 모드: {픽셀 퍼펙트 / 와이어프레임}
- 날짜: {date}
- 디자인 소스: {screenshot / Figma link}
- 참조 소스: {파일/경로 목록}

## 화면 조립 구조
(컴포넌트 트리 + 커버리지 요약)

## 신규 항목 상세
(🆕 컴포넌트/토큰 정의)

## 미해결 항목
(❓ 정리)

## 구현 단계
(단계별 작업 + 완료 기준)
```

---

## Reference Files

이 스킬은 고정 참조 파일이 없다. 프로젝트별 참조 소스를 사용자로부터 받아 동적으로 로드한다.
