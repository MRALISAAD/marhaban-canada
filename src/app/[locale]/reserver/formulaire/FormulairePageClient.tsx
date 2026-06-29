"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n/locales";
import { useBookingModal } from "@/components/booking/BookingModalProvider";
import { PageShell } from "@/components/layout/PageShell";

const copy = {
  fr: {
    eyebrow: "Réservation",
    title: "Réserver ton appel gratuit",
    subtitle: "Remplis ce court formulaire. On le consulte et on te contacte pour confirmer un créneau.",
    fallbackTitle: "Réserver ton appel gratuit",
    fallbackText: "Le formulaire a été fermé. Tu peux le rouvrir pour envoyer ta demande.",
    reopen: "Rouvrir le formulaire",
  },
  en: {
    eyebrow: "Booking",
    title: "Book your free call",
    subtitle: "Fill out this short form. We will review it and contact you to confirm a time.",
    fallbackTitle: "Book your free call",
    fallbackText: "The form was closed. You can reopen it to send your request.",
    reopen: "Reopen the form",
  },
  ar: {
    eyebrow: "الحجز",
    title: "احجز مكالمتك المجانية",
    subtitle: "املأ هذا النموذج القصير. سنراجعه ونتواصل معك لتأكيد موعد.",
    fallbackTitle: "احجز مكالمتك المجانية",
    fallbackText: "تم إغلاق النموذج. يمكنك فتحه من جديد لإرسال طلبك.",
    reopen: "إعادة فتح النموذج",
  },
} as const satisfies Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    fallbackTitle: string;
    fallbackText: string;
    reopen: string;
  }
>;

type Props = {
  locale: Locale;
  dir: "ltr" | "rtl";
  lang: string;
};

export function FormulairePageClient({ locale, dir, lang }: Props) {
  const { openBookingModal, isBookingModalOpen } = useBookingModal();
  const t = copy[locale];

  useEffect(() => {
    openBookingModal();
  }, [openBookingModal]);

  return (
    <PageShell dir={dir} lang={lang} className="pb-16 sm:pb-20">
      <div className={isBookingModalOpen ? "pointer-events-none blur-sm opacity-40 transition" : "transition"}>
        <section className="px-4 pb-8 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16">
          <div className="mx-auto max-w-[720px] text-center">
            <p className="eyebrow">{t.eyebrow}</p>
            <h1 className="mt-4 font-heading text-[clamp(2.2rem,6vw,4rem)] font-semibold leading-[0.96] tracking-tight text-marhaban-forestDark">
              {t.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-marhaban-ink/78 sm:text-lg">{t.subtitle}</p>
          </div>
        </section>

        {!isBookingModalOpen ? (
          <section className="px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[560px] rounded-2xl border border-marhaban-leaf/12 bg-white p-6 text-center shadow-warm-sm sm:p-8">
              <h2 className="font-heading text-2xl font-semibold text-marhaban-forestDark">{t.fallbackTitle}</h2>
              <p className="mt-3 text-sm leading-relaxed text-marhaban-ink/75">{t.fallbackText}</p>
              <button
                type="button"
                onClick={openBookingModal}
                className="mt-6 inline-flex min-h-[50px] items-center justify-center rounded-full bg-marhaban-forestDark px-7 py-3 text-sm font-bold text-white shadow-warm-sm transition hover:bg-marhaban-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-gold/50 focus-visible:ring-offset-2"
              >
                {t.reopen}
              </button>
            </div>
          </section>
        ) : null}
      </div>
    </PageShell>
  );
}
