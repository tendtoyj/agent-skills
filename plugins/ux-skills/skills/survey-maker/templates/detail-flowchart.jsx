/**
 * 전체 문항 상세 Flow Chart 템플릿
 *
 * 용도: Step 4(설문문항 검토) 단계에서 사용자가 "1개의 문항을 1개의 네모로 표현"하는
 *       상세 시각화를 요청했을 때 사용한다.
 *
 * outline-flowchart.jsx와의 차이:
 *   - outline은 섹션 단위 흐름을 보여준다 (Step 2~3용).
 *   - detail은 개별 문항 단위까지 보여주며, 노드 클릭 시
 *     오른쪽 패널에 해당 문항의 질문과 보기를 표시한다 (Step 4용).
 *
 * 사용법:
 *   1. initialNodes에 각 문항을 노드로 추가한다.
 *      - 분기별로 id prefix를 달리하면 관리가 편하다 (A1, A2... / B1, B2...).
 *      - 분기 노드는 x 좌표로 좌우 분리, 공통 노드는 x=0 중앙 배치.
 *   2. initialEdges에 분기 조건 label을 포함한 연결을 추가한다.
 *   3. nodeDetails 객체에 각 노드의 title, question, options를 정의한다.
 *      - options가 빈 배열이면 안내 멘트 등 선택지 없는 노드로 처리된다.
 *      - 주관식 문항은 options: ['주관식 입력']으로 표기한다.
 */
