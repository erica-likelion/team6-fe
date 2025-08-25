// 각 추천 카드 아이템
export interface RecommendCard {
  key: string;                         // 고유 키
  title: string;                       // 제목(2줄까지)
  caption: string;                     // 상단 캡션
  time?: string | number | Date;       // 표시 시간(문자열/숫자/Date 허용)
  imageUrl?: string;                   // 썸네일(없으면 플레이스홀더)
  href?: string;                       // 클릭 이동 경로
}

// 컴포넌트 외부 입력
export interface RecommendationProps {
  items?: RecommendCard[];             // 외부 주입(없으면 store 사용)
  showWriteButton?: boolean;           // 헤더 '글쓰기' 노출 여부
  onClickWrite?: () => void;           // 글쓰기 핸들러
  onClickCard?: (item: RecommendCard) => void; // 카드 클릭 핸들러
  className?: string;
}
