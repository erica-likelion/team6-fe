import { Icon } from '@components/Icon';

export const Attach = () => {
  return (
    <div className="flex flex-col gap-[0.88rem]">
      <div className="flex flex-col gap-[1.5rem]">
        {/* 사진 업로드 */}
        <div className="flex flex-col gap-[0.88rem]">
          <span className="label-small font-semibold">구매 내역 첨부</span>
          <label className="label-small inline-flex w-fit cursor-pointer items-center gap-[0.38rem] rounded-[1.125rem] border-1 border-gray-200 bg-white p-[1rem] font-bold text-gray-600">
            <Icon icon="paper-fold-text_fill" width="1.125rem" height="1.125rem" />
            <input type="file" accept="image/*" multiple className="hidden" />
            구매 내역 첨부하기
          </label>
        </div>
      </div>
    </div>
  );
};
