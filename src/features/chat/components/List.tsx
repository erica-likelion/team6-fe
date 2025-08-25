import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getMyChatRooms } from '@services/chat/supabase';

export const List = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['my-chat-rooms'],
    queryFn: getMyChatRooms,
  });

  if (isLoading) return <div className="p-4 text-gray-400">불러오는 중…</div>;
  if (isError) return <div className="p-4 text-red-500">목록을 불러오지 못했습니다.</div>;
  if (!data?.length) return <EmptyListItem />;
  console.log(data);
  return (
    <ul className="flex flex-1 flex-col items-stretch gap-[1.5rem] px-[1rem] py-[1.25rem]">
      {data.map((row) => {
        const img = row.chat_rooms.posts.item_photos[0] || row.chat_rooms.posts?.party_photos[0];
        return (
          <li key={row.room_id}>
            <Link to="/chat/$id" params={{ id: row.room_id }} className="flex items-center gap-[0.625rem]">
              <div className="h-[4rem] w-[4rem] rounded-[0.625rem] bg-gray-100">
                {img?.url && (
                  <img
                    src={img?.url}
                    alt=""
                    className="h-full w-full rounded-[0.625rem] border-none bg-transparent object-cover shadow-none outline-none"
                  />
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-[0.38rem]">
                <span className="label-medium-600 truncate">{row.chat_rooms.posts.title}</span>
                <span className="paragraph-small truncate text-gray-400">
                  {row.chat_rooms.chat_messages[0].content}
                </span>
              </div>
              <div className="bg-primary-green label-xsmall-600 flex h-[1.5rem] w-[1.5rem] items-center justify-center rounded-[0.75rem] text-white">
                0
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
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
