import { Input } from '@features/chat/components/Input';
import { Header } from '@features/chat/components/Header';
import { Messages } from '@features/chat/components/Messages';
import { useRef, useEffect, useState } from 'react';
interface RoomProps {
  title: string;
  memberCount: number;
}

export const Room = ({ title, memberCount }: RoomProps) => {
  const [isKeyboard, setIsKeyboard] = useState(false);
  const [kb, setKb] = useState(0);
  const initialHeight = useRef(visualViewport?.height);

  useEffect(() => {
    const handleVisualViewportResize = () => {
      const currentVisualViewport = Number(window.visualViewport?.height);
      if (initialHeight.current !== undefined && currentVisualViewport < initialHeight.current) {
        window.scrollTo(0, 0); // 가상 키보드 활성화 시 화면 밀림 방지
        setIsKeyboard(true); // 가상 키보드 활성화 여부 판단
        setKb(initialHeight.current - currentVisualViewport); // 가상 키보드 높이 판별
      }
    };

    visualViewport?.addEventListener('resize', handleVisualViewportResize); // 가상키보드 함수 구독
    return () => visualViewport?.removeEventListener('resize', handleVisualViewportResize); // 언마운트 시 구독 제거
  }, []);

  useEffect(() => {
    const handleViewportScroll = () => {
      if (!visualViewport?.height) return;
      if (window.scrollY + visualViewport?.height > document.body.offsetHeight - 2) {
        // scroll 하단 가상 영역까지 스크롤되는 문제 판별 및 방지
        window.scrollTo(0, document.body.offsetHeight - visualViewport?.height - 1);
      }
    };

    visualViewport?.addEventListener('scroll', handleViewportScroll);
    return () => visualViewport?.removeEventListener('scroll', handleViewportScroll);
  }, []);

  return (
    <div className="bg-primary-bg absolute z-11 h-dvh w-dvw">
      <Header title={title} memberCount={memberCount} isMenu={true} />
      <Messages />
      <Input isKeyboard={isKeyboard} setIsKeyboard={setIsKeyboard} bottom={kb} />
    </div>
  );
};
