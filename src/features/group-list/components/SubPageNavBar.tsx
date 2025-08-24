// src/features/group-list/components/SubPageNavBar.tsx
import { Icon } from '@components/Icon';

interface SubPageNavBarProps {
  title: string;
  onSearch?: () => void;
}

export default function SubPageNavBar({ title, onSearch }: SubPageNavBarProps) {
  return (
    <div className="flex items-center justify-between bg-[#FAF9F4] px-5 py-4">
      <button type="button" onClick={() => window.history.back()}>
        <Icon icon="chevron" className="h-6 w-6 text-gray-800" />
      </button>

      <h1 className="text-[16px] font-bold">{title}</h1>

      <button type="button" onClick={onSearch}>
        <Icon icon="search" className="h-6 w-6 text-gray-800" />
      </button>
    </div>
  );
}
