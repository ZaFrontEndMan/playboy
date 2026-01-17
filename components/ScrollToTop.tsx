'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();
  const prevPathnameRef = useRef<string>('');
  const isBackNavigationRef = useRef(false);

  useEffect(() => {
    // Listen for browser back/forward navigation
    const handlePopState = () => {
      isBackNavigationRef.current = true;
    };

    window.addEventListener('popstate', handlePopState);

    // Get scroll positions from sessionStorage
    const scrollKey = 'scroll-positions';
    const scrollPositions = JSON.parse(
      sessionStorage.getItem(scrollKey) || '{}'
    );

    // Check if we have a saved position for this path (indicates back navigation)
    const hasSavedPosition = scrollPositions[pathname] !== undefined;
    const isBackNav = isBackNavigationRef.current || hasSavedPosition;

    if (isBackNav && hasSavedPosition) {
      // Restore scroll position smoothly
      const savedPosition = scrollPositions[pathname];
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        window.scrollTo({
          top: savedPosition,
          behavior: 'smooth',
        });
      }, 50);
    } else {
      // Smooth scroll to top for forward navigation
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }

    // Save current scroll position before pathname changes
    if (prevPathnameRef.current) {
      scrollPositions[prevPathnameRef.current] = window.scrollY;
      sessionStorage.setItem(scrollKey, JSON.stringify(scrollPositions));
    }

    // Reset back navigation flag
    isBackNavigationRef.current = false;
    prevPathnameRef.current = pathname;

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [pathname]);

  return null;
}
