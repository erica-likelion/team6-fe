import { Post } from '@features/post/components/Post';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/post/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Post />
    </>
  );
}
