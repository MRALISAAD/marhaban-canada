'use client';

import React, { type ReactNode } from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/cn';

type RevealProps = HTMLMotionProps<'section'> & {
  children: ReactNode;
  delay?: number;
};

type StaggerProps = HTMLMotionProps<'div'> & {
  children: ReactNode;
  delay?: number;
};

type CardProps = HTMLMotionProps<'div'> & {
  children: ReactNode;
  featured?: boolean;
};

type FloatingVisualProps = HTMLMotionProps<'div'> & {
  children: ReactNode;
  delay?: number;
  float?: 'soft' | 'gentle' | 'none';
};

type CtaProps = HTMLMotionProps<'span'> & {
  children: ReactNode;
};

const revealVariants = {
  hidden: {
    opacity: 1,
    y: 0,
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

const staggerItem = {
  hidden: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export function SectionReveal({ children, className, delay = 0, ...props }: RevealProps) {
  return (
    <motion.section
      {...props}
      className={className}
      variants={revealVariants}
      custom={delay}
      initial={false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
    >
      {children}
    </motion.section>
  );
}

export function StaggerGroup({ children, className, delay = 0, ...props }: StaggerProps) {
  return (
    <motion.div
      {...props}
      className={className}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}
      initial={false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div key={i} variants={staggerItem}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

export function AnimatedCard({ children, className, featured, ...props }: CardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      {...props}
      className={cn(className)}
      variants={staggerItem}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -8,
              boxShadow: featured
                ? '0 40px 90px rgba(31,45,43,0.28)'
                : '0 28px 80px rgba(31,45,43,0.18)',
            }
      }
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

export function FloatingVisual({ children, className, delay = 0, float = 'soft', ...props }: FloatingVisualProps) {
  const shouldReduceMotion = useReducedMotion();
  const animate =
    float === 'none' || shouldReduceMotion
      ? undefined
      : float === 'gentle'
        ? { opacity: 1, y: [0, -6, 0], rotate: [0, 0.3, 0] }
        : { opacity: 1, y: [0, -10, 0], rotate: [0, 0.6, 0] };

  return (
    <motion.div
      {...props}
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 1, y: 10, scale: 0.99 }}
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
