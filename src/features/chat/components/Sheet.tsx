import { Sheet } from 'react-modal-sheet';
import { Banners } from '@features/chat/components/Banners';

interface BottomSheetProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BottomSheet = ({ isOpen, setIsOpen }: BottomSheetProps) => {
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
                  <div className="flex flex-col gap-[0.5rem] overflow-y-scroll">
                    <div className="flex items-center gap-[0.88rem]">
                      <div className="h-[2.25rem] w-[2.25rem] rounded-[1.125rem] border-1 border-gray-200 bg-white"></div>
                      <span className="label-small font-semibold text-gray-800">장보고</span>
                    </div>
                    <div className="flex items-center gap-[0.88rem]">
                      <div className="h-[2.25rem] w-[2.25rem] rounded-[1.125rem] border-1 border-gray-200 bg-white"></div>
                      <span className="label-small font-semibold text-gray-800">장보고</span>
                    </div>
                    <div className="flex items-center gap-[0.88rem]">
                      <div className="h-[2.25rem] w-[2.25rem] rounded-[1.125rem] border-1 border-gray-200 bg-white"></div>
                      <span className="label-small font-semibold text-gray-800">장보고</span>
                    </div>
                    <div className="flex items-center gap-[0.88rem]">
                      <div className="h-[2.25rem] w-[2.25rem] rounded-[1.125rem] border-1 border-gray-200 bg-white"></div>
                      <span className="label-small font-semibold text-gray-800">장보고</span>
                    </div>
                    <div className="flex items-center gap-[0.88rem]">
                      <div className="h-[2.25rem] w-[2.25rem] rounded-[1.125rem] border-1 border-gray-200 bg-white"></div>
                      <span className="label-small font-semibold text-gray-800">장보고</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Sheet.Scroller>
          <button
            className="bg-primary-green label-medium h-[3.5rem] rounded-[1.25rem] font-bold text-white"
            onClick={() => setIsOpen(false)}
          >
            약속 잡기
          </button>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};
