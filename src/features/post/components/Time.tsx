import { Icon } from '@components/Icon';

export const Time = () => {
  return (
    <div className="flex flex-col gap-[0.88rem]">
      <span className="label-small font-semibold">장보기 가능한 시간 선택</span>
      <label
        htmlFor="post_time"
        className="text-gray800 flex items-center gap-[0.62rem] rounded-[0.75rem] border-1 border-gray-200 p-[1rem]"
      >
        <Icon icon="clock_fill" width={'1.5rem'} height={'1.5rem'} className="text-gray-700" />
        <input type="text" name="" id="post_time" className="label-medium flex-1 font-medium" placeholder="시간 선택" />
      </label>
    </div>
  );
};
