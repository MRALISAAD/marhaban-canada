'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useLanguage } from '@/components/LanguageProvider';

export function LocaleFade({ children }: { children: ReactNode }) {
  const { locale } = useLanguage();

  return (
    <motion.div
      key={locale}
      initial={false}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
