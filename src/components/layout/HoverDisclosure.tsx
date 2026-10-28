"use client";

import { useEffect } from "react";

const DURATION = 450;
const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
const OPEN_DELAY = 120;
const CLOSE_DELAY = 220;

/**
 * Behaviour for every FAQ-style <details> accordion inside <main>:
 *
 *  - hover (mouse / trackpad only): the answer opens as the pointer arrives and
 *    closes again when it leaves, after a short delay so a stray movement does
 *    not snap it shut;
 *  - click or keyboard toggle: pins an answer open (it then ignores the pointer
 *    leaving) and a second click closes it;
 *  - only one answer is open at a time within an accordion;
 *  - opening and closing animate the panel's height, and honour
 *    `prefers-reduced-motion`.
 *
 * It is one document-level listener rather than a wrapper component, so the
 * shared FAQ component and the bespoke accordions on the service pages all
 * behave the same without each being rewritten. Without JavaScript the native
 * <details> behaviour still works.
 */
export function HoverDisclosure() {
  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animations = new WeakMap<HTMLDetailsElement, Animation>();
    const openTimers = new WeakMap<HTMLDetailsElement, ReturnType<typeof setTimeout>>();
    const closeTimers = new WeakMap<HTMLDetailsElement, ReturnType<typeof setTimeout>>();

    const isOpen = (d: HTMLDetailsElement) => d.open && d.dataset.closing !== "1";
    const summaryOf = (d: HTMLDetailsElement) => d.querySelector<HTMLElement>(":scope > summary");

    const clearTimers = (d: HTMLDetailsElement) => {
      const o = openTimers.get(d);
      const c = closeTimers.get(d);
      if (o) clearTimeout(o);
      if (c) clearTimeout(c);
      openTimers.delete(d);
      closeTimers.delete(d);
    };

    const animate = (d: HTMLDetailsElement, opening: boolean) => {
      const running = animations.get(d);
      const startHeight = d.getBoundingClientRect().height;
      running?.cancel();

      if (opening) {
        delete d.dataset.closing;
        d.open = true;
      } else {
        d.dataset.closing = "1";
      }

      if (reduceMotion()) {
        if (!opening) {
          d.open = false;
          delete d.dataset.closing;
        }
        return;
      }

      const endHeight = opening
        ? d.getBoundingClientRect().height
        : (summaryOf(d)?.getBoundingClientRect().height ?? 0);

      d.style.overflow = "hidden";
      const animation = d.animate(
        { height: [`${startHeight}px`, `${endHeight}px`] },
        { duration: DURATION, easing: EASING },
      );
      animations.set(d, animation);

      const finish = () => {
        if (animations.get(d) !== animation) return;
        animations.delete(d);
        d.style.overflow = "";
        if (!opening) {
          d.open = false;
          delete d.dataset.closing;
        }
      };
      animation.onfinish = finish;
      animation.oncancel = () => {
        if (animations.get(d) === animation) animations.delete(d);
      };
    };

    const closeIt = (d: HTMLDetailsElement) => {
      clearTimers(d);
      if (!isOpen(d)) return;
      delete d.dataset.hover;
      delete d.dataset.pinned;
      animate(d, false);
    };

    const openIt = (d: HTMLDetailsElement, pinned: boolean) => {
      clearTimers(d);
      d.parentElement
        ?.querySelectorAll<HTMLDetailsElement>(":scope > details")
        .forEach((other) => {
          if (other !== d) closeIt(other);
        });
      if (pinned) {
        d.dataset.pinned = "1";
        delete d.dataset.hover;
      } else if (!d.dataset.pinned) {
        d.dataset.hover = "1";
      }
      if (!isOpen(d)) animate(d, true);
    };

    const detailsFrom = (target: EventTarget | null) =>
      (target as Element | null)?.closest<HTMLDetailsElement>("main details") ?? null;

    const onClick = (event: MouseEvent) => {
      const summary = (event.target as Element | null)?.closest("main summary");
      const d = summary?.parentElement as HTMLDetailsElement | null;
      if (!d || d.tagName !== "DETAILS") return;
      event.preventDefault();

      if (isOpen(d) && d.dataset.pinned === "1") closeIt(d);
      else openIt(d, true);
    };

    // Hover is driven by real pointer movement, not by mouseover/mouseout. An
    // accordion changes height as it opens and closes, so the element under a
    // stationary pointer keeps changing; mouseover/mouseout fire for that too,
    // which made neighbouring answers open and shut in a loop. Pointer
    // coordinates only change when the user actually moves, so we re-read what
    // is under them on movement only, and re-check it again when a timer fires.
    let pointerX = -1;
    let pointerY = -1;
    let hovered: HTMLDetailsElement | null = null;
    let frame = 0;

    const detailsAtPointer = () =>
      pointerX < 0 ? null : detailsFrom(document.elementFromPoint(pointerX, pointerY));

    const scheduleOpen = (d: HTMLDetailsElement) => {
      if (isOpen(d) || openTimers.has(d)) return;
      openTimers.set(
        d,
        setTimeout(() => {
          openTimers.delete(d);
          if (detailsAtPointer() === d) openIt(d, false);
        }, OPEN_DELAY),
      );
    };

    const scheduleClose = (d: HTMLDetailsElement) => {
      // Pinned (clicked) or initially-open panels stay put; only hover-opened ones close.
      if (!isOpen(d) || d.dataset.hover !== "1" || closeTimers.has(d)) return;
      closeTimers.set(
        d,
        setTimeout(() => {
          closeTimers.delete(d);
          if (detailsAtPointer() !== d) closeIt(d);
        }, CLOSE_DELAY),
      );
    };

    const evaluate = () => {
      frame = 0;
      const next = detailsAtPointer();
      if (next === hovered) return;
      const previous = hovered;
      hovered = next;

      if (previous) {
        const pendingOpen = openTimers.get(previous);
        if (pendingOpen) {
          clearTimeout(pendingOpen);
          openTimers.delete(previous);
        }
        scheduleClose(previous);
      }
      if (next) {
        const pendingClose = closeTimers.get(next);
        if (pendingClose) {
          clearTimeout(pendingClose);
          closeTimers.delete(next);
        }
        scheduleOpen(next);
      }
    };

    const onMove = (event: MouseEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!frame) frame = requestAnimationFrame(evaluate);
    };

    const onLeavePage = () => {
      pointerX = -1;
      pointerY = -1;
      evaluate();
    };

    document.addEventListener("click", onClick);
    if (canHover) {
      document.addEventListener("mousemove", onMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", onLeavePage);
    }
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeavePage);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
