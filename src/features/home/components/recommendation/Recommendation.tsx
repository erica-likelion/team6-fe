// src/features/home/components/recommendation/Recommendation.tsx
import { useMemo } from 'react';
import type { RecommendationProps, RecommendCard } from './type';
import { useHomeStore } from '../../stores/useHomeStore';
import { formatDayTime } from '../../utils/formatDate';
import { Icon } from '@components/Icon';

// ⬇️ 추가: Supabase 연동 훅/타입
import { useRecommendations } from '../../hooks/useRecommendations';
import type { RecommendationType, RecommendationItem } from '../../services/recommendation';

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

// ⬇️ 추가: Supabase 결과를 화면 카드 형태로 매핑
function mapToRecommendCard(x: RecommendationItem, type: RecommendationType): RecommendCard {
  return {
    key: x.id, // 리스트 key
    title: x.title, // 제목
    caption: type === 'sharing' ? '소분 추천' : '장보기 추천', // 캡션 기본값
    time: new Date(), // 서비스에 created_at이 있으면 거기로 교체
    imageUrl: undefined, // 이미지 컬럼 있으면 교체
    href: `/post/${x.id}`, // 필요 시 라우팅 규칙에 맞게 변경
  };
}

export default function Recommendation({
  items, // (선택) 외부에서 직접 넘기는 경우 우선 사용
  showWriteButton = false,
  onClickWrite,
  onClickCard,
  className = '',

  // ⬇️ 추가된 선택 prop: Supabase에서 자동으로 가져오고 싶을 때 사용
  useRemote = false,
  type = 'shopping',
  maxItems = 10,
}: RecommendationProps & {
  useRemote?: boolean; // true면 Supabase 훅 사용
  type?: RecommendationType; // 'shopping' | 'sharing'
  maxItems?: number; // 화면에 표시할 최대 개수
}) {
  const storeItems = useHomeStore((s) => s.recommendCards);

  // ⬇️ Supabase 훅 (useRemote일 때만 동작)
  const { items: remoteItems, loading, error } = useRecommendations(useRemote ? type : undefined);

  // 우선순위: props.items > useRemote 결과 > store
  const list: RecommendCard[] = useMemo(() => {
    if (items?.length) return items;
    if (useRemote && remoteItems) return remoteItems.map((x) => mapToRecommendCard(x, type)).slice(0, maxItems);
    return storeItems?.slice(0, maxItems) ?? [];
  }, [items, useRemote, remoteItems, storeItems, type, maxItems]);

  const isEmpty = list.length === 0;

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

      {/* 상태 라벨 (useRemote일 때만 표시) */}
      {useRemote && (
        <div className="mb-2 min-h-[18px] px-1">
          {loading ? (
            <span className="inline-block animate-pulse text-[11px] text-gray-400">추천 불러오는 중…</span>
          ) : error ? (
            <span className="inline-block text-[11px] text-red-400">추천을 불러오지 못했어요</span>
          ) : !isEmpty ? (
            <span className="inline-flex items-center rounded-[6px] bg-[#F2FFF5] px-2 py-[2px] text-[11px] font-semibold text-[#1EB065]">
              전체 {list.length}개
            </span>
          ) : (
            <span className="inline-block text-[11px] text-gray-400">추천 가능한 모임이 없어요</span>
          )}
        </div>
      )}

      {/* 카드 리스트 → 가로 스와이프 */}
      <div className="overflow-x-auto">
        <div className="flex gap-3">
          {!isEmpty ? (
            list.map((item) => <Card key={item.key} item={item} onClick={onClickCard} />)
          ) : (
            // 비어있을 때 스켈레톤
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
