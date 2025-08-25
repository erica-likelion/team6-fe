import { useFormContext } from 'react-hook-form';

export const Count = () => {
  const { register } = useFormContext<{ maxMembers: number }>();

  return (
    <div className="flex flex-col gap-[0.88rem]">
      <span className="label-small font-semibold">인원 수 선택</span>
      <label
        htmlFor="maxMembers"
        className="text-gray800 flex items-center gap-[0.62rem] rounded-[0.75rem] border border-gray-200 p-[1rem]"
      >
        <input
          id="maxMembers"
          type="number"
          inputMode="numeric"
          min={1}
          max={99}
          step={1}
          placeholder="인원 수를 입력해주세요"
          className="label-medium flex-1 font-medium placeholder:text-gray-300 focus:outline-none"
          {...register('maxMembers', {
            valueAsNumber: true,
            required: '인원 수를 입력해주세요',
            min: { value: 1, message: '최소 1명 이상' },
            max: { value: 99, message: '최대 99명까지' },
            validate: (v) => Number.isInteger(v) || '정수만 입력하세요',
          })}
          onWheel={(e) => (e.currentTarget as HTMLInputElement).blur()} // 마우스 휠로 값 변조 방지
        />
        <span className="paragraph-small text-gray-500">명</span>
      </label>
    </div>
  );
};
