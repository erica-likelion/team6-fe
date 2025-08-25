// src/routes/home.tsx
import { createFileRoute } from '@tanstack/react-router';
import ScheduleBanner from '@features/home/components/schedule-banner/ScheduleBanner';
import ShortcutCards from '@features/home/components/shortcut-cards/ShortcutCards';
import Recommendation from '@features/home/components/recommendation/Recommendation';
import RecentPosts from '@features/home/components/recent-posts/RecentPosts';
import { FloatingButton } from '@features/post/components/FloatingButton';

import { useGroupPosts } from '@hooks/useGroupPosts';

export const Route = createFileRoute('/home/')({
  component: Home,
});

function Home() {
  // ✅ items는 이미 PostItem[] 형태
  const { items, loading, error } = useGroupPosts({ size: 5 }); // 최근 5개만

  return (
    <div className="bg-primary-bg min-h-screen w-full">
      <div className="mx-auto max-w-[420px] pb-[76px]">
        {/* ✅ 더미 prop 제거 */}
        <ScheduleBanner />

        <section className="mt-4 px-5">
          <ShortcutCards />
        </section>

        <section className="mt-6 px-5">
          <Recommendation useRemote />
        </section>

        <section className="mt-6 px-5">
          {loading && <div className="text-center text-gray-500">불러오는 중…</div>}
          {error && <div className="text-center text-red-600">{error}</div>}
          {!loading && !error && <RecentPosts items={items} />}
        </section>
      </div>

      <FloatingButton />
    </div>
  );
}

export default Home;
