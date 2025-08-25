/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { fetchPostById, type PostItem } from '@services/post/supabase';
import { joinPartyByPostId } from '@services/post/party/supabase';
import { toast } from 'react-toastify';
/**
 * ArticleDetail
 * - Screenshot-inspired detail screen for a group shopping/errand post
 * - Tech: React + TailwindCSS + lucide-react icons
 * - Drop into your app and pass props; sane defaults supplied for quick preview
 */
export default function ArticleDetail(props: Partial<ArticleDetailProps>) {
  const {
    images = defaultData.images,
    author = defaultData.author,
    title = defaultData.title,
    trust = defaultData.trust,
    tags = defaultData.tags,
    location = defaultData.location,
    time = defaultData.time,
    quota = defaultData.quota,
    ctaText = defaultData.ctaText,
  } = props;

  const navigate = useNavigate(); // ⬅️ 네비게이터

  const [index, setIndex] = useState(0);
  const { id } = useParams({ from: '/article/$id' });
  const [list, setList] = useState<PostItem>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetchPostById(id);
        console.log(res);
        setList(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);
  console.log(loading);
  const handleApply = async () => {
    if (!list?.id) return;
    try {
      const res = await joinPartyByPostId(list.id); // ⬅️ 참가 시도
      // 이미 참가했던 경우에도 room_id를 주므로 채팅으로 이동시켜 UX 매끄럽게
      // toast(res.joined ? '참가 완료!' : '이미 참가 중이에요.');
      console.log(res);
      navigate({ to: '/chat' }); // ⬅️ 채팅방 이동
      toast('파티에 참가했어요!');
    } catch (e: any) {
      alert(e?.message ?? '참가에 실패했어요');
    }
  };

  return (
    <div className="min-h-dvh bg-white text-gray-900">
      {/* Image gallery */}
      <div className="relative aspect-[9/4] w-full overflow-hidden bg-gray-100">
        {images?.length ? (
          <img src={images[index]} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400"></div>
        )}

        {/* Dots */}
        {images && images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-2 py-1 backdrop-blur">
            <div className="flex items-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/60'}`}
                  aria-label={`image ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mx-auto w-full max-w-md px-4 pt-4 pb-28">
        {/* Author + badges row */}
        <div className="mb-4 flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 rounded-2xl border border-gray-200 bg-white" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="truncate text-sm font-semibold text-gray-900">{author.name}</span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-[11px] text-gray-500">
              <span className="font-semibold text-emerald-600">{trust.score}</span>
              <span className="text-gray-400">/</span>
              <span>5</span>
            </div>
          </div>

          {/* Small status chips */}
          <div className="flex shrink-0 items-center gap-1.5">
            {tags.slice(0, 3).map((t) => (
              <span
                key={t.label}
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap ${t.color}`}
              >
                {t.label}
              </span>
            ))}
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-2 text-[18px] leading-snug font-extrabold">{list?.title}</h1>

        {/* Meta row */}
        <div className="mb-3 flex flex-wrap items-center gap-3 text-[12px] text-gray-600">
          <span className="inline-flex items-center gap-1">홈플러스 안양</span>
          <span className="inline-flex items-center gap-1">{time}</span>
          <span className="inline-flex items-center gap-1">{quota}</span>
        </div>

        {/* Body */}
        <p className="text-[13px] leading-6 whitespace-pre-line text-gray-700">{list?.body}</p>

        {/* Location & misc */}
        <div className="mt-5 grid grid-cols-1 gap-2 text-[12px] text-gray-600 sm:grid-cols-2">
          <div className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
            <span>{location}</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
            <span>공동구매 · 육류</span>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-gray-200 bg-white/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        <div className="mx-auto flex w-full max-w-md items-center justify-between gap-3">
          <div className="text-[12px] text-gray-500">
            <div className="flex items-center gap-1 text-gray-600">오늘 14시</div>
            <div className="flex items-center gap-1">1/4</div>
          </div>
          <button
            onClick={handleApply}
            className="bg-primary-green h-12 flex-1 rounded-2xl px-5 text-sm font-bold text-white shadow-sm transition active:translate-y-[1px]"
          >
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  );
}

// -------------------- Types & Defaults --------------------
export type ArticleDetailProps = {
  images: string[];
  author: { name: string; isPlus?: boolean; isSafe?: boolean };
  title: string;
  body: string;
  trust: { score: number };
  tags: { label: string; color: string }[]; // color: Tailwind class e.g. 'bg-rose-100 text-rose-700'
  location: string;
  time: string; // e.g., '오늘 14시'
  quota: string; // e.g., '1/4'
  ctaText: string;
  onApply?: () => void;
};

const defaultData: ArticleDetailProps = {
  images: [
    'https://images.unsplash.com/photo-1610741083757-1ae88e1f9b19?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1560780552-ba54683cb428?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1604908176997-cb9369c919f0?q=80&w=2070&auto=format&fit=crop',
  ],
  author: { name: '멋사자', isPlus: true, isSafe: true },
  title: '코스트코에서 장보기 [금정동]',
  body: '코스트코에서 장 같이 보고 고기 육류 살 사람 구해요. 이러저러한 사람 금지 어쩌구 저쩌구 금지 사바사 사절\n\n2시간 정도 장볼 거 같아요\n제발 자잘 같이 장보러 가요 굴림~\n장보고 장보고',
  trust: { score: 4 },
  tags: [
    { label: '냉장고 무지', color: 'bg-rose-100 text-rose-700' },
    { label: '동 한 덩도 나눠요', color: 'bg-emerald-100 text-emerald-700' },
    { label: '신뢰해요 이인로', color: 'bg-sky-100 text-sky-700' },
  ],
  location: '금정동',
  time: '오늘 14시',
  quota: '1/4',
  ctaText: '신청하기',
};
