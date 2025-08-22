import { Icon } from '@components/Icon';

export const Reciept = () => {
  const ISAUTH = false;
  return (
    <div className="flex flex-col gap-[1.5rem]">
      <button className="label-small flex w-fit items-center justify-center gap-[0.38rem] rounded-[1.13rem] border-1 border-gray-200 bg-white p-[1rem] font-bold text-gray-600">
        <Icon icon="paper-fold-text_fill" width={'1.125rem'} height={'1.125rem'} /> 영수증 인증하기
      </button>
      <div className="border-primary-bg flex flex-col gap-[1.62rem] border-t-4 border-b-4 border-dashed bg-white px-[1rem] py-[2.25rem]">
        <span className="label-large text-empahsis-green font-semibold">
          {ISAUTH ? '영수증' : '먼저 영수증 인증을 마쳐주세요!'}
        </span>
        <div className="border-t-[0.125rem] border-dashed border-black" />
        <div className="label-small grid-1fr grid gap-y-[0.88rem] font-semibold">
          <div className="grid grid-cols-[1fr_1.5rem_3.25rem_2.8rem] gap-x-[0.81rem]">
            <span>상품명</span>
            <span>수량</span>
            <span>정산 인원</span>
            <span>금액</span>
          </div>
          <div className="h-[0.7rem]" />
          <div className="grid grid-cols-[1fr_1.5rem_3.25rem_2.8rem] gap-x-[0.81rem] font-medium">
            <div className="flex gap-[0.38rem]">
              <span>미국산돈육목심팩</span>
              <Icon icon="edit-pen_fill" className="text-gray-200" width={'1.125rem'} height={'1.125rem'} />
            </div>
            <span>수량</span>
            <span>정산 인원</span>
            <span>금액</span>
          </div>
        </div>
        <div className="border-t-[0.125rem] border-dashed border-black" />
        <div className="flex flex-col gap-[1rem]">
          <div className="label-large flex justify-between font-bold">
            <span>장보고</span>
            <span>0</span>
          </div>
          <div className="label-large flex justify-between font-bold">
            <span>장보고</span>
            <span>0</span>
          </div>
          <div className="label-large flex justify-between font-bold">
            <span>장보고</span>
            <span>0</span>
          </div>
          <div className="label-large flex justify-between font-bold">
            <span>장보고</span>
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  );
};
