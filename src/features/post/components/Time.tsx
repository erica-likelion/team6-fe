import { Icon } from '@components/Icon';
import { useFormContext } from 'react-hook-form';

export const Time = () => {
  const { register } = useFormContext();

  return (
    <div className="flex flex-col gap-[0.88rem]">
      <span className="label-small font-semibold">장보기 가능한 시간 선택</span>
      <label
        htmlFor="eventTime"
        className="text-gray800 flex items-center gap-[0.62rem] rounded-[0.75rem] border border-gray-200 p-[1rem]"
      >
        <Icon icon="clock_fill" width="1.5rem" height="1.5rem" className="text-gray-700" />
        <input
          type="datetime-local"
          id="eventTime"
          {...register('eventTime', { required: true })}
          className="label-medium flex-1 font-medium text-gray-900 placeholder:text-gray-300 focus:outline-none"
          placeholder="시간 선택"
        />
      </label>
    </div>
  );
};
