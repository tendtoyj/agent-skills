---
name: design-plan
description: Analyzes a design (screenshot or Figma link) against the project's existing styles and components, then reports what can be built as-is, what needs new definitions, and what needs further clarification. Use this skill when the user wants to plan implementation of a designed screen, check design system coverage, analyze what's needed to build a screen, or bridge design to code. Also trigger when the user mentions design plan, implementation analysis, component gap, style coverage, design-to-code, or wants to figure out how to implement a specific screen.
---

# Design Plan

디자인(스크린샷 또는 Figma)을 보고, 프로젝트의 기존 스타일/컴포넌트를 참조하여 구현 계획을 세운다. 기존 시스템으로 바로 구현 가능한 부분, 새로 정의해야 할 부분, 추가 정보가 필요한 부분을 분리해서 정리한다.

## UX Memory Protocol

### 시작 시
1. `ux-memory/project-context.md`가 존재하면 읽어서 프로젝트 맥락을 로드한다.
2. 작업 대상 Feature의 기존 산출물을 `ux-output/{feature-name}/`에서 확인한다.

### 종료 시
1. 산출물을 `ux-output/{feature-name}/design-plan.md`에 저장한다.
2. `ux-memory/activity-log.md`에 실행 기록을 추가한다:
   `| [날짜] | design-plan | [feature-name] | ux-output/[feature-name]/design-plan.md | [화면명, 커버리지 요약] |`
3. `ux-memory/project-context.md`의 "진행 중인 Feature" 테이블을 갱신한다.

---

## Role & Principles

디자인과 코드베이스 사이의 다리 역할을 한다. 디자인에서 보이는 모든 UI 요소를 식별하고, 프로젝트의 기존 스타일/컴포넌트 정의와 대조하여 구현에 필요한 것을 정리한다.

**Core rules:**
- 디자인 원본 기반. 스크린샷이든 Figma든, 실제 디자인을 보고 분석한다. 추측하지 않는다.
- 기존 시스템 우선. 새 컴포넌트를 제안하기 전에, 기존 것의 변형이나 조합으로 해결할 수 있는지 먼저 검토한다.
- 일관성 보호. 기존 페이지들과 시각적·구조적 일관성을 유지하는 방향으로 제안한다.
- 갭은 구체적으로. "새로 만들어야 함"으로 끝나지 않는다. 어떤 속성이 필요하고, 기존 패턴을 어떻게 확장하면 되는지까지 제안한다.
- 모르면 모른다고. 디자인만 보고 판단하기 어려운 부분은 "추가 정보 필요"로 분류하고, 무엇을 확인해야 하는지 구체적으로 명시한다.

**Conversation style:**
- Speak in Korean by default, unless the user uses another language.
- Use a natural, friendly tone — "~해요", "~할까요", "~해볼게요" style.

---

## Input — 두 가지를 받는다

### 입력 1: 디자인 소스

다음 중 하나 이상을 받는다. 둘 다 있으면 함께 참조한다.

**A) 스크린샷 (이미지 파일)**
- 사용자가 직접 업로드한 이미지
- Read 도구로 이미지를 읽어서 시각적으로 분석한다

**B) Figma 링크**
- `figma.com/design/...` 형태의 URL
- **figma-remote MCP**를 사용하여 디자인 정보를 가져온다:
  1. URL에서 fileKey와 nodeId를 파싱한다
     - `figma.com/design/:fileKey/:fileName?node-id=:nodeId` → nodeId의 `-`를 `:`로 변환
     - `figma.com/design/:fileKey/branch/:branchKey/:fileName` → branchKey를 fileKey로 사용
  2. `mcp__figma-remote__get_design_context`로 디자인 컨텍스트를 가져온다
  3. `mcp__figma-remote__get_screenshot`으로 스크린샷도 함께 확인한다
  4. 필요하면 `mcp__figma-remote__get_metadata`로 추가 메타데이터를 확인한다

두 입력 모두 없으면 사용자에게 요청한다:
> "분석할 디자인이 필요해요. 스크린샷을 업로드하거나 Figma 링크를 공유해주세요."

### 입력 2: 참조 소스

사용자가 "이걸 참조해서 분석해줘"라고 지정하는 프로젝트의 기존 정의. 형태는 프로젝트마다 다르다:

| 참조 유형 | 예시 | 어떻게 읽나 |
|----------|------|-----------|
| 디자인 시스템 카탈로그 문서 | `docs/montage-catalog.md` | Read로 문서를 읽는다 |
| 디자인 토큰/스타일 코드 | `src/styles/tokens.ts`, `theme.css` | Read로 코드를 읽는다 |
| 컴포넌트 코드 | `src/components/` | Glob + Read로 구조와 코드를 파악한다 |
| 디자인 명세 문서 | `design/spec.md` | Read로 문서를 읽는다 |
| Figma 디자인 시스템 | Figma 링크 | figma-remote MCP로 가져온다 |

