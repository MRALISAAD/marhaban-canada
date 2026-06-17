'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import type { Locale } from '@/i18n/locales';
import { cn } from '@/lib/cn';
import { calendlyEvents, type CalendlyEvent } from '@/lib/calendly';
import { AnimatedCard } from '@/components/animations/MarketingMotion';
import { ServiceBookingModal } from '@/components/booking/ServiceBookingModal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSession, setModalSession] = useState(0);

  const active = useMemo(() => services.find((service) => service.key === activeKey) ?? services[0], [activeKey, services]);

  const rightPanelClass = active.key === 'orientation'
    ? 'border-marhaban-gold/30 bg-marhaban-forestDark text-white shadow-premium-card'
    : 'border-marhaban-leaf/15 bg-white text-marhaban-ink shadow-warm-sm';

  const isLight = active.key !== 'orientation';

  const requestLabel = locale === 'fr' ? 'Demander un appel' : locale === 'en' ? 'Request a call' : 'اطلب مكالمة';
  const confirmNote = locale === 'fr'
    ? 'Confirmation par email · Sans engagement'
    : locale === 'en'
      ? 'Email confirmation · No commitment'
      : 'تأكيد عبر البريد · بدون التزام';

  function openServiceModal(serviceKey: CalendlyEvent['key']) {
    setActiveKey(serviceKey);
    setModalSession((current) => current + 1);
    setIsModalOpen(true);
  }

  return (
    <div className="space-y-6">

      {/* ── Left: service selector + detail ── */}
      <div className="space-y-5">
        <div className="grid gap-4 lg:grid-cols-3">
          {services.map((service) => {
            const selected = service.key === active.key;
            const priceLabel = getPriceLabel(locale, service.key);

            return (
              <button
                key={service.key}
                type="button"
                onClick={() => openServiceModal(service.key)}
                className={cn(
                  'group flex min-h-[220px] cursor-pointer flex-col rounded-[1.75rem] border p-6 text-left shadow-warm-sm transition duration-200 hover:-translate-y-1 hover:shadow-warm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35 focus-visible:ring-offset-2 sm:p-7',
                  selected
                    ? 'border-marhaban-gold/35 bg-marhaban-forestDark text-white shadow-premium-card ring-2 ring-marhaban-gold/20'
                    : 'border-marhaban-leaf/15 bg-white text-marhaban-ink hover:border-marhaban-clay/30',
                )}
                aria-pressed={selected}
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

                <h3 className="mt-5 font-heading text-2xl font-semibold leading-tight">{service.title}</h3>
                <p className={cn('mt-4 flex-1 text-sm leading-relaxed sm:text-base', selected ? 'text-[#edf7f2]' : 'text-marhaban-ink/78')}>
                  {service.description}
                </p>

                <div className="mt-6 flex items-center justify-between gap-3">
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
                  <span className={cn('text-xs font-bold uppercase tracking-[0.12em]', selected ? 'text-marhaban-gold' : 'text-marhaban-clay')}>
                    {locale === 'fr' ? 'Sélectionner' : locale === 'en' ? 'Select' : 'اختيار'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.72fr)] lg:items-stretch">
        {/* Selected service detail — no duplicate steps */}
        <AnimatedCard className="h-full rounded-[2rem] border border-marhaban-leaf/15 bg-white p-5 shadow-warm-sm sm:p-6 lg:p-7">
          <div className="flex h-full flex-col rounded-[1.5rem] border border-marhaban-leaf/12 bg-marhaban-mint/40 p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex rounded-full border border-marhaban-leaf/15 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">
                {locale === 'fr' ? 'Service sélectionné' : locale === 'en' ? 'Selected service' : 'الخدمة المختارة'}
              </span>
              <span className="inline-flex rounded-full border border-marhaban-leaf/15 bg-white px-3 py-1 text-xs font-semibold text-marhaban-ink">
                {active.duration}
              </span>
            </div>
            <h3 className="mt-5 font-heading text-3xl font-semibold leading-tight text-marhaban-ink">{active.title}</h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-marhaban-ink/80">{active.description}</p>
            <p className="mt-auto pt-6 text-xs leading-relaxed text-marhaban-muted">{disclaimer}</p>
          </div>
        </AnimatedCard>

        {/* ── Right: booking CTA ── */}
        <AnimatedCard className={cn('h-full rounded-[2rem] border p-5 sm:p-6 lg:p-7', rightPanelClass)}>
          <div className="flex h-full flex-col gap-5">
            <div className={cn('rounded-[1.5rem] border p-5 sm:p-6', isLight ? 'border-marhaban-leaf/12 bg-marhaban-mint/30' : 'border-white/10 bg-white/[0.06]')}>
              <p className={cn('text-xs font-bold uppercase tracking-[0.14em]', isLight ? 'text-marhaban-clay' : 'text-marhaban-gold')}>
                {active.title}
              </p>
              <p className={cn('mt-4 text-5xl font-semibold tracking-tight', isLight ? 'text-marhaban-forestDark' : 'text-white')}>
                {getPriceLabel(locale, active.key)}
              </p>
              <p className={cn('mt-3 text-sm leading-relaxed', isLight ? 'text-marhaban-ink/78' : 'text-[#edf7f2]')}>
                {active.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => openServiceModal(active.key)}
              className={cn(
                'mt-auto inline-flex min-h-[58px] w-full items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                isLight
                  ? 'bg-marhaban-forestDark text-white hover:bg-marhaban-clay focus-visible:ring-marhaban-leaf/40'
                  : 'bg-marhaban-gold text-marhaban-ink shadow-[0_18px_60px_rgba(213,168,79,0.22)] hover:bg-white focus-visible:ring-marhaban-gold/60 focus-visible:ring-offset-marhaban-forestDark',
              )}
            >
              {requestLabel}
              <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
            </button>

            <p className={cn('text-center text-xs', isLight ? 'text-marhaban-muted' : 'text-[#d8e7df]')}>
              {confirmNote}
            </p>
          </div>
        </AnimatedCard>
      </div>

      <ServiceBookingModal
        key={`${active.key}-${modalSession}`}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        locale={locale}
        service={active}
        price={getPriceLabel(locale, active.key)}
      />
    </div>
  );
}
