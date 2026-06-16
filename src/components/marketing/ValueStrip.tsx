import type { LucideIcon } from "lucide-react";

type Item = { label: string; icon: LucideIcon };

export function ValueStrip({ items }: { items: readonly Item[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ label, icon: Icon }) => (
        <div
          key={label}
          className="flex items-center gap-3 rounded-2xl border border-marhaban-leaf/12 bg-offwhite px-4 py-4 shadow-warm-sm"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-marhaban-mint text-marhaban-leaf">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="text-base font-medium text-marhaban-ink">{label}</p>
        </div>
      ))}
    </div>
  );
}
