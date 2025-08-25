export interface PostBadge {
  text: string;
  tone?: 'green' | 'text'; 
  // green = 유사도, text = 장보기
}

export interface PostItem {
  id: string;
  title: string;
  body: string;
  badges?: PostBadge[];
  thumbnailUrl?: string;
  place?: string;
  time?: string | Date;
  people?: string;
  href?: string;
}

export interface RecentPostsProps {
  items?: PostItem[];
  className?: string;
  onClickRow?: (item: PostItem) => void;
}
