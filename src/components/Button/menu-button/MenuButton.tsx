import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties, MouseEvent } from 'react';
import type { MenuButtonPanelProps, MenuItem, SplitMenuProps } from './type';
import { colorMap } from '@styles/color';
import { SplitButton } from '@components/Button/split-button/SplitButton';

type ColorDict = Record<string, string>;
const get = (k: string, fb: string) => (colorMap as ColorDict)[k] ?? fb;

function Row({ item, onClick }: { item: MenuItem; onClick: () => void }) {
  const visual: MenuItem['state'] = item.state ?? 'active';
  const isDisabled = !!item.disabled;
  const textColor = visual === 'inactive' ? get('gray-400', '#8F8E88') : get('ivory', '#ECEBE4');
  const bg = visual === 'pressed' ? get('gray-950', '#2F2E2B') : 'transparent';

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      className={[
        'h-[34px] w-full rounded-[10px] px-[12px]',
        'flex items-center',
        isDisabled ? 'cursor-not-allowed opacity-40' : 'hover:bg-black/5',
      ].join(' ')}
      style={{ backgroundColor: bg, color: textColor }}
    >
      {item.leftSlot && <span className="mr-[8px] flex-shrink-0">{item.leftSlot}</span>}
      <span className="truncate text-[16px] leading-[24px] font-bold">{item.label}</span>
      {item.rightSlot && <span className="ml-auto pl-[8px]">{item.rightSlot}</span>}
    </button>
  );
}

export function MenuButtonPanel({ items, className = '' }: MenuButtonPanelProps) {
  return (
    <div
      className={['min-w-[200px] rounded-[12px] p-[8px]', 'bg-[#3F3E3A] text-[#ECEBE4] shadow-lg', className].join(' ')}
    >
      <ul className="space-y-[4px]">
        {items.map((it) => (
          <li key={it.key}>
            <Row
              item={it}
              onClick={() => {
                if (it.disabled) return;
                it.onSelect?.();
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SplitMenu({
  label,
  items,
  state = 'active',
  isOpen,
  onToggle,
  onClick,
  fullWidth = false,
  isLoading = false,
  className = '',
}: SplitMenuProps) {
  const [internal, setInternal] = useState<'active' | 'inactive' | 'pressed'>(state);

  useEffect(() => {
    setInternal(state);
  }, [state]);

  const visual = onClick ? state : internal;

  const containerStyle = useMemo<CSSProperties>(() => {
    const bg =
      visual === 'inactive'
        ? get('gray-200', '#DAD9D1')
        : visual === 'pressed'
          ? get('gray-900', '#272725')
          : get('gray-800', '#3D3C39');
    const text = get('ivory', '#ECEBE4');
    return { backgroundColor: bg, color: text, border: 'none' };
  }, [visual]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
    else setInternal((prev) => (prev === 'pressed' ? 'active' : 'pressed'));
  };

  return (
    <div className={['relative inline-block', className].join(' ')} style={containerStyle}>
      <SplitButton
        label={label}
        state={visual}
        isOpen={!!isOpen}
        onToggle={onToggle}
        onClick={handleClick}
        fullWidth={fullWidth}
        isLoading={isLoading}
      />
      {isOpen ? (
        <div className="absolute top-full left-0 z-50 mt-[8px]">
          <MenuButtonPanel items={items} />
        </div>
      ) : null}
    </div>
  );
}

export default SplitMenu;
