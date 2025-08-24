import { Post } from '@features/post/components/Post';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/post/write/')({
  validateSearch: z.object({
    type: z.enum(['party', 'item']).default('party'),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Post />;
}
