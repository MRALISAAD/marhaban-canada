import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale, getHtmlAttrs } from '@/i18n/locales';
import { getLocaleContent } from '@/lib/getLocaleContent';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionBlock } from '@/components/ui/SectionBlock';
import { Callout } from '@/components/ui/Callout';
import LocalizedLink from '@/components/LocalizedLink';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) {
    return {
      title: 'Contact | Marhaban Canada',
    };
  }
  const locale = localeParam as Locale;
  const content = getLocaleContent(locale);

  return {
    title: `${content.contactPage?.title || 'Contact'} | Marhaban Canada`,
    description: content.contactPage?.intro || content.contactPage?.title || 'Contact',
    openGraph: {
      title: content.contactPage?.title || 'Contact',
      description: content.contactPage?.intro || content.contactPage?.title || 'Contact',
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const content = getLocaleContent(locale);
  const { dir } = getHtmlAttrs(locale);
  const contactPage = content.contactPage;
  const contactEmail = content.contactEmail || 'contact@marhabancanada.ca';

  // Fallback labels
  const labels = {
    title: contactPage?.title || 'Contact',
    intro: contactPage?.intro || '',
    question: contactPage?.question || (locale === 'fr' ? 'Une question ?' : locale === 'en' ? 'Have a question?' : 'هل لديك سؤال؟'),
    writeToUs: contactPage?.writeToUs || (locale === 'fr' ? 'Écrivez-nous à' : locale === 'en' ? 'Write to us at' : 'راسلنا على'),
    responseTime: contactPage?.responseTime || '',
    privacy: contactPage?.privacy || '',
    safetyNote: contactPage?.safetyNote || (locale === 'fr' ? 'Ne partagez jamais vos informations sensibles.' : locale === 'en' ? 'Never share sensitive information.' : 'لا تشارك معلوماتك الحساسة.'),
    disclaimer: contactPage?.disclaimer || '',
  };

  return (
    <main className="bg-slate-50 px-4 py-12" dir={dir} lang={locale}>
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <PageHeader
          title={labels.title}
          intro={labels.intro}
          dir={dir}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <SectionBlock title={labels.question} icon="Mail" dir={dir}>
            <div className="space-y-3">
              <p className="text-sm text-slate-700">
                {labels.writeToUs}{' '}
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-semibold text-slate-900 underline underline-offset-2 hover:text-slate-700"
                >
                  {contactEmail}
                </a>
              </p>
              {labels.responseTime && <p className="text-xs text-slate-600">{labels.responseTime}</p>}
              {labels.privacy && <p className="text-xs text-slate-600">{labels.privacy}</p>}
            </div>
          </SectionBlock>

          <SectionBlock 
            title={locale === 'fr' ? 'Liens utiles' : locale === 'en' ? 'Useful links' : 'روابط مفيدة'} 
            icon="Link" 
            dir={dir}
          >
            <div className="space-y-2">
              <LocalizedLink
                href="/legal"
                className="block text-sm text-slate-700 hover:text-slate-900 underline underline-offset-2"
              >
                {locale === 'fr' ? 'Mentions légales' : locale === 'en' ? 'Legal' : 'قانوني'}
              </LocalizedLink>
              <LocalizedLink
                href="/arnaques"
                className="block text-sm text-slate-700 hover:text-slate-900 underline underline-offset-2"
              >
                {locale === 'fr' ? 'Arnaques' : locale === 'en' ? 'Scams' : 'الاحتيال'}
              </LocalizedLink>
              <LocalizedLink
                href="/checklist"
                className="block text-sm text-slate-700 hover:text-slate-900 underline underline-offset-2"
              >
                {locale === 'fr' ? 'Checklist' : locale === 'en' ? 'Checklist' : 'قائمة التحقق'}
              </LocalizedLink>
            </div>
          </SectionBlock>
        </div>

        <Callout variant="warning" dir={dir}>
          {labels.safetyNote}
        </Callout>

        {labels.disclaimer && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs text-slate-600 leading-relaxed">{labels.disclaimer}</p>
          </div>
        )}
      </div>
    </main>
  );
}
