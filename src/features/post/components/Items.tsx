import { Icon } from '@components/Icon';
import { useId, useState } from 'react';

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

export const Items = () => {
  const [items, setItems] = useState<(typeof ITEMS)[number][]>([]);
  const key = useId();

  const handleClickItem = (value: (typeof ITEMS)[number]) => {
    setItems((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  return (
    <div className="flex flex-col gap-[0.88rem]">
      <span className="label-large font-bold">구매 예정 품목을 알려주세요.</span>
      <ul className="flex flex-wrap gap-[0.375rem]">
        {ITEMS.map((value, index) => {
          const isChecked = items.includes(value);
          return (
            <li
              key={key + index}
              onClick={() => handleClickItem(value)}
              className={`flex items-center gap-[0.25rem] border-1 px-[1rem] py-[0.5rem] ${isChecked ? 'border-primary-green' : 'border-gray-100'} label-xsmall rounded-[0.625rem] bg-white font-medium ${isChecked ? 'text-gray-800' : 'text-gray-600'}`}
            >
              {value}
              <Icon
                icon={isChecked ? 'check' : 'plus'}
                width={'1.125rem'}
                height={'1.125rem'}
                className={isChecked ? 'text-primary-green' : 'text-gray-300'}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
