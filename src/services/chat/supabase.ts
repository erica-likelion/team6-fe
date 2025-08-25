import supabase from '@utils/supabase/supabaseClient';

export async function getMyChatRooms() {
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();
  if (userErr || !user) throw userErr ?? new Error('로그인이 필요합니다.');

  const { data, error } = await supabase
    .from('chat_members')
    .select(
      `
      room_id,
      chat_rooms (
        id,
        post_id,
        created_at,
        posts ( 
            title,
            party_photos ( url ),
            item_photos ( url )
        ),         
        chat_messages ( content, created_at )
      )
    `
    )
    .eq('user_id', user.id)
    .order('created_at', { foreignTable: 'chat_rooms.chat_messages', ascending: false })
    .limit(1, { foreignTable: 'chat_rooms.chat_messages' });

  if (error) throw error;
  return data ?? [];
}

type RoomResp = {
  id: string
  post_id: string | null
  created_at: string
  posts: {
    title: string | null
    type?: 'PARTY' | 'ITEM'
    party_details?: any | any[] // 1:1이면 객체, 1:N이면 배열
    item_details?: any | any[]
  }
  chat_members: Array<{
    username: string; user_id: string; userinfo?: {
    avatarUrl: string | undefined; username?: string | null 
} | null }>
  chat_messages: Array<{
    id: string
    user_id: string
    content: string | null
    created_at: string
    userinfo?: { username?: string | null } | null
  }>
}

export async function getChatRoomById(roomId: string) {
  const { data, error } = await supabase
    .from('chat_rooms')
    .select(`
      id, post_id, created_at,
      posts (
        title,
        type,
        party_details ( location, event_time, max_members ),
        item_details  ( location, max_members, desired_price )
      ),
      chat_members (
        user_id,
        userinfo ( username )
      ),
      chat_messages (
        id,
        user_id,
        content,
        created_at,
        userinfo ( username )
      )
    `)
    .eq('id', roomId)
    .order('created_at', { foreignTable: 'chat_messages', ascending: true })
    .single<RoomResp>();

  if (error) throw error;

  const post = data.posts;

  // 1:1/1:N 모두 안전하게 처리
  const party =
    post?.party_details && Array.isArray(post.party_details)
      ? post.party_details[0]
      : post?.party_details;
  const item =
    post?.item_details && Array.isArray(post.item_details)
      ? post.item_details[0]
      : post?.item_details;

  const location = party?.location ?? item?.location ?? null;
  const eventTime = party?.event_time ?? null; // (파티 글인 경우만 존재)

  return {
    id: data.id,
    title: post?.title ?? '채팅방',
    type: post?.type ?? null,
    location,          // ✅ posts → party_details/item_details에서 가져온 위치
    eventTime,         // 필요 시 사용
    members: data.chat_members ?? [],
    memberCount: data.chat_members?.length ?? 0,
    messages: data.chat_messages ?? [],
  };
}

export async function createSettlement(roomId: string, title: string, total: number) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('로그인이 필요합니다.');

  // 채팅방 멤버 수집
  const { data: members } = await supabase
    .from('chat_members')
    .select('user_id')
    .eq('room_id', roomId);

  const memberIds = (members ?? []).map(m => m.user_id);

  const { data, error } = await supabase.rpc('create_settlement_with_banner', {
    p_room_id: roomId,
    p_title: title,
    p_total: total,
    p_payer: user.id,
    p_members: memberIds,
  });
  if (error) throw error;

  return data as string; // settlement_id
}

export async function getSettlementByRoom(roomId: string) {
 const { data, error } = await supabase
  .from('settlement_members')
  .select(`
    settlement_id,
    user_id,
    settlements!inner( id, room_id, title ),
    userinfo:user_id ( username )
  `)
  .eq('settlements.room_id', roomId); 

  if (error) throw error;
  return data ?? [];
}