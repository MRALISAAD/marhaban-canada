import { notFound } from 'next/navigation';
import { getChecklistDictionary, type ChecklistLocale } from '@/content/checklistOffline';
import { getHtmlAttrs, isLocale } from '@/i18n/locales';

type PageProps = {
  params: { locale: string };
};

export default function ChecklistPrintPage({ params }: PageProps) {
  const { locale: localeParam } = params;
  if (!isLocale(localeParam)) {
    notFound();
  }
  const locale = localeParam as ChecklistLocale;
  const dict = getChecklistDictionary(locale);
  const { dir } = getHtmlAttrs(locale);

  return (
    <div className="print-page" dir={dir}>
      <style>{`
        @page {
          size: A4;
          margin: 12mm;
        }
        .print-page {
          font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          color: #0f172a;
          background: white;
        }
        main[data-pdf='checklist'] {
          display: block;
        }
        .heading {
          margin-bottom: 12px;
        }
        .title {
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 6px;
        }
        .subtitle {
          font-size: 13px;
          color: #475569;
          margin: 0 0 12px;
        }
        .phase {
          margin-bottom: 16px;
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          background: #f8fafc;
          page-break-inside: avoid;
          break-inside: avoid;
        }
        .phase h2 {
          margin: 0 0 6px;
          font-size: 15px;
          font-weight: 700;
          color: #1e293b;
        }
        .phase p {
          margin: 0 0 10px;
          font-size: 12px;
          color: #475569;
        }
        .items {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .items li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 4px 0;
          font-size: 12px;
          color: #1e293b;
          page-break-inside: avoid;
          break-inside: avoid;
        }
        .checkbox {
          width: 12px;
          height: 12px;
          border: 1px solid #94a3b8;
          border-radius: 3px;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .page-break {
          page-break-after: always;
          break-after: page;
          height: 1px;
          margin: 0;
          padding: 0;
          border: 0;
        }
      `}</style>

      <main data-pdf="checklist">
        <div className="heading">
          <h1 className="title">{dict.labels.title}</h1>
          <p className="subtitle">{dict.labels.subtitle}</p>
        </div>

        <div className="phases">
          {dict.phases.map((phase, idx) => (
            <div key={phase.id}>
              <div className="phase">
                <h2>
                  {phase.badge} — {phase.title}
                </h2>
                <p>{phase.subtitle}</p>
                <ul className="items">
                  {phase.items.map((item) => (
                    <li key={item.id}>
                      <span className="checkbox" aria-hidden="true" />
                      <span>{item.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {idx < dict.phases.length - 1 && <hr className="page-break" />}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

