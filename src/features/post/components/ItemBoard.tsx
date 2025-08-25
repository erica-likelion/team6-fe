// Board.tsx
import { Attach } from '@features/post/components/Attach';
import { CheckList } from '@features/post/components/Checklist';
import { Content } from '@features/post/components/Content';
import { Count } from '@features/post/components/Count';
import { Place } from '@features/post/components/Place';
import { Price } from '@features/post/components/Price';
import { useFormContext } from 'react-hook-form';
// (선택) RHF를 쓰면 상위에서 FormProvider로 감싸고 useFormContext로 submit 받으면 됩니다.

interface BoardProps {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void; // 필요 시 외부 핸들러 주입
  submitting?: boolean;
  isValid: boolean;
}

export const ItemBoard = ({ onSubmit, submitting, isValid }: BoardProps) => {
  useFormContext();
  return (
    <form onSubmit={onSubmit} className="bg-primary-bg relative flex min-h-dvh flex-col">
      <div className="h-[3.25rem]" aria-hidden />
      <main className="flex-1 overflow-y-auto px-[1rem] pb-[6.5rem]">
        <div className="flex flex-col gap-[1.5rem]">
          <Content />
          <h1 className="label-large mb-[0.88rem] font-bold">어디서 얼마에 소분할까요?</h1>
          <Place title="소분 희망 장소" />
          <Count />
          <Price />
          <Attach />
          <CheckList />

          <p className="label-xxsmall text-center text-gray-300">
            (서비스명)은 통신판매중개자이며, 통신판매의 당사자가 아닙니다. <br />
            (서비스명)은 상품 및 거래 정보 및 거래에 대하여 책임을 지지 않습니다.
          </p>
        </div>
      </main>
      <footer className="bg-primary-bg sticky right-0 bottom-0 left-0 backdrop-blur">
        <div className="px-[1rem] pt-[0.75rem] pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
          <button
            type="submit"
            disabled={!isValid || submitting}
            className="bg-primary-green label-medium w-full rounded-[1.25rem] p-[1rem] font-bold text-white disabled:bg-gray-200 disabled:opacity-50"
          >
            {submitting ? '등록 중…' : '게시글 등록하기'}
          </button>
        </div>
      </footer>
    </form>
  );
};
