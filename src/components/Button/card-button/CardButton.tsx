import groceryTint from '@assets/images/64_GroceryTint.webp';
import { Icon } from '@components/Icon';
import { colorMap } from '@styles/color';
import type { CardButtonProps } from './type';

export function CardButton({
  title,
  description,
  selected,
  status,
  state,
  onChange,
  onClick,
  rightTopIcon,
  disabled = false,
  className = '',
  testId,
  ariaLabel,
}: CardButtonProps) {
  const isSelected = typeof selected === 'boolean' ? selected : (status ?? state) === 'selected';
  const grayBorder = colorMap['gray-100'];

  const handlePress = () => {
    if (onChange) onChange(isSelected ? 'deselected' : 'selected');
    if (onClick) onClick();
  };

  return (
    <button
      type="button"
      data-testid={testId}
      aria-label={ariaLabel || title}
      aria-pressed={isSelected}
      disabled={disabled}
      onClick={handlePress}
      className={[
        'relative h-[144px] w-[167px] rounded-[28px] text-left transition-all duration-150 select-none',
        isSelected ? 'bg-[linear-gradient(180deg,#4DDB6D_0%,#86F09B_100%)] p-[2px]' : 'border-2 bg-white',
        disabled
          ? 'cursor-not-allowed opacity-50'
          : 'hover:shadow-sm focus:ring-4 focus:ring-black/10 focus:outline-none',
        className,
      ].join(' ')}
      style={!isSelected ? { borderColor: grayBorder } : undefined}
    >
      <div className="relative h-full w-full rounded-[26px] bg-white p-4 pr-[64px]">
        <p className="line-clamp-2 overflow-hidden text-[16px] leading-[20px] font-bold break-keep text-ellipsis text-[#1C1D1A]">
          {title}
        </p>
        {description && (
          <p className="mt-1 line-clamp-2 overflow-hidden text-[12px] leading-[16px] break-keep text-ellipsis text-[#9B9C96]">
            {description}
          </p>
        )}
        <div className="absolute top-1/2 right-[82px] z-10 -translate-y-1/2">
          {rightTopIcon ?? <Icon icon="chevron" style="w-4 h-4 rotate-180" iconColor="gray-300" />}
        </div>
        <img
          src={groceryTint}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-4 bottom-4 z-0 h-auto w-[56px] select-none"
        />
      </div>
    </button>
  );
}
