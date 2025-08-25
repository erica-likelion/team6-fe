// src/features/home/components/schedule-banner/ScheduleBanner.tsx
import { BoxButton } from '@components/Button/box-button/BoxButton';
import { Icon } from '@components/Icon';
import TopBar from '../top-bar/TopBar';
import { ScheduleBannerProps, BannerType } from '../schedule-banner/type';
import groceryTint from '@assets/images/64_GroceryTint.webp';
import ingredientsTint from '@assets/images/64_IngredientsTint.webp';
import grocery3D from '@assets/images/1080_Grocery.webp';
import ingredients3D from '@assets/images/1080_Ingredients.webp';

const defaults: Record<
  BannerType,
  {
    title: string;
    subtitle: string;
    ctaLabel: string;
    leftImage: string;
    bigImage: string;
    bigWidth: number;
    bigHeight: number;
  }
> = {
  shopping: {
    title: '장보기가 예정되어있어요!',
    subtitle: '오늘 코스트코 광명에서 장보실 예정이에요',
    ctaLabel: '채팅방으로 이동하기',
    leftImage: groceryTint,
    bigImage: grocery3D,
    bigWidth: 210,
    bigHeight: 243,
  },
  sharing: {
    title: '소분이 예정되어있어요!',
    subtitle: '오늘 금정역 1번출구에서 만날 예정이에요',
    ctaLabel: '채팅방으로 이동하기',
    leftImage: ingredientsTint,
    bigImage: ingredients3D,
    bigWidth: 278,
    bigHeight: 321,
  },
};

export default function ScheduleBanner({
  type,
  title,
  subtitle,
  ctaLabel,
  leftImage,
  bigImage,
  onCtaClick,
  fromColor = '#31EC6B',
  toColor = '#79DB4D',
  className = '',
}: ScheduleBannerProps & {
  fromColor?: string;
  toColor?: string;
  className?: string;
}) {
  const base = defaults[type];
  const resolvedTitle = title ?? base.title;
  const resolvedSubtitle = subtitle ?? base.subtitle;
  const resolvedCtaLabel = ctaLabel ?? base.ctaLabel;
  const resolvedLeftImage = leftImage ?? base.leftImage;
  const resolvedBigImage = bigImage ?? base.bigImage;
  const bigWidth = base.bigWidth;
  const bigHeight = base.bigHeight;

  const handleClick = () => {
    if (onCtaClick) return onCtaClick();
    window.location.href = '/chat';
  };

  return (
    <div
      className={`w-full overflow-hidden rounded-b-[20px] pb-6 ${className}`}
      style={{
        backgroundImage: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
      }}
    >
      {/* ✅ TopBar 추가 */}
      <TopBar />

      <section className="px-5 pt-2">
        <div className="mx-auto flex max-w-[420px] flex-col items-center">
          {/* 카드 위 전용 영역: 큰 3D 그래픽 */}
          <div className="relative flex w-full items-end justify-center" style={{ height: `${bigHeight}px` }}>
            <img
              src={resolvedBigImage}
              alt=""
              style={{ width: `${bigWidth}px`, height: `${bigHeight}px` }}
              className="pointer-events-none absolute bottom-[-2rem] object-contain select-none"
              draggable={false}
            />
          </div>

          {/* 카드 */}
          <div className="mt-0 flex h-[144px] w-[343px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <img src={resolvedLeftImage} alt="" className="h-5 w-5" />
                  <h2 className="text-[18px] leading-[24px] font-bold tracking-[-0.02em] text-[#1EB065]">
                    {resolvedTitle}
                  </h2>
                </div>
                <p className="mt-1 text-[12px] leading-[16px] font-medium tracking-[-0.02em] text-[#86857C]">
                  {resolvedSubtitle}
                </p>
              </div>
              <Icon icon="chevron" className="h-4 w-4 rotate-180 text-gray-400" aria-hidden />
            </div>

            <BoxButton
              label={resolvedCtaLabel}
              icon={<Icon icon="comments_fill" className="h-4 w-4" />}
              variant="primary"
              onClick={handleClick}
              fullWidth
              size="large"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
