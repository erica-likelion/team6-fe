// FabButton.tsx
import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import { colorMap } from '@styles/color';
import type { FabButtonProps } from './type';

type ColorDict = Record<string, string>;
const get = (k: string, fb: string) => (colorMap as ColorDict)[k] ?? fb;

export function FabButton({
  label,
  icon,
  state = 'active',
  variant = 'primary',
  fixed = true,
  position = { bottom: 24, right: 24 },
  onClick,
  className = '',
  'aria-label': ariaLabel,
  iconPosition = 'left',
}: FabButtonProps & { iconPosition?: 'left' | 'right' }) {
  const isIconOnly = !label || label.trim() === '';

  const baseClasses = [
    'inline-flex items-center justify-center',
    isIconOnly
      ? 'w-[56px] h-[56px] rounded-full'
      : 'w-[111px] h-[48px] rounded-[32px] py-[12px] px-[18px] font-bold gap-[6px]',
    'transition active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2',
  ].join(' ');

  const style = useMemo<CSSProperties>(() => {
    const common: CSSProperties = {
      position: fixed ? 'fixed' : undefined,
      right: fixed ? position.right : undefined,
      left: fixed ? position.left : undefined,
      top: fixed ? position.top : undefined,
      zIndex: 50,
      pointerEvents: 'auto',
    };
    if (fixed && position.bottom != null) {
      common.bottom = `calc(${position.bottom}px + env(safe-area-inset-bottom, 0px))`;
    }

    if (variant === 'primary') {
      const bg =
        state === 'inactive'
          ? get('gray-300', '#E5E5E5')
          : state === 'pressed'
            ? get('emphasis-green', '#3CCF61')
            : get('primary-green', '#4DDB6D');

      return {
        ...common,
        backgroundColor: bg,
        color: '#fff',
        border: `1px solid ${get('primary-green-secondary', '#B5EAA7')}`,
        boxShadow: '2px 2px 10px rgba(0,0,0,0.25)',
      };
    }

    return {
      ...common,
      backgroundColor: state === 'inactive' ? get('gray-200', '#DAD9D1') : get('gray-50', '#F7F7F7'),
      color: state === 'inactive' ? get('gray-400', '#BDBDBD') : get('black', '#000'),
      border: `1px solid ${get('gray-300', '#E0E0E0')}`,
      boxShadow: '2px 2px 10px rgba(0,0,0,0.25)',
    };
  }, [variant, state, fixed, position]);

  const isDisabled = state === 'inactive';

  return (
    <button
      type="button"
      aria-label={ariaLabel ?? label ?? 'fab-button'}
      onClick={onClick}
      disabled={isDisabled}
      style={style}
      className={[baseClasses, isDisabled ? 'cursor-not-allowed opacity-60' : 'focus:ring-[#4DDB6D]', className].join(
        ' '
      )}
    >
      {isIconOnly ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : iconPosition === 'left' ? (
        <>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span className="truncate">{label}</span>
        </>
      ) : (
        <>
          <span className="truncate">{label}</span>
          {icon && <span className="flex-shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
}
