/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from '@components/Icon';
import { Header } from '@components/Header/Header';
import { Reciept } from '@features/chat/components/Reciept';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { createSettlement, getSettlementByRoom } from '@services/chat/supabase';
import supabase from '@utils/supabase/supabaseClient';

interface SettlementProps {
  title: string;
}

export const Settlement = ({ title }: SettlementProps) => {
  const { id: roomId } = useParams({ from: '/chat/$id/settlement/' });
  const navigate = useNavigate();

  const [total, setTotal] = useState<number>(10000);
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState<any[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [me, setMe] = useState<string | null>(null);

  // 로그인 유저 id
  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setMe(user.id);
    })();
  }, []);
  // Settlement.tsx
  useEffect(() => {
    if (!me || members.length === 0) return;

    // settlement 요청자가 첫 번째 member라고 가정
    const payerId = members[0]?.user_id;
    if (payerId === me) {
      // 내가 요청자라면 settlement 화면을 못 보도록 뒤로 이동
      navigate({ to: '/chat/$id', params: { id: roomId! } });
      alert('이미 요청하신 내용이에요!');
    }
  }, [me, members, roomId, navigate]);
  // 정산 멤버 불러오기
  useEffect(() => {
    if (!roomId) return;
    (async () => {
      try {
        setLoadingMembers(true);
        const res = await getSettlementByRoom(roomId);
        setMembers(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingMembers(false);
      }
    })();
  }, [roomId]);

  const onSubmit = async () => {
    if (!roomId) return alert('roomId가 없습니다.');
    if (!Number.isFinite(total) || total <= 0) return alert('총 금액을 바르게 입력하세요.');

    try {
      setLoading(true);
      const settlementId = await createSettlement(roomId, 'settlement' + roomId, total);
      console.log(settlementId);
      navigate({ to: '/chat/$id', params: { id: roomId } });
    } catch (e: any) {
      alert(e?.message ?? '정산 생성 실패');
    } finally {
      setLoading(false);
    }
  };

  if (loadingMembers) {
    return <div className="p-4 text-gray-400">정산 정보를 불러오는 중…</div>;
  }

  // 제목 결정 로직
  let headerTitle = title;
  if (members.length === 0) {
    headerTitle = '정산하기'; // 아무도 없으면 내가 요청자
  } else {
    // settlement 요청자가 첫 번째 member라고 가정
    const payerId = members[0]?.user_id;
    if (me && payerId && payerId !== me) {
      headerTitle = '정산하기'; // 내가 요청자가 아님
    } else {
      headerTitle = '정산 보내기'; // 내가 요청자일 때
    }
  }

  return (
    <div className="bg-primary-bg absolute z-11 h-dvh w-dvw">
      <Header title={headerTitle} isMenu={false} />

      <div className="flex h-full flex-1 flex-col gap-[1.5rem] overflow-y-scroll px-[1rem] pt-[3.75rem] pb-[2rem]">
        <div className="flex flex-col gap-[0.88rem]">
          <span className="label-large font-bold">영수증</span>
          <span className="label-small font-semibold">정산을 요청하는 사람</span>
          <div className="flex items-center gap-[0.88rem]">
            <div className="h-[2.25rem] w-[2.25rem] rounded-[1.125rem] border border-gray-200 bg-white"></div>
            <span className="label-small font-semibold text-gray-800">{members.length === 0 ? '나' : '요청자'}</span>
          </div>
        </div>
        <Reciept setTotal={setTotal} isAuth={members.length !== 0} />
        <div className="border-1 border-gray-100" />
        <div className="flex flex-col gap-[0.88rem]">
          <span className="label-large font-bold">어떤 계좌로 정산 받을까요?</span>
          <label
            htmlFor="settlement_account"
            className="flex gap-[0.62rem] rounded-[0.75rem] border border-gray-200 p-[1rem]"
          >
            <Icon icon="creditcard_fill" width={'1.5rem'} height={'1.5rem'} />
            <input
              id="settlement_account"
              type="text"
              className="label-medium flex-1 font-medium text-gray-800 outline-none"
            />
          </label>
        </div>
        <button
          className="bg-primary-green label-medium h-[3.5rem] rounded-[1.25rem] p-[1rem] font-bold text-white"
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? '요청 중…' : '정산 요청하기'}
        </button>
      </div>
    </div>
  );
};
