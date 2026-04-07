/**
 * 섹션 흐름 Flow Chart 템플릿
 *
 * 용도: Step 2(전체 섹션 흐름 논의) 또는 Step 3(섹션별 문항 만들기) 단계에서
 *       사용자가 캔버스를 통한 시각화를 요청했을 때 사용한다.
 *
 * 사용법:
 *   1. 실제 설문의 섹션 구성에 맞게 initialNodes의 id, label, position을 수정한다.
 *   2. 분기가 있으면 branchLabel 노드와 분기 노드를 추가하고 edge에 label을 붙인다.
 *   3. position.y 값을 120px 간격으로 배치하면 가독성이 좋다.
 *   4. 분기 노드는 x 좌표를 -40, 240 등으로 분리하여 좌우로 배치한다.
 */
import React from 'react';
import { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

export default function SurveyOutlineFlow() {
  // ── 노드 정의 ──────────────────────────────────────
  // 실제 설문에 맞게 id, label, position을 수정한다.
  const initialNodes = [
    {
      id: 'start',
      position: { x: 100, y: 0 },
      data: { label: '1. 시작 안내멘트' },
      style: {
        border: '1px solid #ddd',
        borderRadius: '1rem',
        padding: '0.5rem 1rem',
      },
      draggable: false,
    },
    {
      id: 'screening',
      position: { x: 100, y: 120 },
      data: { label: '2. 스크리닝 문항' },
      style: {
        border: '1px solid #ddd',
        borderRadius: '1rem',
        padding: '0.5rem 1rem',
      },
      draggable: false,
    },
    {
      id: 'commonUse',
      position: { x: 100, y: 240 },
      data: { label: '3. 서비스 이용 행태(공통)' },
      style: {
        border: '1px solid #ddd',
        borderRadius: '1rem',
        padding: '0.5rem 1rem',
      },
      draggable: false,
    },
    {
      id: 'branchLabel',
      position: { x: 100, y: 360 },
      data: { label: '스크리닝 결과에 따라 분기' },
      style: {
        fontSize: '0.8rem',
        color: '#555',
        borderRadius: '1rem',
      },
      draggable: false,
    },
    {
      id: 'useExperience',
      position: { x: -40, y: 480 },
      data: { label: '4A. 이용 경험 상세' },
      style: {
        border: '1px solid #ddd',
        borderRadius: '1rem',
        padding: '0.5rem 1rem',
      },
      draggable: false,
    },
    {
      id: 'noExperience',
      position: { x: 240, y: 480 },
      data: { label: '4B. 미경험 사유' },
      style: {
        border: '1px solid #ddd',
        borderRadius: '1rem',
        padding: '0.5rem 1rem',
      },
      draggable: false,
    },
    {
      id: 'newFeature',
      position: { x: 100, y: 600 },
      data: { label: '5. 신규 기능 니즈 조사' },
      style: {
        border: '1px solid #ddd',
        borderRadius: '1rem',
        padding: '0.5rem 1rem',
      },
      draggable: false,
    },
    {
      id: 'demographic',
      position: { x: 100, y: 720 },
      data: { label: '6. 상세 인구통계 정보' },
      style: {
        border: '1px solid #ddd',
        borderRadius: '1rem',
        padding: '0.5rem 1rem',
      },
      draggable: false,
    },
    {
      id: 'finish',
      position: { x: 100, y: 840 },
      data: { label: '7. 마무리 및 추가 의견' },
      style: {
        border: '1px solid #ddd',
        borderRadius: '1rem',
        padding: '0.5rem 1rem',
      },
      draggable: false,
    },
  ];

  // ── 엣지 정의 ──────────────────────────────────────
  // 분기가 있는 경우 label 속성으로 분기 조건을 표시한다.
  const initialEdges = [
    {
      id: 'e-start-screening',
      source: 'start',
      target: 'screening',
      animated: true,
      style: { strokeWidth: 2 },
    },
    {
      id: 'e-screening-commonUse',
      source: 'screening',
      target: 'commonUse',
      animated: true,
      style: { strokeWidth: 2 },
    },
    {
      id: 'e-commonUse-branchLabel',
      source: 'commonUse',
      target: 'branchLabel',
      animated: true,
      style: { strokeWidth: 2 },
    },
    {
      id: 'e-branchLabel-useExperience',
      source: 'branchLabel',
      target: 'useExperience',
      label: '경험 有',
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: '#fff', color: '#222', fillOpacity: 0.8 },
      style: { strokeWidth: 2 },
      animated: true,
    },
    {
      id: 'e-branchLabel-noExperience',
      source: 'branchLabel',
      target: 'noExperience',
      label: '경험 無',
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: '#fff', color: '#222', fillOpacity: 0.8 },
      style: { strokeWidth: 2 },
      animated: true,
    },
    {
      id: 'e-useExperience-newFeature',
      source: 'useExperience',
      target: 'newFeature',
      animated: true,
      style: { strokeWidth: 2 },
    },
    {
      id: 'e-noExperience-newFeature',
      source: 'noExperience',
      target: 'newFeature',
      animated: true,
      style: { strokeWidth: 2 },
    },
    {
      id: 'e-newFeature-demographic',
      source: 'newFeature',
      target: 'demographic',
      animated: true,
      style: { strokeWidth: 2 },
    },
    {
      id: 'e-demographic-finish',
      source: 'demographic',
      target: 'finish',
      animated: true,
      style: { strokeWidth: 2 },
    },
  ];

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onInit = useCallback((reactFlowInstance) => {
    reactFlowInstance.fitView();
  }, []);

  return (
    <div className="p-4 w-full h-[80vh] bg-gray-50 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">설문 흐름차트 (섹션 개요)</h2>
      <p className="text-sm mb-4 text-gray-600">
        스크리닝을 거쳐 분기로 나뉘고, 이후 다시 공통 섹션을 거쳐 마지막으로 이어집니다.
      </p>
      <div className="w-full h-[90%] border border-gray-300 rounded-xl">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onInit={onInit}
        >
          <Background variant="lines" gap={16} size={1} />
          <MiniMap zoomable pannable style={{ height: 80 }} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
