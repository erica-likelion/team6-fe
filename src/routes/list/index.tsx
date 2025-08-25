import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { fetchMyPosts } from '@services/post/supabase';
import type { PostItem } from '@services/post/supabase';

export const Route = createFileRoute('/list/')({
  component: List,
});

function List() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchMyPosts();
        const postsWithHref = data.map((post) => ({
          ...post,
          href: `/article/${post.id}`,
        }));
        setPosts(postsWithHref);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-4">불러오는 중…</div>;

  return (
    <div className="p-4">
      <h1 className="mb-4 text-lg font-bold">내 게시물 목록</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500">게시물이 없습니다</p>
      ) : (
        <ul className="space-y-2">
          {posts.map((p) => (
            <li key={p.id} className="rounded-md border border-gray-200 p-3 hover:bg-gray-50">
              <Link to="/article/$id" params={{ id: 'a' }}>
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm text-gray-500">{p.created_at}</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
