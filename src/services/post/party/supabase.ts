// lib/party.ts
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

export async function createParty(input: CreatePartyInput) {
  // 1) 로그인 사용자 확인
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();
  if (userErr || !user) throw new Error('로그인이 필요합니다.');

  // 2) posts 삽입 (type='PARTY')
  const { data: post, error: postErr } = await supabase
    .from('posts')
    .insert([
      {
        user_id: user.id,
        type: 'PARTY',
        title: input.title,
        content: input.content ?? null,
      },
    ])
    .select('*')
    .single();

  if (postErr || !post) throw postErr ?? new Error('posts insert 실패');

  try {
    // 3) party_details 삽입
    const { error: detErr } = await supabase.from('party_details').insert([
      {
        post_id: post.id,
        location: input.location,
        event_time: input.eventTime,
        max_members: input.maxMembers,
      },
    ]);
    if (detErr) throw detErr;

    // 4) party_items 삽입 (선택한 코드들)
    if (input.itemCodes?.length) {
      const rows = input.itemCodes.map((code) => ({
        post_id: post.id,
        code,
      }));
      const { error: itemsErr } = await supabase.from('party_items').insert(rows);
      if (itemsErr) throw itemsErr;
    }

    // 5) 사진 업로드 + party_photos 삽입 (최대 10장)
    if (input.photos?.length) {
      const urls = await uploadPartyPhotos(input.photos, post.id);
      const rows = urls.map((url) => ({ post_id: post.id, url }));
      const { error: photosErr } = await supabase.from('party_photos').insert(rows);
      if (photosErr) throw photosErr;
    }

    // 6) 결과 조회 (조인)
    const { data: full, error: fullErr } = await supabase
      .from('posts')
      .select(
        `
        *,
        party_details (*),
        party_items (code),
        party_photos (url)
      `
      )
      .eq('id', post.id)
      .single();

    if (fullErr || !full) throw fullErr ?? new Error('결과 조회 실패');

    return full;
  } catch (e) {
    // 실패 시 최소한 posts 삭제로 롤백 흉내 (완전 트랜잭션은 RPC에서 처리 권장)
    await supabase.from('posts').delete().eq('id', post.id);
    throw e;
  }
}
