// src/components/Button/box-button/BoxButton.tsx
import { useMemo } from 'react';
import type { BoxButtonProps } from './type';
import { colorMap } from '@styles/color';

type ColorDict = Record<string, string>;
const get = (k: string, fb: string) => (colorMap as ColorDict)[k] ?? fb;

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
    medium: 'w-[151px] h-[50px]  rounded-[18px] py-[16px] px-5 text-[16px] leading-[20px] font-bold gap-[6px]',
    small: 'w-[79px]  h-[40px]  rounded-[16px] py-[12px] px-4 text-[14px] leading-[16px] font-bold gap-[6px]',
  };

  const isDisabled = state === 'inactive' || isLoading;

  const buttonStyle = useMemo<React.CSSProperties>(() => {
    if (variant === 'primary') {
      // filled 스타일: 이미지처럼 pressed도 녹색 유지(혹은 약간 더 진하게)
      const bg =
        state === 'inactive'
          ? get('gray-150', '#E9E8E3') // 연회색(이미지 2번째)
          : state === 'pressed'
            ? get('emphasis-green', get('empahsis-green', '#20C271')) // 키 오탈자 대비
            : get('primary-green', '#22C76A');

      return {
        backgroundColor: bg,
        color: get('white', '#FFFFFF'),
        border: 'none',
      };
    }

    // secondary: 흰 배경 유지 + 아웃라인
    const text = state === 'inactive' ? get('gray-300', '#CFCFC8') : get('black', '#121212');

    const border =
      state === 'pressed'
        ? `1px solid ${get('gray-500', '#B0AFA8')}` // pressed: 약간 진한 보더
        : `1px solid ${state === 'inactive' ? get('gray-200', '#E2E1DB') : get('gray-300', '#D4D3CD')}`;

    return {
      backgroundColor: get('white', '#FFFFFF'),
      color: text,
      border,
    };
  }, [variant, state]);

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
        // inactive/로딩 시 더 옅게
        state === 'inactive' || isLoading ? 'pointer-events-none cursor-not-allowed opacity-50' : '',
        className,
      ].join(' ')}
    >
      {isLoading ? (
        <span className="animate-pulse">···</span>
      ) : (
        <>
          {icon && <span className="mr-[6px] flex-shrink-0">{icon}</span>}
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
