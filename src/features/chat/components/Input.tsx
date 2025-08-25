import { Icon } from '@components/Icon';
import { Menu } from '@features/chat/components/Menu';
import { useIsMobile } from '@hooks/useIsMobile';
import { useState, useRef } from 'react';

export type BannerPayload = {
  type: 'meetup';
  location?: string;
  timeISO?: string;
  note?: string;
};

interface InputProps {
  isKeyboard: boolean;
  setIsKeyboard: (value: boolean | ((prev: boolean) => boolean)) => void;
  bottom: number;
  onSend: (text: string) => void;
  onSendBanner: (payload: BannerPayload) => void;
}

export const Input = ({ isKeyboard, setIsKeyboard, bottom, onSend, onSendBanner }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMenu, setIsMenu] = useState(false);
  const isMobile = useIsMobile();
  const [value, setValue] = useState('');

  const handleOnMenu = () => {
    setIsKeyboard(false);
    setIsMenu(true);
  };

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const target = event.relatedTarget as HTMLElement | null;

    if (target?.role === 'menu-open') setIsMenu(true);
    setIsKeyboard(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = value.trim();
    if (!text) return;
    onSend(text);
    setValue('');
    // 재입력 UX 위해 다시 포커스
    inputRef.current?.focus();
  };

  return (
    <div
      className="bg-primary-bg fixed flex w-dvw flex-col px-[1rem] py-[0.5rem]"
      style={{ bottom: isKeyboard && isMobile ? `${bottom}px` : 0, position: 'fixed' }}
    >
      <div className="flex min-w-0 flex-1 items-center gap-[1rem]">
        {isMenu ? (
          <button role="menu-close" tabIndex={0}>
            <Icon
              icon="close"
              className="text-gray-400"
              width={'1.125rem'}
              height={'1.125rem'}
              onClick={() => setIsMenu(false)}
            />
          </button>
        ) : (
          <button role="menu-open" tabIndex={0}>
            <Icon icon="plus" className="text-gray-400" width={'1.125rem'} height={'1.125rem'} onClick={handleOnMenu} />
          </button>
        )}
        <form className="flex flex-1 rounded-[1.7rem] bg-white p-[1rem]" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            name=""
            id=""
            onChange={(e) => setValue(e.target.value)}
            className="flex flex-1 focus:outline-none"
            onFocus={() => setIsMenu(false)}
            onBlur={handleOnBlur}
            autoCapitalize="none"
            autoCorrect="off"
            value={value}
          />
          <button>
            <Icon icon="send_fill" className="text-gray-400" width={'1.125rem'} height={'1.125rem'} />
          </button>
        </form>
      </div>

      {isMenu && <Menu onSendBanner={onSendBanner} />}
    </div>
  );
};
