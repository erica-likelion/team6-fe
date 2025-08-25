// src/routes/home.tsx
import { createFileRoute } from '@tanstack/react-router';
import ScheduleBanner from '@features/home/components/schedule-banner/ScheduleBanner';
import ShortcutCards from '@features/home/components/shortcut-cards/ShortcutCards';
import Recommendation from '@features/home/components/recommendation/Recommendation';
import RecentPosts from '@features/home/components/recent-posts/RecentPosts';

export const Route = createFileRoute('/home/')({
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen w-full bg-[#FAF9F4]">
      <div className="mx-auto max-w-[420px] pb-[76px]">
        {/* ✅ 배너 전체는 ScheduleBanner에서 관리 */}
        <ScheduleBanner />

        {/* ✅ 아래는 아이보리 배경 */}
        <section className="mt-4 px-5">
          <ShortcutCards />
        </section>
        <section className="mt-6 px-5">
          <Recommendation />
        </section>
        <section className="mt-6 px-5">
          <RecentPosts />
        </section>
      </div>
    </div>
  );
}
