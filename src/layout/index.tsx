import { Nav } from '@layout/Nav';
import type { LayoutProps } from './type';

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAF9F4]">
      <main className="flex flex-1 flex-col pb-[7rem]">{children}</main>
      <Nav />
    </div>
  );
};
