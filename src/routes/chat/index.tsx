import { List } from '@features/chat/components/List';
import { Navigation } from '@features/chat/components/Navigation';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/chat/')({
  component: Chat,
});

function Chat() {
  return (
    <>
      <Navigation />
      <List />
    </>
  );
}
