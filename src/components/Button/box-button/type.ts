import React from 'react';

export interface BoxButtonProps {
  label: string;
  size?: 'xlarge' | 'large' | 'medium' | 'small';
  variant?: 'primary' | 'secondary'; // secondary = 기존 ghost 스타일
  state?: 'active' | 'inactive' | 'pressed';
  icon?: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
  isLoading?: boolean;
  className?: string;
}
