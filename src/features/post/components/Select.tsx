import GROCERY from '@assets/images/1080_Grocery.webp';
import INGREDIENTS from '@assets/images/1080_Ingredients.webp';
import { useState } from 'react';

export const Select = () => {
  const [index, setIndex] = useState(0);
  return (
    <div className="flex h-dvh flex-1 flex-col justify-between px-[1rem] pt-[3.25rem]">
      <span className="label-large font-bold">어떤 게시글을 작성할까요?</span>
      <div className="flex flex-1 items-center">
        <div className="flex gap-[0.56rem]">
          <button
            onClick={() => setIndex(0)}
            className={`flex flex-col rounded-[1.75rem] border-2 ${index === 0 ? 'border-primary-green' : 'border-gray-100'} flex-1/2 p-[1rem]`}
          >
            <div className="flex flex-col items-start gap-[0.25rem]">
              <span className="label-medium font-bold">장보기 소분 모임</span>
              <span className="label-xsmall font-medium text-gray-500">한 번에 장보고 싶을 때</span>
            </div>
            <div className="flex h-[8.4375rem] flex-1 items-center justify-center">
              <img src={INGREDIENTS} alt="" className="h-full w-full object-contain" />
            </div>
          </button>
          <button
            onClick={() => setIndex(1)}
            className={`flex flex-col rounded-[1.75rem] border-2 ${index === 1 ? 'border-primary-green' : 'border-gray-100'} flex-1/2 p-[1rem]`}
          >
            <div className="flex flex-col items-start gap-[0.25rem]">
              <span className="label-medium font-bold">품목 별 소분</span>
              <span className="label-xsmall font-medium text-gray-500">필요한 물건만 소분할 때</span>
            </div>
            <div className="flex h-[8.4375rem] flex-1 items-center justify-center">
              <img src={GROCERY} alt="" className="h-full w-full object-contain" />
            </div>
          </button>
        </div>
      </div>
      <button className="bg-primary-green label-medium my-[1rem] rounded-[1.25rem] p-[1rem] font-bold text-white">
        다음
      </button>
    </div>
  );
};
