// services/posts.ts
import supabase from '@utils/supabase/supabaseClient';

export type PostItem = {
  id: string;
  title: string;
  body: string;
  created_at: string;
  type: string;
  href: string;
  // 필요한 필드 추가
};

export async function fetchRecentPosts(limit = 20): Promise<PostItem[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, created_at, type, content') // DB 컬럼은 content
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;

  // content → body 매핑
  return (data ?? []).map((d) => ({
    id: d.id,
    title: d.title,
    body: d.content, // content를 body로 변환
    created_at: d.created_at,
    type: d.type,
    href: d.id,
  }));
}

export async function fetchPostById(id: string): Promise<PostItem | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, created_at, type, content')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return {
    id: data.id,
    title: data.title,
    body: data.content, // content → body 매핑
    created_at: data.created_at,
    type: data.type,
    href: data.id,
  };
}
