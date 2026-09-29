interface SectionHeadingProps {
  /** Small uppercase kicker above the title. */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  /** Heading level, so the document outline stays accessible. */
  as?: "h1" | "h2" | "h3";
  /** Applied to the heading element so sections can be labelled via aria. */
  id?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  as: Heading = "h2",
  id,
  className = "",
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div
      className={[
        isCentered ? "mx-auto max-w-3xl text-center" : "max-w-3xl text-left",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow ? (
        // `.annotation` is mono at ~8.8px per character, so a long eyebrow
        // plus both rules can exceed a 288px viewport. Wrapping keeps the
        // label on one line; `shrink-0` stops the rules collapsing to
        // nothing when the row does overflow.
        <div
          className={[
            "mb-4 flex flex-wrap items-center gap-x-3 gap-y-1",
            isCentered ? "justify-center" : "",
          ].join(" ")}
        >
          <span aria-hidden="true" className="h-px w-8 shrink-0 bg-gold/60" />
          <span className="annotation text-gold">{eyebrow}</span>
          <span aria-hidden="true" className="h-px w-8 shrink-0 bg-gold/60" />
        </div>
      ) : null}

      <Heading
        id={id}
        className={[
          "font-heading font-bold text-primary",
          "text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.15]",
          "text-balance",
          eyebrow ? "mb-4" : "mb-0",
        ].join(" ")}
      >
        {title}
      </Heading>

      {subtitle ? (
        <p
          className={[
            "text-base sm:text-lg leading-relaxed text-secondary",
            isCentered ? "mx-auto max-w-2xl" : "max-w-2xl",
          ].join(" ")}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
