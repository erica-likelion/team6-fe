// import Login from '@features/auth/components/Login';
import { Icon } from '@components/Icon';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import Character from '@assets/images/character.png';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  return (
    <div
      className="absolute z-50 flex h-dvh w-dvw items-center justify-center"
      style={{
        background:
          'linear-gradient(180deg, #4DDB6D -2.84%, rgba(77, 219, 109, 0.24) 77.8%, rgba(77, 219, 109, 0.00) 141.75%), #FFF',
      }}
    >
      <div className="flex flex-col gap-[1.5rem]">
        <div className="flex w-full flex-col items-center justify-center gap-[1rem]">
          <Icon icon="logo" />
          <span className="header-small text-white">오순도순 먹을 만큼 소분소분!</span>
        </div>
        <div className="flex justify-center">
          <img src={Character} className="h-[21rem] w-[21rem]" />
        </div>
        <div className="flex flex-col gap-[0.62rem]">
          <button
            className="bg-primary-green label-medium rounded-[1.25rem] p-[1rem] font-bold text-white"
            onClick={() => navigate({ to: '/login' })}
          >
            로그인하기
          </button>
          <button className="label-medium rounded-[1.25rem] border-1 border-gray-200 bg-white p-[1rem] font-bold text-gray-700">
            처음이라면? 회원가입하기
          </button>
        </div>
      </div>
    </div>
  );
}
