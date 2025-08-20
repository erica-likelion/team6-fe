// src/components/Button/menu-button/SplitMenu.tsx
// src/components/Button/menu-button/SplitMenu.tsx
import { useEffect, useMemo, useRef, useState, useLayoutEffect } from 'react';
import type { CSSProperties, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import type { MenuButtonPanelProps, MenuItem, SplitMenuProps } from './type';
import { colorMap } from '@styles/color';
import { SplitButton } from '@components/Button/split-button/SplitButton';

type ColorDict = Record<string, string>;
const get = (k: string, fb: string) => (colorMap as ColorDict)[k] ?? fb;

/* ───────── Row (단일 아이템) ───────── */
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

/* ───────── Panel ───────── */
export function MenuButtonPanel({ items, className = '' }: MenuButtonPanelProps) {
  return (
    <div
      className={['rounded-[12px] p-[8px] shadow-lg', 'bg-[#3F3E3A] text-[#ECEBE4]', 'min-w-[200px]', className].join(
        ' '
      )}
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

/* ───────── SplitMenu ───────── */
type Align = 'start' | 'end';
interface SplitMenuExtraProps {
  align?: Align; // 패널 정렬(좌/우)
  matchTriggerWidth?: boolean; // 패널 최소너비 = 트리거 너비
  usePortal?: boolean; // 포털 사용(겹침 방지)
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
  align = 'start',
  matchTriggerWidth = true,
  usePortal = true,
}: SplitMenuProps & SplitMenuExtraProps) {
  const [internal, setInternal] = useState<'active' | 'inactive' | 'pressed'>(state);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => setInternal(state), [state]);
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

  /* ----- 포털 렌더링용 위치/너비 계산 ----- */
  const [coords, setCoords] = useState<{ left: number; right: number; top: number; width: number } | null>(null);

  const computeCoords = () => {
    const el = wrapperRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setCoords({
      left: r.left,
      right: window.innerWidth - r.right,
      top: r.bottom + 8, // 8px 간격
      width: r.width,
    });
  };

  useLayoutEffect(() => {
    if (!isOpen || !usePortal) return;
    computeCoords();
    const onScroll = () => computeCoords();
    const onResize = () => computeCoords();
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onResize);
    };
  }, [isOpen, usePortal]);

  /* ----- non-portal: 트리거 width 추적 (✔ 옵셔널 체이닝 없음) ----- */
  const [triggerWidth, setTriggerWidth] = useState<number | null>(null);
  useEffect(() => {
    if (usePortal || !matchTriggerWidth) return;

    const el = wrapperRef.current;
    if (!el) return;

    const update = () => setTriggerWidth(el.offsetWidth);
    update();

    let ro: ResizeObserver | undefined;
    type ROType = new (cb: ResizeObserverCallback) => ResizeObserver;

    const RO: ROType | undefined =
      typeof window !== 'undefined' && 'ResizeObserver' in window
        ? (window as unknown as { ResizeObserver: ROType }).ResizeObserver
        : undefined;

    if (RO) {
      ro = new RO(() => update());
      ro.observe(el);
    } else {
      window.addEventListener('resize', update);
    }

    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', update);
    };
  }, [usePortal, matchTriggerWidth]);

  const alignClass = align === 'end' ? 'right-0' : 'left-0';

  return (
    // 라운드/클리핑 유지
    <div
      ref={wrapperRef}
      className={['relative inline-block overflow-hidden rounded-[10px]', className].join(' ')}
      style={containerStyle}
    >
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
        usePortal && coords ? (
          createPortal(
            <div
              style={{
                position: 'fixed',
                zIndex: 9999,
                top: coords.top,
                left: align === 'end' ? undefined : coords.left,
                right: align === 'end' ? coords.right : undefined,
                minWidth: matchTriggerWidth ? coords.width : undefined,
              }}
            >
              <MenuButtonPanel items={items} />
            </div>,
            document.body
          )
        ) : (
          <div
            className={['absolute top-full z-50 mt-[8px]', alignClass].join(' ')}
            style={matchTriggerWidth && triggerWidth ? { minWidth: triggerWidth } : undefined}
          >
            <MenuButtonPanel items={items} />
          </div>
        )
      ) : null}
    </div>
  );
}

export default SplitMenu;
