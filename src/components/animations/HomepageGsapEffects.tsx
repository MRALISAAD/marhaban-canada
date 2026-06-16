'use client';

import type { ReactNode } from 'react';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type HomepageGsapEffectsProps = {
  children: ReactNode;
};

export function HomepageGsapEffects({ children }: HomepageGsapEffectsProps) {
  const scopeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const scope = scopeRef.current;

      if (!scope) return;

      if (reduceMotion) {
        gsap.set(scope.querySelectorAll('[data-animate]'), {
          autoAlpha: 1,
          clearProps: 'transform',
        });
        return;
      }

      gsap.from(scope.querySelectorAll('[data-animate="hero-item"]'), {
        autoAlpha: 0,
        y: 22,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.08,
      });

      gsap.from(scope.querySelectorAll('[data-animate="hero-card"]'), {
        autoAlpha: 0,
        y: 30,
        rotate: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.18,
      });

      gsap.to(scope.querySelectorAll('[data-animate="hero-float"]'), {
        y: -8,
        duration: 3.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.25,
      });

      gsap.utils.toArray<HTMLElement>('[data-animate="section"]', scope).forEach((section) => {
        gsap.from(section, {
          autoAlpha: 0,
          y: 28,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-animate-group]', scope).forEach((group) => {
        const items = group.querySelectorAll('[data-animate="card"], [data-animate="offer-card"]');
        if (!items.length) return;

        gsap.from(items, {
          autoAlpha: 0,
          y: 24,
          duration: 0.55,
          ease: 'power3.out',
          stagger: 0.07,
          scrollTrigger: {
            trigger: group,
            start: 'top 80%',
            once: true,
          },
        });
      });

      const pills = scope.querySelectorAll('[data-animate="pill"]');
      if (pills.length) {
        gsap.from(pills, {
          autoAlpha: 0,
          y: 14,
          scale: 0.96,
          duration: 0.42,
          ease: 'power3.out',
          stagger: 0.045,
          scrollTrigger: {
            trigger: pills[0]?.parentElement,
            start: 'top 82%',
            once: true,
          },
        });
      }
    },
    { scope: scopeRef },
  );

  return <div ref={scopeRef}>{children}</div>;
}
