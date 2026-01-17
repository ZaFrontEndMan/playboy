'use client';

import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function PageLayout({ children, className = '' }: PageLayoutProps) {
  return (
    <section className={`pt-32 pb-20 px-6 lg:px-12 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}





