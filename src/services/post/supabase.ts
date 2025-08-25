// services/posts.ts
import supabase from '@utils/supabase/supabaseClient';

export type PostItem = {
  id: string;
  title: string;
  body: string;
  created_at: string;
  type: string;
  href: string;
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

export type PostDetail = {
  images: string[];
  location?: string;
  time?: string; // '오늘 14시' 등
  quota?: number; // 정원
  trust_score?: number;
  tags?: Array<{ label: string; color?: string }>;
  author_name?: string;
};

export async function fetchDetailByType(post: PostItem): Promise<PostDetail | null> {
  // posts.type에 따라 테이블/컬럼 분기
  if (post.type === 'TYPE') {
    const { data, error } = await supabase
      .from('item_details') // <-- 당신의 실제 테이블명에 맞춰 변경
      .select('location, time, quota, trust_score, tags, author_name')
      .eq('post_id', post.id)
      .single();

    if (error) return null;
    return {
      images: [],
      location: data?.location ?? undefined,
      time: data?.time ?? undefined,
      quota: data?.quota ?? undefined,
      trust_score: data?.trust_score ?? undefined,
      tags: data?.tags ?? [],
      author_name: data?.author_name ?? undefined,
    };
  }

  if (post.type === 'PARTY') {
    const { data, error } = await supabase
      .from('party_details') // <-- 당신의 실제 테이블명에 맞춰 변경
      .select('meeting_place:location, event_time, max_members')
      .eq('post_id', post.id)
      .single();

    if (error) return null;
    return {
      images: [],
      location: data?.meeting_place ?? undefined, // 별칭 예시
      time: data?.event_time ?? undefined,
      quota: data?.max_members ?? undefined,
    };
  }

  // 그 외 타입이면 디테일 없음
  return null;
}

export type AuthorInfo = {
  id: string;
  username?: string;
  avatar_url?: string;
};

export async function fetchAuthorByPostId(postId: string) {
  const postRes = await supabase.from('posts').select('id, user_id').eq('id', postId).single();

  if (postRes.error) throw postRes.error;

  const authorRes = await supabase.from('userinfo').select('id, username').eq('id', postRes.data.user_id).single();

  return authorRes.data;
}

export async function fetchMyPosts() {
  // 현재 로그인 유저 확인
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) throw new Error('로그인이 필요합니다.');

  const { data, error } = await supabase
    .from('posts')
    .select(
      `
      id,
      title,
      body:content,
      created_at,
      type
    `
    )
    .eq('user_id', user.id) // 내 게시물만
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}
