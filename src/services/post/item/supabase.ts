import supabase from '@utils/supabase/supabaseClient';


export type CreateItemInput = {
  title: string;
  content?: string;
  location: string;
  maxMembers: number;   // 인원수
  price: number;        // 희망 가격 (원)
  photos?: File[];      // 게시글 사진 (최대 10장)
  receipts?: File[];    // 구매내역/영수증 첨부 (최대 10장)
};

/** 공용 업로드 유틸(서브폴더 지정 가능) */
async function uploadFilesToImages(files: File[], postId: string, subdir: string) {
  if (files.length > 10) throw new Error('사진은 최대 10장까지 업로드 가능합니다.');

  const urls: string[] = [];
  for (const file of files) {
    const path = `item/${postId}/${subdir}/${crypto.randomUUID()}-${file.name}`;
    const { error: upErr } = await supabase.storage.from('images').upload(path, file, { upsert: false });
    if (upErr) throw upErr;
    const { data } = supabase.storage.from('images').getPublicUrl(path);
    urls.push(data.publicUrl); // 비공개 버킷이면 signedUrl로 대체
  }
  return urls;
}

/** ITEM 게시글 생성 */
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
    const { error: detErr } = await supabase
      .from('item_details')
      .insert([{ post_id: post.id, location: input.location, max_members: input.maxMembers, desired_price: input.price }]);
    if (detErr) throw detErr;

    // 3) 게시글 사진
    if (input.photos?.length) {
      const urls = await uploadFilesToImages(input.photos, post.id, 'photos');
      const rows = urls.map((url) => ({ post_id: post.id, url }));
      const { error: phErr } = await supabase.from('item_photos').insert(rows);
      if (phErr) throw phErr;
    }

    // 4) 영수증/구매내역 첨부
    if (input.receipts?.length) {
      const urls = await uploadFilesToImages(input.receipts, post.id, 'receipts');
      const rows = urls.map((url) => ({ post_id: post.id, url }));
      const { error: rcErr } = await supabase.from('purchase_receipts').insert(rows);
      if (rcErr) throw rcErr;
    }

    // 5) 조인 결과 반환
    const { data: full, error: fullErr } = await supabase
      .from('posts')
      .select(`
        *,
        item_details (*),
        item_photos (url),
        purchase_receipts (url)
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