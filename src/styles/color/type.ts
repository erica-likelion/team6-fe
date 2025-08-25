import { grayColorMap, colorMap, whiteColorMap, blackColorMap } from './';

export type ColorType =
  | keyof typeof grayColorMap
  | keyof typeof colorMap
  | keyof typeof whiteColorMap
  | keyof typeof blackColorMap;