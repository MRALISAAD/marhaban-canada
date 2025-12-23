'use client';

import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useLocalStorageState } from '@/lib/useLocalStorageState';
import { FEATURE_FLAGS } from '@/lib/featureFlags';

type EasyReadContextType = {
  isEasyRead: boolean;
  toggleEasyRead: () => void;
};

const EasyReadContext = createContext<EasyReadContextType | undefined>(undefined);

export function EasyReadProvider({ children }: { children: ReactNode }) {
  const [isEasyRead, setIsEasyRead] = useLocalStorageState<boolean>('mc_easy_read_mode', {
    defaultValue: false,
    parse: (value) => value === 'true',
    serialize: (value) => (value ? 'true' : 'false'),
  });

  const toggleEasyRead = () => {
    setIsEasyRead((prev) => !prev);
  };

  // Apply or remove classes on the document body
  useEffect(() => {
    if (!FEATURE_FLAGS.ENABLE_EASY_READ) {
      setIsEasyRead(false); // Ensure it's off if feature flag is disabled
      document.body.classList.remove('easy-read-mode');
      return;
    }

    if (isEasyRead) {
      document.body.classList.add('easy-read-mode');
    } else {
      document.body.classList.remove('easy-read-mode');
    }
  }, [isEasyRead, setIsEasyRead]);

  if (!FEATURE_FLAGS.ENABLE_EASY_READ) {
    return <>{children}</>;
  }

  return (
    <EasyReadContext.Provider value={{ isEasyRead, toggleEasyRead }}>
      {children}
    </EasyReadContext.Provider>
  );
}

export function useEasyRead() {
  const context = useContext(EasyReadContext);
  if (context === undefined) {
    // If EasyReadProvider is not used, return a default non-functional state
    return { isEasyRead: false, toggleEasyRead: () => {} };
  }
  return context;
}
