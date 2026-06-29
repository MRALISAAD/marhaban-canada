'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { BookingModalTrigger } from '@/components/booking/BookingModalTrigger';
import { useLanguage } from '@/components/LanguageProvider';
import { bookingPath } from '@/lib/routes';

const BUTTON_WIDTH = 212;
const BUTTON_HEIGHT = 56;
const OFFSET_X = 28;
const OFFSET_Y = 24;
const NAV_SAFE_Y = 104;

export function FloatingMouseCTA() {
  const { locale } = useLanguage();
  const pathname = usePathname();

  // Determine if this page should suppress the floating CTA
  const isHidden = Boolean(
    pathname?.includes('/reserver/formulaire') || pathname?.startsWith('/admin'),
  );

  // All hooks called unconditionally (Rules of Hooks)
  const buttonRef = useRef<HTMLAnchorElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const visibleRef = useRef(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const label = useMemo(() => {
    if (locale === 'en') return 'Book a call';
    if (locale === 'ar') return 'احجز مكالمة';
    return 'Réserver un appel';
  }, [locale]);

  useEffect(() => {
    if (isHidden) return;

    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');
    const isDesktop = window.matchMedia('(min-width: 1024px)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateEnabled = () => {
      const nextEnabled = canHover.matches && isDesktop.matches && !reduceMotion.matches;
      if (!nextEnabled) {
        visibleRef.current = false;
        setIsVisible(false);
      }
      setIsEnabled(nextEnabled);
    };

    updateEnabled();
    canHover.addEventListener('change', updateEnabled);
    isDesktop.addEventListener('change', updateEnabled);
    reduceMotion.addEventListener('change', updateEnabled);

    return () => {
      canHover.removeEventListener('change', updateEnabled);
      isDesktop.removeEventListener('change', updateEnabled);
      reduceMotion.removeEventListener('change', updateEnabled);
    };
  }, [isHidden]);

  useEffect(() => {
    if (isHidden || !isEnabled) {
      visibleRef.current = false;
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      return;
    }

    const clampPosition = (x: number, y: number) => ({
      x: Math.min(Math.max(x + OFFSET_X, 16), window.innerWidth - BUTTON_WIDTH - 16),
      y: Math.min(Math.max(y + OFFSET_Y, NAV_SAFE_Y), window.innerHeight - BUTTON_HEIGHT - 16),
    });

    const moveButton = () => {
      const current = currentRef.current;
      const target = targetRef.current;
      current.x += (target.x - current.x) * 0.16;
      current.y += (target.y - current.y) * 0.16;

      if (buttonRef.current) {
        buttonRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      }

      frameRef.current = window.requestAnimationFrame(moveButton);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const next = clampPosition(event.clientX, event.clientY);
      targetRef.current = next;

      if (!visibleRef.current) {
        visibleRef.current = true;
        currentRef.current = next;
        if (buttonRef.current) {
          buttonRef.current.style.transform = `translate3d(${next.x}px, ${next.y}px, 0)`;
        }
        setIsVisible(true);
      }
    };

    const handlePointerLeave = () => {
      if (visibleRef.current) {
        visibleRef.current = false;
        setIsVisible(false);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('blur', handlePointerLeave);
    frameRef.current = window.requestAnimationFrame(moveButton);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('blur', handlePointerLeave);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [isEnabled, isHidden]);

  // Return null after all hooks — never renders on form/admin pages
  if (isHidden) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 hidden lg:block"
      aria-hidden={!isEnabled || !isVisible}
    >
      <BookingModalTrigger
        ref={buttonRef}
        locale={locale}
        href={bookingPath(locale)}
        aria-label={label}
        tabIndex={isEnabled && isVisible ? 0 : -1}
        className={`fixed left-0 top-0 inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-marhaban-gold/45 bg-marhaban-forestDark px-6 py-3 text-sm font-bold text-white shadow-[0_18px_55px_rgba(8,42,36,0.24),0_0_0_1px_rgba(213,168,79,0.12)] transition-[opacity,background-color,box-shadow] duration-200 hover:bg-marhaban-leaf hover:shadow-[0_22px_64px_rgba(8,42,36,0.30),0_0_28px_rgba(213,168,79,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-cream ${
          isEnabled && isVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <span>{label}</span>
        <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
      </BookingModalTrigger>
    </div>
  );
}
