import { iconTypes } from "@components/Icon/icon-type";

export interface LiProps {
  label: string;
  to: string;
  defaultIcon: iconTypes;
  activeIcon: iconTypes;
  isActive: boolean;
}
