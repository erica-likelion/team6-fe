import GROCERY from '@assets/images/1080_Grocery.webp';
import INGREDIENTS from '@assets/images/1080_Ingredients.webp';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

export const Select = () => {
  const navigate = useNavigate();
  const [type, setType] = useState<'party' | 'item'>('party');

  const go = (v: 'party' | 'item') => {
    navigate({ to: '/post/write', search: { type: v }, replace: false });
  };

  return (
    <div className="flex h-dvh flex-1 flex-col justify-between px-[1rem] pt-[3.25rem]">
      <span className="label-large font-bold">어떤 게시글을 작성할까요?</span>

      <div className="flex flex-1 items-center">
        <div className="flex w-full gap-[0.56rem]">
          {/* 소분 모임 (party) */}
          <button
            type="button"
            aria-pressed={type === 'party'}
            onClick={() => setType('party')}
            className={`flex basis-1/2 flex-col rounded-[1.75rem] border-2 p-[1rem] ${
              type === 'party' ? 'border-primary-green' : 'border-gray-100'
            }`}
          >
            <div className="flex flex-col items-start gap-[0.25rem]">
              <span className="label-medium font-bold">장보기 소분 모임</span>
              <span className="label-xsmall font-medium text-gray-500">한 번에 장보고 싶을 때</span>
            </div>
            <div className="flex h-[8.4375rem] flex-1 items-center justify-center">
              <img src={INGREDIENTS} alt="장보기 소분 모임" className="h-full w-full object-contain" />
            </div>
          </button>

          {/* 품목별 소분 (item) */}
          <button
            type="button"
            aria-pressed={type === 'item'}
            onClick={() => setType('item')}
            className={`flex basis-1/2 flex-col rounded-[1.75rem] border-2 p-[1rem] ${
              type === 'item' ? 'border-primary-green' : 'border-gray-100'
            }`}
          >
            <div className="flex flex-col items-start gap-[0.25rem]">
              <span className="label-medium font-bold">품목 별 소분</span>
              <span className="label-xsmall font-medium text-gray-500">필요한 물건만 소분할 때</span>
            </div>
            <div className="flex h-[8.4375rem] flex-1 items-center justify-center">
              <img src={GROCERY} alt="품목 별 소분" className="h-full w-full object-contain" />
            </div>
          </button>
        </div>
      </div>

      <div className="mb-[1rem]">
        <button
          type="button"
          onClick={() => go(type)}
          className="bg-primary-green label-medium w-full rounded-[1.25rem] p-[1rem] font-bold text-white"
        >
          다음
        </button>
      </div>
    </div>
  );
};
