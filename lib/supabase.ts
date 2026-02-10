/**
 * Supabase Client Configuration
 * Soul ID Card Project
 */

import { createClient } from '@supabase/supabase-js';

// Environment variables에서 Supabase 설정 로드
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Supabase 클라이언트 초기화 및 export
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * 환경 변수 검증
 * 개발 환경에서 필수 환경 변수가 누락되었는지 확인
 */
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!');
  console.error('Please check .env.local file:');
  console.error('  - NEXT_PUBLIC_SUPABASE_URL');
  console.error('  - NEXT_PUBLIC_SUPABASE_ANON_KEY');
}
