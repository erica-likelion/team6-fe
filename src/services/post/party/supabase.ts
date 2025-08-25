import supabase from '@utils/supabase/supabaseClient';
export type CreatePartyInput = {
  title: string;
  content?: string;
  location: string;
  eventTime: string; // ISO (예: new Date().toISOString())
  maxMembers: number; // 인원수
  itemCodes: string[]; // party_item_codes.code 값들의 배열
  photos?: File[]; // 최대 10장
};

export async function uploadPartyPhotos(files: File[], postId: string) {
  const uploadedUrls: string[] = [];

  for (const file of files) {
    const path = `party/${postId}/${crypto.randomUUID()}-${file.name}`;
    const { error: upErr } = await supabase.storage
      .from('images') // 버킷 이름
      .upload(path, file, { upsert: false });

    if (upErr) throw upErr;

    // 공개 버킷인 경우
    const { data } = supabase.storage.from('images').getPublicUrl(path);
    uploadedUrls.push(data.publicUrl);

    // 비공개 버킷이면 signed URL을 생성해서 쓰십시오.
    // const { data: signed } = await supabase.storage.from('images').createSignedUrl(path, 60 * 60);
    // uploadedUrls.push(signed.signedUrl);
  }

  return uploadedUrls;
}

export async function createParty(input: {
  title: string;
  content?: string;
  location: string;
  eventTime: string;
  maxMembers: number;
  itemCodes: string[];
  photos?: File[];
}) {
  // 로그인 보장
  const { data: ses } = await supabase.auth.getSession();
  if (!ses?.session?.user) {
    class NeedLoginError extends Error {
      code: string;
      constructor() {
        super('NEED_LOGIN');
        this.code = 'NEED_LOGIN';
      }
    }
    throw new NeedLoginError();
  }

  // 1) 트랜잭션 RPC
  const { data: postId, error: rpcErr } = await supabase.rpc('create_party_with_chat', {
    p_title: input.title,
    p_content: input.content ?? null,
    p_location: input.location,
    p_event_time: input.eventTime, // ISO string 허용됨
    p_max_members: input.maxMembers,
    p_item_codes: input.itemCodes,
  });
  if (rpcErr || !postId) throw rpcErr ?? new Error('파티 생성 실패');

  // 2) 사진 업로드 + DB 반영(트랜잭션 밖)
  if (input.photos?.length) {
    const urls = await uploadPartyPhotos(input.photos, postId);
    const rows = urls.map((url) => ({ post_id: postId, url }));
    const { error: phErr } = await supabase.from('party_photos').insert(rows);
    if (phErr) throw phErr;
  }

  // 3) 필요 시 조인 조회(채팅방 id 포함)
  const { data: full, error: selErr } = await supabase
    .from('posts')
    .select(
      `
      *,
      party_details (*),
      party_items (code),
      party_photos (url),
      chat_rooms (*)
    `
    )
    .eq('id', postId)
    .single();
  if (selErr || !full) throw selErr ?? new Error('결과 조회 실패');
  await supabase.rpc('create_party_for_post', { p_post_id: postId, p_quota: 4 });
  return full; // full.chat_rooms[0].id 등으로 채팅방 접근
}

export type JoinPartyResult = {
  joined: boolean;
  current_count: number;
  quota: number;
  room_id: string;
};

export async function joinPartyByPostId(postId: string): Promise<JoinPartyResult> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('로그인이 필요합니다.');

  const { data, error } = await supabase.rpc('join_party_by_post_id', { p_post_id: postId });
  if (error) {
    if ((error as any).code === 'P0002') throw new Error('정원이 가득 찼습니다.');
    if ((error as any).code === 'P0001') throw new Error('해당 글에 파티가 없습니다.');
    throw error;
  }
  return data?.[0] as JoinPartyResult;
}
