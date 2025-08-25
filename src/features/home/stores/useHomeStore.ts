
import { create } from 'zustand';
import type { RecommendCard } from '../components/recommendation/type';
import type { PostItem } from '../components/recent-posts/type';

interface ShortcutItem {
  key: string;
  label: string;
  iconName?: string;
  href?: string;
}

export interface HomeState {
  shortcuts: ShortcutItem[];
  recommendCards: RecommendCard[];
  recentPosts: PostItem[]; // ✅ 에러 해결됨

  setShortcuts: (v: ShortcutItem[]) => void;
  setRecommendCards: (v: RecommendCard[]) => void;
  setRecentPosts: (v: PostItem[]) => void;
}

export const useHomeStore = create<HomeState>((set) => ({
  // ----- 초기 더미 데이터 -----
  shortcuts: [
    { key: 'mart',  label: '장보기 소분 모임', href: '/mart',  iconName: 'basket' },
    { key: 'items', label: '품목 별 소분',     href: '/items', iconName: 'carrot' },
  ],
  recommendCards: [
    {
      key: 'rc1',
      title: '광명 코스트코에서 고기 같이 장봐요',
      caption: '나와 비슷한 사용자의 글이에요',
      time: new Date().toISOString(),
      imageUrl: '',
      href: '/post/1',
    },
    {
      key: 'rc2',
      title: '광명 코스트코에서 고기 같이 장봐요',
      caption: '이전에 1번 거래했어요',
      time: new Date().toISOString(),
      imageUrl: '',
      href: '/post/2',
    },
  ],
  recentPosts: [
    {
      id: 'p1',
      title: 'Post Title',
      body: 'Body',
      badges: [
        { text: '유사도 99%', tone: 'green' },
        { text: '장보기', tone: 'text' }, // ✅ 수정
      ],
      place: '홈플러스 안양',
      time: new Date().toISOString(),
      people: '1/4',
      href: '/post/1',
    },
    {
      id: 'p2',
      title: 'Post Title',
      body: 'Body',
      badges: [
        { text: '유사도 99%', tone: 'green' }
      ],
      place: '홈플러스 안양',
      time: new Date().toISOString(),
      people: '1/4',
      href: '/post/2',
    },
    {
      id: 'p3',
      title: 'Post Title',
      body: 'Body',
      place: '홈플러스 안양',
      time: new Date().toISOString(),
      people: '1/4',
    },
  ],

  // ----- setters -----
  setShortcuts: (v) => set({ shortcuts: v }),
  setRecommendCards: (v) => set({ recommendCards: v }),
  setRecentPosts: (v) => set({ recentPosts: v }),
}));
