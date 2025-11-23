'use client';

import Header from './Header';
import Footer from './Footer';
import FloatingElements from './FloatingElements';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
      <FloatingElements />
    </>
  );
}
