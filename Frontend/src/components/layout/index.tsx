import { ReactNode } from 'react';
import Sidebar from './sidebar';
import Navbar from './navbar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-background flex flex-col">
      <div>

      <Sidebar />
      </div>
      <div className=" flex flex-col max-w-[78%] w-full ml-auto h-screen">
        <Navbar />
        <main className="flex-1 p-6 bg-secondary/10">
          {children}
        </main>
      </div>
    </div>
  );
}