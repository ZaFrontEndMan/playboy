'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import MobileNav from './MobileNav';
import Footer from './Footer';
import { Suspense } from 'react';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    // Don't render Navbar, MobileNav, Footer for admin routes
    return <>{children}</>;
  }

  return (
    <>
      <Suspense
        fallback={
          <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-transparent" />
        }
      >
        <Navbar />
      </Suspense>
      <div className="pb-24 md:pb-0">{children}</div>
      <MobileNav />
      <Footer />
    </>
  );
}

