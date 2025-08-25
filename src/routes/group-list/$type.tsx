import { createFileRoute, useParams } from '@tanstack/react-router';
import GroupListPage from '@features/group-list/components/GroupListPage';

export const Route = createFileRoute('/group-list/$type')({
  component: GroupListRoute,
});

function GroupListRoute() {
  const { type } = useParams({ from: '/group-list/$type' });
  // "mart" 또는 "division"

  // --- 더미 데이터 (나중에 API로 교체) ---
  const recommendItems =
    type === 'mart'
      ? [
          {
            key: 'r1',
            title: '광명 코스트코에서 고기 같이 장봐요',
            caption: '이전에 1번 거래했어요',
            time: new Date().toISOString(),
            href: '/post/1',
          },
          {
            key: 'r2',
            title: '홈플러스 장보러 같이 가실 분',
            caption: '매일 업데이트돼요',
            time: new Date().toISOString(),
            href: '/post/2',
          },
        ]
      : [
          {
            key: 'r3',
            title: '귤 5kg 소분 같이 하실 분',
            caption: '나와 비슷한 사용자의 글이에요',
            time: new Date().toISOString(),
            href: '/post/3',
          },
          {
            key: 'r4',
            title: '닭가슴살 소분 모집',
            caption: '이전에 2번 거래했어요',
            time: new Date().toISOString(),
            href: '/post/4',
          },
        ];

  const posts =
    type === 'mart'
      ? [
          {
            id: 'p1',
            title: '코스트코 장보기 같이 하실 분',
            body: '광명점에서 오후 2시에 장볼 예정입니다',
            badges: [{ text: '유사도 99%', tone: 'green' }],
            place: '코스트코 광명',
            time: new Date().toISOString(),
            people: '1/4',
            href: '/post/1',
          },
        ]
      : [
          {
            id: 'p2',
            title: '귤 소분 3명 구합니다',
            body: '제철 귤 소분할 분 모집해요',
            badges: [{ text: '유사도 95%', tone: 'green' }],
            place: '홈플러스 안양',
            time: new Date().toISOString(),
            people: '2/4',
            href: '/post/2',
          },
        ];

  // --- 페이지 제목 ---
  const pageTitle = type === 'mart' ? '장보기 소분 모임' : '품목 별 소분';

  return <GroupListPage title={pageTitle} recommendItems={recommendItems} posts={posts} />;
}
