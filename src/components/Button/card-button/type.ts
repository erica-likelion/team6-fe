import type React from 'react';

export interface CardButtonGraphic {
  src?: string;             
  alt?: string;
  node?: React.ReactNode;   
  size?: number;            
  position?: 'bottom-right' | 'center-right' | 'top-right' | 'bottom-center';
  className?: string;
}

export interface CardButtonProps {
  title: string;
  description?: string;

  selected?: boolean;
  status?: 'selected' | 'deselected';
  state?: 'selected' | 'deselected';
  onChange?: (next: 'selected' | 'deselected') => void;
  onClick?: () => void;

  // 레이아웃
  variant?: 'right-graphic' | 'hero-graphic'; 
  width?: number;   
  height?: number;  
  radius?: number;  

  // 우상단 체브론
  showChevron?: boolean;
  rightTopIcon?: React.ReactNode;

  // 그래픽(이미지/커스텀)
  graphic?: CardButtonGraphic;

  disabled?: boolean;
  className?: string;
  testId?: string;
  ariaLabel?: string;
}

