// components/auth/Login.tsx
import { useState } from 'react';
import supabase from '@utils/supabase/supabaseClient';

type LoginProps = {
  onSuccess?: () => void; // 로그인 성공 후 라우팅 등 외부 처리
};

export default function Login({ onSuccess }: LoginProps) {
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!email || !pw) return setErr('이메일과 비밀번호를 입력하세요.');
    setLoading(true);
    try {
      if (tab === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password: pw });
        if (error) throw error;
      }
      onSuccess?.();
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : '인증 중 오류가 발생했습니다.';
      setErr(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setErr(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // SPA라면 기본 팝업, 리다이렉트 원하면 url 지정
          // redirectTo: `${window.location.origin}/auth/callback`
        },
      });
      if (error) throw error;
      // OAuth는 팝업/리다이렉트로 진행되므로 여기서 onSuccess를 바로 부르지 않음.
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Google 로그인에 실패했습니다.';
      setErr(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-dvh max-w-dvw flex-col bg-white px-6 py-10">
      <h1 className="mb-6 text-2xl font-bold">로그인</h1>

      {/* 탭 */}
      <div className="mb-4 inline-flex w-full overflow-hidden rounded-xl border">
        <button
          type="button"
          className={`flex-1 py-2 text-sm ${tab === 'login' ? 'bg-gray-100 font-semibold' : 'bg-white'}`}
          onClick={() => setTab('login')}
        >
          로그인
        </button>
        <button
          type="button"
          className={`flex-1 py-2 text-sm ${tab === 'signup' ? 'bg-gray-100 font-semibold' : 'bg-white'}`}
          onClick={() => setTab('signup')}
        >
          회원가입
        </button>
      </div>

      {/* 폼 */}
      <form onSubmit={handleEmailAuth} className="flex flex-col gap-3">
        <label className="text-sm">
          이메일
          <input
            type="email"
            autoComplete="email"
            className="mt-1 w-full rounded-lg border p-3 outline-none"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
        </label>

        <label className="text-sm">
          비밀번호
          <input
            type="password"
            autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
            className="mt-1 w-full rounded-lg border p-3 outline-none"
            placeholder="8자 이상 비밀번호"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            disabled={loading}
            required
          />
        </label>

        {err && <p className="text-sm text-red-500">{err}</p>}

        <button
          type="submit"
          className="mt-2 w-full rounded-lg bg-black py-3 text-white disabled:opacity-50"
          disabled={loading}
        >
          {loading ? '처리 중…' : tab === 'login' ? '이메일로 로그인' : '이메일로 가입'}
        </button>
      </form>

      {/* 구분선 */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-400">또는</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* 소셜 로그인 */}
      <button
        type="button"
        onClick={handleGoogle}
        className="flex items-center justify-center gap-3 rounded-lg border bg-white py-3 text-sm disabled:opacity-50"
        disabled={loading}
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          className="h-5 w-5"
        />
        Google로 계속하기
      </button>

      {/* (선택) 비밀번호 초기화 / 매직링크 */}
      <div className="mt-6 text-center text-xs text-gray-500">
        비밀번호를 잊으셨나요?{' '}
        <button
          type="button"
          className="text-blue-600 underline"
          onClick={async () => {
            if (!email) return setErr('비밀번호 재설정은 이메일 입력이 필요합니다.');
            setLoading(true);
            setErr(null);
            try {
              const { error } = await supabase.auth.resetPasswordForEmail(email, {
                // redirectTo: `${window.location.origin}/auth/reset`
              });
              if (error) throw error;
              alert('재설정 링크를 이메일로 전송했습니다.');
            } catch (e: unknown) {
              const errorMessage = e instanceof Error ? e.message : '재설정 메일 전송에 실패했습니다.';
              setErr(errorMessage);
            } finally {
              setLoading(false);
            }
          }}
        >
          비밀번호 재설정
        </button>
      </div>
    </div>
  );
}
