import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/division/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello division!</div>;
}
