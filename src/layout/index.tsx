import { Nav } from '@layout/Nav';
import type { LayoutProps } from './type';

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-primary-bg flex h-[100%] flex-col justify-between">
      <main className="flex-1">{children}</main>
      <Nav />
    </div>
  );
};
