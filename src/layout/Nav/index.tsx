import { memo, useMemo } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import type { LiProps } from './type';
import { Icon } from '@components/Icon';

export const Nav = memo(function Nav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items: Omit<LiProps, 'isActive'>[] = useMemo(
    () => [
      { to: '/home', label: '홈', defaultIcon: 'home', activeIcon: 'home_fill' },
      { to: '/chat', label: '채팅', defaultIcon: 'comment-2', activeIcon: 'comment-2_fill' },
      { to: '/list', label: '소분 내역', defaultIcon: 'checkbox-list', activeIcon: 'checkbox-list' },
      { to: '/user', label: '마이', defaultIcon: 'user', activeIcon: 'user_fill' },
    ],
    []
  );

  return (
    <nav className="fixed bottom-0 left-0 z-50 h-[6.875rem] w-full border-t border-gray-100 bg-[#FAF9F4] px-[1rem]">
      <ul className="flex h-full items-center justify-between">
        {items.map((it) => (
          <Li key={it.to} {...it} isActive={pathname === it.to} />
        ))}
      </ul>
    </nav>
  );
});

const Li = memo(function Li({ to, label, defaultIcon, activeIcon, isActive }: LiProps) {
  return (
    <li className="flex h-[3.75rem] w-[3.75rem] flex-col items-center justify-center gap-[0.5rem]">
      <Link to={to} className="flex w-full flex-col items-center justify-center text-gray-600">
        <Icon icon={isActive ? activeIcon : defaultIcon} className="h-6 w-6" />
        <span className={`label-small-600 ${isActive ? 'text-black' : 'text-gray-600'}`}>{label}</span>
      </Link>
    </li>
  );
});
