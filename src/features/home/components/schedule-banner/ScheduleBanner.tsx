// src/features/home/components/schedule-banner/ScheduleBanner.tsx
import { BoxButton } from '@components/Button/box-button/BoxButton';
import { Icon } from '@components/Icon';
import TopBar from '../top-bar/TopBar';
import { useNextMeeting } from '../../hooks/useNextMeeting';
import groceryTint from '@assets/images/64_GroceryTint.webp';
import ingredientsTint from '@assets/images/64_IngredientsTint.webp';
import grocery3D from '@assets/images/1080_Grocery.webp';
import ingredients3D from '@assets/images/1080_Ingredients.webp';

export default function ScheduleBanner() {
  const { meeting, loading } = useNextMeeting();

  if (loading) return null;

  // 약속 데이터가 없을 때 → 안내 배너 표시
  if (!meeting) {
    return (
      <div
        className="w-full overflow-hidden rounded-b-[20px] pb-6"
        style={{
          backgroundImage: `linear-gradient(to bottom, #E5E7EB, #D1D5DB)`, // 회색톤 배경
        }}
      >
        <TopBar />

        <section className="px-5 pt-2">
          <div className="mx-auto flex max-w-[420px] flex-col items-center">
            <div className="mt-4 flex h-[120px] w-[343px] flex-col items-center justify-center gap-3 rounded-[20px] bg-white p-4 shadow">
              <Icon icon="calendar" className="h-6 w-6 text-gray-400" aria-hidden />
              <p className="text-[14px] leading-[20px] font-medium text-gray-500">예정된 모임이 없습니다</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // 약속이 있을 때 → 정상 배너
  const isShopping = meeting.type === 'shopping';
  const leftImage = isShopping ? groceryTint : ingredientsTint;
  const bigImage = isShopping ? grocery3D : ingredients3D;
  const bigWidth = isShopping ? 210 : 278;
  const bigHeight = isShopping ? 243 : 321;

  const title = isShopping ? '장보기가 예정되어있어요!' : '소분이 예정되어있어요!';
  const subtitle = `오늘 ${meeting.place}에서 만날 예정이에요`;

  const handleClick = () => {
    window.location.href = `/post/${meeting.postId}`;
  };

  return (
    <div
      className="w-full overflow-hidden rounded-b-[20px] pb-6"
      style={{
        backgroundImage: `linear-gradient(to bottom, #31EC6B, #79DB4D)`,
      }}
    >
      <TopBar />

      <section className="px-5 pt-2">
        <div className="mx-auto flex max-w-[420px] flex-col items-center">
          {/* 카드 위 전용 영역: 큰 3D 그래픽 */}
          <div className="relative flex w-full items-end justify-center" style={{ height: `${bigHeight}px` }}>
            <img
              src={bigImage}
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
                  <img src={leftImage} alt="" className="h-5 w-5" />
                  <h2 className="text-[18px] leading-[24px] font-bold tracking-[-0.02em] text-[#1EB065]">{title}</h2>
                </div>
                <p className="mt-1 text-[12px] leading-[16px] font-medium tracking-[-0.02em] text-[#86857C]">
                  {subtitle}
                </p>
              </div>
              <Icon icon="chevron" className="h-4 w-4 rotate-180 text-gray-400" aria-hidden />
            </div>

            <BoxButton
              label="채팅방으로 이동하기"
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
