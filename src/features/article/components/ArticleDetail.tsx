/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import {
  fetchAuthorByPostId,
  fetchDetailByType,
  fetchPostById,
  PostDetail,
  type PostItem,
} from '@services/post/supabase';
import { joinPartyByPostId } from '@services/post/party/supabase';
import { toast } from 'react-toastify';
import { Header } from '@components/Header/Header';
import { Icon } from '@components/Icon';
import Test from '@assets/images/test.png';
/**
 * ArticleDetail
 * - Screenshot-inspired detail screen for a group shopping/errand post
 * - Tech: React + TailwindCSS + lucide-react icons
 * - Drop into your app and pass props; sane defaults supplied for quick preview
 */
export default function ArticleDetail() {
  const navigate = useNavigate(); // ⬅️ 네비게이터
  const { id } = useParams({ from: '/article/$id' });
  const [list, setList] = useState<PostItem | null>();
  const [detail, setDetail] = useState<PostDetail | null>();
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const p = await fetchPostById(id);
        setList(p);
        console.log(p);
        if (p) {
          const d = await fetchDetailByType(p);

          const author = await fetchAuthorByPostId(id);
          console.log(author);
          if (author) {
            setAuthor(author.username);
          }
          setDetail(d);
        }
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
    <div className="bg-primary-bg absolute z-51 h-dvh w-dvw">
      <Header title="게시물" />
      <div className="flex h-dvh flex-col gap-[1.5rem] px-[1rem] pt-[3.25rem]">
        <img src={Test} alt="" className="h-[23rem] w-full" />
        <div className="flex items-center gap-[0.75rem]">
          <div className="h-[2.25rem] w-[2.25rem] rounded-[1.125rem] border-1 border-gray-200"></div>
          <div className="flex flex-col gap-[0.38rem]">
            <span className="label-medium">{author}</span>
            <div className="flex gap-[0.33rem]">
              <span className="label-xxsmall rounded-[0.5rem] bg-amber-300 p-[0.38rem] text-white">냉동고 부자</span>
              <span className="label-xxsmall rounded-[0.5rem] bg-pink-400 p-[0.38rem] text-white">멋사</span>
              <span className="label-xxsmall rounded-[0.5rem] bg-amber-950 p-[0.38rem] text-white">최고</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[0.5rem]">
          <span className="label-small font-semibold text-gray-500">신뢰도</span>
          <div className="flex items-center gap-[0.25rem]">
            <Icon icon="star_fill" width={'0.9rem'} height={'0.9rem'} className="text-primary-green" />
            <span>4 / 5</span>
          </div>
        </div>
        <div className="flex items-center justify-end gap-[0.56rem] text-gray-400">
          <div className="flex items-center gap-[0.38rem]">
            <Icon icon="map-marker-area_fill" />
            <span className="label-xsmall text-gray-400">{detail?.location}</span>
          </div>
          <div className="flex items-center gap-[0.38rem]">
            <Icon icon="users_fill" />
            <span className="label-xsmall text-gray-400">1/4</span>
          </div>
        </div>
        <span className="header-small">{list?.title}</span>
        <span className="paragraph-medium font-regular">{list?.body}</span>
        <div className="flex p-[1rem]">
          <div className="basis-1/2"></div>
          <button
            className="bg-primary-green label-small basis-1/2 rounded-[1.125rem] p-[1rem] text-white"
            onClick={handleApply}
          >
            신청하기
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
