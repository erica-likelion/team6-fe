import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/mart/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello mart!</div>;
}
