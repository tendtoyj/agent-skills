---
name: weekly-digest
description: Generate a high-level weekly work summary for leadership sync meetings. Use when the user asks for a weekly digest, weekly summary, weekly sync prep, or wants to summarize recent work for a team meeting. Fetches GitHub PRs/commits from the past 7 days and produces a concise, meaning-unit summary in Korean suitable for leader-level sharing.
---

# Weekly Digest

Summarize recent GitHub activity into a concise, leader-level weekly digest in Korean.

## Workflow

### Step 1: Propose date range

Calculate the date range (today minus 7 days) and present it to the user:

```
조회 기간: {start_date} ~ {end_date} (7일간)
이 기간의 GitHub PR/커밋을 조회할까요?
```

Use `AskUserQuestion` to get approval. The user may provide a custom date range instead.

### Step 2: Fetch and summarize

After approval, run these `gh` commands to gather data:

```bash
gh pr list --state merged --search "merged:>=YYYY-MM-DD" --json title,body,number,mergedAt --limit 50
gh log --since="YYYY-MM-DD" --oneline
```

If the repo uses a monorepo or has multiple relevant repos, ask the user which repos to include.

Produce the digest following the output format below.

## Output Format

Output the digest directly in the terminal as markdown text in Korean.

### Structure

```
## 주간 작업 요약 ({start_date} ~ {end_date})

{theme_title_1}
- {meaning-unit summary line}
- {meaning-unit summary line}

{theme_title_2}
- {meaning-unit summary line}
```

### Summarization Rules

1. **Group by meaning, not by PR** — Cluster related PRs/commits into thematic units (e.g. "에이전트 아키텍처 재설계", "보안 강화")
2. **Leader-level granularity** — Assume the audience has high-level engineering knowledge but does not need implementation details. Focus on *what changed and why it matters*, not filenames, line counts, or internal APIs.
3. **Concise** — Each theme gets 1-3 bullet points max. Each bullet is one sentence with an arrow (→) connecting the change to its impact.
4. **No PR numbers, no file counts, no line counts** in the summary body.
5. **Korean output** — Always write the digest in Korean. Technical terms (e.g. middleware, caching) can remain in English.

### Good Example

```
에이전트 프롬프트 아키텍처 전면 재설계
- 미들웨어 패턴으로 시스템 프롬프트 조립 구조 변경 → 컨텍스트 주입이 모듈 단위로 독립, 조합 가능해짐
- session/run 라이프사이클 분리로 프롬프트 캐싱 최적화

프롬프트 엔지니어링 실험 환경 구축
- 프롬프트를 버전별 프로필로 관리하는 구조 설계 (md 파일 폴더별 버저닝, 상속/오버라이드)
- Streamlit 기반 에디터 개발 → 비개발자도 프롬프트 수정/저장/반영 가능
```

### Bad Example (too detailed — avoid this)

```
에이전트 미들웨어 아키텍처 리팩토링 완료 (PR #14, #16)
미들웨어 기반 컨텍스트 주입 구조 도입 (DatasetContext, Memory, Skills, UserProfile 각각 독립 미들웨어로 분리)
session/run 라이프사이클 분리 → 세션 단위 초기화와 run 단위 프롬프트 조립을 명확히 구분
SystemPromptComposer로 프롬프트 조립 로직 통합
프롬프트 캐싱 개선 및 성능 측정 완료 (미들웨어 오버헤드 총 응답 시간 대비 ~0.1%)
FilePreprocessingService 추가로 데이터셋 준비 상태를 에이전트가 인지하도록 구현
```

This is too granular — includes PR numbers, internal class names, and percentage metrics that don't belong in a leadership sync.
