import { createFileRoute } from '@tanstack/react-router';
import ProfileSection from '../../features/user/components/ProfileSection';
import TrustScore from '../../features/user/components/TrustScore';
import MenuList from '../../features/user/components/MenuList';

export const Route = createFileRoute('/user/')({
  component: User,
});

function User() {
  return (
    <div className="min-h-screen bg-[#FAF9F4]">
      <h1 className="px-5 pt-6 pb-4 text-[24px] leading-[32px] font-bold tracking-[-0.02em] text-black">마이</h1>
      <div className="border-b border-gray-100" />

      <ProfileSection />
      <TrustScore />
      <MenuList />
    </div>
  );
}
