'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function FocusManager() {
  const pathname = usePathname();
  const previousPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    // Only manage focus if pathname actually changed
    if (previousPathnameRef.current === pathname) return;
    previousPathnameRef.current = pathname;

    // Find main content element
    const mainElement = document.getElementById('main-content');
    if (mainElement) {
      // Focus main content after a short delay to ensure it's rendered
      const timer = setTimeout(() => {
        mainElement.focus();
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return null;
}

