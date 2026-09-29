/**
 * Site-wide background wallpaper: the blueprint setting-out grid and warm
 * radial glow that used to live inside the Hero, promoted to the root layout so
 * every route inherits it.
 *
 * Placement notes:
 *
 * - `fixed` + `-z-10` puts it behind all content. It is a single composited
 *   layer that never moves, so scrolling does not re-rasterise the gradients.
 *   `background-attachment: fixed` was deliberately avoided: it forces a
 *   repaint of the whole viewport on every scroll frame on iOS Safari.
 * - `pointer-events-none` so it can never intercept clicks or text selection.
 * - Nothing here contacts the network; both layers are pure CSS gradients.
 *
 * It is painted over the body background (which propagates to the canvas) and
 * under the route content, so full-bleed sections need a translucent surface
 * wash to let it show through — see `--surface-translucent`.
 */
export function GridBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      {/* Two-scale setting-out grid, faded towards the edges. */}
      <div className="blueprint blueprint-fade absolute inset-0" />

      {/* Warm accent glow, sitting slightly above centre. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(245,166,35,0.10) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
