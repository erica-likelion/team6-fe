import Recommendation from '@features/home/components/recommendation/Recommendation';
import RecentPosts from '@features/home/components/recent-posts/RecentPosts';
import SubPageNavBar from './SubPageNavBar';
import FilterBar from './FilterBar';

import { useGroupPosts } from '@hooks/useGroupPosts';
import type { GroupPostType, GroupPostStatus } from '@services/group-post/list';

interface GroupListPageProps {
  title: string;
  fixedType: GroupPostType; // 'shopping' | 'sharing'
}

export default function GroupListPage({ title, fixedType }: GroupListPageProps) {
  const { items, loading, error, setFilter } = useGroupPosts(
    { size: 20, type: fixedType },
    { locked: { type: fixedType } }
  );

  return (
    <div className="min-h-screen w-full bg-[#FAF9F4]">
      <div className="mx-auto max-w-[420px] pb-[76px]">
        <SubPageNavBar title={title} />

        {/* ✅ Supabase 추천 섹션 */}
        <section className="mt-2 px-5">
          <Recommendation useRemote type={fixedType} />
        </section>

        {/* 필터바 */}
        <section className="mt-4 px-5">
          <FilterBar onChange={(f: { type?: GroupPostType; status?: GroupPostStatus }) => setFilter(f)} />
        </section>

        {/* 게시글 리스트 */}
        <section className="mt-4 px-5">
          {loading && <div>불러오는 중…</div>}
          {error && <div>{error}</div>}
          {!loading && !error && <RecentPosts items={items} />}
        </section>
      </div>
    </div>
  );
}
