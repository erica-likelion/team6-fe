import { useMemo, useState } from 'react';
import type { CSSProperties, MouseEventHandler } from 'react';
import type { SplitButtonProps } from './type';
import { colorMap } from '@styles/color';
import { Icon } from '@components/Icon';

type ColorDict = Record<string, string>;
const get = (k: string, fb: string) => (colorMap as ColorDict)[k] ?? fb;

export function SplitButton({
  label,
  state = 'active',
  isOpen,
  onClick,
  onToggle,
  leftIcon,
  fullWidth = false,
  isLoading = false,
  className = '',
}: SplitButtonProps) {
  const [internalOpen, setInternalOpen] = useState<boolean>(!!isOpen);
  const [pressed, setPressed] = useState(false);

  const open = isOpen ?? internalOpen;
  const isDisabled = state === 'inactive' || isLoading;
  const visualState = !isDisabled && pressed ? 'pressed' : state;

  const containerStyle = useMemo<CSSProperties>(() => {
    const bg =
      visualState === 'inactive'
        ? get('gray-200', '#DAD9D1')
        : visualState === 'pressed'
          ? get('gray-900', '#272725')
          : get('gray-800', '#3D3C39');
    const text = get('white', '#FFFFFF');
    return { backgroundColor: bg, color: text, border: 'none' };
  }, [visualState]);

  const handleToggleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (onToggle) onToggle();
    else setInternalOpen((v) => !v);
  };

  const pressOn = () => !isDisabled && setPressed(true);
  const pressOff = () => setPressed(false);

  return (
    <div
      role="group"
      style={containerStyle}
      data-state={visualState}
      aria-expanded={open}
      aria-disabled={isDisabled}
      className={[
        'inline-flex items-center justify-between select-none',
        'h-[34px] rounded-[10px]',
        fullWidth ? 'w-full' : 'w-fit',
        isDisabled ? 'pointer-events-none opacity-60' : '',
        className,
      ].join(' ')}
    >
      <button
        type="button"
        onClick={onClick}
        disabled={isDisabled}
        onPointerDown={pressOn}
        onPointerUp={pressOff}
        onPointerLeave={pressOff}
        className={[
          'flex h-full flex-grow items-center',
          'pr-0 pl-[12px]',
          'text-[16px] leading-[24px] font-bold',
        ].join(' ')}
      >
        {leftIcon && <span className="mr-[8px] flex-shrink-0">{leftIcon}</span>}
        <span className="truncate">{label}</span>
      </button>

      <button
        type="button"
        aria-label={open ? 'collapse menu' : 'expand menu'}
        onClick={handleToggleClick}
        disabled={isDisabled}
        onPointerDown={pressOn}
        onPointerUp={pressOff}
        onPointerLeave={pressOff}
        className="flex h-full items-center justify-center pr-[8px] pl-[8px]"
      >
        <Icon
          icon="chevron"
          iconColor="white"
          style={[
            'w-[16px] h-[16px]',
            '[transform-box:fill-box] [transform-origin:center]',
            'transition-transform duration-150 ease-out',
            open ? 'rotate-270' : 'rotate-90',
          ].join(' ')}
        />
      </button>
    </div>
  );
}

export default SplitButton;
