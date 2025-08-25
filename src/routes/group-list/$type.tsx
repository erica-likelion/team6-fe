import { createFileRoute, useParams } from '@tanstack/react-router';
import GroupListPage from '@features/group-list/components/GroupListPage';

export const Route = createFileRoute('/group-list/$type')({
  component: GroupListRoute,
});

function GroupListRoute() {
  const { type } = useParams({ from: '/group-list/$type' }); // "mart" | "division"

  // --- 페이지 제목 및 타입 고정값 ---
  const pageTitle = type === 'mart' ? '장보기 소분 모임' : '품목 별 소분';
  const fixedType = type === 'mart' ? 'shopping' : 'sharing';

  return <GroupListPage title={pageTitle} fixedType={fixedType} />;
}

export default GroupListRoute;
