import supabase from "@utils/supabase/supabaseClient";

export type RecommendationType = 'shopping' | 'sharing';

export interface RecommendationItem {
  id: string;
  title: string;
}

export async function fetchRecommendations(
  type?: RecommendationType
): Promise<RecommendationItem[]> {
  // 기본 셀렉트
  let query = supabase
    .from('posts')
    .select('id, title')
    .order('created_at', { ascending: false })
    .limit(20);

  // type이 있으면 필터
  if (type) query = query.eq('type', type);

  const { data, error } = await query;
  if (error) throw error;

  // 타입 맞게 매핑
  return (data ?? []).map((row: any) => ({
    id: String(row.id),
    title: row.title as string,
  }));
}

