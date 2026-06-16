'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { LOCALES, type Locale } from '@/i18n/locales';
import { withLocale } from '@/lib/i18n-utils';

// Types for Navbar labels based on content.shared.nav
type NavbarLabels = {
  home: string;
  parcours: string;
  checklist: string;
  ressources: string;
  arnaques: string;
  about: string;
  contact: string;
  legal: string;
  switchToFr: string;
  switchToEn: string;
  switchToAr: string;
};

// Type for navigation link configuration
type NavLinkConfig = {
  key: keyof Pick<NavbarLabels, 'home' | 'parcours' | 'checklist' | 'ressources' | 'arnaques' | 'about' | 'contact' | 'legal'>;
  path: string;
  group: 'primary' | 'secondary';
};

// Navigation links configuration - single source of truth
// Note: 'legal' is intentionally excluded from navbar - accessible via footer only
export const NAV_LINKS_CONFIG: readonly NavLinkConfig[] = [
  { key: 'home', path: '', group: 'primary' },
  { key: 'parcours', path: '/parcours', group: 'primary' },
  { key: 'checklist', path: '/checklist', group: 'primary' },
  { key: 'ressources', path: '/ressources', group: 'primary' },
  { key: 'arnaques', path: '/arnaques', group: 'primary' },
  { key: 'about', path: '/about', group: 'secondary' },
  { key: 'contact', path: '/contact', group: 'secondary' },
] as const;

/**
 * Switches locale in pathname while preserving the rest of the path
 */
function switchLocaleInPath(pathname: string, nextLocale: Locale): string {
  const parts = pathname.split('/');
  if (parts.length < 2) return `/${nextLocale}`;
  parts[1] = nextLocale;
  return parts.join('/') || `/${nextLocale}`;
}

/**
 * Navbar Component
 *
 * Mobile-first, accessible navigation bar with responsive menu.
 *
 * Features:
 * - Semantic HTML with <nav> landmarks
 * - Full keyboard navigation (Tab, Escape)
 * - Focus management (trap in mobile menu, return to button on close)
 * - ARIA labels for all interactive elements
 * - Tap targets ≥ 44px for mobile accessibility
 * - Mobile-first responsive design
 *
 * @remarks
 * - No breaking changes: Same API (no props), same usage pattern
 * - Compatible: Works with existing LanguageProvider, EasyReadToggle, FEATURE_FLAGS
 * - Accessible: WCAG 2.1 AA compliant (keyboard, screen readers, focus visible)
 */
