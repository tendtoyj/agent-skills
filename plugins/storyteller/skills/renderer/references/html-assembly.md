# HTML 조립 가이드 (템플릿 치환 방식)

## 목차

1. [템플릿 파일 위치](#템플릿-파일-위치)
2. [Placeholder 목록](#placeholder-목록)
3. [조립 절차](#조립-절차)
4. [render.html 최종 구조](#renderhtml-최종-구조)
---

## 템플릿 파일 위치

| 템플릿 | 파일 | 포함 카드 타입 |
|--------|------|---------------|
| 템플릿 A (Full Image) | `assets/template-a.html` | tpl-a-cover, tpl-a-content |
| 템플릿 B (Part Image) | `assets/template-b.html` | tpl-b-cover, tpl-b-content |

- 선택된 템플릿 파일 하나에서 표지(cover) + 내용(content) 블록을 모두 추출

---

## Placeholder 목록

템플릿 HTML 내 `{{placeholder}}` 형식. 모든 placeholder는 치환 필수.

### 공통

| Placeholder | 설명 | 치환 값 |
|-------------|------|---------|
| `{{card-id}}` | 카드 고유 ID | `card-01`, `card-02`, ... (zero-padded) |
| `{{brand}}` | 브랜드명 | planner 설정값 (기본: `AI STORYTELLER`) |
| `{{image}}` | 이미지 경로 | 상대 경로 (예: `images/cover.png`) |

### tpl-a-cover (템플릿 A 표지)

| Placeholder | 설명 |
|-------------|------|
| `{{top-label}}` | 카테고리/훅 텍스트 |
| `{{title}}` | 메인 타이틀 (`<br>` 줄바꿈 포함) |
| `{{subtitle}}` | 서브타이틀 |
| `{{brand}}` | 브랜드명 |
| `{{image}}` | 풀 이미지 배경 (background-image) |

### tpl-a-content (템플릿 A 내용)

| Placeholder | 설명 |
|-------------|------|
| `{{title}}` | 타이틀 |
| `{{body-text}}` | 본문 텍스트 (`<br>` 줄바꿈 포함) |
| `{{brand}}` | 브랜드명 |
| `{{image}}` | 풀 이미지 배경 (background-image) |

### tpl-b-cover (템플릿 B 표지)

| Placeholder | 설명 |
|-------------|------|
| `{{title}}` | 타이틀 (`<br>` 줄바꿈 포함) |
| `{{subtitle}}` | 서브타이틀 |
| `{{brand}}` | top-label 위치에 브랜드명으로 사용 |
| `{{image}}` | 이미지 영역 배경 (.image-area에 주입) |

### tpl-b-content (템플릿 B 내용)

| Placeholder | 설명 |
|-------------|------|
| `{{title}}` | 타이틀 |
| `{{body-text}}` | 본문 텍스트 (`<br>` 줄바꿈 포함) |
| `{{brand}}` | 브랜드명 |
| `{{image}}` | 상단 이미지 (.image-area에 주입) |

---

## 조립 절차

### 1. 템플릿에서 CSS 추출

선택된 템플릿 파일의 `<style>` 블록 전체를 추출한다.

공통 리셋 CSS (`*`, `body`)는 한 번만 포함:

```css
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: 'Pretendard', sans-serif;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 40px;
}
```

**주의**: body의 `flex-wrap: wrap` → `flex-direction: column` + `align-items: center`로 변경. 카드가 세로로 나열되어야 개별 스크린샷이 정확하다.

### 2. 템플릿에서 카드 HTML 블록 추출

각 카드 타입의 HTML 블록을 추출한다. 블록 범위는 HTML 주석으로 식별:

**템플릿 A:**
- `<!-- tpl-a-cover: -->` ~ 다음 `<!-- tpl-a-content: -->` 전까지
- `<!-- tpl-a-content: -->` ~ `</body>` 전까지

**템플릿 B:**
- `<!-- tpl-b-cover: -->` ~ 다음 `<!-- tpl-b-content: -->` 전까지
- `<!-- tpl-b-content: -->` ~ `</body>` 전까지

### 3. 카드별 placeholder 치환

각 카드마다:
1. 해당 타입의 HTML 블록을 복제
2. `{{placeholder}}`를 planner 출력 값으로 치환
3. `{{card-id}}`를 `card-01`, `card-02`, ... 순번으로 치환
4. `{{image}}`를 이미지 상대 경로로 치환

이미지 경로 규칙:
- 표지: `images/cover.png`
- 내용 카드: `images/card-02.png`, `images/card-03.png`, ...

### 4. render.html 조립

추출한 CSS + 치환된 카드 블록들을 합쳐 단일 HTML 파일로 생성.

---

## render.html 최종 구조

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Pretendard', sans-serif;
      background-color: #f0f0f0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 40px;
      padding: 40px;
    }
    /* 선택된 템플릿 CSS */
    /* ... template-a.html 또는 template-b.html에서 추출 ... */
  </style>
</head>
<body>
  <!-- 치환 완료된 카드들이 순서대로 배치 -->
  <div class="tpl-a-cover" id="card-01" style="background-image: url('images/cover.png')">
    ...
  </div>
  <div class="tpl-a-content" id="card-02" style="background-image: url('images/card-02.png')">
    ...
  </div>
  <!-- ...반복... -->
</body>
</html>
```

핵심:
- 폰트는 `<link>` 태그로 로드 (`@import`보다 Playwright에서 안정적)
- body는 `flex-direction: column` (카드 세로 나열)
- 각 카드에 `id="card-NN"` 부여 (Playwright 셀렉터용)

