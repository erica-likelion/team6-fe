import { Icon } from '@components/Icon';

export const Content = () => {
  return (
    <div className="flex flex-col gap-[0.88rem]">
      <span className="label-large font-bold">게시글을 작성해주세요.</span>
      <div className="flex flex-col gap-[1.5rem]">
        <div className="flex flex-col gap-[0.88rem]">
          <span className="label-small font-semibold">사진 업로드</span>
          <button className="label-small flex w-fit items-center gap-[0.38rem] rounded-[1.125rem] border-1 border-gray-200 bg-white p-[1rem] font-bold text-gray-600">
            <Icon icon="image-plus_fill" width={'1.125rem'} height={'1.125rem'} />
            {'0/10'}
          </button>
        </div>
        <div className="flex flex-col gap-[0.88rem]">
          <span className="label-small font-semibold">제목</span>
          <label
            htmlFor="post_time"
            className="text-gray800 flex items-center gap-[0.62rem] rounded-[0.75rem] border-1 border-gray-200 p-[1rem]"
          >
            <input
              type="text"
              name=""
              id="post_time"
              className="label-medium flex-1 font-medium placeholder:text-gray-300"
              placeholder="제목을 작성해주세요"
            />
          </label>
        </div>
        <div className="flex flex-col gap-[0.88rem]">
          <span className="label-small font-semibold">내용</span>
          <div className="flex flex-col gap-[0.25rem]">
            <label
              htmlFor="post_time"
              className="text-gray800 flex items-center gap-[0.62rem] rounded-[0.75rem] border-1 border-gray-200 p-[1rem]"
            >
              <textarea
                name=""
                id="post_time"
                className="label-medium h-[1.25rem] flex-1 font-medium placeholder:text-gray-300"
                placeholder="내용을 적어주세요"
              />
            </label>
            <span className="label-xsmall ml-[1rem] text-gray-300">0/3,000</span>
          </div>
        </div>
      </div>
    </div>
  );
};
