import { Banners } from '@features/chat/components/Banners';
import type { ChatMessage } from '@features/chat/types/chat.type';

type MessageWithUser = ChatMessage & { userinfo?: { username?: string } | null };

interface MessagesProps {
  messages: MessageWithUser[];
  me: string | null;
  roomId: string;
}

export const Messages = ({ messages, me }: MessagesProps) => {
  return (
    <div className="flex min-h-0 flex-col gap-[1rem] overflow-y-auto px-[1rem] pt-[3.25rem]">
      <Banners.Information />

      {messages.map((m) => {
        if (m.kind === 'banner') {
          switch (m.payload?.type) {
            case 'meetup':
              return <Banners.Promise key={m.id} />;
            case 'settlement':
              return <Banners.Receipt key={m.id} />;
            default:
              return null; // 알 수 없는 배너 타입은 숨김
          }
        }
        return (
          <MessageBubble
            key={m.id}
            isMine={!!me && m.user_id === me}
            username={m.userinfo?.username ?? '상대방'}
            content={m.content}
            createdAt={m.created_at}
          />
        );
      })}
    </div>
  );
};

function MessageBubble({
  isMine,
  username,
  content,
  createdAt,
}: {
  isMine: boolean;
  username: string;
  content: string | null;
  createdAt?: string;
}) {
  const time = createdAt ? new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

  return (
    <div className={`flex gap-[0.5rem] ${isMine ? 'justify-end' : ''}`}>
      {!isMine && (
        <div className="flex h-[2.25rem] w-[2.25rem] shrink-0 items-center justify-center rounded-[1.125rem] border border-gray-300 bg-gray-200" />
      )}
      <div className="flex min-w-0 flex-col gap-[0.38rem]">
        {!isMine && <span className="label-xxsmall font-medium text-gray-500">{username}</span>}
        <div className={`flex min-w-0 items-end gap-[0.38rem] ${isMine ? 'flex-row-reverse' : ''}`}>
          <div
            className={`inline-block max-w-[75%] rounded-[0.75rem] px-[1rem] py-[0.75rem] break-words ${
              isMine ? 'rounded-tr-none bg-white text-gray-900' : 'rounded-tl-none bg-gray-800 text-white'
            }`}
          >
            {content ?? ''}
          </div>
          <span className="label-xxsmall shrink-0 text-gray-400">{time}</span>
        </div>
      </div>
    </div>
  );
}
