// src/routes/home.tsx
import { createFileRoute } from '@tanstack/react-router';
import ScheduleBanner from '@features/home/components/schedule-banner/ScheduleBanner';
import ShortcutCards from '@features/home/components/shortcut-cards/ShortcutCards';
import Recommendation from '@features/home/components/recommendation/Recommendation';
import RecentPosts from '@features/home/components/recent-posts/RecentPosts';
import { FloatingButton } from '@features/post/components/FloatingButton';
export const Route = createFileRoute('/home/')({
  component: Home,
});

function Home() {
  return (
    <div className="bg-primary-bg min-h-screen w-full">
      <div className="mx-auto max-w-[420px] pb-[76px]">
        <ScheduleBanner type="shopping" />
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
      <FloatingButton />
    </div>
  );
}

export default Home;
