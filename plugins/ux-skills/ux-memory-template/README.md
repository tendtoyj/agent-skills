# UX Memory — Template

## What This Is
UX Memory는 모든 UX Skills의 공유 컨텍스트 레이어입니다. 모든 스킬은 **사용자 프로젝트 루트**의 `ux-memory/` 디렉토리를 확인하고, 축적된 프로젝트 맥락에 맞춰 동작합니다.

이 폴더는 **빈 템플릿**을 포함합니다. 수동으로 복사할 필요 없이, 스킬이 자동으로 생성합니다.

## How It Works

```
your-project/                ← 사용자 작업 디렉토리
├── ux-memory/               ← context-setup이 자동 생성
│   ├── project-context.md   ← context-setup이 작성
│   └── activity-log.md      ← 각 스킬이 실행 후 기록
│
├── ux-output/               ← 각 스킬의 산출물
│   ├── {feature-name}/      ← 기능별 산출물 폴더
│   │   ├── pain-points.md   ← brainstorming-guide
│   │   ├── ux-values.md     ← brainstorming-guide
│   │   ├── ideas.md         ← brainstorming-guide
│   │   ├── persona.md       ← persona-maker
│   │   ├── user-flows.md    ← userflow-generator
│   │   └── screen-plan.md   ← screen-planner
│   │
│   └── research/            ← 리서치 관련 산출물
│       └── {research-name}/
│           ├── research-plan.md    ← ur-planner
│           ├── survey.md           ← survey-maker
│           └── interview-guide.md  ← interview-helper
└── ...
```

## Quickstart

1. 프로젝트를 Claude Code에서 열기
2. `/ux-skills:context-setup` 실행 — 프로젝트 맥락 파악 + `ux-memory/` 생성
3. `/ux-skills:ux-orchestrator` 실행 — 현재 상태 진단 + 다음 스킬 추천
4. 추천된 스킬 실행 — 산출물이 `ux-output/`에 저장되고, 실행 이력이 자동 기록됨
5. 다시 오케스트레이터 실행 — 진행 상황 확인 + 다음 단계 안내

## How Skills Use UX Memory

### 컨텍스트 로드 (모든 스킬 공통)
- **시작 시**: `ux-memory/project-context.md`를 읽어 프로젝트 맥락 로드
- **시작 시**: 현재 작업 대상의 기존 산출물 확인

### 산출물 저장 + 이력 기록
- **brainstorming-guide**: `ux-output/{feature}/` 폴더 생성 + pain-points/ux-values/ideas 저장
- **persona-maker**: `ux-output/{feature}/persona.md` 저장
- **userflow-generator**: `ux-output/{feature}/user-flows.md` 저장
- **screen-planner**: `ux-output/{feature}/screen-plan.md` 저장
- **ur-planner**: `ux-output/research/{research-name}/research-plan.md` 저장
- **survey-maker**: `ux-output/research/{research-name}/survey.md` 저장
- **interview-helper**: `ux-output/research/{research-name}/interview-guide.md` 저장
- **종료 시**: `ux-memory/activity-log.md`에 실행 기록 추가

### 컨텍스트 관리
- **context-setup**: `project-context.md` 작성 및 갱신
- **ux-orchestrator**: 전체 메모리 + 산출물 스캔 → 상태 진단 → 라우팅
