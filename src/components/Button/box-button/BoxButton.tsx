import { useMemo } from 'react';
import type { BoxButtonProps } from './type';
import { colorMap } from '@styles/color';

export function BoxButton({
  label,
  size = 'medium',
  variant = 'primary',
  state = 'active',
  icon,
  onClick,
  fullWidth = false,
  isLoading = false,
  className = '',
}: BoxButtonProps) {
  const sizeClasses: Record<string, string> = {
    xlarge: 'w-[343px] h-[56px] rounded-[20px] py-[16px] px-6 text-[16px] leading-[24px] font-bold gap-[6px]',
    large: 'w-[311px] h-[56px] rounded-[20px] py-[16px] px-6 text-[16px] leading-[24px] font-bold gap-[6px]',
    medium: 'w-[151px] h-[50px] rounded-[18px] py-[16px] px-5 text-[16px] leading-[20px] font-bold gap-[6px]',
    small: 'w-[79px] h-[40px] rounded-[16px] py-[12px] px-4 text-[14px] leading-[16px] font-bold gap-[6px]',
  };

  const buttonStyle = useMemo<React.CSSProperties>(() => {
    if (variant === 'primary') {
      return {
        backgroundColor:
          state === 'active'
            ? colorMap['primary-green']
            : state === 'pressed'
              ? colorMap['empahsis-green']
              : colorMap['gray-300'],
        color: colorMap.white,
        border: 'none',
      };
    }
    // secondary = (구) ghost 스타일
    return {
      backgroundColor: state === 'pressed' ? colorMap['gray-100'] : (colorMap['primary-bg'] ?? 'transparent'),
      color: state === 'inactive' ? colorMap['gray-200'] : colorMap['black'],
      border: `1px solid ${state === 'inactive' ? colorMap['gray-200'] : colorMap['gray-300']}`,
    };
  }, [variant, state]);

  const isDisabled = state === 'inactive' || isLoading;

  return (
    <button
      type="button"
      style={buttonStyle}
      onClick={onClick}
      disabled={isDisabled}
      data-variant={variant}
      data-state={state}
      aria-pressed={state === 'pressed'}
      className={[
        'flex items-center justify-center transition',
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        isDisabled ? 'pointer-events-none cursor-not-allowed opacity-60' : '',
        className,
      ].join(' ')}
    >
      {isLoading ? (
        <span className="animate-pulse">···</span>
      ) : (
        <>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
