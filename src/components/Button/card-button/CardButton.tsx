import { colorMap } from '@styles/color';
import groceryTint from '@assets/images/64_GroceryTint.webp';
import type { CardButtonProps } from './type';

export function CardButton(props: CardButtonProps) {
  const {
    title,
    description,
    selected,
    status,
    state,
    onChange,
    onClick,
    variant = 'right-graphic',
    width = 167,
    height = 144,
    radius = 28,
    showChevron = true,
    rightTopIcon,
    graphic,
    disabled = false,
    className = '',
    testId,
    ariaLabel,
  } = props;

  const isSelected = typeof selected === 'boolean' ? selected : (status ?? state) === 'selected';

  const borderDefault = colorMap['gray-100'] ?? '#E9E7E2';
  const borderSelected = '#4DDB6D';

  const handlePress = () => {
    onChange?.(isSelected ? 'deselected' : 'selected');
    onClick?.();
  };

  // ---- graphic defaults ----
  const g = graphic ?? { src: groceryTint, size: 56, position: 'bottom-right' as const };
  const gSize = g.size ?? 56;

  // 공통 텍스트 스타일 (SUIT, 자간 -2%)
  const titleStyle = {
    fontFamily:
      'SUIT, Pretendard, system-ui, -apple-system, Segoe UI, Roboto, Apple SD Gothic Neo, Noto Sans KR, sans-serif',
    letterSpacing: '-0.02em',
  } as const;
  const descStyle = titleStyle;

  return (
    <button
      type="button"
      data-testid={testId}
      aria-label={ariaLabel || title}
      aria-pressed={isSelected}
      disabled={disabled}
      onClick={handlePress}
      className={[
        'relative overflow-hidden text-left transition-all duration-150 select-none',
        disabled ? 'cursor-not-allowed opacity-50' : 'focus:outline-none',
        className,
      ].join(' ')}
      style={{
        width,
        height,
        borderRadius: radius,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: isSelected ? borderSelected : borderDefault,
        backgroundColor: '#fff',
      }}
    >
      {variant === 'right-graphic' ? (
        <>
          {/* 텍스트: 좌상단 박스(145×112) */}
          <div className="absolute z-10" style={{ left: 16, top: 16, width: 145, height: 112 }}>
            <div className="flex h-full w-full flex-col gap-1">
              <p
                className="min-w-0 overflow-hidden text-[16px] leading-[20px] font-bold text-ellipsis whitespace-nowrap text-[#1C1D1A]"
                style={titleStyle}
              >
                {title}
              </p>
              {description && (
                <p
                  className="min-w-0 overflow-hidden text-[12px] leading-[16px] font-medium text-ellipsis whitespace-nowrap text-[#86857C]"
                  style={descStyle}
                >
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* 체브론: 텍스트 박스 '밖' 우상단 */}
          {showChevron && (
            <div className="absolute z-20" style={{ right: 16, top: 22 }}>
              {rightTopIcon ?? (
                <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M9 6l6 6-6 6"
                    fill="none"
                    stroke="#CFCFCA"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          )}

          {/* 그래픽: 우측(기본), 원하는 포지션으로 */}
          <div
            className={[
              'pointer-events-none absolute z-0 select-none',
              g.position === 'top-right'
                ? 'top-3 right-3'
                : g.position === 'center-right'
                  ? 'top-1/2 right-3 -translate-y-1/2'
                  : g.position === 'bottom-center'
                    ? 'bottom-3 left-1/2 -translate-x-1/2'
                    : 'right-3 bottom-3', // bottom-right
              g.className ?? '',
            ].join(' ')}
            style={{ width: gSize }}
          >
            {g.node ? (
              <div style={{ width: gSize }}>{g.node}</div>
            ) : (
              <img
                src={g.src}
                alt={g.alt ?? ''}
                aria-hidden={g.alt ? undefined : true}
                className={['h-auto w-full', isSelected ? 'opacity-100 saturate-125' : 'opacity-90'].join(' ')}
              />
            )}
          </div>
        </>
      ) : (
        // ====== hero-graphic ======
        <>
          {/* 텍스트: 카드 상단 전체 폭 사용(체브론 공간만 우측 여백) */}
          <div className="absolute top-4 right-10 left-4 z-10">
            <p
              className="overflow-hidden text-[16px] leading-[20px] font-bold text-ellipsis whitespace-nowrap text-[#1C1D1A]"
              style={titleStyle}
            >
              {title}
            </p>
            {description && (
              <p
                className="mt-1 overflow-hidden text-[12px] leading-[16px] font-medium text-ellipsis whitespace-nowrap text-[#86857C]"
                style={descStyle}
              >
                {description}
              </p>
            )}
          </div>

          {/* 체브론: 우상단 고정 */}
          {showChevron && (
            <div className="absolute top-4 right-4 z-20">
              {rightTopIcon ?? (
                <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M9 6l6 6-6 6"
                    fill="none"
                    stroke="#CFCFCA"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          )}

          {/* 큰 일러스트: 하단 중앙(예: 96~120px) */}
          <div
            className={[
              'pointer-events-none absolute left-1/2 z-0 -translate-x-1/2 select-none',
              'bottom-3',
              g.className ?? '',
            ].join(' ')}
            style={{ width: gSize || 96 }}
          >
            {g.node ? (
              <div style={{ width: gSize || 96 }}>{g.node}</div>
            ) : (
              <img
                src={g.src ?? groceryTint}
                alt={g.alt ?? ''}
                aria-hidden={g.alt ? undefined : true}
                className={['h-auto w-full', isSelected ? 'opacity-100 saturate-125' : 'opacity-90'].join(' ')}
              />
            )}
          </div>
        </>
      )}
    </button>
  );
}