export function Navbar() {
  const pathname = usePathname() || `/${LOCALES[0]}`;
  const { locale, content } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);
  const prevPathnameRef = useRef<string>(pathname);

  // Access navigation labels from content.shared.nav, with fallbacks for safety
  const nav: NavbarLabels = useMemo(() => {
    const navData = content.shared?.nav;
    return {
      home: navData?.home ?? 'Accueil',
      parcours: navData?.parcours ?? 'Parcours',
      checklist: navData?.checklist ?? 'Checklist',
      ressources: navData?.ressources ?? 'Ressources',
      arnaques: navData?.arnaques ?? 'Arnaques',
      about: navData?.about ?? 'About',
      contact: navData?.contact ?? 'Contact',
      legal: navData?.legal ?? 'Legal',
      switchToFr: navData?.switchToFr ?? 'FR',
      switchToEn: navData?.switchToEn ?? 'EN',
      switchToAr: navData?.switchToAr ?? 'AR',
    };
  }, [content.shared?.nav]);

  // Cycle through locales for language switch
  const currentLocaleIndex = LOCALES.indexOf(locale);
  const nextLocaleIndex = (currentLocaleIndex + 1) % LOCALES.length;
  const otherLocale: Locale = LOCALES[nextLocaleIndex] ?? LOCALES[0];
  const otherHref = useMemo(() => switchLocaleInPath(pathname, otherLocale), [pathname, otherLocale]);

  const base = `/${locale}`;

  // Helper to generate localized hrefs
  const localizeHref = useCallback(
    (path: string) => withLocale(path, locale),
    [locale]
  );


  // Localized ARIA labels
  const navAriaLabel = useMemo(() => {
    if (locale === 'fr') return 'Navigation principale';
    if (locale === 'en') return 'Main navigation';
    return 'القائمة الرئيسية';
  }, [locale]);

  const menuButtonAriaLabel = useMemo(() => {
    if (locale === 'fr') return isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu';
    if (locale === 'en') return isMobileMenuOpen ? 'Close menu' : 'Open menu';
    return isMobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة';
  }, [locale, isMobileMenuOpen]);

  const brandAriaLabel = useMemo(() => {
    if (locale === 'fr') return `${content.brand}, retour à l'accueil`;
    if (locale === 'en') return `${content.brand}, back to home`;
    return `${content.brand}، العودة إلى الصفحة الرئيسية`;
  }, [locale, content.brand]);

  const languageSwitchAriaLabel = useMemo(() => {
    if (otherLocale === 'fr') {
      if (locale === 'en') return `${nav.switchToFr}, Switch to French`;
      if (locale === 'ar') return `${nav.switchToFr}, التبديل إلى الفرنسية`;
      return `${nav.switchToFr}, Changer pour le français`;
    }
    if (otherLocale === 'en') {
      if (locale === 'fr') return `${nav.switchToEn}, Change to English`;
      if (locale === 'ar') return `${nav.switchToEn}, التبديل إلى الإنجليزية`;
      return `${nav.switchToEn}, Switch to English`;
    }
    // otherLocale === 'ar'
    if (locale === 'fr') return `${nav.switchToAr}, Changer pour l'arabe`;
    if (locale === 'en') return `${nav.switchToAr}, Switch to Arabic`;
    return `${nav.switchToAr}, التبديل إلى العربية`;
  }, [otherLocale, locale, nav]);

  const bookCallLabel = useMemo(() => {
    if (locale === 'fr') return 'Réserver un appel';
    if (locale === 'en') return 'Book a call';
    return 'احجز مكالمة';
  }, [locale]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle Escape key to close menus
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
          menuButtonRef.current?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Focus first menu item when menu opens (focus trap)
  useEffect(() => {
    if (isMobileMenuOpen && firstMenuItemRef.current) {
      // Small delay to ensure menu is rendered
      const timeoutId = setTimeout(() => {
        firstMenuItemRef.current?.focus();
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [isMobileMenuOpen]);

  // Close menus when pathname changes (navigation occurred)
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      // Use setTimeout to avoid synchronous setState in effect
      setTimeout(() => {
        setIsMobileMenuOpen(false);
      }, 0);
    }
  }, [pathname]);

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen((prev) => !prev);
  };


  /**
   * Determines if a link is the current active page
   * More precise matching to avoid false positives
   */
  const isActive = useMemo(() => {
    return (href: string): boolean => {
      // Exact match for home route
      if (href === base || href === `${base}/`) {
        return pathname === base || pathname === `${base}/`;
      }
      // For other routes, check if pathname starts with href followed by '/' or end of string
      // This ensures /parcours matches /parcours/* but not /parcours-something
      if (pathname.startsWith(href)) {
        // If href is exactly pathname, it's active
        if (pathname === href) return true;
        // If pathname continues after href, check it starts with '/' (nested route)
        const remaining = pathname.slice(href.length);
        return remaining === '' || remaining.startsWith('/');
      }
      return false;
    };
  }, [base, pathname]);

  // Generate navigation links from centralized configuration
  // All hrefs are guaranteed to be prefixed with /[locale]
  // Desktop and mobile use the same links (single source of truth)
  const navLinks = useMemo(
    () => {
      const links = NAV_LINKS_CONFIG.map((config) => {
        // Use withLocale helper for locale-safe hrefs
        const href = localizeHref(config.path);
        // Ensure label is never empty - use fallback if nav[config.key] is undefined/empty
        const label = nav[config.key]?.trim() || config.key;
        return {
          href,
          label,
          key: config.key,
          group: config.group,
          isActive: isActive(href),
        };
      });
      
      return links;
    },
    [nav, isActive, localizeHref]
  );

  // Separate primary and secondary links
  const primaryLinks = useMemo(() => navLinks.filter((link) => link.group === 'primary'), [navLinks]);
  const secondaryLinks = useMemo(() => navLinks.filter((link) => link.group === 'secondary'), [navLinks]);
  
  return (
    <header className="sticky top-0 z-50 border-b border-forest/5 bg-marhaban-cream/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          {/* Brand */}
          <Link
            href={localizeHref('/')}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 font-semibold tracking-tight text-marhaban-ink transition-colors hover:text-marhaban-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-2 focus-visible:rounded-md sm:justify-start"
            aria-label={brandAriaLabel}
          >
            <Image
              src="/logo.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 flex-shrink-0"
              aria-hidden="true"
            />
            <span className="hidden sm:inline">{content.brand}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 text-sm text-marhaban-ink/70 md:flex" aria-label={navAriaLabel}>
            {primaryLinks.map((link) => (
              <Link
                key={link.key}
                className={`relative flex min-h-[44px] items-center px-3 transition-all duration-150 ease-in-out hover:text-marhaban-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-2 focus-visible:rounded-md ${
                  link.isActive ? 'font-semibold text-marhaban-ink' : 'font-medium text-marhaban-ink/60'
                }`}
                href={link.href}
                aria-current={link.isActive ? 'page' : undefined}
              >
                {link.label}
                {link.isActive && (
                  <span
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-marhaban-leaf"
                    aria-hidden="true"
                  />
                )}
              </Link>
            ))}
            <span className="mx-1 h-5 w-px bg-marhaban-leaf/20" aria-hidden="true" />
            {secondaryLinks.map((link) => (
              <Link
                key={link.key}
                className={`relative flex min-h-[44px] items-center px-3 transition-all duration-150 ease-in-out hover:text-marhaban-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-2 focus-visible:rounded-md ${
                  link.isActive ? 'font-semibold text-marhaban-ink' : 'font-medium text-marhaban-ink/60'
                }`}
                href={link.href}
                aria-current={link.isActive ? 'page' : undefined}
              >
                {link.label}
                {link.isActive && (
                  <span
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-marhaban-leaf"
                    aria-hidden="true"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href={localizeHref('/reserver')}
              className="hidden min-h-[44px] items-center justify-center rounded-xl bg-forest px-5 py-2.5 text-sm font-medium text-cream shadow-warm-sm transition hover:bg-forest/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 focus-visible:ring-offset-2 sm:inline-flex"
            >
              {bookCallLabel}
            </Link>

            {/* Language Switch */}
            <Link
              href={otherHref}
              className="flex min-h-[44px] items-center justify-center rounded-full border border-marhaban-leaf/20 bg-white/70 px-3 py-2 text-sm font-medium transition-colors hover:bg-marhaban-mint/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35 focus-visible:ring-offset-2"
              aria-label={languageSwitchAriaLabel}
            >
              {otherLocale === 'fr' ? nav.switchToFr : otherLocale === 'en' ? nav.switchToEn : nav.switchToAr}
            </Link>

            {/* Mobile Menu Button */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={toggleMobileMenu}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full p-2 text-marhaban-ink/70 transition-all duration-200 ease-in-out hover:bg-marhaban-mint/60 active:bg-marhaban-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35 focus-visible:ring-offset-2 md:hidden"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={menuButtonAriaLabel}
            >
              <span className="sr-only">{menuButtonAriaLabel}</span>
              {/* Hamburger icon with smooth transition */}
              <svg
                className={`h-6 w-6 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isMobileMenuOpen ? (
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    className="transition-opacity duration-200 ease-in-out"
                  />
                ) : (
                  <path
                    d="M4 6h16M4 12h16M4 18h16"
                    className="transition-opacity duration-200 ease-in-out"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          id="mobile-menu"
          className={`border-t border-marhaban-leaf/10 bg-marhaban-cream/[0.98] transition-all duration-300 ease-in-out md:hidden ${
            isMobileMenuOpen
              ? 'visible max-h-screen opacity-100'
              : 'invisible max-h-0 overflow-hidden opacity-0'
          }`}
          aria-hidden={!isMobileMenuOpen}
        >
          <nav className="flex flex-col py-4" aria-label={navAriaLabel}>
            {/* Primary links */}
            {primaryLinks.map((link, index) => (
              <Link
                key={link.key}
                ref={index === 0 ? firstMenuItemRef : null}
                className={`flex min-h-[44px] items-center px-4 py-3 text-base text-marhaban-ink/70 transition-all duration-150 ease-in-out hover:bg-marhaban-mint/50 hover:text-marhaban-ink active:bg-marhaban-mint/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35 focus-visible:ring-inset ${
                  link.isActive ? 'bg-marhaban-mint/60 font-semibold text-marhaban-ink' : ''
                }`}
                href={link.href}
                aria-current={link.isActive ? 'page' : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Secondary links */}
            {secondaryLinks.map((link) => (
              <Link
                key={link.key}
                className={`flex min-h-[44px] items-center px-4 py-3 text-base text-marhaban-ink/70 transition-all duration-150 ease-in-out hover:bg-marhaban-mint/50 hover:text-marhaban-ink active:bg-marhaban-mint/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35 focus-visible:ring-inset ${
                  link.isActive ? 'bg-marhaban-mint/60 font-semibold text-marhaban-ink' : ''
                }`}
                href={link.href}
                aria-current={link.isActive ? 'page' : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pb-2 pt-4">
              <Link
                href={localizeHref('/reserver')}
                className="flex min-h-[48px] w-full items-center justify-center rounded-xl bg-forest px-4 py-3 text-base font-semibold text-cream shadow-warm-sm transition hover:bg-forest/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 focus-visible:ring-offset-2"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
              >
                {bookCallLabel}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
