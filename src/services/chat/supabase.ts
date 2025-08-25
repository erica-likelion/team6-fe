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
