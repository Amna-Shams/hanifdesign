/**
 * Newsletter subscription status codes.
 *
 * The API returns one of these both as a JSON `status` field and as the value
 * of the `?newsletter=` query param on a no-JS form redirect, so the footer
 * form can render the outcome identically whether or not JavaScript ran.
 */
export const NEWSLETTER_STATUS_PARAM = "newsletter";

export const NEWSLETTER_MESSAGES = {
  subscribed: "Thanks for subscribing.",
  already: "You are already subscribed.",
  resubscribed: "Welcome back.",
  invalid: "Please enter a valid email address.",
  error: "Something went wrong. Please try again.",
} as const;

export type NewsletterStatus = keyof typeof NEWSLETTER_MESSAGES;

export function isNewsletterStatus(value: unknown): value is NewsletterStatus {
  return typeof value === "string" && value in NEWSLETTER_MESSAGES;
}
