import type { RecommendationProps, RecommendCard } from './type';
import { useHomeStore } from '../../stores/useHomeStore';
import { formatDayTime } from '../../utils/formatDate';
import { Icon } from '@components/Icon';

function Card({ item, onClick }: { item: RecommendCard; onClick?: (item: RecommendCard) => void }) {
  const { title, caption, time, imageUrl, href } = item;

  const timeText = typeof time === 'string' ? time : formatDayTime(time ?? new Date());

  const content = (
    <div className="h-[232px] w-[190px] min-w-[190px] overflow-hidden rounded-[20px] bg-gray-50 shadow-sm">
      {/* 이미지/플레이스홀더 */}
      {imageUrl ? (
        <img src={imageUrl} alt="" className="h-[120px] w-full object-cover" />
      ) : (
        <div className="h-[120px] w-full bg-gray-200" />
      )}

      {/* 텍스트 영역 */}
      <div className="flex h-[112px] flex-col justify-between bg-white px-3 py-2">
        <p className="truncate text-[11px] text-gray-500">{caption}</p>
        <p className="mt-1 line-clamp-2 text-[13px] leading-[16px] font-bold">{title}</p>

        <div className="flex items-center gap-1 text-[12px] text-gray-500">
          <Icon icon="clock_fill" className="h-[15px] w-[15px]" iconColor="gray-400" aria-hidden />
          <span>{timeText}</span>
        </div>
      </div>
    </div>
  );

  return href ? (
    <a href={href} aria-label={title} className="block">
      {content}
    </a>
  ) : (
    <button
      type="button"
      aria-label={title}
      onClick={onClick ? () => onClick(item) : undefined}
      className="block text-left"
    >
      {content}
    </button>
  );
}

export default function Recommendation({
  items,
  showWriteButton = false,
  onClickWrite,
  onClickCard,
  className = '',
}: RecommendationProps) {
  const storeItems = useHomeStore((s) => s.recommendCards);
  const list: RecommendCard[] = items ?? storeItems;

  return (
    <div className={className}>
      {/* 헤더 */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h3 className="text-[16px] font-bold">추천</h3>
          <span title="추천 기준 안내">
            <Icon icon="question-circle" className="h-[15px] w-[15px] text-gray-500" aria-label="추천 기준 안내" />
          </span>
        </div>

        {showWriteButton && (
          <button
            onClick={onClickWrite}
            className="inline-flex h-8 items-center gap-1 rounded-full bg-green-500 px-4 text-[12px] font-semibold text-white shadow-md"
          >
            <Icon icon="edit-pen" className="h-4 w-4" aria-hidden />
            글쓰기
          </button>
        )}
      </div>

      {/* 카드 리스트 → 가로 스와이프 */}
      <div className="overflow-x-auto">
        <div className="flex gap-3">
          {list?.length ? (
            list.map((item) => <Card key={item.key} item={item} onClick={onClickCard} />)
          ) : (
            <>
              <div className="h-[232px] min-w-[190px] rounded-[20px] bg-gray-100" />
              <div className="h-[232px] min-w-[190px] rounded-[20px] bg-gray-100" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
