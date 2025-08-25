// features/chat/api/useChatRoom.ts
import { useQuery } from '@tanstack/react-query';
import { getChatRoomById } from '@services/chat/supabase';

export function useChatRoom(roomId: string) {
  return useQuery({
    queryKey: ['chat-room', roomId],
    queryFn: () => getChatRoomById(roomId),
  });
}