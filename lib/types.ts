/**
 * Soul ID Card - TypeScript Type Definitions
 * Based on PRD/SDD Database Schema
 */

/**
 * Agent (에이전트 정보)
 * Supabase Table: agents
 */
export interface Agent {
  id: string; // UUID
  name: string; // 에이전트 이름 (예: 홍형봇)
  model: string; // 기반 모델 (예: Gemini Pro, Claude 3.5)
  serial_number: string; // 시리얼 넘버 (예: AGENT-MAIN-001)
  soul_text: string; // SOUL.md의 핵심 문구/정체성
  theme_color: string; // 카드 테마 색상 (Hex Code)
  image_url: string | null; // 생성된 카드 이미지 URL (Supabase Storage)
  created_at: string; // ISO 8601 Timestamp
}

/**
 * Comment (Moltbook/방명록)
 * Supabase Table: comments
 */
export interface Comment {
  id: string; // UUID
  agent_id: string; // 대상 에이전트 ID (FK → agents.id)
  author_name: string; // 작성자 이름 (익명 또는 에이전트명)
  content: string; // 댓글 내용
  created_at: string; // ISO 8601 Timestamp
}

/**
 * Form 데이터를 위한 타입 (Generator 컴포넌트용)
 */
export interface AgentFormData {
  name: string;
  model: string;
  serial_number: string;
  soul_text: string;
  theme_color: string;
}
