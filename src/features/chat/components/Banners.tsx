import { Icon } from '@components/Icon';

export const Banners = () => {};

const Information = () => {
  return (
    <div className="flex w-full flex-col gap-[1rem] rounded-[1.5rem] bg-white p-[1rem]">
      <div className="flex items-center gap-[0.5rem]">
        <div className="relative flex h-[1.5rem] w-[4.5rem]">
          <div className="absolute left-0 h-[1.5rem] w-[1.5rem] rounded-[1.125rem] border-1 border-gray-200 bg-white" />
          <div className="absolute left-[1rem] h-[1.5rem] w-[1.5rem] rounded-[1.125rem] border-1 border-gray-200 bg-white" />
          <div className="absolute left-[2rem] h-[1.5rem] w-[1.5rem] rounded-[1.125rem] border-1 border-gray-200 bg-white" />
          <div className="absolute left-[3rem] h-[1.5rem] w-[1.5rem] rounded-[1.125rem] border-1 border-gray-200 bg-white" />
        </div>
        <span className="label-small font-semibold text-gray-400">4/4</span>
      </div>
      <div className="flex flex-col gap-[0.5rem]">
        <div className="flex items-center justify-between">
          <span className="label-medium font-bold text-gray-800">홈플러스 장보러 같이 가요</span>
          <span className="label-xxsmall rounded-[0.5rem] bg-gray-50 p-[0.38rem] font-semibold text-gray-600">
            장보기
          </span>
        </div>
        <div className="flex flex-1 justify-between gap-[0.56rem]">
          <div className="flex flex-1 items-center gap-[0.38rem]">
            <Icon icon="map-marker_fill" className="text-gray-400" width={'1.125rem'} height={'1.125rem'} />
            <span className="label-xsmall text-gray-400">홈플러스 안양</span>
          </div>
          <div className="flex flex-1 items-center gap-[0.38rem]">
            <Icon icon="clock_fill" className="text-gray-400" width={'1.125rem'} height={'1.125rem'} />
            <span className="label-xsmall text-gray-400">수요일 12시</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Promise = () => {
  return (
    <div className="flex w-full flex-col gap-[0.38rem] rounded-[1.5rem] bg-white p-[1rem]">
      <div className="flex flex-1 justify-between">
        <div className="flex items-center gap-[0.38rem]">
          <Icon icon="clock_fill" className="text-primary-green" />
          <span className="label-large text-empahsis-green font-bold">약속이 잡혔어요!</span>
        </div>
        <Icon icon="chevron" className="rotate-180 text-gray-400" width={'1.5rem'} height={'1.5rem'} />
      </div>
      <span className="label-xsmall font-medium text-gray-500">
        멋사자님이 약속을 잡으셨어요. 약속 내용을 확인해보세요.
      </span>
    </div>
  );
};

const Adjustment = () => {
  return (
    <div className="flex w-full flex-col gap-[0.38rem] rounded-[1.5rem] bg-white p-[1rem]">
      <div className="flex flex-1 justify-between">
        <div className="flex items-center gap-[0.38rem]">
          <Icon icon="clock_fill" className="text-primary-green" />
          <span className="label-large text-empahsis-green font-bold">장보기가 끝났어요! 정산을 요청해요</span>
        </div>
        <Icon icon="chevron" className="rotate-180 text-gray-400" width={'1.5rem'} height={'1.5rem'} />
      </div>
      <span className="label-xsmall font-medium text-gray-500">전체 금액을 결제한 사람만 정산을 요청해주세요!</span>
      <button className="bg-primary-green label-medium h-[3.5rem] rounded-[1.25rem] font-bold text-white">
        정산 요청하기
      </button>
    </div>
  );
};

const Receipt = () => {
  return (
    <div className="flex w-full flex-col gap-[0.38rem] rounded-[1.5rem] bg-white p-[1rem]">
      <div className="flex flex-1 justify-between">
        <div className="flex items-center gap-[0.38rem]">
          <Icon icon="paper-fold-text_fill" className="text-primary-green" />
          <span className="label-large text-empahsis-green font-bold">영수증이 도착했어요. 정산해주세요!</span>
        </div>
        <Icon icon="chevron" className="rotate-180 text-gray-400" width={'1.5rem'} height={'1.5rem'} />
      </div>
      <span className="label-xsmall font-medium text-gray-500">전체 금액을 결제한 사람만 정산을 요청해주세요!</span>
      <button className="bg-primary-green label-medium h-[3.5rem] rounded-[1.25rem] font-bold text-white">
        정산하러 가기
      </button>
    </div>
  );
};

const Send = () => {
  return (
    <div className="flex w-full flex-col gap-[0.38rem] rounded-[1.5rem] bg-white p-[1rem]">
      <div className="flex flex-1 justify-between">
        <div className="flex items-center gap-[0.38rem]">
          <Icon icon="paper-fold-text_fill" className="text-primary-green" />
          <span className="label-large font-bold text-black">금액을 보냈어요.</span>
        </div>
        <Icon icon="chevron" className="rotate-180 text-gray-400" width={'1.5rem'} height={'1.5rem'} />
      </div>
      <span className="label-xsmall font-medium text-gray-500">
        정산을 요청한 장보고님이 확인할 때까지 조금만 기다려주세요.
      </span>
    </div>
  );
};

const Check = () => {
  return (
    <div className="flex w-full flex-col gap-[0.38rem] rounded-[1.5rem] bg-white p-[1rem]">
      <div className="flex flex-1 justify-between">
        <div className="flex items-center gap-[0.38rem]">
          <Icon icon="paper-fold-text_fill" className="text-primary-green" />
          <span className="label-large font-bold text-black">아무개님이 정산을 마쳤어요.</span>
        </div>
        <Icon icon="chevron" className="rotate-180 text-gray-400" width={'1.5rem'} height={'1.5rem'} />
      </div>
      <span className="label-xsmall font-medium text-gray-500">입력하신 계좌에서 내역을 확인하세요.</span>
      <div className="flex justify-between gap-[0.56rem]">
        <button className="label-medium h-[3.5rem] flex-1 rounded-[1.25rem] border-1 border-gray-200 bg-white font-bold text-gray-700">
          아직 안들어왔어요
        </button>
        <button className="bg-primary-green label-medium flex h-[3.5rem] flex-1 items-center justify-center gap-[0.38rem] rounded-[1.25rem] font-bold text-white">
          <Icon icon="checkbox-list" />
          확인했어요
        </button>
      </div>
    </div>
  );
};

const Review = () => {
  return (
    <div className="flex w-full flex-col gap-[1rem] rounded-[1.5rem] bg-white p-[1rem]">
      <div></div>
      <div className="flex flex-1 justify-between">
        <div className="flex items-center gap-[0.38rem]">
          <Icon icon="paper-fold-text_fill" className="text-primary-green" />
          <span className="label-large text-empahsis-green font-bold">아무개님이 확인을 마쳤어요.</span>
        </div>
        <Icon icon="chevron" className="rotate-180 text-gray-400" width={'1.5rem'} height={'1.5rem'} />
      </div>
      <span className="label-xsmall font-medium text-gray-500">장보기 모임은 어땠나요? 후기를 남겨주세요!</span>
      <div className="flex items-center justify-between gap-[1rem]">
        <span className="label-xsmall font-bold text-gray-700">장보고님</span>
        <div className="flex flex-1 gap-[0.38rem]">
          <button className="label-xsmall h-[2.5rem] flex-1 rounded-[1rem] border-1 border-gray-200 bg-white font-bold text-gray-700">
            별로였어요
          </button>
          <button className="label-xsmall h-[2.5rem] flex-1 rounded-[1rem] border-1 border-gray-200 bg-white font-bold text-gray-700">
            보통이에요
          </button>
          <button className="label-xsmall h-[2.5rem] flex-1 rounded-[1rem] border-1 border-gray-200 bg-white font-bold text-gray-700">
            아주 좋았어요
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between gap-[1rem]">
        <span className="label-xsmall font-bold text-gray-700">장보고님</span>
        <div className="flex flex-1 gap-[0.38rem]">
          <button className="label-xsmall h-[2.5rem] flex-1 rounded-[1rem] border-1 border-gray-200 bg-white font-bold text-gray-700">
            별로였어요
          </button>
          <button className="label-xsmall h-[2.5rem] flex-1 rounded-[1rem] border-1 border-gray-200 bg-white font-bold text-gray-700">
            보통이에요
          </button>
          <button className="label-xsmall h-[2.5rem] flex-1 rounded-[1rem] border-1 border-gray-200 bg-white font-bold text-gray-700">
            아주 좋았어요
          </button>
        </div>
      </div>
    </div>
  );
};

Banners.Information = Information;
Banners.Promise = Promise;
Banners.Addjustment = Adjustment;
Banners.Receipt = Receipt;
Banners.Send = Send;
Banners.Check = Check;
Banners.Review = Review;
