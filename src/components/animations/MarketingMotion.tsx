'use client';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/cn';

type RevealProps = ComponentPropsWithoutRef<'section'> & {
  children: ReactNode;
  delay?: number;
};

type StaggerProps = ComponentPropsWithoutRef<'div'> & {
  children: ReactNode;
  delay?: number;
};

type CardProps = ComponentPropsWithoutRef<'div'> & {
  children: ReactNode;
  featured?: boolean;
};

type FloatingVisualProps = ComponentPropsWithoutRef<'div'> & {
  children: ReactNode;
  delay?: number;
  float?: 'soft' | 'gentle' | 'none';
};

type CtaProps = ComponentPropsWithoutRef<'span'> & {
  children: ReactNode;
};

const revealVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export function SectionReveal({ children, className, delay = 0, id }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      variants={revealVariants}
      custom={delay}
      initial={shouldReduceMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
    >
      {children}
    </motion.section>
  );
}

export function StaggerGroup({ children, className, delay = 0 }: StaggerProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial={shouldReduceMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      transition={{ delayChildren: delay }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedCard({ children, className, featured }: CardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      variants={staggerItem}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -4,
              boxShadow: featured
                ? '0 30px 70px rgba(31,45,43,0.22)'
                : '0 20px 50px rgba(31,45,43,0.12)',
            }
      }
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}

export function FloatingVisual({ children, className, delay = 0, float = 'soft' }: FloatingVisualProps) {
  const shouldReduceMotion = useReducedMotion();
  const animate =
    float === 'none' || shouldReduceMotion
      ? undefined
      : float === 'gentle'
        ? { opacity: 1, y: [0, -6, 0], rotate: [0, 0.3, 0] }
        : { opacity: 1, y: [0, -10, 0], rotate: [0, 0.6, 0] };

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
      animate={animate}
      transition={
        shouldReduceMotion
          ? undefined
          : {
              duration: float === 'gentle' ? 7 : 6,
              delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }
      }
    >
      {children}
    </motion.div>
  );
}

export function AnimatedCTA({ children, className }: CtaProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.span
      className={className}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 380, damping: 24 }}
    >
      {children}
    </motion.span>
  );
}

export { staggerItem };
