import type { ReactNode, MouseEventHandler } from 'react';

export type SplitButtonState = 'active' | 'inactive' | 'pressed';

export interface SplitButtonProps {
  label: string;
  state?: SplitButtonState;          // active | inactive | pressed
  isOpen?: boolean;                  // true면 아이콘 위(▲)로 회전
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onToggle?: () => void;             // 아이콘 버튼 클릭 시 토글
  fullWidth?: boolean;
  isLoading?: boolean;
  className?: string;
  leftIcon?: ReactNode;              // 필요 시 왼쪽 아이콘(옵션)
}
