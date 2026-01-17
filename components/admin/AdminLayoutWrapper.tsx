'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';
  const [sidebarWidth, setSidebarWidth] = useState(256); // w-64 = 256px (expanded), w-20 = 80px (collapsed)
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Update sidebar width when it changes
    const updateWidth = () => {
      const sidebar = document.querySelector('aside');
      if (sidebar) {
        // Get actual computed width
        const computedStyle = window.getComputedStyle(sidebar);
        const width = sidebar.offsetWidth || parseInt(computedStyle.width, 10);
        if (width && width !== sidebarWidth) {
          setSidebarWidth(width);
        }
      }
    };

    // Initial check
    updateWidth();

    // Watch for class changes (collapse/expand) - check after transition
    const observer = new MutationObserver(() => {
      // Wait for CSS transition to complete (300ms)
      setTimeout(updateWidth, 350);
    });
    
    const sidebar = document.querySelector('aside');
    if (sidebar) {
      observer.observe(sidebar, {
        attributes: true,
        attributeFilter: ['class'],
        childList: false,
        subtree: false,
      });
    }

    // Also listen for resize events
    window.addEventListener('resize', updateWidth);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateWidth);
    };
  }, [sidebarWidth]);

  // Handle wheel events to ensure scrolling works (bypass Lenis)
  useEffect(() => {
    const mainElement = mainRef.current;
    if (!mainElement) return;

    const handleWheel = (e: WheelEvent) => {
      // Check if we're hovering over the main element or its children
      const target = e.target as HTMLElement;
      if (!mainElement.contains(target) && target !== mainElement) {
        return;
      }

      // Check if element can scroll
      const canScrollUp = mainElement.scrollTop > 0;
      const canScrollDown = mainElement.scrollTop < (mainElement.scrollHeight - mainElement.clientHeight);

      // If we can scroll in the direction of the wheel, do it
      if ((e.deltaY > 0 && canScrollDown) || (e.deltaY < 0 && canScrollUp)) {
        mainElement.scrollTop += e.deltaY;
        e.preventDefault();
        e.stopPropagation();
      }
    };

    mainElement.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      mainElement.removeEventListener('wheel', handleWheel);
    };
  }, []);

  if (isLoginPage) {
    return <>{children}</>;
  }

  // All admin pages (including dashboard) use the same layout
  return (
    <div 
      className="flex h-screen"
      style={{ backgroundColor: 'var(--admin-bg)', overflow: 'hidden' }}
    >
      <AdminSidebar />
      <div 
        className="flex-1 flex flex-col" 
        style={{ 
          marginLeft: `${sidebarWidth}px`, 
          transition: 'margin-left 0.3s',
          height: '100vh',
          overflow: 'hidden',
          position: 'relative',
          width: `calc(100% - ${sidebarWidth}px)`
        }}
      >
        <AdminHeader sidebarWidth={sidebarWidth} />
        <main 
          ref={mainRef}
          className="p-6" 
          data-lenis-prevent
          style={{ 
            marginTop: '73px',
            height: 'calc(100vh - 73px)',
            overflowY: 'auto',
            overflowX: 'hidden',
            WebkitOverflowScrolling: 'touch',
            position: 'relative',
            zIndex: 1
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
