export const Count = () => {
  return (
    <div className="flex flex-col gap-[0.88rem]">
      <span className="label-small font-semibold">인원 수 선택</span>
      <label
        htmlFor="post_time"
        className="text-gray800 flex items-center gap-[0.62rem] rounded-[0.75rem] border-1 border-gray-200 p-[1rem]"
      >
        <input
          type="text"
          name=""
          id="post_time"
          className="label-medium flex-1 font-medium placeholder:text-gray-300"
          placeholder="인원 수를 입력해주세요"
        />
        <span className="paragraph-small text-gray-500">명</span>
      </label>
    </div>
  );
};
