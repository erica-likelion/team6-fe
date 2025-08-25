import Recommendation from '@features/home/components/recommendation/Recommendation';
import RecentPosts from '@features/home/components/recent-posts/RecentPosts';
import SubPageNavBar from './SubPageNavBar';
import FilterBar from './FilterBar';

import type { RecommendCard } from '@features/home/components/recommendation/type';
import type { PostItem } from '@features/home/components/recent-posts/type';

interface GroupListPageProps {
  title: string;
  recommendItems: RecommendCard[];
  posts?: PostItem[]; // ← optional
}

export default function GroupListPage({
  title,
  recommendItems,
  posts = [], // ← 기본값으로 빈 배열
}: GroupListPageProps) {
  return (
    <div className="min-h-screen w-full bg-[#FAF9F4]">
      <div className="mx-auto max-w-[420px] pb-[76px]">
        <SubPageNavBar title={title} />
        <section className="mt-2 px-5">
          <Recommendation items={recommendItems} />
        </section>
        <section className="mt-4 px-5">
          <FilterBar />
        </section>
        <section className="mt-4 px-5">
          <RecentPosts items={posts} />
        </section>
      </div>
    </div>
  );
}
