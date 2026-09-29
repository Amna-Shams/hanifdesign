"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

/**
 * The site's scroll-reveal motion, in one place.
 *
 * The home page grew these animations inline — the same `opacity: 0 → 1` plus a
 * 20-30px rise, the same `[0.16, 1, 0.3, 1]` ease, the same `once: true`
 * viewport — repeated in a dozen components. Every other page then had to either
 * copy that block again or ship static, which is how the home page came to feel
 * like the only considered one. This module is that block, factored out, so a
 * page opts in by wrapping markup rather than by remembering prop values.
 *
 * ```tsx
 * <Reveal>…</Reveal>                        // a single block
 * <Reveal direction="left">…</Reveal>        // slides in from the left
 *
 * <RevealStagger>                          // a grid or list
 *   <RevealItem>…</RevealItem>
 * </RevealStagger>
 * ```
 *
 * `once: true` is deliberate: re-animating every time a section scrolls back into
 * view is tiring to read, and the home page has always behaved this way.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

/** Distance travelled, matching the home page's per-context offsets. */
const OFFSET = {
  up: { x: 0, y: 20 },
  down: { x: 0, y: -20 },
  left: { x: -30, y: 0 },
  right: { x: 30, y: 0 },
  none: { x: 0, y: 0 },
} as const;

export type RevealDirection = keyof typeof OFFSET;

interface RevealBaseProps {
  direction?: RevealDirection;
  /** Seconds to wait before starting. Use for a second block in the same row. */
  delay?: number;
  /**
   * How much of the element must be visible before it animates. Lower values
   * suit tall elements (a long grid) that would otherwise never fire.
   */
  amount?: number;
  duration?: number;
  children?: React.ReactNode;
  className?: string;
}

type RevealProps = RevealBaseProps & Omit<HTMLMotionProps<"div">, "children" | "className">;

export function Reveal({
  direction = "up",
  delay = 0,
  amount = 0.2,
  duration = 0.6,
  children,
  className,
  ...rest
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const from = OFFSET[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      // A reduced-motion preference still gets the fade — it carries no
      // vestibular risk — but no travel.
      transition={{ duration: reduceMotion ? 0.3 : duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Parent for a grid or list whose children should cascade. Animates its
 * children, not itself, so the container can stay a plain `<ul>`/`<div>`.
 */
interface RevealStaggerProps extends Omit<HTMLMotionProps<"div">, "children"> {
  /** Seconds between consecutive children. */
  stagger?: number;
  delay?: number;
  amount?: number;
  children?: React.ReactNode;
  className?: string;
}

export function RevealStagger({
  stagger = 0.08,
  delay = 0,
  amount = 0.15,
  children,
  className,
  ...rest
}: RevealStaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{ visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** A child of {@link RevealStagger}. Must be a direct descendant. */
export function RevealItem({
  direction = "up",
  duration = 0.5,
  className,
  children,
  ...rest
}: Omit<RevealProps, "delay" | "amount">) {
  const reduceMotion = useReducedMotion();
  const from = OFFSET[direction];

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, ...(reduceMotion ? {} : from) },
        visible: { opacity: 1, x: 0, y: 0, transition: { duration, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
