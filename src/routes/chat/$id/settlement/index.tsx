import { Settlement } from '@features/chat/components/Settlement';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/chat/$id/settlement/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Settlement title="정산 요청하기" />
    </>
  );
}
