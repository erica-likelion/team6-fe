import { Header } from '@components/Header/Header';
import { Icon } from '@components/Icon';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import supabase from '@utils/supabase/supabaseClient';
import { toast } from 'react-toastify';
// 만약 sonner를 쓰면:
// import { toast } from 'sonner'
// 사내 util이면:
// import { toast } from '@utils/toast'

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [loading, setLoading] = useState(false);

  const canSubmit = id.trim().length > 0 && pw.trim().length > 0 && !loading;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setLoading(true);

      // ✅ 기본: 이메일/비밀번호 로그인
      //  - 아이디가 이메일이 아니라면, phone 로그인이나 커스텀 RPC로 치환하세요.
      const { error } = await supabase.auth.signInWithPassword({
        email: id.trim(),
        password: pw,
      });

      if (error) {
        // toast 사용처에 맞게 바꿔주세요
        // toast(error.message || '로그인에 실패했어요');
        alert(error.message || '로그인에 실패했어요');
        return;
      }

      // 성공
      // toast('로그인되었습니다!');
      toast('환영해요!');
      navigate({ to: '/home', replace: true }); // 홈으로 이동
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // toast(err?.message ?? '로그인 오류가 발생했어요');
      alert(err?.message ?? '로그인 오류가 발생했어요');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary-bg absolute z-51 h-dvh w-dvw">
      <Header title="로그인하기" />
      <div className="flex flex-col gap-[1.5rem] px-[1rem] pt-[3.25rem]">
        <Icon icon="icon_group" />
        <span className="label-large font-bold">소분소분에 돌아오신 것을 환영해요!</span>

        <form onSubmit={onSubmit}>
          {/* 아이디(이메일) */}
          <label htmlFor="login_id" className="block text-[15px] font-bold text-black">
            아이디
          </label>
          <input
            id="login_id"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디(이메일)을 입력해주세요"
            disabled={loading}
            className="mt-2 mb-6 w-full rounded-[18px] border border-[#DBD9CF] bg-white/60 px-4 py-4 text-[15px] placeholder:text-[#C8C6BD] focus:ring-2 focus:ring-[#C8C6BD] focus:outline-none disabled:opacity-60"
          />

          {/* 비밀번호 */}
          <label htmlFor="login_pw" className="block text-[15px] font-bold text-black">
            비밀번호
          </label>
          <input
            id="login_pw"
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
            disabled={loading}
            className="mt-2 w-full rounded-[18px] border border-[#DBD9CF] bg-white/60 px-4 py-4 text-[15px] placeholder:text-[#C8C6BD] focus:ring-2 focus:ring-[#C8C6BD] focus:outline-none disabled:opacity-60"
          />

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={!canSubmit}
            className={[
              'mt-8 h-[60px] w-full rounded-[22px] text-[17px] font-extrabold text-white transition',
              canSubmit ? 'bg-[#4DDB6D] hover:brightness-95 active:translate-y-px' : 'cursor-not-allowed bg-[#D9D7CF]',
            ].join(' ')}
          >
            {loading ? '로그인 중…' : '로그인하기'}
          </button>

          {/* 하단 링크 */}
          <div className="mt-6 flex items-center justify-center gap-10 text-[14px] text-[#B9B7AE]">
            <button type="button" className="hover:underline" disabled={loading}>
              아이디 찾기
            </button>
            <button type="button" className="hover:underline" disabled={loading}>
              비밀번호 찾기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
