import { Icon } from '@components/Icon';
import { useEffect, useMemo, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

type FormValues = {
  title: string;
  content?: string;
  photos?: FileList; // 파일 인풋은 RHF에서 FileList로 관리
};

export const Content = () => {
  const { register, watch } = useFormContext<FormValues>();
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const maxPhotos = 10;

  // RHF에서 photos 필드 등록
  const reg = register('photos');

  // 사진 개수 표시
  const files = watch('photos');
  const fileCount = useMemo(() => (files ? files.length : 0), [files]);

  // 내용 길이 카운트
  const content = watch('content') ?? '';
  const contentLen = content.length;
  const maxLen = 3000;

  // textarea 자동 높이
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }, [content]);

  // 파일 업로드 핸들러
  const handleFilesChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const fl = e.target.files;
    if (!fl) return;

    if (fl.length > maxPhotos) {
      alert(`사진은 최대 ${maxPhotos}장까지 업로드 가능합니다.`);
      e.currentTarget.value = '';
      return;
    }

    // ✅ 반드시 RHF의 onChange를 호출해야 값이 폼에 반영됨
    reg.onChange(e);
  };

  return (
    <div className="flex flex-col gap-[0.88rem]">
      <span className="label-large font-bold">게시글을 작성해주세요.</span>

      <div className="flex flex-col gap-[1.5rem]">
        {/* 사진 업로드 */}
        <div className="flex flex-col gap-[0.88rem]">
          <span className="label-small font-semibold">사진 업로드</span>
          <label className="label-small inline-flex w-fit cursor-pointer items-center gap-[0.38rem] rounded-[1.125rem] border-1 border-gray-200 bg-white p-[1rem] font-bold text-gray-600">
            <Icon icon="image-plus_fill" width="1.125rem" height="1.125rem" />
            {`${fileCount}/${maxPhotos}`}
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              // register에서 name, ref, onBlur만 꺼내고
              name={reg.name}
              ref={reg.ref}
              onBlur={reg.onBlur}
              // onChange는 합쳐서 사용
              onChange={handleFilesChange}
            />
          </label>
        </div>

        {/* 제목 */}
        <div className="flex flex-col gap-[0.88rem]">
          <span className="label-small font-semibold">제목</span>
          <label
            htmlFor="title"
            className="text-gray800 flex items-center gap-[0.62rem] rounded-[0.75rem] border-1 border-gray-200 p-[1rem]"
          >
            <input
              id="title"
              type="text"
              placeholder="제목을 작성해주세요"
              className="label-medium flex-1 font-medium placeholder:text-gray-300 focus:outline-none"
              {...register('title', { required: true })}
            />
          </label>
        </div>

        {/* 내용 */}
        <div className="flex flex-col gap-[0.88rem]">
          <span className="label-small font-semibold">내용</span>
          <div className="flex flex-col gap-[0.25rem]">
            <label
              htmlFor="content"
              className="text-gray800 flex items-start gap-[0.62rem] rounded-[0.75rem] border-1 border-gray-200 p-[1rem]"
            >
              <textarea
                id="content"
                placeholder="내용을 적어주세요"
                className="label-medium h-[1.25rem] min-h-[1.25rem] flex-1 resize-none font-medium placeholder:text-gray-300 focus:outline-none"
                maxLength={maxLen}
                {...register('content')}
                ref={(e) => {
                  register('content').ref(e);
                  contentRef.current = e;
                }}
              />
            </label>
            <span className="label-xsmall ml-[1rem] text-gray-300">
              {contentLen.toLocaleString()}/{maxLen.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
