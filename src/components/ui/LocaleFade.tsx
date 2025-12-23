'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useLanguage } from '@/components/LanguageProvider';

export function LocaleFade({ children }: { children: ReactNode }) {
  const { locale } = useLanguage();

  return (
    <motion.div
      key={locale}
      initial={{ opacity: 0, y: 4, filter: 'blur(2px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -2, filter: 'blur(2px)' }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
