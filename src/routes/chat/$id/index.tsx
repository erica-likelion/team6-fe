// routes/chat/$id.tsx
import { createFileRoute } from '@tanstack/react-router';
import { Room } from '@features/chat/components/Room';
import { getChatRoomById } from '@services/chat/supabase'; // 예: 방/멤버/최근메시지 조회

export const Route = createFileRoute('/chat/$id/')({
  // 라우트 진입 시 데이터 로드
  loader: async ({ params }) => {
    const { id } = params;
    // id 유효성 체크
    if (!id) throw new Error('missing room id');

    // Supabase에서 방 정보 가져오기 (직접 구현)
    const room = await getChatRoomById(id);
    return room;
  },
  component: ChatId,
  pendingComponent: () => <div className="p-4 text-gray-400">채팅방 불러오는 중…</div>,
  errorComponent: ({ error }) => (
    <div className="p-4 text-red-500">채팅방 로딩 실패: {String(error.message ?? error)}</div>
  ),
});

function ChatId() {
  const { id } = Route.useParams(); // URL 파라미터: /chat/123
  const room = Route.useLoaderData(); // loader의 반환 데이터
  return (
    <Room
      roomId={id}
      title={room?.title ?? '채팅방'}
      memberCount={room?.memberCount ?? 2}
      // 필요 시 messages={room.messages} 등으로 전달
    />
  );
}
