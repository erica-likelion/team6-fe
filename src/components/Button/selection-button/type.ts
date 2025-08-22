export interface SelectionButtonProps {
  state?: 'selected' | 'deselected';
  disabled?: boolean;
  onToggle?: (next: 'selected' | 'deselected') => void;
  className?: string;
  icon?: React.ReactNode;           // mode='check'일 때만 사용
  'aria-label'?: string;
  mode?: 'check' | 'radio';         // ✅ 추가: 기본 'check'
}
