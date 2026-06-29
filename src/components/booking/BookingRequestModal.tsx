"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { Locale } from "@/i18n/locales";
import { getHtmlAttrs } from "@/i18n/locales";
import { BookingWizardCore } from "@/components/booking/BookingWizardCore";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
};

const closeLabel: Record<Locale, string> = {
  fr: "Fermer",
  en: "Close",
  ar: "إغلاق",
};

export function BookingRequestModal({ isOpen, onClose, locale }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const { dir, lang } = getHtmlAttrs(locale);

  useEffect(() => {
    if (!isOpen) return;

    previousActiveElementRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLElement>("button, input, select, textarea, a")?.focus();
    }, 50);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousActiveElementRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleBackdropClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) onClose();
  }

  function handleSuccess() {
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      onClose();
    }, 1500);
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center bg-marhaban-forestDark/55 px-0 pt-10 backdrop-blur-sm sm:items-center sm:px-4 sm:py-6"
      onMouseDown={handleBackdropClick}
      role="presentation"
      dir={dir}
      lang={lang}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={
          locale === "fr"
            ? "Réserver un appel gratuit"
            : locale === "en"
              ? "Book a free call"
              : "احجز مكالمة مجانية"
        }
        className="flex max-h-[100dvh] w-full flex-col overflow-hidden rounded-t-2xl border border-marhaban-gold/20 bg-marhaban-cream shadow-[0_28px_90px_rgba(8,42,36,0.34)] sm:max-h-[calc(100vh-48px)] sm:max-w-[680px] sm:rounded-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Close header — pinned, never scrolls */}
        <div className="flex shrink-0 items-center justify-end border-b border-marhaban-leaf/10 px-4 py-2.5">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-marhaban-leaf/15 bg-white text-marhaban-forestDark shadow-warm-sm transition hover:bg-marhaban-mint/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-gold/50"
            aria-label={closeLabel[locale]}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable body — wizard fills this column */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <BookingWizardCore locale={locale} onSuccess={handleSuccess} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
