import type { iconTypes } from './icon-type';
import type { ColorType } from '@styles/color/type';
import { SVGProps } from 'react';

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'style'> {
  icon: iconTypes;
  iconColor?: ColorType;
  style?: string;
}
