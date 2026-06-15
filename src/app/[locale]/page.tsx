'use client';

import { useCallback } from 'react';
import {
  AlertTriangle,
  BookOpenCheck,
  CalendarCheck,
  CheckCircle2,
  Compass,
  FileCheck2,
  HeartHandshake,
  Home,
  MessageCircle,
  Quote,
  SearchCheck,
  ShieldCheck,
  Users,
  WalletCards,
} from 'lucide-react';
import { CTA } from '@/components/CTA';
import { ProgressBar } from '@/components/ProgressBar';
import { ProvinceSelector } from '@/components/ProvinceSelector';
import { useLanguage } from '@/components/LanguageProvider';
import { useLocalStorageState } from '@/lib/useLocalStorageState';
import { getHtmlAttrs } from '@/i18n/locales';
import LocalizedLink from '@/components/LocalizedLink';

export default function HomePage() {
  const { content, locale } = useLanguage();
  const { dir } = getHtmlAttrs(locale);
  const [hasStarted, setHasStarted] = useLocalStorageState<boolean>('mc_has_started', {
    defaultValue: false,
    parse: (value) => value === 'true',
    serialize: (value) => (value ? 'true' : 'false'),
  });

  const handleStart = useCallback(() => {
    setHasStarted(true);
  }, [setHasStarted]);

  const homeTexts = {
    fr: {
      eyebrow: 'Accompagnement pour nouveaux arrivants',
      introLine: 'Tu peux commencer avec un appel, puis avancer étape par étape avec des repères simples.',
      progressLabel: 'Prêt à commencer ton installation ?',
      progressHelper: 'Une étape à la fois, la progression démarre après ton premier clic.',
      calloutTitle: 'Un accompagnement clair, pas une promesse magique',
      calloutText:
        'Marhaban Canada aide à comprendre les démarches, préparer les bonnes questions et retrouver les sources officielles.',
      proof: ['Sources officielles', 'Approche humaine', 'Aucune démarche à ta place'],
      stepsTitle: 'Commencer simplement',
      cards: [
        { title: 'Réserver un appel', text: 'Clarifier ta situation générale et les premières priorités.', icon: CalendarCheck },
        { title: 'Suivre le parcours', text: 'Avancer dans le bon ordre: documents, banque, santé, logement.', icon: Compass },
        { title: 'Vérifier les sources', text: 'Garder les liens officiels au même endroit pour éviter les erreurs.', icon: FileCheck2 },
      ],
      needsEyebrow: 'Les besoins dès l’arrivée',
      needsTitle: 'Des repères simples quand tout semble urgent.',
      needs: [
        { title: 'Comprendre les priorités', text: 'Savoir quoi faire maintenant, quoi garder pour plus tard.', icon: Compass },
        { title: 'Préparer les documents', text: 'NAS, santé, banque, téléphone: une base claire pour avancer.', icon: FileCheck2 },
        { title: 'Éviter les mauvais choix', text: 'Reconnaître les signaux d’alerte avant de payer ou signer.', icon: ShieldCheck },
      ],
      supportEyebrow: 'Accompagnement',
      supportTitle: 'Un soutien pratique, humain et informatif.',
      support: [
        { title: 'Installation', text: 'Un ordre de marche pour les premières démarches.', icon: Home },
        { title: 'Finances', text: 'Banque, crédit et ressources officielles pour démarrer avec prudence.', icon: WalletCards },
        { title: 'Communauté', text: 'Des ressources utiles selon ta province et ta situation générale.', icon: Users },
      ],
      journeyEyebrow: 'Parcours',
      journeyTitle: 'Avancer sans te disperser.',
      journeyText: 'Le parcours regroupe les étapes clés, la checklist garde ta progression, et les ressources te ramènent vers les liens officiels.',
      journeyLinks: [
        { title: 'Parcours guidé', text: 'Voir les étapes dans le bon ordre.', href: '/parcours', icon: Compass },
        { title: 'Checklist', text: 'Cocher les actions faites localement sur ton appareil.', href: '/checklist', icon: BookOpenCheck },
        { title: 'Ressources', text: 'Retrouver les liens fiables par besoin.', href: '/ressources', icon: SearchCheck },
      ],
      scamsEyebrow: 'Anti-arnaque',
      scamsTitle: 'Repérer les pièges avant qu’ils coûtent cher.',
      scamsText: 'Logement, emploi, téléphone, banque ou faux services: les guides anti-arnaques aident à ralentir, vérifier et agir.',
      scamsCta: 'Voir les arnaques courantes',
      resourcesEyebrow: 'Ressources',
      resourcesTitle: 'Des liens utiles, classés par besoin.',
      resourcesText: 'Marhaban Canada ne remplace pas les organismes officiels: il t’aide à les retrouver plus vite et à poser les bonnes questions.',
      testimonialEyebrow: 'Retours',
      testimonialTitle: 'Témoignages à venir',
      testimonialText: 'Cet espace accueillera des retours réels lorsque le service aura suffisamment d’expérience utilisateur vérifiable.',
      finalTitle: 'Tu veux clarifier tes premières étapes ?',
      finalText: 'Réserve un appel pour poser tes questions générales et repartir avec un plan simple à vérifier sur les sources officielles.',
      disclaimerTitle: 'Important',
    },
    en: {
      eyebrow: 'Support for newcomers',
      introLine: 'Start with a call, then move step by step with clear practical guidance.',
      progressLabel: 'Ready to start your settlement journey?',
      progressHelper: 'One step at a time. Progress starts after your first click.',
      calloutTitle: 'Clear support, not a magic promise',
      calloutText:
        'Marhaban Canada helps you understand steps, prepare the right questions, and find official sources.',
      proof: ['Official sources', 'Human approach', 'No action taken on your behalf'],
      stepsTitle: 'Start simply',
      cards: [
        { title: 'Book a call', text: 'Clarify your general situation and first priorities.', icon: CalendarCheck },
        { title: 'Follow the journey', text: 'Move in the right order: documents, banking, health, housing.', icon: Compass },
        { title: 'Check the sources', text: 'Keep official links in one place to avoid mistakes.', icon: FileCheck2 },
      ],
      needsEyebrow: 'Needs on arrival',
      needsTitle: 'Simple guidance when everything feels urgent.',
      needs: [
        { title: 'Understand priorities', text: 'Know what to do now and what can wait.', icon: Compass },
        { title: 'Prepare documents', text: 'SIN, health, banking, phone: a clear base to move forward.', icon: FileCheck2 },
        { title: 'Avoid bad decisions', text: 'Spot warning signs before paying or signing.', icon: ShieldCheck },
      ],
      supportEyebrow: 'Support',
      supportTitle: 'Practical, human, informational support.',
      support: [
        { title: 'Settlement', text: 'A simple order for the first steps.', icon: Home },
        { title: 'Finances', text: 'Banking, credit, and official resources to start carefully.', icon: WalletCards },
        { title: 'Community', text: 'Useful resources based on your province and general situation.', icon: Users },
      ],
      journeyEyebrow: 'Journey',
      journeyTitle: 'Move forward without scattering your attention.',
      journeyText: 'The journey gathers key steps, the checklist tracks progress, and resources bring you back to official links.',
      journeyLinks: [
        { title: 'Guided journey', text: 'See the steps in the right order.', href: '/parcours', icon: Compass },
        { title: 'Checklist', text: 'Check actions locally on your device.', href: '/checklist', icon: BookOpenCheck },
        { title: 'Resources', text: 'Find reliable links by need.', href: '/ressources', icon: SearchCheck },
      ],
      scamsEyebrow: 'Scam prevention',
      scamsTitle: 'Spot traps before they become expensive.',
      scamsText: 'Housing, jobs, phone plans, banking, or fake services: scam guides help you slow down, verify, and act.',
      scamsCta: 'See common scams',
      resourcesEyebrow: 'Resources',
      resourcesTitle: 'Useful links, organized by need.',
      resourcesText: 'Marhaban Canada does not replace official organizations: it helps you find them faster and prepare better questions.',
      testimonialEyebrow: 'Feedback',
      testimonialTitle: 'Testimonials coming soon',
      testimonialText: 'This space will feature real feedback once the service has enough verifiable user experience.',
      finalTitle: 'Want to clarify your first steps?',
      finalText: 'Book a call to ask general questions and leave with a simple plan to verify through official sources.',
      disclaimerTitle: 'Important',
    },
    ar: {
      eyebrow: 'مرافقة للوافدين الجدد',
      introLine: 'يمكنك البدء بمكالمة، ثم التقدم خطوة بخطوة مع توجيه عملي وواضح.',
      progressLabel: 'هل أنت مستعد لبدء خطوات الاستقرار؟',
      progressHelper: 'خطوة واحدة في كل مرة. يبدأ التقدم بعد أول نقرة لك.',
      calloutTitle: 'مرافقة واضحة وليست وعداً سحرياً',
      calloutText:
        'مرحبا كندا تساعدك على فهم الخطوات، تحضير الأسئلة المناسبة، والوصول إلى المصادر الرسمية.',
      proof: ['مصادر رسمية', 'نهج إنساني', 'لا نقوم بالإجراءات نيابة عنك'],
      stepsTitle: 'ابدأ ببساطة',
      cards: [
        { title: 'احجز مكالمة', text: 'توضيح وضعك العام وتحديد الأولويات الأولى.', icon: CalendarCheck },
        { title: 'اتبع المسار', text: 'تقدم بالترتيب المناسب: الوثائق، البنك، الصحة، السكن.', icon: Compass },
        { title: 'تحقق من المصادر', text: 'احتفظ بالروابط الرسمية في مكان واحد لتجنب الأخطاء.', icon: FileCheck2 },
      ],
      needsEyebrow: 'احتياجاتك بعد الوصول',
      needsTitle: 'إرشادات بسيطة عندما تبدو كل الأمور عاجلة.',
      needs: [
        { title: 'فهم الأولويات', text: 'اعرف ما يجب فعله الآن وما يمكن تأجيله.', icon: Compass },
        { title: 'تحضير الوثائق', text: 'رقم التأمين، الصحة، البنك، الهاتف: قاعدة واضحة للتقدم.', icon: FileCheck2 },
        { title: 'تجنب القرارات الخاطئة', text: 'تعرّف على إشارات الخطر قبل الدفع أو التوقيع.', icon: ShieldCheck },
      ],
      supportEyebrow: 'المرافقة',
      supportTitle: 'دعم عملي وإنساني ومعلوماتي.',
      support: [
        { title: 'الاستقرار', text: 'ترتيب بسيط للخطوات الأولى.', icon: Home },
        { title: 'الأمور المالية', text: 'البنك والائتمان والموارد الرسمية للبداية بحذر.', icon: WalletCards },
        { title: 'المجتمع', text: 'موارد مفيدة حسب المقاطعة والوضع العام.', icon: Users },
      ],
      journeyEyebrow: 'المسار',
      journeyTitle: 'تقدّم بدون تشتت.',
      journeyText: 'يجمع المسار الخطوات الأساسية، وتحفظ القائمة تقدمك، وتعيدك الموارد إلى الروابط الرسمية.',
      journeyLinks: [
        { title: 'المسار الموجّه', text: 'شاهد الخطوات بالترتيب المناسب.', href: '/parcours', icon: Compass },
        { title: 'قائمة التحقق', text: 'حدد الإجراءات المنجزة محلياً على جهازك.', href: '/checklist', icon: BookOpenCheck },
        { title: 'الموارد', text: 'ابحث عن روابط موثوقة حسب الحاجة.', href: '/ressources', icon: SearchCheck },
      ],
      scamsEyebrow: 'مكافحة الاحتيال',
      scamsTitle: 'تعرّف على الفخاخ قبل أن تكلفك الكثير.',
      scamsText: 'السكن، العمل، الهاتف، البنك أو الخدمات المزيفة: تساعدك أدلة الاحتيال على التمهل والتحقق والتصرف.',
      scamsCta: 'عرض الاحتيالات الشائعة',
      resourcesEyebrow: 'الموارد',
      resourcesTitle: 'روابط مفيدة مرتبة حسب الحاجة.',
      resourcesText: 'مرحبا كندا لا تحل محل الجهات الرسمية، بل تساعدك على الوصول إليها بسرعة وتحضير الأسئلة المناسبة.',
      testimonialEyebrow: 'آراء',
      testimonialTitle: 'الشهادات قريباً',
      testimonialText: 'ستُعرض هنا آراء حقيقية عندما تتوفر تجربة مستخدم كافية وقابلة للتحقق.',
      finalTitle: 'هل تريد توضيح خطواتك الأولى؟',
      finalText: 'احجز مكالمة لطرح أسئلتك العامة والخروج بخطة بسيطة تتحقق منها عبر المصادر الرسمية.',
      disclaimerTitle: 'مهم',
    },
  } as const;

  const t = homeTexts[locale] ?? homeTexts.fr;

  return (
    <main className="warm-page" dir={dir}>
      <section className="mx-auto w-full max-w-7xl px-4 pb-14 pt-10 sm:px-6 sm:pb-16 sm:pt-14">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="flex flex-col justify-between rounded-[2rem] border border-stone-200/80 bg-white/80 p-6 shadow-warm sm:p-8 lg:min-h-[620px]">
            <div className="space-y-6">
              <div>
                <p className="inline-flex rounded-full border border-marhaban-mint bg-marhaban-mint/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-marhaban-leaf">
                  {t.eyebrow}
                </p>
                <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-marhaban-ink sm:text-5xl lg:text-6xl">
                  {content.microcopy.homeTitle}
                </h1>
                <p className="mt-5 max-w-2xl text-base text-slate-700 sm:text-lg">
                  {content.microcopy.homeSubtitle}
                </p>
                <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">{t.introLine}</p>
              </div>

              <CTA onStart={handleStart} primaryLabel={content.microcopy.homeCtaPrimary} />
              <p className="text-xs font-medium text-slate-500">{content.microcopy.homeCtaSub}</p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {t.proof.map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-2xl border border-stone-200/80 bg-marhaban-cream/70 px-3 py-3 text-sm font-medium text-marhaban-ink">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-marhaban-leaf" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[2rem] border border-stone-200/80 bg-marhaban-mint/75 p-6 shadow-warm-sm sm:p-7">
              <div className="flex items-start gap-3">
                <span className="rounded-full bg-white/80 p-3 text-marhaban-leaf">
                  <HeartHandshake className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-lg font-semibold text-marhaban-ink">{t.calloutTitle}</p>
                  <p className="mt-2 text-sm text-slate-700">{t.calloutText}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-stone-200/80 bg-white/[0.88] p-5 shadow-warm-sm sm:p-6">
              <ProgressBar
                progress={hasStarted ? 8 : 0}
                label={t.progressLabel}
                helper={t.progressHelper}
              />
            </div>

            <div className="rounded-[2rem] border border-stone-200/80 bg-white/[0.88] p-5 shadow-warm-sm sm:p-6">
              <ProvinceSelector />
            </div>

            <div className="rounded-[2rem] border border-stone-200/80 bg-white/[0.88] p-5 shadow-warm-sm sm:p-6">
              <div className="mb-4 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-marhaban-leaf" />
                <h2 className="text-base font-semibold text-marhaban-ink">{t.stepsTitle}</h2>
              </div>
              <div className="grid gap-3">
                {t.cards.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded-2xl border border-stone-200/80 bg-marhaban-cream/55 p-4">
                      <div className="flex items-start gap-3">
                        <span className="rounded-full bg-white p-2 text-marhaban-clay">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div>
                          <h3 className="text-sm font-semibold text-marhaban-ink">{item.title}</h3>
                          <p className="mt-1 text-sm text-slate-600">{item.text}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-3xl border border-stone-200/80 bg-white/70 p-4 shadow-warm-sm">
          <p className="text-sm text-slate-700">
            <span className="font-semibold text-marhaban-ink">{t.disclaimerTitle}: </span>
            {content.serviceAccompagnementDisclaimer}
          </p>
        </div>

        <section className="mt-16">
          <SectionIntro eyebrow={t.needsEyebrow} title={t.needsTitle} />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {t.needs.map((item) => (
              <InfoCard key={item.title} item={item} />
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionIntro eyebrow={t.supportEyebrow} title={t.supportTitle} />
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {t.support.map((item) => (
              <InfoCard key={item.title} item={item} compact />
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] border border-stone-200/80 bg-white/80 p-6 shadow-warm sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-marhaban-clay">
                {t.journeyEyebrow}
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-marhaban-ink sm:text-3xl">
                {t.journeyTitle}
              </h2>
              <p className="mt-3 text-sm text-slate-700 sm:text-base">{t.journeyText}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {t.journeyLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <LocalizedLink
                    key={item.title}
                    href={item.href}
                    onClick={item.href === '/parcours' ? handleStart : undefined}
                    className="group rounded-3xl border border-stone-200/80 bg-marhaban-cream/60 p-5 transition hover:-translate-y-0.5 hover:bg-marhaban-mint/60 hover:shadow-warm-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35"
                  >
                    <span className="inline-flex rounded-full bg-white p-2 text-marhaban-leaf">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-sm font-semibold text-marhaban-ink">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{item.text}</p>
                  </LocalizedLink>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-warm-sm sm:p-8">
            <div className="flex items-start gap-3">
              <span className="rounded-full bg-white p-3 text-amber-700">
                <AlertTriangle className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                  {t.scamsEyebrow}
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-amber-950">{t.scamsTitle}</h2>
                <p className="mt-3 text-sm text-amber-900 sm:text-base">{t.scamsText}</p>
                <LocalizedLink
                  href="/arnaques"
                  className="mt-5 inline-flex rounded-full bg-amber-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700/40 focus-visible:ring-offset-2"
                >
                  {t.scamsCta}
                </LocalizedLink>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-stone-200/80 bg-marhaban-mint/75 p-6 shadow-warm-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-marhaban-leaf">
              {t.resourcesEyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-marhaban-ink">{t.resourcesTitle}</h2>
            <p className="mt-3 text-sm text-slate-700 sm:text-base">{t.resourcesText}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/75 px-3 py-1 text-xs font-semibold text-marhaban-ink">
                {content.resources.sections.housing.title}
              </span>
              <span className="rounded-full bg-white/75 px-3 py-1 text-xs font-semibold text-marhaban-ink">
                {content.resources.sections.health.title}
              </span>
              <span className="rounded-full bg-white/75 px-3 py-1 text-xs font-semibold text-marhaban-ink">
                {content.resources.sections.jobs.title}
              </span>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
          <div className="rounded-[2rem] border border-stone-200/80 bg-white/80 p-6 shadow-warm-sm sm:p-8">
            <Quote className="h-8 w-8 text-marhaban-clay" />
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-marhaban-clay">
              {t.testimonialEyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-marhaban-ink">{t.testimonialTitle}</h2>
            <p className="mt-3 text-sm text-slate-700 sm:text-base">{t.testimonialText}</p>
          </div>

          <div className="rounded-[2rem] border border-stone-200/80 bg-marhaban-ink p-6 text-white shadow-warm sm:p-8">
            <div className="max-w-2xl">
              <MessageCircle className="h-8 w-8 text-marhaban-gold" />
              <h2 className="mt-5 text-2xl font-semibold sm:text-3xl">{t.finalTitle}</h2>
              <p className="mt-3 text-sm text-white/[0.78] sm:text-base">{t.finalText}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <LocalizedLink
                  href="/contact"
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-marhaban-ink shadow-warm-sm transition hover:bg-marhaban-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-ink"
                >
                  {t.cards[0].title}
                  <CalendarCheck className="h-4 w-4" />
                </LocalizedLink>
                <LocalizedLink
                  href="/parcours"
                  onClick={handleStart}
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-ink"
                >
                  {content.microcopy.homeCtaPrimary}
                  <Compass className="h-4 w-4" />
                </LocalizedLink>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

type HomeCard = {
  title: string;
  text: string;
  icon: typeof Compass;
};

function SectionIntro({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-marhaban-clay">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold text-marhaban-ink sm:text-3xl">{title}</h2>
    </div>
  );
}

function InfoCard({ item, compact = false }: { item: HomeCard; compact?: boolean }) {
  const Icon = item.icon;

  return (
    <article className="rounded-[1.75rem] border border-stone-200/80 bg-white/80 p-5 shadow-warm-sm">
      <span className="inline-flex rounded-full bg-marhaban-mint/80 p-2 text-marhaban-leaf">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-base font-semibold text-marhaban-ink">{item.title}</h3>
      <p className={`mt-2 text-sm text-slate-600 ${compact ? '' : 'sm:text-base'}`}>{item.text}</p>
    </article>
  );
}
