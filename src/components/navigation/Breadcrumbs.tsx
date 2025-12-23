import Link from "next/link";
import type { Locale } from '@/i18n/locales';

type Crumb = { label: string; href?: string };

export function Breadcrumbs({
  items,
  locale,
}: {
  items: Crumb[];
  locale: Locale;
}) {
  const isRtl = locale === "ar";
  const separator = isRtl ? "←" : "→";

  return (
    <nav
      aria-label="breadcrumb"
      className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <li key={`${item.label}-${idx}`} className="flex items-center">
              {item.href && !isLast ? (
                <Link className="underline underline-offset-2" href={item.href}>
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "text-slate-700" : ""}>{item.label}</span>
              )}

              {!isLast ? <span className="mx-2">{separator}</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}