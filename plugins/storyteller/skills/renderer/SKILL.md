---
name: storyteller-renderer
description: "승인된 카드뉴스 기획(planner 출력)과 생성된 이미지(image-maker 출력)를 받아 템플릿의 placeholder를 치환하여 HTML을 조립하고, Playwright MCP로 1080×1350 PNG 카드 이미지를 렌더링하는 스킬. 사용 시점: (1) planner 승인 + image-maker 이미지 생성이 완료된 후 렌더링 단계를 실행할 때, (2) storyteller render, 카드뉴스 렌더링, HTML 조립 등의 요청이 있을 때, (3) 기존 render.html을 수정하여 재렌더링할 때."
---

# Storyteller Renderer

템플릿 HTML의 `{{placeholder}}`를 치환하여 카드뉴스 HTML을 조립하고, Playwright MCP로 1080×1350 PNG를 렌더링한다.

## 워크플로우

### Step 1. 입력 확인

필수 입력:
- 승인된 카드 구성 (planner 출력: 템플릿 타입, 카드별 카피 텍스트)
- 생성된 이미지 파일 경로 (image-maker 출력: 카드별 이미지 매핑)
- 브랜드명, 주제명, 날짜

출력 디렉토리 결정: `storyteller/[주제]-[YYYY-MM-DD]/`

### Step 2. HTML 조립 (템플릿 치환 방식)

템플릿 파일에서 카드 HTML 블록을 추출하고, `{{placeholder}}`를 실제 값으로 치환하여 `render.html`을 생성한다.

**절차:**

1. 선택된 템플릿에 따라 템플릿 파일 읽기
   - 템플릿 A → `assets/template-a.html`
   - 템플릿 B → `assets/template-b.html`
2. planner 출력의 `Template`과 카드 위치로 HTML 블록 결정:
   | planner 출력 | 표지 (Card 1) | 내용 (Card 2+) |
   |-------------|---------------|----------------|
   | Template: A | tpl-a-cover 블록 | tpl-a-content 블록 |
   | Template: B | tpl-b-cover 블록 | tpl-b-content 블록 |
3. 템플릿에서 CSS(`<style>` 블록)와 카드 HTML 블록을 추출
4. 각 카드마다 해당 타입의 HTML 블록을 복제하고 placeholder 치환:
   - `{{card-id}}` → `card-01`, `card-02`, ...
   - `{{title}}` → planner 카피
   - `{{subtitle}}`, `{{body-text}}`, `{{top-label}}` → planner 카피
   - `{{brand}}` → 브랜드명
   - `{{image}}` → 이미지 상대 경로 (`images/cover.png` 등)
5. 치환된 카드 블록들을 하나의 HTML로 조립 → `render.html` 저장

placeholder 목록 및 카드 타입별 상세는 [references/html-assembly.md](references/html-assembly.md) 참조.

### Step 3. Playwright로 개별 카드 렌더링

Playwright MCP 도구를 사용하여 렌더링:

1. `render.html`이 있는 디렉토리에서 로컬 HTTP 서버 기동:
   - `python3 -m http.server 8765` (백그라운드 실행)
   - **`file://` 프로토콜은 Playwright MCP에서 차단되므로 반드시 로컬 서버를 사용한다**
2. `browser_navigate`로 `http://localhost:8765/render.html` 열기
3. 폰트/이미지 로딩 대기 — `browser_evaluate`로 `document.fonts.ready` 확인 후 2초 추가 대기
4. `browser_take_screenshot`으로 각 카드를 개별 캡처:
   - `selector`: `#card-01`, `#card-02`, ...
   - 파일명: `card-01.png`, `card-02.png`, ...
   - 순서: 표지(01) → 내용 카드들(02~)
5. 렌더링 완료 후 로컬 서버 프로세스 종료

상세 파이프라인은 [references/playwright-pipeline.md](references/playwright-pipeline.md) 참조.

### Step 4. 완료 보고

- 생성된 파일 목록 출력
- 파일 저장 경로 안내

## 출력 파일 구조

```
storyteller/[주제]-[YYYY-MM-DD]/
├── card-01.png          ← 표지
├── card-02.png          ← 내용 1
├── ...
├── card-NN.png          ← 마지막 내용 카드
├── images/              ← image-maker가 생성한 원본 이미지
└── render.html          ← 조립된 HTML (디버깅/재렌더링용)
```

## 에러 처리

| 상황 | 대응 |
|------|------|
| 폰트 로딩 실패 | fallback 폰트(sans-serif) 적용, 유저에게 경고 |
| 이미지 파일 누락 | placeholder 배경(#d5d5d5) 적용, 유저에게 알림 |
| Playwright 스크린샷 실패 | 재시도 1회, 실패 시 유저에게 보고 |
| HTML 렌더링 깨짐 | render.html 저장되어 있으므로 유저가 직접 확인 가능 |

## 하지 않는 것

- 카피 작성/수정 (→ planner)
- 이미지 생성 (→ image-maker)
- 인스타그램 업로드 (범위 밖)

## 참조 파일

- [references/html-assembly.md](references/html-assembly.md) — 템플릿 파일 위치, placeholder 목록, 치환 규칙, render.html 조립 방법
- [references/playwright-pipeline.md](references/playwright-pipeline.md) — Playwright MCP 렌더링 파이프라인, 뷰포트 설정, 로딩 대기 전략
