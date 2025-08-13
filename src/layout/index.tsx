import { Nav } from '@layout/Nav';
import type { LayoutProps } from './type';

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-primary-bg flex h-[100%] flex-col justify-between">
      <main className="flex min-h-0 flex-1 flex-col">{children}</main>
      <Nav />
    </div>
  );
};
