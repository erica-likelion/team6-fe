import { Icon } from '@components/Icon';

interface HeaderProps {
  title: string;
  memberCount: number;
}

export const Header = ({ title, memberCount }: HeaderProps) => {
  return (
    <header className="flex h-[3.25rem] items-center justify-between px-[1rem]">
      <Icon icon="chevron" />
      {/** 뒤로가기 */}
      <div className="flex items-center gap-[0.5rem]">
        <span className="label-medium font-bold">{title}</span>
        <span className="label-xsmall text-gray-500">{memberCount}</span>
      </div>
      <Icon icon="more-menu" className="rotate-90" />
      {/** 게시물 보러가기, 나가기, 신고하기 게시물 id, chat id 관련 작업 */}
    </header>
  );
};
