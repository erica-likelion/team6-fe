import ArticleDetail from '@features/article/components/ArticleDetail';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/article/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <ArticleDetail />
    </div>
  );
}