import React, { useState, useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

export default function SurveyDetailFlowchart() {
  // ── 노드 정의 ──────────────────────────────────────
  const initialNodes = [
    { id: 'start', position: { x: 0, y: 0 }, data: { label: '1. 시작 안내' } },
    { id: 'screening', position: { x: 0, y: 100 }, data: { label: '2. 스크리닝 문항' } },
    // ── Branch A ──
    { id: 'A1', position: { x: -300, y: 220 }, data: { label: '3A-1. 첫 인상' } },
    { id: 'A2', position: { x: -300, y: 300 }, data: { label: '3A-2. 미진입 사유' } },
    { id: 'A3', position: { x: -300, y: 380 }, data: { label: '3A-3. 인지 경로' } },
    { id: 'A4', position: { x: -300, y: 460 }, data: { label: '3A-4. 유용 대상' } },
    { id: 'A5', position: { x: -300, y: 540 }, data: { label: '3A-5. 향후 사용 가능성' } },
    // ── Branch B ──
    { id: 'B1', position: { x: 0, y: 220 }, data: { label: '3B-1. 인지 실패 사유' } },
    { id: 'B2', position: { x: 0, y: 300 }, data: { label: '3B-2. 설명 개선 시 반응' } },
    { id: 'B3', position: { x: 0, y: 380 }, data: { label: '3B-3. 기능명 인상' } },
    // ── Branch C ──
    { id: 'C1', position: { x: 300, y: 220 }, data: { label: '3C-1. 진입 동기' } },
    { id: 'C2', position: { x: 300, y: 300 }, data: { label: '3C-2. 기능 만족도' } },
    { id: 'C3', position: { x: 300, y: 380 }, data: { label: '3C-3. 추천 적합도' } },
    // ── 공통 · 인구통계 · 개인정보 ──
    { id: 'common1', position: { x: 0, y: 640 }, data: { label: '4. 흥미·유용성 평가' } },
    { id: 'demo1', position: { x: 0, y: 740 }, data: { label: '5-1. 성별' } },
    { id: 'demo2', position: { x: 0, y: 820 }, data: { label: '5-2. 연령대' } },
    { id: 'demo3', position: { x: 0, y: 900 }, data: { label: '5-3. 서비스 사용 빈도' } },
    { id: 'personal1', position: { x: 0, y: 1000 }, data: { label: '6-1. 개인정보 동의' } },
    { id: 'personal2', position: { x: 0, y: 1080 }, data: { label: '6-2. 이름/연락처 입력' } },
    { id: 'finish', position: { x: 0, y: 1160 }, data: { label: '7. 종료 멘트' } },
  ];

  // ── 엣지 정의 ──────────────────────────────────────
  const initialEdges = [
    { id: 'e1', source: 'start', target: 'screening', animated: true },
    // 스크리닝 → 3-way 분기
    { id: 'e-s-A1', source: 'screening', target: 'A1', label: '본 적 있음, 미진입' },
    { id: 'e-s-B1', source: 'screening', target: 'B1', label: '처음 봄' },
    { id: 'e-s-C1', source: 'screening', target: 'C1', label: '진입 경험 있음' },
    // Branch A 내부
    { id: 'e-A1-A2', source: 'A1', target: 'A2' },
    { id: 'e-A2-A3', source: 'A2', target: 'A3' },
    { id: 'e-A3-A4', source: 'A3', target: 'A4' },
    { id: 'e-A4-A5', source: 'A4', target: 'A5' },
    { id: 'e-A5-cm', source: 'A5', target: 'common1' },
    // Branch B 내부
    { id: 'e-B1-B2', source: 'B1', target: 'B2' },
    { id: 'e-B2-B3', source: 'B2', target: 'B3' },
    { id: 'e-B3-cm', source: 'B3', target: 'common1' },
    // Branch C 내부
    { id: 'e-C1-C2', source: 'C1', target: 'C2' },
    { id: 'e-C2-C3', source: 'C2', target: 'C3' },
    { id: 'e-C3-cm', source: 'C3', target: 'common1' },
    // 공통 → 마무리
    { id: 'e-cm-d1', source: 'common1', target: 'demo1' },
    { id: 'e-d1-d2', source: 'demo1', target: 'demo2' },
    { id: 'e-d2-d3', source: 'demo2', target: 'demo3' },
    { id: 'e-d3-p1', source: 'demo3', target: 'personal1' },
    { id: 'e-p1-p2', source: 'personal1', target: 'personal2' },
    { id: 'e-p2-fin', source: 'personal2', target: 'finish' },
  ];

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  // ── 문항 상세 정보 ──────────────────────────────────
  // 각 노드 id에 대응하는 질문과 보기를 정의한다.
  const nodeDetails = {
    start: {
      title: '1. 시작 안내',
      question: '설문에 참여해 주셔서 감사합니다. 설문은 약 N분 정도 소요됩니다.',
      options: [],
    },
    screening: {
      title: '2. 스크리닝 문항',
      question: '[서비스/기능]을 알고 계신가요?',
      options: [
        '처음 보는 것이에요',
        '본 적은 있지만 사용해보진 않았어요',
        '사용해본 적 있어요',
      ],
    },
    // ── Branch A 예시 ──
    A1: {
      title: '3A-1. 첫 인상',
      question: '해당 기능을 처음 봤을 때 어떤 인상을 받으셨나요?',
      options: ['흥미로워 보였다', '유용할 것 같았다', '무슨 기능인지 잘 몰랐다', '기타'],
    },
    A2: {
      title: '3A-2. 미진입 사유',
      question: '이 기능에 들어가지 않은 이유는 무엇인가요? (복수 응답)',
      options: ['지금 필요한 기능이 아니라서', '시간 여유가 없어서', '뭘 얻을 수 있는지 불명확해서', '기타'],
    },
    A3: {
      title: '3A-3. 인지 경로',
      question: '이 기능을 어떤 경로에서 보셨나요? (복수 응답)',
      options: ['앱 홈 화면 배너', '마이페이지', '추천 영역', '푸시 알림', '기타'],
    },
    A4: {
      title: '3A-4. 유용 대상',
      question: '이 기능이 어떤 사람에게 유용할 것 같나요?',
      options: ['주관식 입력'],
    },
    A5: {
      title: '3A-5. 향후 사용 가능성',
      question: '앞으로 이 기능을 사용할 가능성은 어느 정도인가요?',
      options: ['꼭 써볼 것 같아요', '아마도 써볼 것 같아요', '잘 모르겠어요', '아마도 안 쓸 것 같아요', '절대 안 쓸 것 같아요'],
    },
    // ── Branch B 예시 ──
    B1: {
      title: '3B-1. 인지 실패 사유',
      question: '이 기능을 본 적이 없는 이유가 무엇일까요? (복수 응답)',
      options: ['배너를 본 기억이 없어요', '디자인이 눈에 띄지 않았어요', '광고처럼 보여서 무시했어요', '기타'],
    },
    B2: {
      title: '3B-2. 설명 개선 시 반응',
      question: '설명이 더 잘 전달됐다면, 눌러봤을 것 같나요?',
      options: ['확실히 눌러봤을 거예요', '아마도 눌러봤을 것 같아요', '잘 모르겠어요', '아마도 안 눌렀을 것 같아요', '관심이 없었을 것 같아요'],
    },
    B3: {
      title: '3B-3. 기능명 인상',
      question: '기능 이름만 보고 짐작되는 내용이 있나요? (복수 응답)',
      options: ['취향 분석 기능', '기록 모아보기', '재미 테스트', '맞춤 추천', '잘 모르겠어요', '기타'],
    },
    // ── Branch C 예시 ──
    C1: {
      title: '3C-1. 진입 동기',
      question: '어떤 점이 궁금해서 눌러보셨나요? (복수 응답)',
      options: ['분석이 흥미로워서', '추천이 궁금해서', '재미있어 보여서', '그냥 눌러봄', '기타'],
    },
    C2: {
      title: '3C-2. 기능 만족도',
      question: '실제 사용 느낌은 어땠나요?',
      options: ['매우 만족', '만족', '보통', '다소 실망', '매우 실망'],
    },
    C3: {
      title: '3C-3. 추천 적합도',
      question: '추천 결과가 본인과 잘 맞았나요?',
      options: ['정말 잘 맞았어요', '꽤 잘 맞았어요', '보통이었어요', '좀 달랐어요', '잘 기억나지 않아요'],
    },
    // ── 공통 ──
    common1: {
      title: '4. 흥미·유용성 평가',
      question: '이 기능에 얼마나 흥미가 있으신가요?\n어떤 점에서 도움이 될 것 같나요? (복수 응답)',
      options: ['매우 흥미롭다', '어느 정도 흥미 있다', '잘 모르겠다', '별로 흥미 없다', '전혀 흥미 없다'],
    },
    demo1: {
      title: '5-1. 성별',
      question: '성별을 선택해 주세요.',
      options: ['남성', '여성', '선택하지 않음'],
    },
    demo2: {
      title: '5-2. 연령대',
      question: '연령대를 선택해 주세요.',
      options: ['10대 이하', '20대', '30대', '40대', '50대 이상'],
    },
    demo3: {
      title: '5-3. 서비스 사용 빈도',
      question: '해당 서비스를 얼마나 자주 이용하시나요?',
      options: ['주 4회 이상', '주 2~3회', '주 1회', '월 1~2회', '거의 사용하지 않음'],
    },
    personal1: {
      title: '6-1. 개인정보 동의',
      question: '아래 내용에 동의하시나요? (필수)\n- 수집 주체: (주)OOO\n- 목적: 경품 지급\n- 항목: 이름, 연락처\n- 보유 기간: 60일',
      options: ['동의함', '동의하지 않음'],
    },
    personal2: {
      title: '6-2. 이름/연락처 입력',
      question: '이름과 연락처를 입력해 주세요.',
      options: [],
    },
    finish: {
      title: '7. 종료 멘트',
      question: '설문이 완료되었습니다. 참여해 주셔서 감사합니다!',
      options: [],
    },
  };

  const onInit = useCallback((instance) => instance.fitView(), []);
  const onNodeClick = (_, node) => setSelectedNode(node.id);
  const onNodeMouseEnter = (_, node) => setHoveredNode(node.id);
  const onNodeMouseLeave = () => setHoveredNode(null);

  const detailId = selectedNode || hoveredNode;

  return (
    <div style={{ display: 'flex', height: '90vh' }}>
      {/* ── 플로우차트 영역 ── */}
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onInit={onInit}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onNodeMouseEnter={onNodeMouseEnter}
          onNodeMouseLeave={onNodeMouseLeave}
        >
          <Background gap={12} size={1} />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>

      {/* ── 문항 상세 패널 ── */}
      <div
        style={{
          width: 300,
          padding: '1rem',
          borderLeft: '1px solid #ddd',
          overflowY: 'auto',
        }}
      >
        {detailId ? (
          <div>
            <h3>{nodeDetails[detailId].title}</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{nodeDetails[detailId].question}</p>
            {nodeDetails[detailId].options.length > 0 && (
              <ul>
                {nodeDetails[detailId].options.map((opt, i) => (
                  <li key={i}>• {opt}</li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <p>노드를 클릭하거나 마우스를 올려보세요.</p>
        )}
      </div>
    </div>
  );
}
