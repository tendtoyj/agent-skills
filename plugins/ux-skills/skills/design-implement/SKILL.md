---
name: design-implement
description: Implements the visual frontend from a design-plan output. Reads design-plan.md (component tree, gap classification, implementation phases), then builds tokens, components, and screen layout code — focusing only on UI presentation. Use this skill when the user wants to implement a design plan, build screen components, code a design, or turn a design-plan into working frontend. Also trigger on design implement, design coding, screen build, or UI implementation.
---

# Design Implement

`design-plan.md`를 기반으로 화면의 시각적 프론트엔드를 구현한다. API 연동이나 비즈니스 로직은 범위 밖이며, mock/placeholder로 처리한다.

## UX Memory Protocol

### 시작 시
1. `ux-memory/project-context.md`가 존재하면 읽어서 프로젝트 맥락을 로드한다.
2. 작업 대상 Feature의 기존 산출물을 `ux-output/{feature-name}/`에서 확인한다.
3. `ux-output/{feature-name}/designs/` 폴더를 스캔하여 design-plan이 있는 화면 목록을 파악한다.
4. 사용자에게 어떤 화면을 구현할지 선택하게 한다. 해당 화면의 `designs/NN_{screen-name}/design-plan.md`가 반드시 있어야 한다. 없으면 `/ux-skills:design-plan`을 먼저 실행하도록 안내한다.

### 종료 시
1. 산출물을 `ux-output/{feature-name}/designs/NN_{screen-name}/design-implement.md`에 저장한다.
   - design-plan.md와 같은 폴더에 저장한다.
2. `ux-memory/activity-log.md`에 실행 기록을 추가한다:
   `| [날짜] | design-implement | [feature-name] | ux-output/[feature-name]/designs/NN_{screen-name}/design-implement.md | [화면명, 요약] |`
3. `ux-memory/project-context.md`의 "진행 중인 Feature" 테이블을 갱신한다.

---

## Role & Principles

- **design-plan 충실 실행**. 컴포넌트 트리와 분류(✅/🆕/❓)를 그대로 따른다.
- **시각 구현 전문**. 레이아웃, 스타일, 컴포넌트 렌더링에만 집중한다.
- **기존 코드 우선**. 프로젝트에 이미 있는 컴포넌트/토큰을 최대한 활용한다.
- **디자인 원본 참조**. 구현 중 디자인(Figma/스크린샷)을 수시로 대조한다.
- **범위 엄수**. API 호출, 상태 관리, 라우팅 등은 stub/mock으로만 처리한다.
- Korean by default. 친근한 "~해요" 톤.

---

## Input

### 1. design-plan.md — 필수

`ux-output/{feature-name}/designs/NN_{screen-name}/design-plan.md`를 읽는다. 여기서 추출하는 정보:

| 항목 | 용도 |
|------|------|
| 기본 정보 (분석 모드, 디자인 소스) | 구현 정밀도 결정 |
| 화면 조립 구조 (컴포넌트 트리) | 구현 순서 & 구조 |
| 신규 항목 상세 (🆕) | 새 컴포넌트/토큰 정의 |
| 미해결 항목 (❓) | 블로커 확인 |
| 구현 단계 | 작업 흐름 |

### 2. 디자인 원본 — design-plan에 기록된 소스

**A) 스크린샷** — Read로 시각 확인.

**B) Figma 링크** — figma-remote MCP 사용:
1. URL에서 fileKey, nodeId 파싱
2. `mcp__figma-remote__get_design_context`로 코드 참조 획득
3. `mcp__figma-remote__get_screenshot`으로 시각 확인

### 3. 프로젝트 코드베이스

design-plan의 참조 소스 경로를 따라 기존 코드를 스캔한다:
- 컴포넌트 디렉토리 구조 (Glob)
- 토큰/스타일 파일 (Read)
- 프로젝트 기술 스택 확인 (package.json, tsconfig 등)

---

## Phase 0: 입력 로드 & 사전 점검

1. `design-plan.md`를 읽고 핵심 정보를 정리한다.
2. 디자인 원본을 로드한다.
3. 프로젝트 기술 스택을 확인한다 (React/Vue/Svelte, CSS 방식, 디렉토리 규칙 등).
4. **❓ 미해결 항목 중 블로커**가 있으면 사용자에게 해결을 요청한다. 블로커가 아닌 ❓는 reasonable default로 진행 가능.

### 사용자에게 확인

> "design-plan을 확인했어요. 구현을 시작하기 전에 확인할게요:"
> - 기술 스택: {감지 결과}
> - 블로커 ❓ 항목: {있으면 나열}
> - 구현 범위: 화면 조립 구조의 {N}개 요소
> "맞으면 시작할게요!"

---

## Phase 1: 토큰 & 기존 컴포넌트 확장

design-plan의 **"단계 1: 준비"**에 해당한다.

### 1-1. 신규 토큰 추가

design-plan에서 🆕로 분류된 토큰을 프로젝트의 토큰 파일에 추가한다.

- 기존 토큰 네이밍 규칙을 따른다
- 추가 후 기존 사용처에 영향이 없는지 확인

### 1-2. 기존 컴포넌트 변형 추가

`✅ 변형`으로 분류된 항목을 처리한다:

- 기존 컴포넌트 파일을 읽는다
- variant/prop을 추가한다
- 기존 사용처가 깨지지 않는지 확인한다

### Phase 1 완료 조건
- [ ] 신규 토큰이 토큰 파일에 추가됨
- [ ] 기존 컴포넌트 변형이 추가됨
- [ ] 기존 사용처에 영향 없음 확인 (lint/typecheck)

