import { Icon } from '@components/Icon';
import { useFormContext } from 'react-hook-form';

const ITEMS = [
  '육류',
  '채소',
  '과일',
  '해산물',
  '유제품',
  '곡물',
  '견과류',
  '계란, 난류',
  '가공육',
  '면류',
  '즉석식품',
  '냉동식품',
  '간식, 과자',
  '음료',
  '양념, 조미료',
  '건어물, 김',
  '베이커리, 빵류',
  '밀키트',
  '생필품',
  '기타',
];

type FormValues = { itemCodes: string[] };

export const Items = () => {
  const { watch, setValue } = useFormContext<FormValues>();
  const selected = new Set(watch('itemCodes') ?? []);

  const toggle = (value: string) => {
    const next = new Set(selected);
    if (next.has(value)) {
      next.delete(value);
    } else {
      next.add(value);
    }
    setValue('itemCodes', Array.from(next), { shouldDirty: true, shouldValidate: true });
  };

  return (
    <div className="flex flex-col gap-[0.88rem]">
      <span className="label-large font-bold">구매 예정 품목을 알려주세요.</span>

      <ul className="flex flex-wrap gap-[0.375rem]">
        {ITEMS.map((value) => {
          const isChecked = selected.has(value);
          return (
            <li key={value}>
              <button
                type="button"
                onClick={() => toggle(value)}
                aria-pressed={isChecked}
                className={[
                  'label-xsmall inline-flex items-center gap-[0.25rem] rounded-[0.625rem] border bg-white px-[1rem] py-[0.5rem]',
                  isChecked ? 'border-primary-green text-gray-800' : 'border-gray-100 text-gray-600',
                ].join(' ')}
              >
                {value}
                <Icon
                  icon={isChecked ? 'check' : 'plus'}
                  width="1.125rem"
                  height="1.125rem"
                  className={isChecked ? 'text-primary-green' : 'text-gray-300'}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
