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
      title: 'About | Marhaban Canada',
    };
  }
  const locale = localeParam as Locale;
  const content = getLocaleContent(locale);

  return {
    title: `${content.aboutPage.title} | Marhaban Canada`,
    description: content.aboutPage.intro,
    openGraph: {
      title: content.aboutPage.title,
      description: content.aboutPage.intro,
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const content = getLocaleContent(locale);
  const { dir } = getHtmlAttrs(locale);
  const { aboutPage } = content;

  return (
    <main className="bg-slate-50 px-4 py-12" dir={dir} lang={locale}>
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <PageHeader
          title={aboutPage.title}
          intro={aboutPage.intro}
          cta={{
            label: aboutPage.cta.label,
            href: aboutPage.cta.href,
          }}
          dir={dir}
        />

        <SectionBlock title={aboutPage.mission.title} dir={dir}>
          <p className="text-sm text-slate-700">{aboutPage.mission.content}</p>
        </SectionBlock>

        <div className="grid gap-6 md:grid-cols-2">
          <SectionBlock title={aboutPage.whatWeDo.title} icon="Info" dir={dir}>
            <ul className="list-disc space-y-2 text-sm text-slate-700 ps-5">
              {aboutPage.whatWeDo.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </SectionBlock>

          <SectionBlock title={aboutPage.whatWeDontDo.title} icon="Info" dir={dir}>
            <ul className="list-disc space-y-2 text-sm text-slate-700 ps-5">
              {aboutPage.whatWeDontDo.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </SectionBlock>
        </div>

        <SectionBlock title={aboutPage.sources.title} dir={dir}>
          <p className="text-sm text-slate-700 mb-4">{aboutPage.sources.intro}</p>
          <ul className="list-disc space-y-2 text-sm text-slate-700 ps-5">
            {aboutPage.sources.examples.map((example, index) => (
              <li key={index}>{example}</li>
            ))}
          </ul>
        </SectionBlock>
      </div>
    </main>
  );
}
