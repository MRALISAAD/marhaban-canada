import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHtmlAttrs, isLocale, type Locale } from "@/i18n/locales";
import { FormulairePageClient } from "./FormulairePageClient";

type Props = {
  params: Promise<{ locale: string }>;
};

const copy = {
  fr: {
    title: "Réserver ton appel gratuit",
    subtitle: "Remplis ce court formulaire. On le consulte et on te contacte pour confirmer un créneau.",
  },
  en: {
    title: "Book your free call",
    subtitle: "Fill out this short form. We will review it and contact you to confirm a time.",
  },
  ar: {
    title: "احجز مكالمتك المجانية",
    subtitle: "املأ هذا النموذج القصير. سنراجعه ونتواصل معك لتأكيد موعد.",
  },
} as const satisfies Record<Locale, { title: string; subtitle: string }>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "fr";

  return {
    title: `${copy[locale].title} | Marhaban Canada`,
    description: copy[locale].subtitle,
  };
}

export default async function PreparationFormPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const { dir, lang } = getHtmlAttrs(locale);

  return <FormulairePageClient locale={locale} dir={dir} lang={lang} />;
}
