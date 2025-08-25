import supabase from '@utils/supabase/supabaseClient';

export type CreateItemInput = {
  title: string;
  content?: string;
  location: string;
  maxMembers: number;
  price: number;
  photos?: File[];
  receipts?: File[];
};

async function uploadFilesToImages(files: File[], postId: string, subdir: string) {
  if (files.length > 10) throw new Error('사진은 최대 10장까지 업로드 가능합니다.');
  const urls: string[] = [];
  for (const file of files) {
    const path = `item/${postId}/${subdir}/${crypto.randomUUID()}-${file.name}`;
    const { error: upErr } = await supabase.storage.from('images').upload(path, file, { upsert: false });
    if (upErr) throw upErr;
    const { data } = supabase.storage.from('images').getPublicUrl(path);
    urls.push(data.publicUrl);
  }
  return urls;
}

export async function createItem(input: CreateItemInput) {
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();
  if (userErr || !user) throw new Error('로그인이 필요합니다.');

  // 1) posts (type='ITEM')
  const { data: post, error: postErr } = await supabase
    .from('posts')
    .insert([{ user_id: user.id, type: 'ITEM', title: input.title, content: input.content ?? null }])
    .select('*')
    .single();
  if (postErr || !post) throw postErr ?? new Error('posts insert 실패');

  try {
    // 2) item_details
    // 스키마가 price 라면 desired_price 대신 price로 맞추세요.
    const { error: detErr } = await supabase
      .from('item_details')
      .insert([{ post_id: post.id, location: input.location, max_members: input.maxMembers, desired_price: input.price }]);
      // .insert([{ post_id: post.id, location: input.location, max_members: input.maxMembers, desired_price: input.price }]);
    if (detErr) throw detErr;

    // 3) 📌 채팅방 생성 + 멤버 등록
    const { data: room, error: roomErr } = await supabase
      .from('chat_rooms')
      .insert([{ post_id: post.id, created_by: user.id }])
      .select('*')
      .single();
    if (roomErr || !room) throw roomErr ?? new Error('chat_rooms insert 실패');

    const { error: memberErr } = await supabase
      .from('chat_members')
      .insert([{ room_id: room.id, user_id: user.id, role: 'owner' }]);
    if (memberErr) throw memberErr;

    // (선택) 안내 메시지
    // await supabase.from('chat_messages').insert([{
    //   room_id: room.id, user_id: user.id, content: '채팅방이 생성되었습니다.'
    // }]);

    // 4) 게시글 사진
    if (input.photos?.length) {
      const urls = await uploadFilesToImages(input.photos, post.id, 'photos');
      const rows = urls.map((url) => ({ post_id: post.id, url }));
      const { error: phErr } = await supabase.from('item_photos').insert(rows);
      if (phErr) throw phErr;
    }

    // 5) 영수증/구매내역 첨부 (테이블명이 purchase_receipts인지 item_receipts인지 스키마에 맞추세요)
    if (input.receipts?.length) {
      const urls = await uploadFilesToImages(input.receipts, post.id, 'receipts');
      const rows = urls.map((url) => ({ post_id: post.id, url }));
      const { error: rcErr } = await supabase.from('purchase_receipts').insert(rows);
      // const { error: rcErr } = await supabase.from('purchase_receipts').insert(rows);
      if (rcErr) throw rcErr;
    }

    // 6) 조인 결과 반환 (posts ↔ chat_rooms 1:1, chat_members는 chat_rooms 내부로 embed)
    const { data: full, error: fullErr } = await supabase
      .from('posts')
      .select(`
        *,
        item_details (*),
        item_photos (url),
        purchase_receipts (url),
        chat_rooms (*, chat_members (*))
      `)
      .eq('id', post.id)
      .single();
    if (fullErr || !full) throw fullErr ?? new Error('결과 조회 실패');

    return full;
  } catch (e) {
    // 간이 롤백
    await supabase.from('posts').delete().eq('id', post.id);
    throw e;
  }
}