# AI 요약본 시각화 가이드라인 (HTML/CSS 인터랙티브 리포트용) (visualization.txt)

## 1. 목적 (Purpose)

본 가이드라인은 AI가 생성한 종합 요약 보고서의 내용을 효과적으로 전달하기 위해, **상호작용(Interactive) 기능을 포함한 구조화된 HTML/CSS 리포트를 Canvas를 활용하여 채팅 내에서 직접 렌더링**하는 것을 목적으로 한다. ... 최종 결과물은 **Canvas에서 바로 확인 가능한 완성된 단일 HTML 콘텐츠**로 제공한다.

## 2. 시각화 대상 (Target Content)

시각화는 AI가 생성한 요약 보고서 내용 또는 원본 보고서의 데이터 중 다음 항목들을 우선적으로 고려한다. 사용자의 특정 요청이 있다면 해당 내용을 최우선으로 한다.

* **핵심 성과 지표 (KPIs):** 기간별 추이, 목표 대비 실적, 전년/전분기 대비 비교 등. (예: 카드 형태 요약 + 상세 차트)
* **주요 재무 데이터:** 매출, 비용, 이익 등의 변화 및 구성. (예: 선/막대 차트, 표)
* **시장/고객 데이터:** 시장 점유율, 고객 세그먼트별 지표, 만족도 추이 등. (예: 막대/파이 차트, 표)
* **운영 효율성 지표:** 전환율, 처리 시간, 비용 효율성 등. (예: 선 차트, 표)
* **주요 이슈 및 리스크:** 문제/리스크 목록, 심각도/빈도, 해결 상태 등. (예: 카드 목록, 표)
* **프로세스 또는 구조:** 업무 흐름, 의사결정 트리 등. (예: Mermaid.js 활용 다이어그램)

## 3. 시각화 원칙 (Principles)

HTML/CSS 리포트 생성 시 다음 원칙을 준수해야 한다.

* **경영진 중심 디자인 (Executive-Focused Design):** 명확하고 간결한 레이아웃을 사용하며, 가장 중요한 정보(KPI 요약, 핵심 이슈 등)가 시각적으로 먼저 인지되도록 구성한다. **'깔끔하고 차분한 (Clean & Calm)' 디자인 스타일**을 적용한다.
* **데이터 기반 시각화 (Data-Driven Visualization):** 모든 시각화 요소는 정확한 원본 데이터에 기반하며, 숫자 정보를 명확하고 이해하기 쉽게 전달하는 데 중점을 둔다.
* **적절한 시각화 유형 선택 (Appropriate Visualization Choice):** 데이터의 성격(비교, 추이, 구성, 관계 등)과 전달 메시지에 가장 적합한 시각화 유형(표, 막대 차트, 선 차트, 파이 차트, 카드 요약, 흐름도 등)을 선택하여 적용한다.
* **컴포넌트 기반 구조 (Component Structure):** 관련 정보를 논리적 단위(예: **카드**, 섹션)로 묶어 표현한다. HTML `<div>` 태그와 **의미 있는 CSS 클래스** (예: `.kpi-card`, `.issue-list`, `.chart-section`)를 적극 활용하여 구조화한다.
* **완성된 스타일링 (Complete Styling):** 모든 HTML 요소에 대해 **실제 동작하는 CSS 스타일을 `<style>` 블록에 완전히 구현**한다. 주석 처리된 제안이 아닌, 브라우저에서 바로 렌더링되는 완성된 스타일을 제공한다.
* **완성된 상호작용 (Complete Interactivity):** 탭 전환, 차트 호버 툴팁 등 **상호작용 기능이 실제로 동작하는 JavaScript 코드를 완전히 구현**하여 포함한다.
* **신뢰성 및 맥락 (Reliability & Context):** 데이터 출처, 기준 시점 등을 명시하고, 필요시 간단한 해석이나 관련 통계 정보를 함께 제공한다.

## 4. 시각화 구현 방법 (HTML/CSS & Data)

다음 방법들을 활용하여 **완성된 인터랙티브 HTML 리포트를 직접 생성**한다.

1.  **전체 HTML 구조 (Overall HTML Structure):**
    * 결과물은 **완전한 HTML5 문서(`<!DOCTYPE html>...`)** 로 제공한다.
    * `<body>` 내부는 주요 섹션(예: `<header>`, `<nav id="tabs">`, `<main id="tab-content">`, `<footer>`)으로 구조화한다.
    * **탭 구조:** `<nav>`에 탭 버튼(예: `<button class="tab-link active" data-tab="summary">핵심 요약</button>`) 리스트를, `<main>` 내부에 각 탭에 해당하는 콘텐츠를 담는 `<div>`(예: `<div id="summary" class="tab-panel active">...</div>`)를 포함한다.
    * **탭 구성은 `criteria.txt`의 섹션 구조를 기반으로** 한다. (예: 핵심 요약 탭, 업무 현황 및 성과 탭, 주요 이슈 탭, 부서 간 연관성 탭, 경영진 결정사항 탭, 핵심 과제 및 리스크 탭)

