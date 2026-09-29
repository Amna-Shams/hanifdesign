import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Adds a lift + border/glow treatment on hover. */
  hover?: boolean;
  className?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { hover = false, className = "", children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={[
        "rounded-lg border border-subtle bg-surface-elevated",
        "transition-[transform,border-color,box-shadow] duration-300 ease-out",
        hover
          ? "crop crop-hover hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg focus-within:border-primary/50"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
});
