'use client';

import { useEffect, useState } from 'react';

export default function ScrollNumber() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollableHeight = documentHeight - windowHeight;
      const progress = scrollableHeight > 0 
        ? Math.round((scrollTop / scrollableHeight) * 100) 
        : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50 pointer-events-none">
      <div className="  opacity-80 font-heading text-sm">
        {scrollProgress}
      </div>
    </div>
  );
}




