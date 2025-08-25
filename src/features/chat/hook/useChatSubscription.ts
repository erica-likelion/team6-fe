// hooks/useChatSubscription.ts
import { useEffect } from 'react';
import supabase from '@utils/supabase/supabaseClient';
import type { ChatMessage } from '@features/chat/types/chat.type';

export function useChatSubscription(roomId: string, onMessage: (msg: ChatMessage) => void) {
  useEffect(() => {
    if (!roomId) return;

    const channel = supabase
      .channel(`room:${roomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          onMessage(payload.new as ChatMessage);
        }
      )
      .subscribe((status) => {
        // 상태 로깅(선택)
        console.log('realtime status', status)
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, onMessage]);
}
