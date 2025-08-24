import { Icon } from '@components/Icon';

export const Place = () => {
  return (
    <div className="flex flex-col gap-[0.88rem]">
      <span className="label-small font-semibold">장소 선택</span>
      <button className="label-small flex w-fit items-center gap-[0.38rem] rounded-[1.125rem] border-1 border-gray-200 bg-white p-[1rem] font-bold text-gray-600">
        <Icon icon="map-marker-plus_fill" width={'1.125rem'} height={'1.125rem'} />
        장소 찾기
      </button>
    </div>
  );
};
