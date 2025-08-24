import { Icon } from '@components/Icon';

export const CheckList = () => {
  return (
    <div className="flex flex-col gap-[0.88rem]">
      <div className="flex items-start gap-[0.62rem]">
        <button className="flex h-[1.375rem] w-[1.375rem] items-center justify-center rounded-[0.6875rem] border-1 border-gray-300 text-gray-300">
          <Icon icon="check" />
        </button>
        <span className="paragraph-small flex-1 font-light text-gray-500">
          사전에 약속한 장소와 시간을 지키며, 거래 취소 시 (서비스명)의 보증금/환불 규칙을 따르겠습니다.
        </span>
      </div>
      <div className="flex items-start gap-[0.62rem]">
        <button className="flex h-[1.375rem] w-[1.375rem] items-center justify-center rounded-[0.6875rem] border-1 border-gray-300 text-gray-300">
          <Icon icon="check" />
        </button>
        <span className="paragraph-small flex-1 font-light text-gray-500">
          모임을 진행하며 불필요한 개인 신상 요구나 사적인 요청을 하지 않겠습니다.
        </span>
      </div>
    </div>
  );
};
