type Props = {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "start" | "center";
  light?: boolean;
  size?: "section" | "display";
};

export function SectionHeader({ eyebrow, title, text, align = "start", light = false, size = "section" }: Props) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className={light ? "eyebrow-light" : "eyebrow"}>{eyebrow}</p>
      ) : null}
      <h2
        className={[
          size === "display" ? "heading-display" : "heading-section",
          "mt-3",
          light ? "!text-white" : "",
        ].join(" ")}
      >
        {title}
      </h2>
      {text ? (
        <p
          className={[
            "mt-5 text-[1.02rem] leading-relaxed sm:text-lg lg:text-xl",
            light ? "text-[#edf7f2]" : "text-marhaban-muted",
          ].join(" ")}
        >
          {text}
        </p>
      ) : null}
    </div>
  );
}
