import { Icon } from '@components/Icon';
import { Header } from '@features/chat/components/Header';
import { Reciept } from '@features/chat/components/Reciept';

interface SettlementProps {
  title: string;
}

export const Settlement = ({ title }: SettlementProps) => {
  return (
    <div className="bg-primary-bg absolute z-11 h-dvh w-dvw">
      <Header title={title} isMenu={false} />
      <div className="flex h-full flex-1 flex-col gap-[1.5rem] overflow-y-scroll px-[1rem] pt-[3.75rem] pb-[2rem]">
        <div className="flex flex-col gap-[0.88rem]">
          <span className="label-large font-bold">영수증</span>
          <span className="label-small font-semibold">정산을 요청하는 사람</span>
          <div className="flex items-center gap-[0.88rem]">
            <div className="h-[2.25rem] w-[2.25rem] rounded-[1.125rem] border-1 border-gray-200 bg-white"></div>
            <span className="label-small font-semibold text-gray-800">장보고(나)</span>
          </div>
        </div>
        <Reciept />
        <div className="border-1 border-gray-100" />
        <div className="flex flex-col gap-[0.88rem]">
          <span className="label-large font-bold">어떤 계좌로 정산 받을까요?</span>
          <label
            htmlFor="settlement_account"
            className="flex gap-[0.62rem] rounded-[0.75rem] border-1 border-gray-200 p-[1rem]"
          >
            <Icon icon="creditcard_fill" width={'1.5rem'} height={'1.5rem'} />
            <input
              id="settlement_account"
              type="text"
              className="label-medium flex-1 font-medium text-gray-800 outline-none"
            />
          </label>
        </div>
        <button className="bg-primary-green label-medium h-[3.5rem] rounded-[1.25rem] p-[1rem] font-bold text-white">
          정산 요청하기
        </button>
      </div>
    </div>
  );
};
