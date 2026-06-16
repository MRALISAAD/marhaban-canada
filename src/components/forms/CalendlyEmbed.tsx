'use client';

import { useMemo, useState } from 'react';
import { InlineWidget } from 'react-calendly';
import { CheckCircle2 } from 'lucide-react';
import type { Locale } from '@/i18n/locales';
import { cn } from '@/lib/cn';
import { orientationServicePath } from '@/lib/routes';
import { calendlyEvents, type CalendlyEvent } from '@/lib/calendly';
import { AnimatedCard } from '@/components/animations/MarketingMotion';

type Props = {
  locale: Locale;
  title: string;
  text: string;
  disclaimer: string;
  trustText: string;
};

export function CalendlyEmbed({ locale, title, text, disclaimer, trustText }: Props) {
  const services = calendlyEvents[locale];
  const [activeKey, setActiveKey] = useState<CalendlyEvent['key']>(services[1]?.key ?? services[0]?.key ?? 'orientation');

  const active = useMemo(() => services.find((service) => service.key === activeKey) ?? services[0], [activeKey, services]);

  return (
    <div className="grid gap-6">
      <div className="grid gap-3 md:grid-cols-3">
        {services.map((service) => {
          const selected = service.key === active?.key;
          return (
            <button
              key={service.key}
              type="button"
              onClick={() => setActiveKey(service.key)}
              className={cn(
                'rounded-[1.5rem] border p-5 text-left shadow-warm-sm transition',
                selected
                  ? 'border-marhaban-gold/30 bg-marhaban-forestDark text-white shadow-premium-card'
                  : 'border-marhaban-leaf/15 bg-white text-marhaban-ink hover:border-marhaban-leaf/35 hover:shadow-warm',
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <span className={cn('text-xs font-bold uppercase tracking-[0.14em]', selected ? 'text-marhaban-gold' : 'text-marhaban-clay')}>
                  {service.duration}
                </span>
                {selected ? <CheckCircle2 className="h-4 w-4 text-marhaban-gold" aria-hidden="true" /> : null}
              </div>
              <p className="mt-3 text-base font-semibold leading-tight">{service.title}</p>
              <p className={cn('mt-2 text-sm leading-relaxed', selected ? 'text-[#edf7f2]' : 'text-marhaban-ink/82')}>
                {service.description}
              </p>
            </button>
          );
        })}
      </div>

      <AnimatedCard className="rounded-[2.15rem] border border-marhaban-leaf/15 bg-white p-4 shadow-warm sm:p-6 lg:p-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-4">
            <div className="rounded-[1.5rem] border border-marhaban-leaf/15 bg-marhaban-mint/50 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">
                {locale === 'fr' ? 'Service sélectionné' : locale === 'en' ? 'Selected service' : 'الخدمة المختارة'}
              </p>
                <h2 className="mt-3 text-2xl font-semibold leading-tight text-marhaban-ink">{title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-marhaban-ink/82">{text}</p>
            </div>

            <div className="rounded-[1.5rem] border border-marhaban-leaf/15 bg-marhaban-cream/70 p-5">
              <p className="text-sm font-semibold text-marhaban-ink">{locale === 'fr' ? 'Ce que Calendly collecte' : locale === 'en' ? 'What Calendly collects' : 'ما الذي يجمعه Calendly'}</p>
              <ul className="mt-3 space-y-2 text-sm text-marhaban-ink/82">
                <li>• {locale === 'fr' ? 'Nom complet et email' : locale === 'en' ? 'Full name and email' : 'الاسم الكامل والبريد الإلكتروني'}</li>
                <li>• {locale === 'fr' ? 'Téléphone optionnel et ville' : locale === 'en' ? 'Optional phone and city' : 'الهاتف اختياري والمدينة'}</li>
                <li>• {locale === 'fr' ? 'Situation, besoin, langue et urgence' : locale === 'en' ? 'Situation, need, language, and urgency' : 'الوضع، الاحتياج، اللغة، والاستعجال'}</li>
                <li>• {locale === 'fr' ? 'Consentement au disclaimer' : locale === 'en' ? 'Consent to the disclaimer' : 'الموافقة على الإشعار'}</li>
              </ul>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-marhaban-leaf/15 bg-marhaban-cream/60">
            {active?.url ? (
              <InlineWidget
                url={active.url}
                pageSettings={{
                  hideEventTypeDetails: true,
                  hideLandingPageDetails: true,
                  primaryColor: '0C3B2E',
                  textColor: '1F2D2B',
                  backgroundColor: 'F7F1E6',
                }}
                styles={{
                  height: '940px',
                  minWidth: '320px',
                }}
              />
            ) : (
              <div className="flex min-h-[540px] flex-col items-start justify-center gap-4 p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">
                  {locale === 'fr' ? 'Calendly indisponible' : locale === 'en' ? 'Calendly unavailable' : 'Calendly غير متاح'}
                </p>
                <h3 className="text-2xl font-semibold leading-tight text-marhaban-ink">
                  {locale === 'fr'
                    ? 'Le lien de réservation n’est pas encore configuré.'
                    : locale === 'en'
                      ? 'The booking link is not configured yet.'
                      : 'رابط الحجز لم يتم إعداده بعد.'}
                </h3>
                <p className="max-w-xl text-sm leading-relaxed text-marhaban-ink/82">
                  {locale === 'fr'
                    ? 'Tu peux quand même revoir le service principal et réserver ensuite.'
                    : locale === 'en'
                      ? 'You can still review the main service and book afterwards.'
                      : 'يمكنك مراجعة الخدمة الرئيسية ثم الحجز لاحقاً.'}
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={orientationServicePath(locale)}
                    className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-marhaban-forestDark px-6 py-3 text-sm font-bold text-white shadow-[0_20px_60px_rgba(8,42,36,0.18)] transition hover:bg-marhaban-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-2"
                  >
                    {locale === 'fr' ? 'Voir le service' : locale === 'en' ? 'View service' : 'عرض الخدمة'}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </AnimatedCard>

      <div className="rounded-[1.75rem] border border-marhaban-leaf/15 bg-white p-5 text-sm leading-relaxed text-marhaban-ink/82 shadow-warm-sm">
        <p className="font-semibold text-marhaban-ink">{trustText}</p>
        <p className="mt-2 text-marhaban-ink/82">{disclaimer}</p>
      </div>
    </div>
  );
}
