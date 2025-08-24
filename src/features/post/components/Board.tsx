import { CheckList } from '@features/post/components/Checklist';
import { Content } from '@features/post/components/Content';
import { Count } from '@features/post/components/Count';
import { Items } from '@features/post/components/Items';
import { Place } from '@features/post/components/Place';
import { Time } from '@features/post/components/Time';

export const Board = () => {
  return (
    <div className="flex h-dvh flex-1 flex-col overflow-auto px-[1rem] pt-[3.25rem]">
      <span className="label-large mb-[0.88rem] font-bold">어디서 언제 만날까요?</span>
      <div className="flex flex-col gap-[1.5rem]">
        <Place />
        <Time />
        <Count />
        <Items />
        <Content />
        <CheckList />
        <span className="label-xxsmall text-center text-gray-300">
          (서비스명)은 통신판매중개자이며, 통신판매의 당사자가 아닙니다. <br />
          (서비스명)은 상품 및 거래 정보 및 거래에 대하여 책임을 지지 않습니다.
        </span>
        <button className="bg-primary-green label-medium mb-[2.12rem] rounded-[1.25rem] p-[1rem] font-bold text-white">
          게시글 등록하기
        </button>
      </div>
    </div>
  );
};
