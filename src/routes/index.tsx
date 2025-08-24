import Login from '@features/auth/components/Login';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div>
      <Login />
    </div>
  );
}
