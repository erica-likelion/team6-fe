export type IconButtonState = 'active' | 'inactive' | 'pressed';

export interface IconButtonProps {
  icon: string;              // iconMap의 키 (예: 'home', 'chat', ...)
  label: string;             // 예: '홈'
  state?: IconButtonState;   // 기본 'inactive'
  onClick?: () => void;
  disabled?: boolean;
  className?: string;        // 필요시 추가 tailwind
  size?: 'sm' | 'md';        // 아이콘/폰트 사이즈 옵션
}
