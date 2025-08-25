// src/features/group-list/components/FilterBar.tsx
import { useState, useEffect } from 'react';
import SplitMenu from '@components/Button/menu-button/MenuButton';
import { Icon } from '@components/Icon';
import type { GroupPostType, GroupPostStatus } from '@services/group-post/list';

interface FilterBarProps {
  onChange?: (f: { type?: GroupPostType; status?: GroupPostStatus }) => void;
}

export default function FilterBar({ onChange }: FilterBarProps) {
  const [openDay, setOpenDay] = useState(false);
  const [openSort, setOpenSort] = useState(false);

  const [selectedDay, setSelectedDay] = useState('화요일');
  const [selectedSort, setSelectedSort] = useState('최신순');

  const [onlyVerified, setOnlyVerified] = useState(false);
  const [deadlineSoon, setDeadlineSoon] = useState(false);

  // ✅ 상태가 변할 때마다 onChange 호출
  useEffect(() => {
    onChange?.({
      type: undefined, // 요일 → type 매핑 필요하면 여기에 연결
      status: deadlineSoon ? 'open' : undefined,
    });
  }, [selectedDay, selectedSort, onlyVerified, deadlineSoon, onChange]);

  return (
    <div className="scrollbar-hide flex flex-nowrap gap-2 overflow-x-auto">
      {/* 요일 선택 */}
      <SplitMenu
        label={selectedDay}
        isOpen={openDay}
        onToggle={() => setOpenDay((prev) => !prev)}
        items={[
          {
            key: 'mon',
            label: '월요일',
            onSelect: () => {
              setSelectedDay('월요일');
              setOpenDay(false);
            },
          },
          {
            key: 'tue',
            label: '화요일',
            onSelect: () => {
              setSelectedDay('화요일');
              setOpenDay(false);
            },
          },
          {
            key: 'wed',
            label: '수요일',
            onSelect: () => {
              setSelectedDay('수요일');
              setOpenDay(false);
            },
          },
          {
            key: 'thu',
            label: '목요일',
            onSelect: () => {
              setSelectedDay('목요일');
              setOpenDay(false);
            },
          },
          {
            key: 'fri',
            label: '금요일',
            onSelect: () => {
              setSelectedDay('금요일');
              setOpenDay(false);
            },
          },
          {
            key: 'sat',
            label: '토요일',
            onSelect: () => {
              setSelectedDay('토요일');
              setOpenDay(false);
            },
          },
          {
            key: 'sun',
            label: '일요일',
            onSelect: () => {
              setSelectedDay('일요일');
              setOpenDay(false);
            },
          },
        ]}
        className="shrink-0"
      />

      {/* 정렬 선택 */}
      <SplitMenu
        label={selectedSort}
        isOpen={openSort}
        onToggle={() => setOpenSort((prev) => !prev)}
        items={[
          {
            key: 'recent',
            label: '최신순',
            onSelect: () => {
              setSelectedSort('최신순');
              setOpenSort(false);
            },
          },
          {
            key: 'similarity',
            label: '유사도 높은 순',
            onSelect: () => {
              setSelectedSort('유사도 높은 순');
              setOpenSort(false);
            },
          },
          {
            key: 'distance',
            label: '거리순',
            onSelect: () => {
              setSelectedSort('거리순');
              setOpenSort(false);
            },
          },
        ]}
        className="shrink-0"
      />

      {/* 인증된 사용자 */}
      <button
        type="button"
        onClick={() => setOnlyVerified((prev) => !prev)}
        className={`flex h-[32px] shrink-0 items-center gap-1 rounded-[8px] border px-3 text-[13px] font-semibold ${
          onlyVerified ? 'border-[#22C55E] bg-white text-[#1C1D1A]' : 'border-[#E5E5E5] bg-white text-[#6C6B62]'
        }`}
      >
        인증된 사용자
        {onlyVerified && <Icon icon="check-line" className="h-3.5 w-3.5 text-[#22C55E]" />}
      </button>

      {/* 마감 임박 */}
      <button
        type="button"
        onClick={() => setDeadlineSoon((prev) => !prev)}
        className={`flex h-[32px] shrink-0 items-center gap-1 rounded-[8px] border px-3 text-[13px] font-semibold ${
          deadlineSoon ? 'border-[#22C55E] bg-white text-[#1C1D1A]' : 'border-[#E5E5E5] bg-white text-[#6C6B62]'
        }`}
      >
        마감 임박
        {deadlineSoon ? (
          <Icon icon="check-line" className="h-3.5 w-3.5 text-[#22C55E]" />
        ) : (
          <Icon icon="plus" className="h-3.5 w-3.5 text-gray-400" />
        )}
      </button>
    </div>
  );
}
