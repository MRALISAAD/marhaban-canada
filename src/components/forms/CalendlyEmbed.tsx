import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/i18n/locales';

const CALENDLY_FREE_CALL_URL = process.env.NEXT_PUBLIC_CALENDLY_FREE_CALL_URL?.trim() || '';

type Props = {
  locale: Locale;
  disclaimer: string;
};

const copy = {
  fr: {
    unavailable: 'Le lien de réservation sera bientôt disponible.',
    free: {
      eyebrow: 'APPEL GRATUIT',
      title: 'Appel gratuit — 15 min',
      text: "Un appel gratuit pour clarifier ta situation et choisir le bon format d'accompagnement.",
      badge: 'Gratuit · 15 min',
      cta: 'Réserver gratuitement',
    },
    orientation: {
      eyebrow: 'APPEL ORIENTATION',
      title: 'Appel orientation — 45 min',
      text: 'Clarifier les prochaines étapes et repartir avec un plan simple.',
      badge: 'Bientôt disponible',
      cta: 'Bientôt disponible',
      supportText: "L'appel orientation 45 min arrive bientôt. Pour l'instant, commence par l'appel gratuit.",
    },
  },
  en: {
    unavailable: 'The booking link will be available soon.',
    free: {
      eyebrow: 'FREE CALL',
      title: 'Free call — 15 min',
      text: 'A free call to clarify your situation and choose the right support format.',
      badge: 'Free · 15 min',
      cta: 'Book for free',
    },
    orientation: {
      eyebrow: 'ORIENTATION CALL',
      title: 'Orientation call — 45 min',
      text: 'Clarify the next steps and leave with a simple plan.',
      badge: 'Coming soon',
      cta: 'Coming soon',
      supportText: 'The 45-minute orientation call is coming soon. For now, start with the free call.',
    },
  },
  ar: {
    unavailable: 'سيكون رابط الحجز متاحاً قريباً.',
    free: {
      eyebrow: 'مكالمة مجانية',
      title: 'مكالمة مجانية — 15 دقيقة',
      text: 'مكالمة مجانية لتوضيح وضعك واختيار صيغة المرافقة المناسبة.',
      badge: 'مجاني · 15 دقيقة',
      cta: 'احجز مجاناً',
    },
    orientation: {
      eyebrow: 'مكالمة توجيه',
      title: 'مكالمة توجيه — 45 دقيقة',
      text: 'توضيح الخطوات التالية والخروج بخطة بسيطة.',
      badge: 'قريباً',
      cta: 'قريباً',
      supportText: 'مكالمة التوجيه 45 دقيقة قادمة قريباً. في الوقت الحالي، ابدأ بالمكالمة المجانية.',
    },
  },
} as const;

function CallCard({
  eyebrow,
  title,
  text,
  badge,
  cta,
  url,
  unavailable,
  comingSoon = false,
  comingSoonSupportText = '',
}: {
  eyebrow: string;
  title: string;
  text: string;
  badge: string;
  cta: string;
  url: string;
  unavailable: string;
  comingSoon?: boolean;
  comingSoonSupportText?: string;
}) {
  return (
    <div className="flex flex-col rounded-[2rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm sm:p-7">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-bold uppercase tracking-widest text-marhaban-clay">{eyebrow}</p>
        {comingSoon && (
          <span className="inline-flex rounded-full border border-marhaban-gold/30 bg-marhaban-gold/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-marhaban-clay">
            {badge}
          </span>
        )}
      </div>
      <h3 className="mt-3 font-heading text-xl font-semibold leading-tight text-marhaban-ink sm:text-2xl">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-gray-600">{text}</p>
      {!comingSoon && (
        <div className="mt-4">
          <span className="inline-flex rounded-full border border-marhaban-leaf/25 bg-marhaban-mint/50 px-4 py-1.5 text-xs font-semibold text-marhaban-ink">
            {badge}
          </span>
        </div>
      )}
      <div className="mt-6 flex-1 flex flex-col justify-end gap-3">
        {comingSoon ? (
          <>
            <span
              aria-disabled="true"
              role="button"
              className="inline-flex min-h-[52px] cursor-not-allowed select-none items-center justify-center gap-2 rounded-full border border-marhaban-leaf/15 bg-marhaban-cream/70 px-7 py-3.5 text-sm font-semibold text-marhaban-muted"
            >
              {cta}
            </span>
            {comingSoonSupportText && (
              <p className="text-xs leading-relaxed text-marhaban-muted">{comingSoonSupportText}</p>
            )}
          </>
        ) : url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-marhaban-gold px-7 py-3.5 text-sm font-bold text-marhaban-ink shadow-[0_12px_40px_rgba(213,168,79,0.28)] transition hover:bg-marhaban-forestDark hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-gold/60 focus-visible:ring-offset-2"
          >
            {cta}
            <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
          </a>
        ) : (
          <p className="rounded-2xl border border-marhaban-leaf/15 bg-marhaban-cream px-5 py-4 text-sm font-semibold text-marhaban-muted">
            {unavailable}
          </p>
        )}
      </div>
    </div>
  );
}

export function CalendlyEmbed({ locale, disclaimer }: Props) {
  const t = copy[locale];
  return (
    <div className="mx-auto max-w-3xl">
      <div className="grid gap-5 sm:grid-cols-2">
        <CallCard
          eyebrow={t.free.eyebrow}
          title={t.free.title}
          text={t.free.text}
          badge={t.free.badge}
          cta={t.free.cta}
          url={CALENDLY_FREE_CALL_URL}
          unavailable={t.unavailable}
        />
        <CallCard
          eyebrow={t.orientation.eyebrow}
          title={t.orientation.title}
          text={t.orientation.text}
          badge={t.orientation.badge}
          cta={t.orientation.cta}
          url=""
          unavailable={t.unavailable}
          comingSoon={true}
          comingSoonSupportText={t.orientation.supportText}
        />
      </div>
      <p className="mt-6 text-center text-xs leading-relaxed text-marhaban-muted">{disclaimer}</p>
    </div>
  );
}
