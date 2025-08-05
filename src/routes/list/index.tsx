import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/list/')({
  component: List,
});

function List() {
  return <div>List Page</div>;
}
