import FaceImage from '@assets/images/64_Face.webp';

const dummyTitles = [
  { id: 1, label: '냉동고 부자', color: 'bg-[#FFB025]' }, // 주황
  { id: 2, label: '귤 한 쪽도 나눠요', color: 'bg-[#1EB065]' }, // 초록
  { id: 3, label: '식력터 아이콘', color: 'bg-[#7BB6FE]' }, // 파랑
];

export default function ProfileSection() {
  return (
    <>
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center gap-4">
          {/* 프로필 이미지 */}
          <img src={FaceImage} alt="프로필" className="h-16 w-16 rounded-full object-cover" />

          {/* 닉네임 + 칭호 */}
          <div className="flex flex-col">
            {/* 닉네임 */}
            <span className="mb-2 text-[18px] leading-[24px] font-bold tracking-[-0.02em] text-[#161616]">멋사자</span>

            {/* 칭호 뱃지 */}
            <div className="flex flex-wrap gap-[6px]">
              {dummyTitles.map((t) => (
                <span
                  key={t.id}
                  className={`flex h-[24px] items-center rounded-[8px] px-3 text-[10px] leading-[12px] font-semibold tracking-[-0.02em] text-white ${t.color}`}
                >
                  {t.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 프로필 밑 구분선 */}
      <div className="border-b border-gray-100" />
    </>
  );
}
