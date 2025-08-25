import { useMemo, useState } from 'react';
import type { IconButtonProps } from './type';
// 프로젝트에 이미 있는 아이콘 맵을 사용 (이미 존재: /src/assets/icons/*.svg -> iconMap)
import { iconMap } from '@components/Icon/map';

export function IconButton({
  icon,
  label,
  state = 'inactive',
  onClick,
  disabled = false,
  className = '',
  size = 'md',
}: IconButtonProps) {
  const [pressed, setPressed] = useState(false);

  const Icon = iconMap[icon];
  const isActive = state === 'active';
  const isPressed = state === 'pressed' || pressed;

  // 사이즈 토큰
  const { iconSize, fontClasses } = useMemo(() => {
    if (size === 'sm') {
      return {
        iconSize: 22,
        fontClasses: 'text-[12px] leading-[16px]',
      };
    }
    return {
      iconSize: 28,
      fontClasses: 'text-[14px] leading-[20px]',
    };
  }, [size]);

  // 색 / 굵기
  const labelClasses = (isActive ? 'text-black font-extrabold' : 'text-neutral-500 font-semibold') + ' ' + fontClasses;

  // 아이콘 stroke/fill 상태 (SVG가 stroke형일 때와 fill형일 때를 모두 커버)
  const iconCommon = {
    width: iconSize,
    height: iconSize,
    'aria-hidden': true,
  } as const;

  const iconProps = isActive
    ? { ...iconCommon, fill: 'currentColor', stroke: 'currentColor', className: 'text-black' }
    : isPressed
      ? { ...iconCommon, fill: 'currentColor', stroke: 'currentColor', className: 'text-neutral-700' }
      : { ...iconCommon, fill: 'none', stroke: 'currentColor', className: 'text-neutral-500' };

  return (
    <button
      type="button"
      aria-pressed={isActive}
      disabled={disabled}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onClick={onClick}
      className={[
        'inline-flex flex-col items-center justify-center gap-1 select-none',
        'disabled:cursor-not-allowed disabled:opacity-40',
        isPressed && !isActive ? 'scale-[0.98]' : '',
        className,
      ].join(' ')}
    >
      {Icon && <Icon {...iconProps} />}
      <span className={labelClasses}>{label}</span>
    </button>
  );
}
