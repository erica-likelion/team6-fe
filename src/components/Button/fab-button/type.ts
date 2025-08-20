import React from 'react';

export interface FabButtonProps {
  label: string;                           // 예: "글쓰기"
  icon: React.ReactNode;                   // 연필 아이콘 등
  state?: 'active' | 'inactive' | 'pressed';
  variant?: 'primary' | 'secondary';       // 기본은 primary(초록)
  fixed?: boolean;                         // 기본 true: 화면 우하단 고정
  position?: { bottom?: number; right?: number; left?: number; top?: number };
  onClick?: () => void;
  className?: string;
  'aria-label'?: string;                   // 접근성 라벨(없으면 label 사용)
}
