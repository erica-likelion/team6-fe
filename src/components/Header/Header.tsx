import { Icon } from '@components/Icon';
import { useRouter } from '@tanstack/react-router';

interface HeaderProps {
  title: string;
  memberCount?: number;
  isMenu?: boolean;
}

export const Header = ({ title, memberCount, isMenu }: HeaderProps) => {
  const route = useRouter();
  return (
    <header className="bg-primary-bg fixed top-0 flex h-[3.25rem] w-full items-center justify-between px-[1rem]">
      <div className="flex h-[2.75rem] w-[2.75rem] items-center justify-center">
        <Icon icon="chevron" onClick={() => route.history.back()} />
      </div>
      {/** 뒤로가기 */}
      <div className="flex items-center gap-[0.5rem]">
        <span className="label-medium font-bold">{title}</span>
        {memberCount && <span className="label-xsmall text-gray-500">{memberCount}</span>}
      </div>
      <div className="flex h-[2.75rem] w-[2.75rem] items-center justify-center">
        {isMenu && <Icon icon="more-menu" className="rotate-90" />}
      </div>
      {/** 게시물 보러가기, 나가기, 신고하기 게시물 id, chat id 관련 작업 */}
    </header>
  );
};
