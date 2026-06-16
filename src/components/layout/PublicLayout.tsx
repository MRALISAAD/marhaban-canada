import type { ReactNode } from 'react';
import { FloatingBookCallButton } from '@/components/FloatingBookCallButton';
import { Footer } from '@/components/navigation/Footer';
import { Navbar } from '@/components/navigation/Navbar';

type Props = {
  children: ReactNode;
  skipLabel: string;
};

export function PublicLayout({ children, skipLabel }: Props) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
      >
        {skipLabel}
      </a>
      <Navbar />
      {children}
      <FloatingBookCallButton />
      <Footer />
    </>
  );
}