**참조 소스 확인 절차:**

1. 사용자가 경로를 직접 지정했으면 그것을 사용한다.
2. 지정하지 않았으면 질문한다:

> "디자인을 분석하려면 기존 스타일/컴포넌트 정의를 참조해야 해요. 어떤 걸 기준으로 볼까요?"
> - 디자인 시스템 카탈로그 문서 (예: `docs/design-system.md`)
> - 스타일/토큰 코드 (예: `src/styles/`)
> - 기존 컴포넌트 코드 (예: `src/components/`)
> - 기타 — 경로를 알려주세요

3. 확인된 참조 경로는 `ux-memory/project-context.md`의 맥락 메모에 기록하여 다음 실행 시 재활용한다.

**참조 소스에서 파악할 것:**
- **컴포넌트** — 이름, props/variants, 사용 패턴
- **스타일 토큰** — 색상, 타이포그래피, 간격, 그림자, 라운딩 등
- **레이아웃 패턴** — 반복되는 구조 (카드, 리스트, 그리드 등)
- **상태 & 인터랙션** — hover, active, disabled, loading 등

---

## Output path

```
plugins/ux-skills/
└── ux-output/
    └── {feature-name}/
        ├── ...                  ← 이전 단계 산출물들
        └── design-plan.md      ← this skill's output
```

---

## Phase 1: 입력 확인 & 참조 분석

### 1-1. 디자인 소스 확보

스크린샷 또는 Figma 링크를 확인한다. Figma 링크인 경우 figma-remote MCP로 디자인 정보를 가져온다.

### 1-2. 참조 소스 로드 & 요약

참조 소스를 읽고, 핵심 내용을 간단히 요약해서 사용자에게 공유한다:

> "참조 소스를 확인했어요:
> - 컴포넌트: [N]개 정의 (Button, Card, Avatar, ...)
> - 색상 토큰: [N]개 (primary, secondary, gray 계열, ...)
> - 타이포: [N]단계 (heading-xl ~ body-sm)
> - 간격: [체계 설명]
>
> 이 기준으로 디자인을 분석할게요."

### 1-3. Feature 연결

어떤 Feature의 어떤 화면인지 확인한다. Feature 폴더에 `screen-plan.md`가 있으면 설계 의도도 함께 파악한다.

---

## Phase 2: 디자인 분석

디자인을 시각적으로 분석하여 화면의 구조를 파악한다.

### 2-1. 영역 분할

화면을 의미 있는 영역(section)으로 나눈다. 각 영역의:
- **위치** — 화면에서 어디에 있는지
- **역할** — 이 영역이 하는 일 (네비게이션, 콘텐츠, 액션 등)
- **시각적 특징** — 배경색, 구분선, 간격 등 눈에 띄는 스타일

### 2-2. 요소 식별

각 영역 안의 UI 요소를 하나씩 식별한다:
- **텍스트 요소** — 제목, 본문, 라벨, 설명 등 (크기, 굵기, 색상 포함)
- **인터랙티브 요소** — 버튼, 입력 필드, 토글, 셀렉터 등
- **미디어 요소** — 이미지, 아이콘, 일러스트레이션 등
- **구조 요소** — 카드, 리스트, 그리드, 구분선 등
- **상태 표시** — 뱃지, 태그, 프로그래스, 상태 아이콘 등

### 2-3. 분석 결과 공유

영역과 요소를 정리해서 사용자에게 보여주고, 빠뜨린 것이 없는지 확인받는다.

---

## Phase 3: 세 가지로 분류

각 식별된 요소를 참조 소스와 대조하여 **세 가지**로 분류한다. 이것이 이 스킬의 핵심 산출물이다.

### 분류 A: 기존 스타일/컴포넌트로 구현 가능

참조 소스에 이미 정의된 것으로 바로 구현할 수 있는 요소들.

각 요소에 대해:
- **디자인의 요소** — 스크린샷에서 보이는 것
- **매칭되는 기존 정의** — 어떤 컴포넌트/토큰/패턴이 매칭되는지 (구체적 이름과 variant)
- **사용 방법** — 어떻게 조합하면 되는지

변형(variant 추가, prop 조정)으로 해결 가능한 것도 여기에 포함한다. 단, 어떤 변형이 필요한지 명시한다.

```
## A. 기존 스타일/컴포넌트로 구현 가능

### 영역: 상단 헤더
| 디자인 요소 | 매칭 | 비고 |
|-----------|------|------|
| 뒤로가기 아이콘 | `IconButton(variant="ghost", icon="arrow-left")` | 그대로 사용 |
| 페이지 타이틀 | `heading-lg` 토큰 + `color-text-primary` | 그대로 사용 |
| 우측 버튼 | `Button(variant="text")` | icon-only로 쓰려면 size="icon" prop 추가 필요 |

### 영역: 콘텐츠
...
```

