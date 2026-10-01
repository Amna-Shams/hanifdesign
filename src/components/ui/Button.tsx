import {
  ButtonHTMLAttributes,
  cloneElement,
  forwardRef,
  isValidElement,
  type ReactElement,
} from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost" | "gold" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Renders a Next.js <Link> instead of a <button>. */
  href?: string;
  className?: string;
  /**
   * Merge styles onto the single child element instead of rendering a wrapper.
   * Use when the child is already a link/anchor so we never emit invalid
   * interactive nesting such as <button><a>...</a></button>.
   */
  asChild?: boolean;
}

/*
 * `primary` is the slate accent. `gold` is the brand accent and is kept as a
 * first-class variant because the brand's call-to-action colour is gold.
 */
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-strong text-white hover:bg-primary-strong-hover border border-primary-strong hover:border-primary-strong-hover shadow-sm hover:shadow-glow",
  gold:
    "bg-gold text-on-accent hover:bg-gold/90 border border-gold hover:border-gold/90 shadow-sm hover:shadow-glow",
  // `secondary`/`outline` sit on the page surface, so their text follows
  // `--text-primary` rather than a fixed white — white would be invisible on the
  // light theme's white surface.
  secondary:
    "bg-transparent text-primary border border-border hover:bg-surface-elevated hover:border-primary hover:text-primary",
  outline:
    "bg-transparent text-primary border border-border hover:bg-surface-elevated hover:border-primary hover:text-primary",
  ghost: "bg-transparent text-secondary hover:bg-surface-elevated hover:text-primary border border-transparent",
};

/*
 * `min-h-11` (44px) on every size is a tap-target floor, not a visual one: the
 * smallest sizes render ~36px tall from their padding alone, which is under the
 * recommended minimum for a touch target. `min-h` leaves the desktop appearance
 * of `lg` untouched and only grows the smaller sizes on touch screens.
 */
const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4 py-2 text-sm gap-1.5",
  md: "min-h-11 px-5 py-2.5 text-sm gap-2",
  lg: "min-h-11 px-7 py-3.5 text-base gap-2",
};

const baseStyles = [
  "inline-flex max-w-full items-center justify-center",
  "font-medium leading-none tracking-[0.01em]",
  // A label that is too long for a 320px screen must wrap rather than overflow.
  // `overflow-x: hidden` in globals.css would clip the overflow unreachably,
  // so nowrap is only allowed once there is room for it.
  "whitespace-normal sm:whitespace-nowrap",
  "rounded-md cursor-pointer select-none",
  "transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-out",
  "hover:-translate-y-px active:translate-y-0 active:scale-[0.98]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  "disabled:pointer-events-none disabled:opacity-50",
].join(" ");

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", href, className = "", children, asChild = false, type = "button", ...rest },
  ref,
) {
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();

  // 1. Explicit `href` -> render a Next.js Link.
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  // 2. `asChild` -> adopt the single child element and apply the styles to it.
  //    This is what stops us rendering <button><a>...</a></button>.
  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;
    const childClassName = [classes, child.props.className].filter(Boolean).join(" ");
    return cloneElement(child, { className: childClassName });
  }

  // 3. Default -> a real <button>.
  return (
    <button ref={ref} type={type} className={classes} {...rest}>
      {children}
    </button>
  );
});
