import { Link } from '@tanstack/react-router';

export const List = () => {
  const USER_CHAT = true;

  return (
    <ul className="flex flex-1 flex-col items-stretch gap-[1.5rem] overflow-auto px-[1rem] py-[1.25rem]">
      {USER_CHAT ? <ListItem /> : <EmptyListItem />}
    </ul>
  );
};

const ListItem = () => {
  return (
    <li>
      <Link to="/chat/$id" params={{ id: '1' }} className="flex items-center gap-[0.625rem]">
        <div className="h-[4rem] w-[4rem] rounded-[0.625rem] bg-gray-100"></div>
        <div className="flex min-w-0 flex-1 flex-col gap-[0.38rem]">
          <span className="label-medium-600 truncate">홈플러스 장보러 같이 가요</span>
          <span className="paragraph-small truncate text-gray-400">
            다들 1층 계산대 앞에서 모여요다들 1층 계산대 앞에서 모여요 다들 1층 계산대 앞에서 모여요 다들 1층 계산대
            앞에서 모여요
          </span>
        </div>
        <div className="bg-primary-green label-xsmall-600 flex h-[1.5rem] w-[1.5rem] items-center justify-center rounded-[0.75rem] text-white">
          1
        </div>
      </Link>
    </li>
  );
};

const EmptyListItem = () => {
  return (
    <>
      <div className="h-[10rem] w-[10rem] bg-gray-200"></div>
      <span className="paragraph-medium text-center text-gray-500">
        채팅이 없어요 <br />
        대화를 시작해보세요!
      </span>
    </>
  );
};
