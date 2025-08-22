import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import type { SelectionButtonProps } from './type';
import { colorMap } from '@styles/color';

type ColorDict = Record<string, string>;
const get = (k: string, fb: string) => (colorMap as ColorDict)[k] ?? fb;

export function SelectionButton({
  state = 'deselected',
  disabled = false,
  onToggle,
  className = '',
  icon,
  'aria-label': ariaLabel,
  mode = 'check',
}: SelectionButtonProps) {
  const isSelected = state === 'selected';

  const outerStyle = useMemo<CSSProperties>(() => {
    return {
      width: 22,
      height: 22,
      borderRadius: 40,
      padding: 2,
      backgroundColor: isSelected ? get('primary-green', '#4DDB6D') : 'transparent',
      border: isSelected ? 'none' : `1px solid ${get('gray-300', '#B9B8AE')}`,
      color: isSelected ? get('white', '#FFFFFF') : get('gray-300', '#B9B8AE'),
    };
  }, [isSelected]);

  const handleClick = () => {
    if (disabled) return;
    onToggle?.(isSelected ? 'deselected' : 'selected');
  };

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      aria-label={ariaLabel ?? (isSelected ? 'Selected' : 'Deselected')}
      disabled={disabled}
      onClick={handleClick}
      style={outerStyle}
      className={[
        'inline-flex items-center justify-center',
        disabled ? 'cursor-not-allowed opacity-60' : 'transition active:scale-[0.98]',
        className,
      ].join(' ')}
    >
      {mode === 'radio' ? (
        <span
          aria-hidden
          className="block rounded-full"
          style={{ width: 9, height: 9, backgroundColor: 'currentColor' }}
        />
      ) : (
        (icon ?? (
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 12.5l4 4 8-9"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ))
      )}
    </button>
  );
}
export default SelectionButton;
