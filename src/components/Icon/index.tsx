import { useMemo } from 'react';
import { iconMap } from './map';
import type { IconProps } from './type';
import { colorMap } from '@styles/color';

export const Icon = ({ icon, iconColor = 'black', style, ...rest }: IconProps) => {
  const IconComponent = useMemo(() => iconMap[icon], [icon]);
  return <IconComponent className={style} fill={colorMap[iconColor]} {...rest} />;
};
