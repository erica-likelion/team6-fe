import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/user/')({
  component: User,
});

function User() {
  return <div>User Page</div>;
}
