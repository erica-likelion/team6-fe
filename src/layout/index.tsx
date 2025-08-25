import { Nav } from '@layout/Nav';
import type { LayoutProps } from './type';

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-primary-bg flex h-dvh flex-col">
      <main className="flex flex-1 flex-col overflow-y-auto">{children}</main>
      <Nav />
    </div>
  );
};
