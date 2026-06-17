'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, BadgeCheck, Mail } from 'lucide-react';
import type { Locale } from '@/i18n/locales';
import { cn } from '@/lib/cn';
import { calendlyEvents, getCalendlyUrl, type CalendlyEvent } from '@/lib/calendly';
import { AnimatedCard } from '@/components/animations/MarketingMotion';

type Props = {
  locale: Locale;
  disclaimer: string;
};

function getPriceLabel(locale: Locale, key: CalendlyEvent['key']) {
  if (key === 'discovery') return locale === 'fr' ? 'Gratuit' : locale === 'en' ? 'Free' : 'مجاني';
  if (key === 'orientation') return '29 $';
  return locale === 'fr' ? '20 à 30 min' : locale === 'en' ? '20 to 30 min' : '20 إلى 30 دقيقة';
}

export function CalendlyEmbed({ locale, disclaimer }: Props) {
  const services = calendlyEvents[locale];
  const [activeKey, setActiveKey] = useState<CalendlyEvent['key']>(services[1]?.key ?? services[0]?.key ?? 'orientation');

  const active = useMemo(() => services.find((service) => service.key === activeKey) ?? services[0], [activeKey, services]);
  const activeUrl = getCalendlyUrl(locale, active.key);
  const hasBookingUrl = Boolean(activeUrl);

  const rightPanelClass = active.key === 'orientation'
    ? 'border-marhaban-gold/30 bg-marhaban-forestDark text-white shadow-premium-card'
    : 'border-marhaban-leaf/15 bg-white text-marhaban-ink shadow-warm-sm';

  const isLight = active.key !== 'orientation';

  const bookLabel = locale === 'fr' ? 'Réserver maintenant' : locale === 'en' ? 'Book now' : 'احجز الآن';
  const requestLabel = locale === 'fr' ? 'Demander un appel' : locale === 'en' ? 'Request a call' : 'اطلب مكالمة';
  const confirmNote = locale === 'fr'
    ? 'Confirmation par email · Sans engagement'
    : locale === 'en'
      ? 'Email confirmation · No commitment'
      : 'تأكيد عبر البريد · بدون التزام';
  const emailSubject = encodeURIComponent(
    locale === 'fr' ? 'Demande d\'appel d\'orientation' : locale === 'en' ? 'Orientation call request' : 'طلب مكالمة توجيه',
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">

      {/* ── Left: service selector + detail ── */}
      <div className="space-y-4">
        <div className="grid gap-3 md:grid-cols-3">
          {services.map((service) => {
            const selected = service.key === active.key;
            const priceLabel = getPriceLabel(locale, service.key);

            return (
              <button
                key={service.key}
                type="button"
                onClick={() => setActiveKey(service.key)}
                className={cn(
                  'group rounded-[1.75rem] border p-5 text-left shadow-warm-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-warm',
                  selected
                    ? 'border-marhaban-gold/30 bg-marhaban-forestDark text-white shadow-premium-card'
                    : 'border-marhaban-leaf/15 bg-white text-marhaban-ink hover:border-marhaban-leaf/30',
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      'inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em]',
                      selected
                        ? 'border border-white/12 bg-white/[0.06] text-[#edf7f2]'
                        : 'border border-marhaban-leaf/15 bg-marhaban-mint/60 text-marhaban-clay',
                    )}
                  >
                    {service.duration}
                  </span>
                  {selected ? <BadgeCheck className="mt-0.5 h-4 w-4 text-marhaban-gold" aria-hidden="true" /> : null}
                </div>

                <h3 className="mt-4 text-[1.1rem] font-semibold leading-tight sm:text-[1.2rem]">{service.title}</h3>
                <p className={cn('mt-3 text-sm leading-relaxed', selected ? 'text-[#edf7f2]' : 'text-marhaban-ink')}>
                  {service.description}
                </p>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span
                    className={cn(
                      'rounded-full px-3 py-1 text-xs font-semibold',
                      selected
                        ? 'border border-white/12 bg-white/[0.06] text-[#edf7f2]'
                        : 'border border-marhaban-leaf/15 bg-marhaban-cream/70 text-marhaban-ink',
                    )}
                  >
                    {priceLabel}
                  </span>
                  <span className={cn('text-xs font-semibold', selected ? 'text-marhaban-gold' : 'text-marhaban-clay')}>
                    {locale === 'fr' ? 'Sélectionner' : locale === 'en' ? 'Select' : 'اختيار'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected service detail — no duplicate steps */}
        <AnimatedCard className="rounded-[2rem] border border-marhaban-leaf/15 bg-white p-5 shadow-warm-sm sm:p-6">
          <div className="rounded-[1.5rem] border border-marhaban-leaf/12 bg-marhaban-mint/40 p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex rounded-full border border-marhaban-leaf/15 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">
                {locale === 'fr' ? 'Service sélectionné' : locale === 'en' ? 'Selected service' : 'الخدمة المختارة'}
              </span>
              <span className="inline-flex rounded-full border border-marhaban-leaf/15 bg-white px-3 py-1 text-xs font-semibold text-marhaban-ink">
                {active.duration}
              </span>
            </div>
            <h3 className="mt-4 text-xl font-semibold leading-tight text-marhaban-ink">{active.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-marhaban-ink">{active.description}</p>
            <p className="mt-3 text-xs leading-relaxed text-marhaban-muted">{disclaimer}</p>
          </div>
        </AnimatedCard>
      </div>

      {/* ── Right: booking CTA ── */}
      <AnimatedCard className={cn('rounded-[2rem] border p-5 sm:p-6 lg:p-7', rightPanelClass)}>
        {hasBookingUrl ? (
          /* Real booking link */
          <div className="flex h-full flex-col gap-5">
            <div className={cn('rounded-[1.5rem] border p-5', isLight ? 'border-marhaban-leaf/12 bg-marhaban-mint/30' : 'border-white/10 bg-white/[0.06]')}>
              <p className={cn('text-xs font-bold uppercase tracking-[0.14em]', isLight ? 'text-marhaban-clay' : 'text-marhaban-gold')}>
                {active.title}
              </p>
              <p className={cn('mt-3 text-4xl font-semibold tracking-tight', isLight ? 'text-marhaban-forestDark' : 'text-white')}>
                {getPriceLabel(locale, active.key)}
              </p>
              <p className={cn('mt-2 text-sm leading-relaxed', isLight ? 'text-marhaban-ink' : 'text-[#edf7f2]')}>
                {active.description}
              </p>
            </div>

            <a
              href={activeUrl || '#'}
              target="_blank"
              rel="noreferrer"
              className={cn(
                'inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                isLight
                  ? 'bg-marhaban-forestDark text-white hover:bg-marhaban-leaf focus-visible:ring-marhaban-leaf/40'
                  : 'bg-marhaban-gold text-marhaban-ink shadow-[0_18px_60px_rgba(213,168,79,0.22)] hover:bg-white focus-visible:ring-marhaban-gold/60 focus-visible:ring-offset-marhaban-forestDark',
              )}
            >
              {bookLabel}
              <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
            </a>

            <p className={cn('text-center text-xs', isLight ? 'text-marhaban-muted' : 'text-[#d8e7df]')}>
              {confirmNote}
            </p>
          </div>
        ) : (
          /* Clean fallback — no ghost calendar or "coming soon" language */
          <div className="flex h-full flex-col gap-5">
            <div className={cn('flex items-start gap-4 rounded-[1.5rem] border p-5', isLight ? 'border-marhaban-leaf/12 bg-marhaban-mint/30' : 'border-white/10 bg-white/[0.06]')}>
              <span className={cn('grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl', isLight ? 'bg-marhaban-leaf/10' : 'bg-white/[0.08]')}>
                <Mail className={cn('h-5 w-5', isLight ? 'text-marhaban-clay' : 'text-marhaban-gold')} aria-hidden="true" />
              </span>
              <div>
                <p className={cn('font-semibold', isLight ? 'text-marhaban-ink' : 'text-white')}>
                  {locale === 'fr' ? 'Demandez votre créneau par email' : locale === 'en' ? 'Request your slot by email' : 'اطلب موعدك عبر البريد'}
                </p>
                <p className={cn('mt-2 text-sm leading-relaxed', isLight ? 'text-marhaban-ink' : 'text-[#edf7f2]')}>
                  {locale === 'fr'
                    ? 'Nous vous enverrons les disponibilités dans les 24h pour confirmer le bon créneau.'
                    : locale === 'en'
                      ? 'We will email you available slots within 24h to confirm the right time.'
                      : 'سنرسل لك المواعيد المتاحة خلال 24 ساعة لتأكيد الوقت المناسب.'}
                </p>
              </div>
            </div>

            <a
              href={`mailto:contact@marhabancanada.ca?subject=${emailSubject}`}
              className={cn(
                'inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                isLight
                  ? 'bg-marhaban-forestDark text-white hover:bg-marhaban-leaf focus-visible:ring-marhaban-leaf/40'
                  : 'bg-white text-marhaban-ink hover:bg-marhaban-mint focus-visible:ring-white/50 focus-visible:ring-offset-marhaban-forestDark',
              )}
            >
              {requestLabel}
              <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
            </a>

            <p className={cn('text-center text-xs', isLight ? 'text-marhaban-muted' : 'text-[#d8e7df]')}>
              {confirmNote}
            </p>
          </div>
        )}
      </AnimatedCard>
    </div>
  );
}
