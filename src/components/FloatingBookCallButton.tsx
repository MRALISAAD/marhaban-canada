'use client';

import { useEffect, useMemo, useState } from 'react';
import { CalendarCheck } from 'lucide-react';
import LocalizedLink from '@/components/LocalizedLink';
import { useLanguage } from '@/components/LanguageProvider';
import { getHtmlAttrs } from '@/i18n/locales';
import { bookingPath } from '@/lib/routes';

export function FloatingBookCallButton() {
  const { locale } = useLanguage();
  const { dir } = getHtmlAttrs(locale);
  const [isHiddenByCta, setIsHiddenByCta] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const label = useMemo(() => {
    if (locale === 'en') return 'Book a call';
    if (locale === 'ar') return 'احجز مكالمة';
    return 'Réserver un appel';
  }, [locale]);

  useEffect(() => {
    const zones = Array.from(document.querySelectorAll('[data-floating-book-call-hide]'));
    if (!zones.length || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        setIsHiddenByCta(entries.some((entry) => entry.isIntersecting));
      },
      { rootMargin: '0px 0px -15% 0px', threshold: 0.12 },
    );

    zones.forEach((zone) => observer.observe(zone));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      const frame = window.requestAnimationFrame(() => setHasScrolled(true));
      return () => window.cancelAnimationFrame(frame);
    }

    let frame = window.requestAnimationFrame(() => {
      setHasScrolled(window.scrollY > 120);
    });

    const updateVisibility = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        setHasScrolled(window.scrollY > 120);
      });
    };

    window.addEventListener('scroll', updateVisibility, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateVisibility);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-3 bottom-3 z-40 max-w-[calc(100vw-1.5rem)] transition duration-200 sm:inset-x-6 md:inset-x-auto md:bottom-6 md:max-w-none ${
        dir === 'rtl' ? 'md:left-6' : 'md:right-6'
      } ${
        isHiddenByCta || !hasScrolled
          ? 'pointer-events-none translate-y-3 opacity-0'
          : 'translate-y-0 opacity-100'
      }`}
      dir={dir}
    >
      <LocalizedLink
        href={bookingPath(locale)}
        aria-label={label}
        className="inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-[1.25rem] border border-marhaban-gold/35 bg-marhaban-forestDark px-5 py-3 text-sm font-bold text-white shadow-[0_18px_55px_rgba(8,42,36,0.28)] transition hover:bg-marhaban-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-gold/45 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-cream md:w-auto md:min-w-[184px] md:rounded-full"
      >
        <CalendarCheck className="h-4 w-4" aria-hidden="true" />
        <span>{label}</span>
      </LocalizedLink>
    </div>
  );
}
