import { useEffect, useState } from 'react';
import {
  getGroupPostsFromSupabase,
  type GroupGetPostsQuery,
  type GroupPageMeta,
} from '@services/group-post/list';
import type { PostItem } from '@features/home/components/recent-posts/type';

interface UseGroupPostsState {
  items: PostItem[];
  page: GroupPageMeta | null;
  loading: boolean;
  error: string | null;
}

interface UseGroupPostsOptions {
  /** 특정 필터 고정 (ex. 그룹 리스트에서 type 고정) */
  locked?: Partial<Pick<GroupGetPostsQuery, 'type' | 'status'>>;
}

export function useGroupPosts(
  initial: GroupGetPostsQuery = {},
  options: UseGroupPostsOptions = {},
) {
  const { locked } = options;

  const [query, setQuery] = useState<GroupGetPostsQuery>({ size: 20, ...initial, ...locked });
  const [state, setState] = useState<UseGroupPostsState>({
    items: [],
    page: null,
    loading: false,
    error: null,
  });

  const fetchPosts = async (overwrite?: Partial<GroupGetPostsQuery>) => {
    const effective: GroupGetPostsQuery = { ...locked, ...query, ...overwrite, ...locked };

    setQuery(effective);
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = await getGroupPostsFromSupabase(effective);
      setState({ items: res.items, page: res.page, loading: false, error: null });
    } catch (e: any) {
      setState((s) => ({
        ...s,
        loading: false,
        error: e?.message ?? 'Failed to load posts',
      }));
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locked?.type, locked?.status]);

  return {
    ...state,
    query,
    refetch: fetchPosts,
    setPage: (page: number) => fetchPosts({ page }),
    setFilter: (f: Pick<GroupGetPostsQuery, 'type' | 'status'>) => fetchPosts({ page: 0, ...f }),
    locked,
  };
}
