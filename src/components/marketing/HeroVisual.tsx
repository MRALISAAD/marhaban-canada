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
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-marhaban-sage/30 blur-2xl"
        aria-hidden="true"
      />
      <div className="relative rounded-3xl border border-marhaban-leaf/15 bg-offwhite p-6 shadow-warm sm:p-8">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-marhaban-mint px-3 py-1.5 text-sm font-semibold text-marhaban-leaf">
            {t.badge30}
          </span>
          <span className="rounded-full bg-marhaban-mint px-3 py-1.5 text-sm font-semibold text-marhaban-leaf">
            {t.badgeSummary}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF0E6] px-3 py-1.5 text-sm font-semibold text-marhaban-clay">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            {t.badgeShield}
          </span>
        </div>
        <h2 className="mt-6 text-2xl font-semibold text-marhaban-ink">{t.title}</h2>
        <ul className="mt-5 space-y-3">
          {checklist.map((item) => (
            <li key={item} className="flex items-start gap-3 text-base text-marhaban-ink/80">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-marhaban-leaf" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
