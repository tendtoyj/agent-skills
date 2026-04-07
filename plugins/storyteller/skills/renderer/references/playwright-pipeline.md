# Playwright MCP 렌더링 파이프라인

## 목차

1. [렌더링 순서](#렌더링-순서)
2. [브라우저 설정](#브라우저-설정)
3. [로딩 대기 전략](#로딩-대기-전략)
4. [개별 카드 스크린샷](#개별-카드-스크린샷)
5. [에러 처리](#에러-처리)

---

## 렌더링 순서

> **`file://` 프로토콜은 Playwright MCP에서 차단된다. 반드시 로컬 HTTP 서버를 통해 접근한다.**

```
1. 로컬 서버 기동 → render.html 디렉토리에서 python3 -m http.server 8765 (백그라운드)
2. browser_navigate → http://localhost:8765/render.html
3. browser_resize → 1080×1350
4. 폰트/이미지 로딩 대기 (browser_evaluate)
5. 개별 카드 스크린샷 (card-01 ~ card-NN)
6. browser_close
7. 로컬 서버 종료 → kill %1 또는 해당 PID로 종료
```

---

## 브라우저 설정

```
browser_resize: width=1080, height=1350
```

- 카드 원본 크기 그대로 (스케일링 불필요)
- body에 카드가 세로 배치되므로 페이지 높이는 뷰포트보다 클 수 있음
- 개별 카드는 element selector로 캡처하므로 뷰포트 높이는 무관

---

## 로딩 대기 전략

Pretendard CDN 폰트 + 로컬 이미지 로딩을 확실히 대기.

### 폰트 로딩 확인

```js
await document.fonts.ready;
'fonts loaded';
```

### 추가 안정화 대기

```js
await new Promise(r => setTimeout(r, 2000));
'ready';
```

### 이미지 로딩 확인

```js
const bgs = document.querySelectorAll('[style*="background-image"]');
const results = Array.from(bgs).map(el => {
  const url = getComputedStyle(el).backgroundImage;
  return { id: el.id || el.className, loaded: url && url !== 'none' };
});
JSON.stringify(results);
```

---

## 개별 카드 스크린샷

`browser_take_screenshot`으로 각 카드를 개별 캡처:

```
#card-01 → card-01.png (표지)
#card-02 → card-02.png (내용 1)
#card-03 → card-03.png (내용 2)
...
```

- `selector` 파라미터: `#card-01` 등
- 저장 후 다음 카드로 진행

대안 — selector 미지원 시:

```js
const el = document.querySelector('#card-01');
const rect = el.getBoundingClientRect();
JSON.stringify({ x: rect.x, y: rect.y, width: rect.width, height: rect.height });
```

바운딩 박스로 clip 옵션 사용.

---

## 에러 처리

| 상황 | 대응 |
|------|------|
| 폰트 로딩 타임아웃 | sans-serif fallback으로 그대로 진행, 유저에게 경고 |
| 이미지 파일 누락 | CSS 기본 배경색 #d5d5d5 표시, 누락 목록 유저에게 알림 |
| 스크린샷 실패 | 1회 재시도, 실패 시 유저에게 보고 + render.html 경로 안내 |
| 렌더링 확인 | `browser_snapshot`으로 현재 페이지 상태 점검 가능 |
