import React from 'react';

export type CardButtonStatus = 'selected' | 'deselected';

export interface CardButtonProps {
  title: string;
  description?: string;
  selected?: boolean;
  status?: CardButtonStatus;
  state?: CardButtonStatus;
  onChange?: (next: CardButtonStatus) => void;
  onClick?: () => void;
  rightTopIcon?: React.ReactNode;
  bottomRightGraphic?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  testId?: string;
  ariaLabel?: string;
}
