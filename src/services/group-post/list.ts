import supabase from "@utils/supabase/supabaseClient";
import type { PostItem } from "@features/home/components/recent-posts/type";

export type GroupPostType = 'shopping' | 'sharing';
export type GroupPostStatus = 'open' | 'closed';

export interface GroupGetPostsQuery {
  type?: GroupPostType;
  status?: GroupPostStatus;
  page?: number; // 0-based
  size?: number; // default 20
}

export interface GroupPageMeta {
  page: number;
  size: number;
  total: number;
}

/** Supabase posts 목록 조회 (필터 + 페이지네이션 + total) */
export async function getGroupPostsFromSupabase(params: GroupGetPostsQuery = {}) {
  const page = params.page ?? 0;
  const size = params.size ?? 20;
  const from = page * size;
  const to = from + size - 1;

  let q = supabase
    .from('posts')
    .select(
      'id,type,status,title,place,capacity,current_members,price,time_start,time_end,created_at',
      { count: 'exact' },
    )
    .order('created_at', { ascending: false });

  if (params.type) q = q.eq('type', params.type);
  if (params.status) q = q.eq('status', params.status);

  const { data, count, error } = await q.range(from, to);
  if (error) throw new Error(error.message);

  // ✅ 여기서 바로 PostItem 구조로 변환
  const items: PostItem[] = (data ?? []).map((r: any) => ({
    id: String(r.id),
    title: r.title,
    body: '', // posts 테이블에 body 없으니 기본값
    badges: r.type ? [{ text: r.type, tone: 'green' }] : [],
    thumbnailUrl: undefined, // image_url 컬럼 추가 시 연결
    place: r.place ?? undefined,
    time: r.time_start ?? r.created_at,
    people: `${r.current_members}/${r.capacity}`,
    href: `/post/${r.id}`,
  }));

  return {
    items,
    page: { page, size, total: count ?? 0 } as GroupPageMeta,
  };
}
