import Recommendation from '@features/home/components/recommendation/Recommendation';
import RecentPosts from '@features/home/components/recent-posts/RecentPosts';
import SubPageNavBar from './SubPageNavBar';
import FilterBar from './FilterBar';

import type { RecommendCard } from '@features/home/components/recommendation/Recommendation';
import type { PostItem } from '@features/home/components/recent-posts/RecentPosts';

interface GroupListPageProps {
  title: string;
  recommendItems: RecommendCard[];
  posts: PostItem[];
}

export default function GroupListPage({ title, recommendItems, posts }: GroupListPageProps) {
  return (
    <div className="min-h-screen w-full bg-[#FAF9F4]">
      <div className="mx-auto max-w-[420px] pb-[76px]">
        {/* ✅ 상단 네비게이션 */}
        <SubPageNavBar title={title} />

        {/* ✅ 추천 섹션 */}
        <section className="mt-2 px-5">
          <Recommendation items={recommendItems} />
        </section>

        {/* ✅ 필터바 */}
        <section className="mt-4 px-5">
          <FilterBar />
        </section>

        {/* ✅ 게시글 리스트 */}
        <section className="mt-4 px-5">
          <RecentPosts items={posts} />
        </section>
      </div>
    </div>
  );
}
