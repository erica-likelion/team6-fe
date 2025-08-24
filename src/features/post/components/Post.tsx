import { Header } from '@components/Header/Header';
// import { Select } from '@features/post/components/Select';
import { Board } from '@features/post/components/Board';
export const Post = () => {
  return (
    <div className="bg-primary-bg absolute z-11 h-dvh w-dvw">
      <Header title="게시글 작성하기" isMenu={false} />
      <Board />
    </div>
  );
};
