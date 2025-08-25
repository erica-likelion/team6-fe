import { Icon } from '@components/Icon';
import type { BannerPayload } from '@features/chat/components/Input';
import { BottomSheet } from '@features/chat/components/Sheet';
import type { MenuType } from '@features/chat/types/menu.type';
import { useId, useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { toast } from 'react-toastify';

type Action = 'camera' | 'gallery' | 'meetup' | 'settle' | 'leave';

const MENUS: (MenuType[number] & { action: Action })[] = [
  { icon: 'camera_fill', label: '카메라', action: 'camera' },
  { icon: 'image_fill', label: '사진', action: 'gallery' },
  { icon: 'clock-plus_fill', label: '약속 잡기', action: 'meetup' },
  { icon: 'paper-fold-text_fill', label: '정산하기', action: 'settle' },
  { icon: 'door-exit_fill', label: '나가기', action: 'leave' },
];

export function Menu({ onSendBanner }: { onSendBanner: (payload: BannerPayload) => void }) {
  const menuId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { id: roomId } = useParams({ from: '/chat/$id/' }); // ✅ roomId 가져오기

  const handleClick = (action: Action) => {
    switch (action) {
      case 'meetup':
        setIsOpen(true); // ✅ 약속 잡기 → 바텀 시트 오픈
        break;
      case 'settle':
        if (roomId) {
          navigate({
            to: '/chat/$id/settlement',
            params: { id: roomId },
          });
        }
        break;
      default:
        toast('준비중이에요 🙏'); // ✅ 나머지 → 토스트
    }
  };

  return (
    <ul className="flex h-[15rem] w-full flex-wrap content-center justify-center gap-y-[1.12rem]">
      {MENUS.map((menu, index) => (
        <li
          key={menuId + index}
          className="flex h-[4.25rem] basis-1/3 flex-col items-center justify-center gap-[0.5rem]"
        >
          <button
            type="button"
            onClick={() => handleClick(menu.action)}
            className="flex flex-col items-center justify-center gap-[0.5rem] focus:outline-none"
          >
            <div className="flex h-[2.75rem] w-[2.75rem] items-center justify-center rounded-[1.375rem] bg-white">
              <Icon icon={menu.icon} width="1.5rem" height="1.5rem" className="text-gray-500" />
            </div>
            <span className="label-small-500 text-gray-500">{menu.label}</span>
          </button>
        </li>
      ))}

      {/* 약속잡기 바텀 시트 */}
      <BottomSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSendBanner={(payload) => {
          onSendBanner(payload);
          setIsOpen(false); // 전송 후 닫기
        }}
      />
    </ul>
  );
}
