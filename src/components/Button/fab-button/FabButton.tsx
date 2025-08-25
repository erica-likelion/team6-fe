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
}: FabButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center gap-[6px] ' +
    'w-[111px] h-[48px] rounded-[32px] ' +
    'py-[12px] pl-[18px] pr-[18px] ' +
    'text-white font-bold';

  const style = useMemo<CSSProperties>(() => {
    if (variant === 'primary') {
      const bg =
        state === 'inactive'
          ? get('gray-300', '#E5E5E5')
          : state === 'pressed'
            ? get('emphasis-green', '#3CCF61')
            : get('primary-green', '#4DDB6D');

      return {
        backgroundColor: bg,
        border: `1px solid ${get('primary-green-secondary', '#B5EAA7')}`,
        boxShadow: '2px 2px 9.9px rgba(0,0,0,0.25)',
        position: fixed ? 'fixed' : undefined,
        bottom: fixed ? position.bottom : undefined,
        right: fixed ? position.right : undefined,
        left: fixed ? position.left : undefined,
        top: fixed ? position.top : undefined,
      };
    }

    return {
      backgroundColor: state === 'inactive' ? get('gray-200', '#DAD9D1') : get('gray-50', '#F7F7F7'),
      color: state === 'inactive' ? get('gray-400', '#BDBDBD') : get('black', '#000'),
      border: `1px solid ${get('gray-300', '#E0E0E0')}`,
      boxShadow: '2px 2px 9.9px rgba(0,0,0,0.25)',
      position: fixed ? 'fixed' : undefined,
      bottom: fixed ? position.bottom : undefined,
      right: fixed ? position.right : undefined,
      left: fixed ? position.left : undefined,
      top: fixed ? position.top : undefined,
    };
  }, [variant, state, fixed, position]);

  const isDisabled = state === 'inactive';

  return (
    <button
      type="button"
      aria-label={ariaLabel ?? label}
      onClick={onClick}
      disabled={isDisabled}
      style={style}
      className={[baseClasses, isDisabled ? 'cursor-not-allowed opacity-60' : 'active:scale-[0.99]', className].join(
        ' '
      )}
    >
      <span className="truncate">{label}</span>
      <span className="flex-shrink-0">{icon}</span>
    </button>
  );
}
