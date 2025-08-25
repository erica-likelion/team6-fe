import { Icon } from '@components/Icon';

export default function TrustScore() {
  return (
    <>
      <div className="px-5 pt-4 pb-4">
        {/* 제목 */}
        <h2 className="mb-2 text-[14px] leading-[16px] font-semibold tracking-[-0.02em] text-black">내 신뢰도</h2>

        {/* 별 + 점수 */}
        <div className="mb-2 flex items-center gap-2">
          {/* 별 5개 꽉 채움 */}
          <div className="flex gap-[2px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Icon key={i} icon="star_fill" className="h-[18px] w-[18px] text-[#00C853]" />
            ))}
          </div>

          {/* 5/5 점수 */}
          <div className="flex items-end gap-[2px]">
            <span className="text-[16px] leading-[20px] font-semibold tracking-[-0.02em] text-[#161616]">5</span>
            <span className="text-[12px] leading-[16px] font-semibold tracking-[-0.02em] text-[#86857C]">/5</span>
          </div>
        </div>

        {/* 설명 */}
        <p className="text-[12px] leading-[16px] font-medium tracking-[-0.02em] text-[#86857C]">
          신뢰도는 모임이 끝난 후 전체 만족도로 집계되는 지표예요.
        </p>
      </div>

      {/* 두꺼운 구분선 */}
      <div className="h-[8px] bg-gray-100" />
    </>
  );
}
