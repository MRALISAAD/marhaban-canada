type Props = {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "start" | "center";
  light?: boolean;
};

export function SectionHeader({ eyebrow, title, text, align = "start", light = false }: Props) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p
          className={
            light
              ? "text-sm font-semibold uppercase tracking-wide text-marhaban-sage"
              : "text-sm font-semibold uppercase tracking-wide text-marhaban-clay"
          }
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={
          light
            ? "mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl"
            : "mt-3 text-3xl font-semibold leading-tight text-marhaban-ink sm:text-4xl lg:text-[2.75rem]"
        }
      >
        {title}
      </h2>
      {text ? (
        <p
          className={
            light
              ? "mt-4 text-base leading-relaxed text-white/80 sm:text-lg"
              : "mt-4 text-base leading-relaxed text-marhaban-ink/75 sm:text-lg"
          }
        >
          {text}
        </p>
      ) : null}
    </div>
  );
}
