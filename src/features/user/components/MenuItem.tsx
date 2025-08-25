import { Icon } from '@components/Icon';

interface MenuItemProps {
  label: string;
  onClick: () => void;
}

export default function MenuItem({ label, onClick }: MenuItemProps) {
  return (
    <button onClick={onClick} className="flex w-full items-center justify-between px-5 py-4">
      <span className="text-[16px] leading-[20px] font-semibold tracking-[-0.02em] text-black">{label}</span>
      <Icon icon="chevron" className="h-5 w-5 rotate-180 text-gray-700" />
    </button>
  );
}
