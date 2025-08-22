import { Icon } from '@components/Icon';
import { BottomSheet } from '@features/chat/components/Sheet';
import type { MenuType } from '@features/chat/types/menu.type';
import { useId, useState } from 'react';

const MENUS: MenuType = [
  {
    icon: 'camera_fill',
    label: '카메라',
  },
  {
    icon: 'image_fill',
    label: '사진',
  },
  {
    icon: 'clock-plus_fill',
    label: '약속 잡기',
  },
  {
    icon: 'paper-fold-text_fill',
    label: '정산하기',
  },
  {
    icon: 'door-exit_fill',
    label: '나가기',
  },
];

export const Menu = () => {
  const menuId = useId();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ul className="flex h-[15rem] w-full flex-wrap content-center justify-center gap-x-[0rem] gap-y-[1.12rem]">
      {MENUS.map((menu, index) => (
        <li
          key={menuId + index}
          className="flex h-[4.25rem] basis-1/3 flex-col items-center justify-center gap-[0.5rem]"
          onClick={() => setIsOpen(true)}
        >
          <div className="flex h-[2.75rem] w-[2.75rem] items-center justify-center rounded-[1.375rem] bg-white">
            <Icon icon={menu.icon} width={'1.5rem'} height={'1.5rem'} className="text-gray-500" />
          </div>
          <span className="label-small-500 text-gray-500">{menu.label}</span>
        </li>
      ))}

      <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen} />
    </ul>
  );
};
