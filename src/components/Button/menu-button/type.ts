import type { ReactNode, MouseEvent } from 'react';

export type VisualState = 'active' | 'inactive' | 'pressed';

export interface MenuItem {
  key: string;
  label: string;
  state?: VisualState;
  disabled?: boolean;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  onSelect?: () => void;
}

export interface MenuButtonPanelProps {
  items: MenuItem[];
  className?: string;
}

export interface SplitMenuProps {
  label: string;
  items: MenuItem[];
  state?: VisualState;
  isOpen?: boolean;
  onToggle?: () => void;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  fullWidth?: boolean;
  isLoading?: boolean;
  className?: string;
}

