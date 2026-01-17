import { useEffect, useRef } from 'react';

interface UseScrollPositionOptions {
  storageKey: string;
  navigationStateKey?: string;
  enabled?: boolean;
}

export function useScrollPosition({ 
  storageKey, 
  navigationStateKey = 'navigation-state',
  enabled = true 
}: UseScrollPositionOptions) {
  const isInitialMount = useRef(true);

  // Save scroll position when user scrolls
  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      sessionStorage.setItem(storageKey, window.scrollY.toString());
    };

    // Throttle scroll events
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [storageKey, enabled]);

  // Restore scroll position when coming back from detail page
  useEffect(() => {
    if (!enabled) return;

    const navigationState = sessionStorage.getItem(navigationStateKey);
    const savedScroll = sessionStorage.getItem(storageKey);

    if (navigationState === 'from-product' && savedScroll) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        window.scrollTo({
          top: parseInt(savedScroll, 10),
          behavior: 'smooth',
        });
        // Clear the navigation state
        sessionStorage.removeItem(navigationStateKey);
      }, 150);
    } else if (isInitialMount.current && !navigationState) {
      // First time loading (not from product) - scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      isInitialMount.current = false;
    }
  }, [storageKey, navigationStateKey, enabled]);
}





