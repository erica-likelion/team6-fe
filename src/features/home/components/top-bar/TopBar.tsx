// src/features/home/components/top-bar/TopBar.tsx
import type { TopBarProps } from './type';
import { Icon } from '@components/Icon';

export default function TopBar({
  title = '홈',
  location = '금정동',
  onClickSearch,
  onClickAlarm,
  className = '',
}: TopBarProps) {
  return (
    <div className={`flex h-14 items-center justify-between px-5 ${className}`}>
      <div className="flex items-center gap-2">
        <span className="text-[20px] leading-none font-extrabold text-white">{title}</span>
        <span className="inline-flex items-center gap-1 text-[13px] text-white">
          <Icon icon="map-marker_fill" className="h-[14px] w-[14px] text-white" />
          {location}
        </span>
      </div>
      <div className="flex items-center gap-5">
        <button aria-label="검색" onClick={onClickSearch ?? (() => (window.location.href = '/search'))} className="p-1">
          <Icon icon="search" className="h-5 w-5 text-white" />
        </button>
        <button
          aria-label="알림"
          onClick={onClickAlarm ?? (() => (window.location.href = '/notifications'))}
          className="p-1"
        >
          <Icon icon="bell" className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
}
