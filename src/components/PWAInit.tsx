'use client';

import { useEffect } from 'react';

/**
 * PWAInit - Service Worker registration
 * 
 * IMPORTANT: Service Worker is ONLY registered in production.
 * In development, this prevents caching issues that could serve stale versions.
 * 
 * To test offline functionality in production:
 * 1. Build: npm run build
 * 2. Start: npm run start
 * 3. Test offline mode in DevTools → Network → Offline
 */
export function PWAInit() {
  useEffect(() => {
    // Only register SW in production
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }
    
    const register = async () => {
      try {
        await navigator.serviceWorker.register('/sw.js');
      } catch (error) {
        console.error('SW registration failed', error);
      }
    };
    register();
  }, []);

  return null;
}
