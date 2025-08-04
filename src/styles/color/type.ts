import { grayColorMap, primaryColorMap, whiteColorMap, blackColorMap } from './';

export type ColorType =
  | keyof typeof grayColorMap
  | keyof typeof primaryColorMap
  | keyof typeof whiteColorMap
  | keyof typeof blackColorMap;