2.  **CSS 스타일링 (CSS Styling):**
    * **`<style>` 블록에 완성된 CSS를 직접 작성**하여, 파일을 브라우저에서 열었을 때 즉시 디자인이 적용되도록 한다.
    * 경영진 대상 '깔끔하고 차분한' 디자인을 구현한다: 절제된 색상 팔레트(남색/회색 계열 기본, 강조색 최소 사용), 충분한 여백, 명확한 타이포그래피 위계.
    * 한국어 가독성을 위해 `'Noto Sans KR'` 등 적절한 웹폰트를 Google Fonts CDN으로 로드한다.
    * **반응형 레이아웃:** 다양한 화면 크기에서 적절히 표시되도록 미디어 쿼리를 포함한다.
    * 주요 클래스 명명 예시: `.executive-report`, `.report-card`, `.kpi-value`, `.kpi-change.positive`, `.kpi-change.negative`, `.chart-container`, `.tab-panel`, `.tab-link.active` 등.

3.  **표 (Tables):**
    * 표준 HTML `<table>` 태그를 사용하며, 스타일링 클래스(예: `class="executive-table"`)를 적용한다.
    * **호버 효과, 줄무늬 배경(striped rows) 등 가독성 향상 스타일을 CSS에서 직접 구현**한다.
    * 중요 수치는 볼드 처리하거나 색상으로 강조한다.

4.  **카드 (Cards):**
    * 핵심 요약, 주요 KPI, 개별 이슈 등을 시각적으로 구분되는 **카드 형태**로 표현한다.
    * `<div class="card executive-card kpi-card">` 와 같은 구조를 사용한다.
    * 카드 내부는 `<div class="card-header">`, `<div class="card-body">`, `<div class="card-footer">` 등으로 구조화한다.
    * **KPI 카드에는 전월/전기 대비 증감을 화살표 아이콘(▲/▼)과 색상(녹색/적색)으로 표시**한다.
    * *예시 (KPI 카드):*
      ```html
      <div class="card executive-card kpi-card">
        <div class="card-header">주요 KPI: 매출액</div>
        <div class="card-body">
          <span class="kpi-value">135 억원</span>
          <span class="kpi-change positive">▲ +12.5% vs P.Q.</span>
        </div>
        <div class="card-footer">목표 달성률: 105%</div>
      </div>
      ```

5.  **차트/그래프 (Charts/Graphs):**
    * **Chart.js를 CDN으로 로드**하고, 보고서 데이터를 기반으로 **실제 동작하는 차트를 JavaScript로 완전히 구현**한다.
    * 차트 영역: `<canvas id="[차트ID]"></canvas>`를 감싸는 `<div class="chart-container">` 사용.
    * 데이터에 가장 적합한 차트 유형을 적용한다:
        * **추이 데이터** → Line Chart (예: 월별 매출 추이)
        * **비교 데이터** → Bar Chart (예: 부서별 성과 비교, 목표 대비 실적)
        * **구성비 데이터** → Doughnut/Pie Chart (예: 매출 구성비, 비용 구조)
        * **복합 데이터** → Mixed Chart (예: 매출(Bar) + 성장률(Line) 동시 표시)
    * **Chart.js 옵션:** 툴팁 활성화, 범례(legend) 표시, 축 레이블 한국어 표기, 반응형(`responsive: true`) 설정을 기본 적용한다.

6.  **다이어그램/흐름도 (Diagrams/Flowcharts):**
    * **Mermaid.js를 CDN으로 로드**하고, **Mermaid 구문 코드를 작성하여 실제 렌더링되는 다이어그램을 포함**한다.
    * `<div class="mermaid"> ... Mermaid 코드 ... </div>` 구조를 사용한다.
    * 프로세스 흐름, 부서 간 관계도, 의사결정 트리 등에 활용한다.

7.  **JavaScript (Interactivity):**
    * **탭 전환:** 탭 버튼 클릭 시 해당 패널을 활성화/비활성화하는 **완전히 동작하는 JavaScript 코드를 구현**한다.
    * **차트 생성:** Chart.js를 사용하여 데이터를 차트로 렌더링하는 코드를 구현한다.
    * **Mermaid 초기화:** 페이지 로드 시 Mermaid 다이어그램이 자동 렌더링되도록 초기화 코드를 포함한다.
    * 모든 JavaScript는 `<script>` 블록에 포함하여 단일 HTML 파일 내에서 완결되도록 한다.

## 5. 결과물 형식 (Output Format)

* 최종 결과물은 **완성된 단일 HTML 콘텐츠**로, Canvas에서 **추가 작업 없이 즉시 렌더링·동작**해야 한다.
* 사용자 요청 시 별도 .html 파일로도 다운로드 가능하게 제공할 수 있다.

* `<head>`에 포함할 항목:
    * UTF-8 인코딩, viewport 설정
    * Google Fonts CDN 링크 (한국어 폰트)
    * Chart.js CDN 링크
    * Mermaid.js CDN 링크 (다이어그램 포함 시)
    * **완성된 CSS가 포함된 `<style>` 블록**
* `<body>` 하단에 포함할 항목:
    * **완성된 JavaScript가 포함된 `<script>` 블록** (탭 전환, 차트 생성, Mermaid 초기화 등)
* 외부 의존성은 CDN 링크만 사용하여 최소화한다.

## 6. 상호작용 (Interaction)

* 시각화 리포트 생성 전, 사용자에게 **선호하는 차트 라이브러리(Chart.js, Plotly 등)**나 **구체적인 시각화 요구사항**(예: 특정 데이터 강조, 탭 순서, 색상 테마)이 있는지 간단히 확인할 수 있다.
* 생성된 리포트는 **Canvas를 통해 채팅 내에서 바로 확인 가능한 형태로 제공**하며, 필요 시 별도 HTML 파일 다운로드도 가능함을 안내한다.
* 복잡한 데이터나 특수한 시각화 요구가 있을 경우, 사용자와 협의하여 구현 범위를 조정할 수 있다.

---
