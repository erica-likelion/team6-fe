import { Nav } from '@layout/Nav';
import type { LayoutProps } from './type';
import { ToastContainer } from 'react-toastify';

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAF9F4]">
      <main className="flex flex-1 flex-col pb-[7rem]">{children}</main>
      <Nav />
      <ToastContainer
        position="top-center"
        hideProgressBar
        closeButton={false}
        toastClassName="!rounded-[1rem] !label-medium shadow-[2px_2px_9.9px_0_rgba(0,0,0,0.25)]"
        className={'px-[1rem]'}
      />
    </div>
  );
};
