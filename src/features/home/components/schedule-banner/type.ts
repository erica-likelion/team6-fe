// src/components/schedule-banner/type.ts
export type BannerType = 'shopping' | 'sharing';

export interface ScheduleBannerProps {
  type: BannerType;
  title: string;
  subtitle: string;
  ctaLabel: string;
  onCtaClick?: () => void;
}
