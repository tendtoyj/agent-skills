# Card Type Components — 가변 카드 조립 가이드

> **원본 템플릿**: `references/card-news-template.html` (이 디렉토리에 포함됨)
> **원본 가이드**: `references/TEMPLATE-GUIDE.md` (이 디렉토리에 포함됨)
>
> 이 문서는 원본 HTML을 기반으로 2~10장 가변 카드를 조립하는 방법만 다룹니다.
> HTML/CSS 구조, placeholder, 글자수 제한은 모두 원본 파일을 참조하세요.

---

## 원본 템플릿 구조

`card-news-template.html`은 4장 고정 구조:

```
Card 1 — Cover           (.card > .card__inner.card__inner--between)
Card 2 — Content-Image    (.card > .card__inner)
Card 3 — Content-Features (.card > .card__inner)
Card 4 — Outro            (.card > .card__inner.card__inner--between)
```

각 카드는 `<div class="card">...</div>` 블록으로 독립적. CSS 접두사로 구분:
- Cover: `.cv-*`, `.hdr*`
- Content-Image: `.ci-*`, `.bhdr*`
- Content-Features: `.cf-*`, `.fcard*`, `.bhdr*`
- Outro: `.ou-*`, `.hdr*`

---

## 가변 카드 조립 방법

### 기본 원리

1. **원본 HTML 파일을 읽는다**
2. **`<body>` 안의 카드 블록들을 식별한다** — 각 `<div class="card">...</div>` 블록
3. **필요한 카드 블록만 남기고, 필요하면 중간 카드를 복제한다**
4. **placeholder를 치환한다**
5. **새 HTML 파일로 저장한다**

### 카드 블록 식별

원본에서 각 카드는 HTML 주석으로 구분됨:
```html
<!-- CARD 1 — COVER -->
<div class="label">1 / 4 — Cover</div>
<div class="card">...</div>

<!-- CARD 2 — CONTENT (IMAGE) -->
<div class="label">2 / 4 — Content · Image</div>
<div class="card">...</div>

<!-- CARD 3 — CONTENT (FEATURES) -->
<div class="label">3 / 4 — Content · Features</div>
<div class="card">...</div>

<!-- CARD 4 — OUTRO -->
<div class="label">4 / 4 — Outro</div>
<div class="card">...</div>
```

### N장 조립 규칙

| 전체 카드 수 | 구성 |
|---|---|
| 2장 | Cover + Outro |
| 3장 | Cover + 중간 1장 + Outro |
| 4장 (기본) | Cover + 중간 2장 + Outro (= 원본 그대로) |
| 5~10장 | Cover + 중간 3~8장 + Outro |

**중간 카드 추가 방법:**
- Content-Image 블록(Card 2)을 복제하여 중간에 삽입
- Content-Features 블록(Card 3)을 복제하여 중간에 삽입
- 두 타입을 자유롭게 조합 가능

### 복제 시 변경 사항

1. **`<div class="label">` 텍스트** — `N / TOTAL — Type` 형태로 업데이트
2. **`data-card-index` 추가** — Playwright 렌더링용 (원본에 없으므로 추가):
   ```html
   <div class="card" data-card-index="N">
   ```
3. **placeholder 값** — 각 카드별 고유 카피로 치환
4. **Content-Image 이미지**: 원본은 `<img>` 태그가 주석 처리됨 → 주석 해제하고 src 교체

### Content-Image 이미지 주석 해제

원본에서 이미지가 주석 처리되어 있으므로:
```html
<!-- 원본 -->
<div class="ci-image" data-dynamic="image">
  <!-- <img src="{{image-url}}" alt="{{image-alt}}"> -->
</div>

<!-- 변경 후 -->
<div class="ci-image">
  <img src="./img-card-N.png" alt="실제 alt 텍스트">
</div>
```

---

## Color Override 적용

series-config.md에 color override가 있으면, HTML `<style>` 블록의 `:root` 변수를 교체:

```css
/* 원본 */
:root {
  --highlight: #fff3a0;
  --feature-bg: #FFFBDD;
  ...
}

/* override 적용 */
:root {
  --highlight: [series-config override 값];
  --feature-bg: [series-config override 값];
  ...
}
```

## Brand Name 교체

원본의 `TODAY&rsquo;S PICKS`를 series-config.md의 brand name으로 교체:
```html
<!-- 원본 -->
<span class="hdr__brand">TODAY&rsquo;S PICKS</span>

<!-- 교체 -->
<span class="hdr__brand">[series-config brand name]</span>
```

---

## dev label 처리

렌더링 시 `.label` 요소는 Playwright에서 `display:none`으로 숨김 (playwright-pipeline.md 참조).
조립 단계에서는 유지해도 무방.

---

## 원본 참조 파일

| 파일 | 용도 |
|------|------|
| `references/card-news-template.html` | HTML/CSS 원본 — **이 파일이 source of truth** |
| `references/TEMPLATE-GUIDE.md` | Placeholder 목록, 글자수 제한, 사용 팁 |