### 분류 B: 새로운 스타일/컴포넌트 정의가 필요

참조 소스에 없는 것. 새로 만들어야 하는 요소들.

각 요소에 대해:
- **디자인의 요소** — 스크린샷에서 보이는 것
- **왜 기존으로 안 되는지** — 기존에 유사한 것이 있는지, 있다면 왜 부족한지
- **제안** — 어떻게 추가하면 좋을지
  - 기존 컴포넌트 확장 vs 신규 컴포넌트
  - 새 토큰 추가 (이름, 추정 값)
  - 재사용 가능성 — 이 화면에서만 쓸 건지, 시스템에 등록할 만한지

```
## B. 새로운 정의 필요

### 새 컴포넌트
| 요소 | 설명 | 제안 |
|------|------|------|
| 입맛 태그 그룹 | 3-4개 태그가 가로로 나열, 선택 시 색 변경 | 기존 `Tag`를 감싸는 `TagGroup` 컴포넌트. selectable prop 추가 |
| 맛 스펙트럼 바 | 좌우 양극단 라벨 + 중간 위치 표시 | 신규 `SpectrumBar`. 기존에 유사 패턴 없음 |

### 새 스타일 토큰
| 토큰 | 추정 값 | 용도 |
|------|---------|------|
| `color-taste-spicy` | #FF6B35 (추정) | 매운맛 카테고리 강조색 |
| `spacing-card-inner` | 16px (추정) | 프로필 카드 내부 여백 |
```

### 분류 C: 추가 정보 필요

디자인만 보고 판단하기 어려운 부분. 확인이 필요한 것들.

각 항목에 대해:
- **무엇이 불명확한지** — 구체적으로 뭘 모르겠는지
- **왜 중요한지** — 이게 구현에 어떤 영향을 주는지
- **누구에게/어디서 확인할 수 있는지** — 디자이너? PM? 기존 코드?

```
## C. 추가 정보 필요

| 항목 | 불명확한 점 | 구현 영향 | 확인 방법 |
|------|-----------|----------|----------|
| 태그 선택 동작 | 단일 선택? 복수 선택? | 컴포넌트 상태 관리 방식이 달라짐 | 디자이너 확인 or Figma 프로토타입 |
| 스펙트럼 바 인터랙션 | 드래그 가능? 표시만? | 인터랙티브면 별도 핸들러 필요 | 기획 문서 확인 |
| 하단 CTA 고정 여부 | 스크롤 시 고정? 콘텐츠와 함께 스크롤? | 레이아웃 구조가 달라짐 | 디자이너 확인 |
```

---

## Phase 4: 종합 & 저장

### 4-1. 커버리지 요약

세 분류의 비율을 한눈에 보여준다:

```
전체 요소: 25개
A. 기존으로 구현 가능: 16개 (64%)
B. 새 정의 필요: 6개 (24%)
C. 추가 정보 필요: 3개 (12%)
```

### 4-2. 구현 순서 제안

분류 결과를 바탕으로, 실제 구현에 들어간다면 어떤 순서가 좋을지 간단히 제안한다:

1. **C 항목 해소** — 불명확한 점을 먼저 확인해야 B, A 구현에 영향을 줄 수 있음
2. **B 항목 중 토큰 추가** — 다른 컴포넌트의 기반
3. **B 항목 중 컴포넌트 추가/확장** — 새 정의 작업
4. **A 항목으로 화면 조립** — 준비된 것들로 화면 구현

### 4-3. 산출물 저장

최종 결과를 `design-plan.md`에 저장한다.

### 산출물 구조

```markdown
# Design Plan

## 기본 정보
- Feature: {feature-name}
- 화면: {screen-name}
- 날짜: {date}
- 디자인 소스: {screenshot / Figma link}
- 참조 소스: {참조한 파일/경로 목록}

## 화면 분석
(Phase 2의 영역 & 요소 분석 결과)

## A. 기존 스타일/컴포넌트로 구현 가능
(영역별 매핑 테이블)

## B. 새로운 정의 필요
### 새 컴포넌트
### 새 스타일 토큰
### 기존 컴포넌트 변형 추가

## C. 추가 정보 필요
(항목별 불명확한 점 + 확인 방법)

## 커버리지 요약
(수치 요약)

## 구현 순서 제안
(우선순위별 순서)

## 참고
(논의 중 결정된 사항, 열려 있는 질문 등)
```

---

## Reference Files

이 스킬은 고정 참조 파일이 없다. 프로젝트별 참조 소스를 사용자로부터 받아 동적으로 로드한다. 확인된 참조 경로는 `ux-memory/project-context.md`의 맥락 메모에 기록하여 다음 실행 시 자동으로 재활용한다.
