---
name: service-spec
description: "Generate final service specification document. Use when user mentions: service spec, 서비스 명세, specification, 명세서, documentation, 문서화, service summary, 서비스 요약, 서비스 설명, project summary, 기획서"
user-invocable: true
---

# Service Specification

> **Trigger keywords**: service spec, 서비스 명세, specification, 명세서, documentation, 문서화, service summary, 서비스 요약, 서비스 설명, project summary, 기획서

Generate a clean, comprehensive service specification document. Choose between a concise one-liner or a detailed Input-Output structure.

---

## Project Memory Protocol

Before executing, load ALL available from `project-memory/`:

- `project-context.md` → Service identity, concept, motivation
- `ux-spec.md` → UX specifications, features
- `mvp-scope.md` → MVP feature/page scope
- `design-tokens.md` → Design system decisions
- `learnings.md` → Iteration insights

The more project-memory files exist, the richer the specification. This skill can run with minimal info, but full context produces better results.

---

## Output Format Selection

> "서비스 명세서를 어떤 형태로 받으시겠어요?
>
> **A) 한 문장 버전** — 서비스 핵심을 1-2줄로 명확히 (빠른 공유용)
> **B) Input-Output 구조 버전** — 작동 방식과 가치를 체계적으로 정리 (기획/제안용)
>
> 어떤 버전을 원하시나요?"

---

## Option A: One-Sentence Summary

### Template

```markdown
**[서비스명]:** [서비스]는 사용자의 [입력 데이터]를 [처리 방식]해서 [결과물]을 제공하는 서비스입니다.
```

### Example

```markdown
**PhotoAnalyzer:** 사용자의 정보(이름, 생년월일, 성별)와 업로드한 사진(최대 5장)을 AI가 분석해서 개인화된 결과 이미지와 텍스트를 제공하는 서비스입니다.
```

---

## Option B: Detailed Input-Output Structure

### Template

```markdown
# [서비스명] - 서비스 작동 구조

## Input (입력)
**사용자가 제공하는 정보:**
- [입력항목 1]: [설명]
- [입력항목 2]: [설명]
- [입력항목 3]: [설명]

## Process (처리)
**[서비스명]이 하는 일:**
[AI/시스템이 입력을 어떻게 분석/처리하는지 1-2줄 설명]

## Output (결과)
**사용자가 받게 되는 것:**
- [결과물 1]: [형태와 내용]
- [결과물 2]: [형태와 내용]

## Value (가치)
**해결하는 문제:** [기존 문제점이나 불편함]
**제공하는 가치:** [사용자가 얻는 핵심 이익]

---
**Tech:** [기술 스택] | **Design:** [디자인 테마] | **Generated:** [날짜]
```

### Extended Sections (Option B에 추가 가능)

```markdown
## 서비스 개요

### 핵심 작동 구조
**Input → Process → Output:**
- **입력:** [상세 입력 항목들과 형식, 제약사항]
- **처리:** [시스템/AI 처리 방식, 알고리즘, 로직]
- **출력:** [결과물의 형태, 구성, 전달 방식]

### 핵심 가치 제안
**해결하는 문제:** [사용자 페인포인트 상세]
**제공하는 솔루션:** [해결 방법과 차별화 포인트]
**타겟 사용자:** [주요 사용자층과 사용 시나리오]
```

### Page Structure Section

```markdown
## 페이지 구조 (Input-Output 흐름 반영)

### MVP 필수 페이지
- **[입력 페이지명]** (`/[경로]`)
  - 목적: [구체적 입력 데이터] 수집
  - 구성: [입력 폼, 유효성 검증, 업로드 기능 등]

- **[처리/대기 페이지명]** (`/[경로]`)
  - 목적: [처리 진행상황] 표시
  - 구성: [로딩 상태, 진행률, 예상 시간 등]

- **[결과 페이지명]** (`/[경로]`)
  - 목적: [분석 결과물] 표시 및 액션 유도
  - 구성: [결과 시각화, 텍스트, 공유/저장 등]
```

---

## Auto-Population

두 버전 모두 project-memory에서 확정된 정보를 자동으로 반영:
- 서비스명 (`project-context.md`에서)
- 핵심 Input-Process-Output 흐름 (`ux-spec.md`에서)
- MVP 기능과 페이지 (`mvp-scope.md`에서)
- 디자인 테마와 기술 스택 (`design-tokens.md`에서)

---

## Saving

Save the specification to the project root:

- Option A: `[service-name]-spec-summary.md`
- Option B: `[service-name]-spec-detailed.md`

> ✅ 서비스 명세서 저장: `[파일 경로]`
>
> 이 문서를 팀원, 이해관계자, 또는 기획서에 활용하세요.

---

## Skill Chaining

After generating the specification:

> 서비스 명세가 완성되었습니다!
>
> - 코딩 프롬프트가 필요하면: `/vibe-coding:prompt-generator`
> - AI 캐릭터가 필요하면: `/vibe-coding:prompt-craft`
> - 전체 상태 확인: `/vibe-coding:orchestrator`
