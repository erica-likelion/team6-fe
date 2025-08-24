// src/features/home/components/schedule-banner/ScheduleBanner.tsx
import { BoxButton } from '@components/Button/box-button/BoxButton';
import { Icon } from '@components/Icon';
import TopBar from '../top-bar/TopBar';
import groceryTint from '@assets/images/64_GroceryTint.webp';

export default function ScheduleBanner() {
  // 🟢 홈 전용이므로 기본 문구를 내부에서 관리
  const title = '장보기가 예정되어있어요!';
  const subtitle = '오늘 코스트코 광명에서 장보실 예정이에요';
  const ctaLabel = '채팅방으로 이동하기';

  const handleClick = () => {
    window.location.href = '/chat';
  };

  return (
    <div className="w-full overflow-hidden rounded-b-[20px] bg-gradient-to-b from-[#31EC6B] to-[#79DB4D] pb-6">
      {/* TopBar */}
      <TopBar />

      {/* 배너 카드 */}
      <section className="flex justify-center px-5 pt-2">
        <div className="flex h-[144px] w-[343px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow">
          {/* 상단 정보 */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <img src={groceryTint} alt="장바구니 아이콘" className="h-5 w-5" />
                <h2 className="text-[18px] leading-[24px] font-bold tracking-[-0.02em] text-[#1EB065]">{title}</h2>
              </div>
              <p className="mt-1 text-[12px] leading-[16px] font-medium tracking-[-0.02em] text-[#86857C]">
                {subtitle}
              </p>
            </div>
            <Icon icon="chevron" className="h-4 w-4 rotate-180 text-gray-400" aria-hidden />
          </div>

          {/* CTA 버튼 */}
          <BoxButton
            label={ctaLabel}
            icon={<Icon icon="comments_fill" className="h-4 w-4" />}
            variant="primary"
            onClick={handleClick}
            fullWidth
            size="large"
          />
        </div>
      </section>
    </div>
  );
}
