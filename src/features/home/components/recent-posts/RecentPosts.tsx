import React, { useEffect, useState } from 'react';
import type { RecentPostsProps, PostItem, PostBadge } from './type';
import { formatDayTime } from '../../utils/formatDate';
import { Icon } from '@components/Icon';
import type { IconProps } from '@components/Icon/type';
import { fetchRecentPosts } from '@services/post/supabase';
import { Link } from '@tanstack/react-router';

// Badge: 유사도 = 초록 pill, 장보기 = 텍스트
function Badge({ text, tone = 'green' }: PostBadge) {
  if (tone === 'text') {
    return <span className="text-[10px] leading-[12px] font-semibold tracking-[-0.02em] text-gray-600">{text}</span>;
  }

  if (tone === 'green') {
    return (
      <span className="inline-flex h-[24px] items-center rounded-[8px] bg-[#4DDB6D] px-[6px] text-[12px] font-semibold text-white">
        {text}
      </span>
    );
  }

  return null;
}

function Meta({ icon, children }: { icon: IconProps['icon']; children?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 text-[12px] text-gray-500">
      <Icon icon={icon} className="h-[16px] w-[16px]" iconColor="gray-500" aria-hidden />
      {children}
    </span>
  );
}

function Row({ item, onClick }: { item: PostItem; onClick?: (i: PostItem) => void }) {
  const { title, body, badges = [], thumbnailUrl, place, time, people, href } = item;
  const timeText = typeof time === 'string' ? time : time ? formatDayTime(time) : undefined;

  const content = (
    <div className="py-4">
      {/* 배지 */}
      {badges.length > 0 && (
        <div className="mb-2 flex items-center gap-[12px]">
          {badges.map((b, i) => (
            <Badge key={`${b.text}-${i}`} {...b} />
          ))}
        </div>
      )}

      {/* 본문 헤더 */}
      <div className="flex items-start gap-3">
        <div className="h-[56px] w-[56px] shrink-0 overflow-hidden rounded-[12px] bg-gray-200">
          {thumbnailUrl ? <img src={thumbnailUrl} alt="" className="h-full w-full object-cover" /> : null}
        </div>

        <div className="min-w-0">
          <p className="text-[16px] leading-5 font-bold text-[#1C1D1A]">{title}</p>
          <p className="mt-1 line-clamp-2 text-[13px] leading-4 text-gray-500">{body}</p>
        </div>
      </div>

      {/* 메타 정보 */}
      <div className="mt-3 flex items-center gap-5">
        {place && <Meta icon="map-marker_fill">{place}</Meta>}
        {timeText && <Meta icon="clock_fill">{timeText}</Meta>}
        {people && <Meta icon="users_fill">{people}</Meta>}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        to="/article/$id"
        params={{ id: String(href) }} // 반드시 객체로 넘기기
        aria-label={title}
        className="block"
      >
        {content} {/* 앞서 content → body로 매핑했으니 body 사용 */}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className="block w-full text-left"
      onClick={onClick ? () => onClick(item) : undefined}
      aria-label={title}
    >
      {content}
    </button>
  );
}

export default function RecentPosts({ items, className = '', onClickRow }: RecentPostsProps) {
  const [list, setList] = useState<PostItem[]>(items ?? []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (items) {
      setList(items);
      return;
    }
    (async () => {
      try {
        setLoading(true);
        const res = await fetchRecentPosts(20);
        setList(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [items]);


  return (
    <section className={`rounded-[20px] bg-[#FAF9F4] ${className}`}>
      <div className="px-4 py-3">
        <h3 className="text-[16px] font-bold">방금 올라온 게시글</h3>
      </div>

      <div className="divide-y divide-gray-200">

        {items?.length ? (
          items.map((p) => <Row key={p.id} item={p} onClick={onClickRow} />)

        ) : (
          <div className="px-4 py-8 text-center text-sm text-gray-400">표시할 게시글이 없습니다</div>
        )}
      </div>
    </section>
  );
}
