import { Icon } from '@components/Icon';
import { Link } from '@tanstack/react-router';

export const FloatingButton = () => {
  return (
    <Link to="/post">
      <button className="border-secondary-green label-medium bg-primary-green fixed right-[1rem] bottom-[8rem] z-9999 flex items-center gap-[0.38rem] rounded-[2rem] border-1 px-[1.125rem] py-[0.75rem] font-bold text-white shadow-[2px_2px_9.9px_rgba(0,0,0,0.25)]">
        글쓰기
        <Icon icon="edit-pen" width={'1.5rem'} height={'1.5rem'} />
      </button>
    </Link>
  );
};
