import { Icon } from '@components/Icon';
import { Banners } from '@features/chat/components/Banners';

export const Messages = () => {
  return (
    <div className="flex flex-1 flex-col gap-[1.5rem] px-[1rem]">
      <Message senderType="other" />
      <Message senderType="me" />
      <Message senderType="other" />
      <Banners.Promise />
    </div>
  );
};

interface MessageProps {
  senderType: 'me' | 'other';
}

const Message = ({ senderType }: MessageProps) => {
  const isMine = senderType === 'me';
  return (
    <div className={`flex gap-[0.5rem] ${isMine && 'justify-end'}`}>
      {!isMine && (
        <div className="flex h-[2.25rem] w-[2.25rem] shrink-0 items-center justify-center rounded-[1.125rem] border-1 border-gray-300 bg-gray-200">
          <Icon icon="user_fill" className="text-white" width={16} height={16} />
        </div>
      )}

      <div className="flex min-w-0 flex-col gap-[0.38rem]">
        {!isMine && <span>장보고</span>}

        <div className={`flex min-w-0 ${isMine && 'flex-row-reverse'} items-end gap-[0.38rem]`}>
          <div
            className={`inline-block w-fit max-w-[75%] rounded-[0.75rem] ${
              isMine ? 'rounded-tr-none' : 'rounded-tl-none'
            } ${isMine ? 'bg-white text-black' : 'bg-gray-800 text-white'} px-[1rem] py-[0.75rem]`}
          >
            ...
          </div>

          <span className="label-xxsmall shrink-0 font-medium text-gray-400">오후 00:00</span>
        </div>
      </div>
    </div>
  );
};
