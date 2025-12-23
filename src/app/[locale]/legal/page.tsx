import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale, getHtmlAttrs } from '@/i18n/locales';
import { getLocaleContent } from '@/lib/getLocaleContent';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionBlock } from '@/components/ui/SectionBlock';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) {
    return {
      title: 'Legal | Marhaban Canada',
    };
  }
  const locale = localeParam as Locale;
  const content = getLocaleContent(locale);

  return {
    title: `${content.legalPage.title} | Marhaban Canada`,
    description: content.legalPage.editor.content,
    openGraph: {
      title: content.legalPage.title,
      description: content.legalPage.editor.content,
    },
  };
}

export default async function LegalPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const content = getLocaleContent(locale);
  const { dir } = getHtmlAttrs(locale);
  const { legalPage } = content;

  return (
    <main className="bg-slate-50 px-4 py-12" dir={dir} lang={locale}>
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <PageHeader
          title={legalPage.title}
          dir={dir}
        />

        <SectionBlock title={legalPage.editor.title} icon="FileText" dir={dir}>
          <p className="text-sm text-slate-700">{legalPage.editor.content}</p>
        </SectionBlock>

        <SectionBlock title={legalPage.usage.title} dir={dir}>
          <p className="text-sm text-slate-700">{legalPage.usage.content}</p>
        </SectionBlock>

        <SectionBlock title={legalPage.responsibilities.title} dir={dir}>
          <p className="text-sm text-slate-700">{legalPage.responsibilities.content}</p>
        </SectionBlock>

        <SectionBlock title={legalPage.dataProtection.title} dir={dir}>
          <div className="space-y-3 text-sm text-slate-700">
            <div>
              <p className="font-semibold text-slate-900 mb-1">{legalPage.dataProtection.whatLabel}:</p>
              <p>{legalPage.dataProtection.what}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900 mb-1">{legalPage.dataProtection.whyLabel}:</p>
              <p>{legalPage.dataProtection.why}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900 mb-1">{legalPage.dataProtection.retentionLabel}:</p>
              <p>{legalPage.dataProtection.retention}</p>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock title={legalPage.cookies.title} dir={dir}>
          <p className="text-sm text-slate-700">{legalPage.cookies.content}</p>
        </SectionBlock>

        <SectionBlock title={legalPage.intellectualProperty.title} dir={dir}>
          <p className="text-sm text-slate-700">{legalPage.intellectualProperty.content}</p>
        </SectionBlock>

        <SectionBlock title={legalPage.contact.title} dir={dir}>
          <p className="text-sm text-slate-700">
            {legalPage.contact.title} :{' '}
            <a
              href={`mailto:${legalPage.contact.email}`}
              className="font-semibold text-slate-900 underline underline-offset-2 hover:text-slate-700"
            >
              {legalPage.contact.email}
            </a>
          </p>
        </SectionBlock>
      </div>
    </main>
  );
}