---

## Phase 2: 신규 컴포넌트 개발

design-plan의 **"단계 2: 신규 컴포넌트 개발"**에 해당한다.

### 🆕 컴포넌트마다 수행

1. **파일 생성** — 프로젝트 디렉토리 규칙에 맞는 위치에 컴포넌트 파일 생성
2. **Props 인터페이스** — design-plan의 "신규 항목 상세"에서 정의된 Props 구현
3. **렌더링 구현** — 프로젝트 기술 스택에 맞게 구현
4. **스타일링** — 프로젝트의 CSS 방식(CSS Modules, Tailwind, styled-components 등)을 따름
5. **디자인 대조** — 디자인 원본과 비교하여 시각적으로 일치하는지 확인

### 구현 규칙

- **mock 데이터 사용**: 동적 데이터는 하드코딩된 mock 값으로 표시
- **이벤트 핸들러**: `onClick`, `onChange` 등은 빈 함수 또는 `console.log`로 stub 처리
- **상태**: 시각적 표현에 필요한 최소한의 로컬 상태만 사용 (예: 탭 선택, 토글)
- **네비게이션**: stub 처리 (`// TODO: 라우팅 연결`)

### Phase 2 완료 조건
- [ ] 모든 🆕 컴포넌트 파일 생성됨
- [ ] 단독 렌더링 가능 (에러 없음)
- [ ] lint/typecheck 통과

---

## Phase 3: 화면 조립

design-plan의 **"단계 3: 화면 조립"**에 해당한다.

### 수행 내용

1. **페이지/스크린 파일 생성** — 컴포넌트 트리 최상위를 페이지로 구성
2. **레이아웃 구현** — 트리 구조대로 컴포넌트 배치
3. **반응형 처리** — 디자인에 반응형 힌트가 있으면 반영, 없으면 모바일 퍼스트 기본값
4. **인터랙션** — 호버, 포커스, 전환 등 CSS 수준의 시각 인터랙션만 구현

### 분석 모드별 차이

| | 픽셀 퍼펙트 | 와이어프레임 |
|---|---|---|
| 간격/정렬 | 디자인 수치 그대로 | 기존 spacing 토큰 사용 |
| 색상 | 디자인 색상 매칭 | 기존 color 토큰 사용 |
| 타이포 | 디자인 수치 그대로 | 기존 typography 토큰 사용 |
| 아이콘/이미지 | 에셋 확보 필요 시 placeholder + TODO | placeholder 사용 |

### Phase 3 완료 조건
- [ ] 화면이 트리 구조대로 조립됨
- [ ] 에러 없이 렌더링됨
- [ ] lint/typecheck 통과

---

## Phase 4: 시각 검증 & 피드백

### 4-1. 디자인 원본 대조

구현 결과를 디자인 원본과 비교한다:

1. **Figma가 있는 경우** — `mcp__figma-remote__get_screenshot`으로 디자인 스크린샷을 다시 확인하고 구현과 대조
2. **스크린샷만 있는 경우** — 원본 스크린샷을 다시 Read하여 대조

### 4-2. 차이점 리포트

```
## 시각 검증 결과

### 일치 항목
- [컴포넌트]: 레이아웃, 색상, 타이포 일치 ✅

### 차이 발견
- [컴포넌트]: [차이 내용] — [원인/수정 제안]

### 확인 필요
- [항목]: [사용자 확인이 필요한 이유]
```

### 4-3. 수정 루프

차이점이 있으면 수정하고 재검증한다. 사용자 확인이 필요한 항목은 질문한다.

---

## Phase 5: 저장 & 정리

### 5-1. 구현 리포트 저장

`ux-output/{feature-name}/designs/NN_{screen-name}/design-implement.md`에 저장한다 (design-plan.md와 같은 폴더):

```markdown
# Design Implement — {화면명}

## 기본 정보
- Feature: {feature-name}
- 화면: {screen-name}
- 분석 모드: {픽셀 퍼펙트 / 와이어프레임}
- 기술 스택: {React + Tailwind 등}
- 날짜: {date}
- 기반 계획: ux-output/{feature-name}/designs/NN_{screen-name}/design-plan.md

## 구현 결과 요약

### 생성/수정된 파일
| 파일 경로 | 유형 | 설명 |
|----------|------|------|
| src/components/ProfileCard.tsx | 🆕 신규 | 아바타 + 유저 정보 카드 |
| src/components/Button.tsx | ✅ 변형 | icon-only variant 추가 |
| src/tokens/colors.ts | 🆕 토큰 | accent-warm 추가 |

### 커버리지
- 전체 요소: {N}개
- 구현 완료: {N}개
- 미구현 (❓ 블로커): {N}개

## Mock/Stub 목록
| 위치 | 유형 | 설명 | TODO |
|------|------|------|------|
| ProfileCard.tsx:15 | mock data | 사용자 이름 하드코딩 | API 연결 |
| TasteSection.tsx:8 | stub handler | onTagSelect 빈 함수 | 상태 관리 연결 |

## 시각 검증 결과
(Phase 4의 검증 리포트)

## 후속 작업
- [ ] API 연동
- [ ] 상태 관리 연결
- [ ] 라우팅 설정
- [ ] E2E 테스트
```

### 5-2. UX Memory 갱신

1. `activity-log.md`에 기록 추가
2. `project-context.md` 갱신

---

## Reference Files

이 스킬은 고정 참조 파일이 없다. `design-plan.md`에 명시된 참조 소스와 프로젝트 코드베이스를 동적으로 로드한다.
