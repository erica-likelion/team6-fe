import { Room } from '@features/chat/components/Room';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/chat/$id/')({
  component: ChatId,
});

function ChatId() {
  return (
    <>
      <Room title="홈플러스 함께 가자" memberCount={2} />
    </>
  );
}
