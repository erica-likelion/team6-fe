// features/chat/components/Sheet.tsx
import { Sheet } from 'react-modal-sheet';
import { Banners } from '@features/chat/components/Banners';
import { BannerPayload } from '@features/chat/components/Input';
import supabase from '@utils/supabase/supabaseClient';
import { useEffect, useState } from 'react';
import { useParams } from '@tanstack/react-router';

type Member = { user_id: string; username: string | null };

interface BottomSheetProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSendBanner: (payload: BannerPayload) => void;
}

export const BottomSheet = ({ isOpen, setIsOpen, onSendBanner }: BottomSheetProps) => {
  const { id: roomId } = useParams({ from: '/chat/$id/' }); // ✅ route param에서 roomId 가져오기
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  // 멤버 조회
  useEffect(() => {
    if (!isOpen || !roomId) return;
    let alive = true;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('chat_members')
        .select(
          `
          user_id,
          userinfo ( username )
        `
        )
        .eq('room_id', roomId);

      if (!alive) return;
      if (error) {
        console.error(error);
        setMembers([]);
      } else {
        setMembers(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (data ?? []).map((row: any) => ({
            user_id: row.user_id,
            username: row.userinfo?.username ?? null,
          }))
        );
      }
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [roomId, isOpen]);

  const handleOnClick = () => {
    setIsOpen(false);
    onSendBanner({
      type: 'meetup',
      location: '홈플러스 안양',
      timeISO: new Date(Date.now() + 3600_000).toISOString(),
      note: '1층 계산대 앞',
    });
  };

  return (
    <Sheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <Sheet.Container className="!bg-primary-bg">
        <Sheet.Header />
        <Sheet.Content className="flex flex-col justify-between px-[1rem] pb-[2.22rem]">
          <Sheet.Scroller className="flex flex-1 flex-col gap-[0.5rem] overflow-y-scroll">
            <span className="label-medium font-bold">약속잡기</span>
            <div className="flex flex-col gap-[1.5rem]">
              <Banners.Information />
              <div className="flex flex-col gap-[0.88rem]">
                <span className="label-large font-bold">채팅방에 있는 유저들과 약속을 잡습니다.</span>

                <div className="flex flex-col gap-[0.88rem]">
                  <span className="label-small font-semibold">대화 상대</span>

                  <div className="flex max-h-[12rem] flex-col gap-[0.5rem] overflow-y-auto">
                    {loading && <div className="label-small text-gray-400">불러오는 중…</div>}

                    {!loading && members.length === 0 && (
                      <div className="label-small text-gray-400">참여자가 없습니다.</div>
                    )}

                    {!loading &&
                      members.map((m) => (
                        <div key={m.user_id} className="flex items-center gap-[0.88rem]">
                          <div className="h-[2.25rem] w-[2.25rem] rounded-[1.125rem] border-1 border-gray-200 bg-white" />
                          <span className="label-small font-semibold text-gray-800">{m.username ?? '사용자'}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </Sheet.Scroller>

          <button
            className="bg-primary-green label-medium h-[3.5rem] rounded-[1.25rem] font-bold text-white"
            onClick={handleOnClick}
          >
            약속 잡기
          </button>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};
