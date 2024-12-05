'use client';

import { useBreakpoint } from '@/hooks/use-media-query';
import Header from '@/components/layouts/header';
import Footer from '@/components/layouts/footer';

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16 md:pt-20">{children}</main>
      <Footer />
    </div>
  );
}
