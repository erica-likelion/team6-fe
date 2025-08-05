import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/chat/')({
  component: Chat,
});

function Chat() {
  return <div>Chat Page</div>;
}
