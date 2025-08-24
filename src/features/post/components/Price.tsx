import { Icon } from '@components/Icon';

export const Price = () => {
  return (
    <div className="flex flex-col gap-[0.88rem]">
      <div className="flex items-center justify-start gap-[0.25rem]">
        <span className="label-small font-semibold">소분 희망 가격</span>
        <Icon icon="question-circle" width={'1.125rem'} height={'1.125rem'} className="text-gray-500" />
      </div>
      <label
        htmlFor="price"
        className="text-gray800 flex items-center gap-[0.62rem] rounded-[0.75rem] border border-gray-200 p-[1rem]"
      >
        <input
          id="price"
          name="price"
          type="number"
          inputMode="numeric"
          min={0}
          step={100}
          placeholder="가격을 입력해주세요"
          className="label-medium flex-1 font-medium placeholder:text-gray-300 focus:outline-none"
          onWheel={(e) => (e.currentTarget as HTMLInputElement).blur()} // 마우스 휠로 값 변조 방지
        />
        <span className="paragraph-small text-gray-500">₩</span>
      </label>
    </div>
  );
};
