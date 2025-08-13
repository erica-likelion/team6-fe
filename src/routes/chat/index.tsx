import { ChatList } from '@features/chat/components/ChatList';
import { TopNavigation } from '@features/chat/components/TopNavigation';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/chat/')({
  component: Chat,
});

function Chat() {
  return (
    <>
      <TopNavigation />
      <ChatList />
    </>
  );
}
