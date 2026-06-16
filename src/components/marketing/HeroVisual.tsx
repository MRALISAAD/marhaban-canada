import { CheckCircle2, ShieldCheck } from "lucide-react";
import type { Locale } from "@/i18n/locales";

type Props = {
  locale: Locale;
  checklist: readonly string[];
};

const copy = {
  fr: {
    badge30: "30 min",
    badgeSummary: "Résumé après appel",
    badgeShield: "Anti-arnaque",
    title: "Tes premières étapes, en ordre",
  },
  en: {
    badge30: "30 min",
    badgeSummary: "Summary after call",
    badgeShield: "Scam check",
    title: "Your first steps, in order",
  },
  ar: {
    badge30: "30 دقيقة",
    badgeSummary: "ملخص بعد المكالمة",
    badgeShield: "مكافحة الاحتيال",
    title: "خطواتك الأولى، بالترتيب",
  },
} as const;

export function HeroVisual({ locale, checklist }: Props) {
  const t = copy[locale] ?? copy.fr;

  return (
    <div className="relative">
      {/* Ambient blurs */}
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full bg-marhaban-sage/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-marhaban-sand/25 blur-2xl"
        aria-hidden="true"
      />

      {/* Card */}
      <div className="relative overflow-hidden rounded-3xl border border-marhaban-leaf/15 bg-marhaban-warm shadow-premium-card">
        {/* Top accent strip */}
        <div
          className="h-1 w-full bg-gradient-to-r from-marhaban-forestDark via-marhaban-leaf to-marhaban-sage/60"
          aria-hidden="true"
        />

        <div className="p-8 sm:p-10">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full border border-marhaban-leaf/20 bg-marhaban-mint/60 px-3 py-1.5 text-sm font-semibold text-marhaban-leaf">
              {t.badge30}
            </span>
            <span className="inline-flex items-center rounded-full border border-marhaban-leaf/20 bg-marhaban-mint/60 px-3 py-1.5 text-sm font-semibold text-marhaban-leaf">
              {t.badgeSummary}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-marhaban-clay/20 bg-[#FFF0E6] px-3 py-1.5 text-sm font-semibold text-marhaban-clay">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              {t.badgeShield}
            </span>
          </div>

          {/* Title */}
          <h2 className="mt-6 font-heading text-xl font-semibold leading-snug text-marhaban-ink sm:text-2xl lg:text-3xl">
            {t.title}
          </h2>

          {/* Divider */}
          <div className="mt-5 h-px bg-marhaban-leaf/10" aria-hidden="true" />

          {/* Checklist */}
          <ul className="mt-5 space-y-4">
            {checklist.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-marhaban-mint">
                  <CheckCircle2 className="h-4 w-4 text-marhaban-leaf" aria-hidden="true" />
                </span>
                <span className="text-base leading-relaxed text-marhaban-ink/85">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
