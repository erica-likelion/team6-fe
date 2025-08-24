import { useFormContext } from 'react-hook-form';
import { useRef, useState } from 'react';
import { Icon } from '@components/Icon';

interface PlaceProps {
  title: string;
}

type FormValues = {
  location: string; // 단일 선택
};

export const Place = ({ title }: PlaceProps) => {
  const { register, setValue, watch } = useFormContext<FormValues>();
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = watch('location') || '';

  const apply = (raw: string) => {
    const v = raw.trim();
    if (!v) {
      setIsEditing(false);
      return;
    }
    setValue('location', v, { shouldDirty: true, shouldValidate: true });
    setIsEditing(false);
  };

  const clear = () => setValue('location', '', { shouldDirty: true, shouldValidate: true });

  return (
    <div className="flex flex-col gap-[0.88rem]">
      <span className="label-small font-semibold">{title}</span>

      {isEditing ? (
        <div className="flex gap-2">
          <input
            {...register('location')}
            ref={inputRef}
            autoFocus
            defaultValue={selected}
            placeholder="장소를 입력하세요 (Enter로 적용)"
            className="label-small w-full rounded-[1.125rem] border border-gray-200 bg-white p-[1rem] font-bold text-gray-600"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                apply((e.target as HTMLInputElement).value);
              }
            }}
            onBlur={(e) => apply(e.currentTarget.value)}
          />
          <button
            type="button"
            className="rounded-[1.125rem] border border-gray-200 px-3 text-sm"
            onClick={() => apply(inputRef.current?.value ?? '')}
          >
            저장
          </button>
        </div>
      ) : selected ? (
        // 선택된 장소가 하나만 보이는 태그(칩)
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-sm">
            {selected}
            <button
              type="button"
              aria-label="장소 지우기"
              className="text-gray-400 hover:text-gray-600"
              onClick={clear}
            >
              ✕
            </button>
          </span>
          <button
            type="button"
            className="label-small inline-flex w-fit items-center gap-[0.38rem] rounded-[1.125rem] border border-gray-200 bg-white px-3 py-2 font-bold text-gray-600"
            onClick={() => setIsEditing(true)}
          >
            변경
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="label-small inline-flex w-fit items-center gap-[0.38rem] rounded-[1.125rem] border border-gray-200 bg-white p-[1rem] font-bold text-gray-600"
          onClick={() => setIsEditing(true)}
        >
          <Icon icon="map-marker-plus_fill" width="1.125rem" height="1.125rem" />
          장소 찾기
        </button>
      )}
    </div>
  );
};
