import { Input } from '@features/chat/components/Input';
import { Header } from '@components/Header/Header';
import { Messages } from '@features/chat/components/Messages';
import { useRef, useEffect, useState, useCallback, useLayoutEffect } from 'react';
import { useChatSubscription } from '@features/chat/hook/useChatSubscription';
import type { ChatMessage } from '@features/chat/types/chat.type';
import supabase from '@utils/supabase/supabaseClient';

interface RoomProps {
  roomId: string;
  title: string;
  memberCount: number;
}

// username 조인 필드를 포함한 확장 타입
type ChatMessageWithUser = ChatMessage & {
  userinfo?: { username?: string } | null;
};

export const Room = ({ roomId, title, memberCount }: RoomProps) => {
  const [isKeyboard, setIsKeyboard] = useState(false);
  const [kb, setKb] = useState(0);
  const initialHeight = useRef(visualViewport?.height);
  const [messages, setMessages] = useState<ChatMessageWithUser[]>([]);
  const [me, setMe] = useState<string | null>(null);
  const [meName, setMeName] = useState<string | null>(null);

  // 로그인 유저 ID/username 가져오기
  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      setMe(user.id);

      // 내 username도 조회 (userinfo에 데이터가 있어야 함)
      const { data: meInfo } = await supabase.from('userinfo').select('username').eq('id', user.id).single();
      if (meInfo?.username) setMeName(meInfo.username);
    })();
  }, []);

  // 초기 메시지 로드 (username 포함)
  useEffect(() => {
    let alive = true;
    (async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select(
          `
          id, room_id, user_id, content, kind, payload, created_at,
          userinfo ( username )
        `
        )
        .eq('room_id', roomId)
        .order('created_at', { ascending: true })
        .limit(50);

      if (!alive) return;
      if (!error && data) setMessages(data as ChatMessageWithUser[]);
    })();
    return () => {
      alive = false;
    };
  }, [roomId]);

  // 중복 체크
  const hasMessage = (list: ChatMessageWithUser[], id: string) => list.some((m) => m.id === id);

  // 구독 핸들러 (insert 수신 시 username 포함되면 그대로 반영)
  const handleInsert = useCallback((msg: ChatMessageWithUser) => {
    setMessages((prev) => {
      if (hasMessage(prev, msg.id)) return prev;
      return [...prev, msg];
    });
  }, []);

  // 구독 시작
  useChatSubscription(roomId, handleInsert);

  // 배너 전송 (낙관 + 교체)
  const sendBanner = async (payload: NonNullable<ChatMessage['payload']>) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return alert('로그인이 필요합니다.');

    const tempId = `temp-${crypto.randomUUID()}`;
    const optimistic: ChatMessageWithUser = {
      id: tempId,
      room_id: roomId,
      user_id: user.id,
      kind: 'banner',
      payload,
      content: null,
      image_url: null,
      created_at: new Date().toISOString(),
      userinfo: meName ? { username: meName } : undefined,
    };
    setMessages((prev) => [...prev, optimistic]);

    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        room_id: roomId,
        user_id: user.id,
        kind: 'banner',
        payload,
        content: '__BANNER__',
      })
      .select(
        `
        id, room_id, user_id, content, kind, payload, created_at,
        userinfo ( username )
      `
      )
      .single();

    if (error || !data) {
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
      console.error(error);
      alert('배너 전송 실패');
      return;
    }

    setMessages((prev) => prev.map((m) => (m.id === tempId ? (data as ChatMessageWithUser) : m)));
  };

  // 일반 메세지 전송 (낙관 + 교체)
  const sendMessage = async (text: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return alert('로그인이 필요합니다.');

    const tempId = `temp-${crypto.randomUUID()}`;
    const optimistic: ChatMessageWithUser = {
      id: tempId,
      room_id: roomId,
      user_id: user.id,
      content: text,
      image_url: null,
      created_at: new Date().toISOString(),
      userinfo: meName ? { username: meName } : undefined,
    };
    setMessages((prev) => [...prev, optimistic]);

    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        room_id: roomId,
        user_id: user.id,
        content: text,
      })
      .select(
        `
        id, room_id, user_id, content, kind, payload, created_at,
        userinfo ( username )
      `
      )
      .single();

    if (error || !data) {
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
      console.error(error);
      alert('메시지 전송 실패');
      return;
    }

    setMessages((prev) => prev.map((m) => (m.id === tempId ? (data as ChatMessageWithUser) : m)));
  };

  // iOS 가상 키보드 대응
  useEffect(() => {
    const handleVisualViewportResize = () => {
      const current = Number(window.visualViewport?.height);
      if (initialHeight.current !== undefined && current < initialHeight.current) {
        window.scrollTo(0, 0);
        setIsKeyboard(true);
        setKb(initialHeight.current - current);
      }
    };
    visualViewport?.addEventListener('resize', handleVisualViewportResize);
    return () => visualViewport?.removeEventListener('resize', handleVisualViewportResize);
  }, []);

  useEffect(() => {
    const handleViewportScroll = () => {
      if (!visualViewport?.height) return;
      if (window.scrollY + visualViewport.height > document.body.offsetHeight - 2) {
        window.scrollTo(0, document.body.offsetHeight - visualViewport.height - 1);
      }
    };
    visualViewport?.addEventListener('scroll', handleViewportScroll);
    return () => visualViewport?.removeEventListener('scroll', handleViewportScroll);
  }, []);
  const scrollWrapRef = useRef<HTMLDivElement | null>(null);

  // ✅ 처음 마운트 시/메시지 추가 시 래퍼를 맨 아래로
  useLayoutEffect(() => {
    const el = scrollWrapRef.current;
    if (!el) return;
    // 렌더 후 계산이 맞도록 rAF
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
  }, [messages.length]); // 메시지 개수 변할 때만
  return (
    <div className="bg-primary-bg absolute z-11 h-dvh w-dvw">
      <Header title={title} memberCount={memberCount} isMenu={true} />

      {/* ✅ 이 래퍼가 스크롤 컨테이너 */}
      <div
        ref={scrollWrapRef}
        className="overflow-y-auto"
        style={{
          height: 'calc(100dvh - 4.25rem)', // 헤더 제외
          paddingBottom: isKeyboard ? kb : '1rem', // 키보드/홈바 여유 공간
          overscrollBehavior: 'contain',
        }}
      >
        <Messages messages={messages} me={me} roomId={roomId} />
      </div>

      <Input
        isKeyboard={isKeyboard}
        setIsKeyboard={setIsKeyboard}
        bottom={kb}
        onSend={sendMessage}
        onSendBanner={sendBanner}
      />
    </div>
  );
};
