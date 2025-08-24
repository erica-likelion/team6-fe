// routes/post.tsx
import { Select } from '@features/post/components/Select';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/post/')({
  component: PostPage,
});

function PostPage() {
  return <Select />;
}
