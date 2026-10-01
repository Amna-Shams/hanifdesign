"use client";

import { Fragment } from "react";
import { motion } from "motion/react";

interface BlockTextRevealProps {
  text: string;
  /** Applied to the heading wrapper. */
  className?: string;
  /** Seconds between each word revealing. */
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p";
}

/**
 * Animated text reveal for headings.
 *
 * Implemented as a normal, freely-wrapping block of per-word spans rather than
 * by splitting the string into fixed line chunks. That matters: a fixed split
 * breaks as soon as the viewport narrows and words no longer fit the assumed
 * line width, which produced overflow and ragged headlines on mobile.
 *
 * The words stay in normal document flow, so the text remains selectable,
 * searchable and readable by assistive technology, and the animation is purely
 * additive. Honours `prefers-reduced-motion` via the global CSS.
 *
 * The separating space is rendered *between* the word spans, never inside one.
 * An `inline-block` is an atomic inline: for line breaking the whole box is
 * replaced by a single U+FFFC, and a trailing space inside it is discarded. Put
 * the space inside and consecutive spans have no break opportunity between them,
 * so the heading lays out as one unbreakable line that overflows its container —
 * and `overflow-x: hidden` in `globals.css` clips the overflow away unreachably.
 * A sibling text node between the boxes restores normal wrapping.
 */
export function BlockTextReveal({
  text,
  className = "",
  stagger = 0.045,
  as: Tag = "h1",
}: BlockTextRevealProps) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        // Painted in its final state so the headline (usually the LCP element)
        // is visible in the server HTML instead of waiting for hydration.
        initial={false}
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: stagger } } }}
        className="inline"
      >
        {words.map((word, index) => (
          <Fragment key={`${word}-${index}`}>
            <motion.span
              variants={{
                hidden: { opacity: 0, y: "0.3em" },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              {word}
            </motion.span>
            {index < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </motion.span>
    </Tag>
  );
}

export default BlockTextReveal;
