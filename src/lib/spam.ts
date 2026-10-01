import type { NextRequest } from "next/server";

/**
 * Spam protection for the public form endpoints.
 *
 * Two independent, deliberately cheap layers, because neither alone stops a
 * motivated spammer and a paid CAPTCHA is the wrong trade for two small
 * contact forms:
 *
 * 1. A honeypot field. Real users never see it and never fill it in, because it
 *    is removed from the accessibility tree and the tab order. Automated
 *    submitters that fill in every field they find trip it.
 * 2. A per-IP rate limit, which is what actually bounds the cost: every blocked
 *    request is an email we would otherwise send through Resend on the
 *    attacker's behalf.
 *
 * HONEST LIMITATION: the rate limit is an in-process `Map`, so it is per
 * instance and resets on deploy. On a single-instance Node server that is fine;
 * on a multi-instance or serverless deployment each instance keeps its own
 * counter and the effective limit is `limit x instances`. A shared store
 * (Upstash Redis, Vercel KV) is the fix if this site is ever deployed that way.
 */

/** Hidden field name the bot is expected to fill and the human is not. */
export const HONEYPOT_FIELD = "company_website";

/** Nothing legitimate is longer than this; used to cap body parsing too. */
const MAX_BODY_CHARS = 20_000;

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** Keep the map from growing without bound on a long-lived process. */
function sweep(now: number) {
  if (buckets.size < 5_000) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export type SpamVerdict =
  | { ok: true }
  | { ok: false; reason: "rate_limited" | "honeypot" | "too_large"; retryAfter: number };

/**
 * Returns `{ ok: false }` when the request looks automated. Honeypot hits are
 * reported as `ok` to the caller by design — see `contact/route.ts`, which
 * answers a successful-looking response so the bot learns nothing.
 */
export function checkSpam(request: NextRequest, opts: { limit: number; windowMs: number }): SpamVerdict {
  const now = Date.now();

  // Rate limit first: it is the layer that protects the email quota, and it
  // must apply even to a submission that also fills the honeypot.
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const key = `${opts.limit}:${ip}`;
  const existing = buckets.get(key);

  if (existing && existing.resetAt > now) {
    if (existing.count >= opts.limit) {
      const retryAfter = Math.ceil((existing.resetAt - now) / 1000);
      return { ok: false, reason: "rate_limited", retryAfter };
    }
    existing.count += 1;
  } else {
    sweep(now);
    buckets.set(key, { count: 1, resetAt: now + opts.windowMs });
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_CHARS) {
    return { ok: false, reason: "too_large", retryAfter: 60 };
  }

  return { ok: true };
}

/**
 * Reads the honeypot out of an already-parsed body. The value is trimmed and
 * lower-cased because some bots fill the field with a placeholder rather than
 * leaving it empty.
 */
export function honeypotTripped(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const value = (body as Record<string, unknown>)[HONEYPOT_FIELD];
  return typeof value === "string" && value.trim() !== "";
}

/** The hidden input to render inside a form. `aria-hidden` + `tabIndex` keep it out of reach. */
export const HONEYPOT_FIELD_PROPS = {
  name: HONEYPOT_FIELD,
  tabIndex: -1,
  autoComplete: "off",
  "aria-hidden": true as const,
  className: "absolute left-[-9999px] h-0 w-0 overflow-hidden opacity-0 pointer-events-none",
};

/**
 * Pulls the honeypot value straight off the submitted form element.
 *
 * This has to bypass react-hook-form on purpose. `zodResolver` hands `onSubmit`
 * the *parsed* object, and a Zod object strips keys it does not declare — so a
 * honeypot that is merely rendered in the JSX, and never registered, is already
 * gone by the time the form is serialised. Reading the DOM is what makes the
 * field actually reach the endpoint.
 */
export function readHoneypot(event?: React.BaseSyntheticEvent | null): string {
  const form = event?.target as HTMLFormElement | undefined;
  if (!form || typeof FormData === "undefined") return "";
  try {
    const value = new FormData(form).get(HONEYPOT_FIELD);
    return typeof value === "string" ? value : "";
  } catch {
    return "";
  }
}
