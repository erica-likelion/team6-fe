import { Link } from '@tanstack/react-router';
import type { LiProps } from './type';

export const Nav = () => {
  console.log('Nav rendering!');
  return (
    <nav className="h-[6.875rem] shrink-0 border-t-1 border-gray-100 p-[1rem] pb-0">
      <ul className="flex justify-between">
        <Li to="/home" label="홈" />
        <Li to="/chat" label="채팅" />
        <Li to="/list" label="소분 내역" />
        <Li to="/user" label="마이" />
      </ul>
    </nav>
  );
};

const Li = ({ to, label }: LiProps) => {
  return (
    <li className="flex h-[3.75rem] w-[3.75rem] flex-col items-center justify-center gap-[0.5rem]">
      <Link to={to} className="flex w-[100%] flex-col items-center justify-center">
        <span className="label-small-600 text-gray-600">{label}</span>
      </Link>
    </li>
  );
};
