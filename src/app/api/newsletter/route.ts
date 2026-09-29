import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { CONTACT_INFO } from "@/lib/constants";
import { NEWSLETTER_MESSAGES, NEWSLETTER_STATUS_PARAM, type NewsletterStatus } from "@/lib/newsletter";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

/** Statuses that represent a failure rather than a successful subscription. */
const ERROR_STATES: NewsletterStatus[] = ["invalid", "error"];

function getResend() {
  return process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
}

/**
 * Reads the submitted email from either a JSON body or a native form post.
 *
 * The footer form works without JavaScript and posts
 * `application/x-www-form-urlencoded`, while the JS path sends JSON. Supporting
 * both here keeps a single endpoint for both callers.
 */
async function readEmail(request: NextRequest): Promise<string | null> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      const body = await request.json();
      return typeof body?.email === "string" ? body.email : null;
    } catch {
      return null;
    }
  }

  try {
    const form = await request.formData();
    const value = form.get("email");
    return typeof value === "string" ? value : null;
  } catch {
    return null;
  }
}

/**
 * Sends the visitor back where they came from with the outcome in the URL.
 * A native form post has no client-side code to read a response, so redirecting
 * is the only way to show a result.
 */
function redirectWithStatus(request: NextRequest, status: NewsletterStatus): NextResponse {
  const referer = request.headers.get("referer");
  // Only ever redirect within this site, so a forged Referer cannot bounce a
  // visitor to an external URL.
  const base = new URL(request.url).origin;
  const target = referer && referer.startsWith(base) ? new URL(referer) : new URL(base);

  target.searchParams.set(NEWSLETTER_STATUS_PARAM, status);
  return NextResponse.redirect(target, { status: 303 });
}

export async function POST(request: NextRequest) {
  const isFormPost = !(request.headers.get("content-type") ?? "").includes("application/json");

  // One place decides both the status code and the message, so the JSON and
  // redirect responses can never drift apart.
  const respond = (status: NewsletterStatus, httpStatus: number) =>
    isFormPost
      ? redirectWithStatus(request, status)
      : NextResponse.json(
          { success: !ERROR_STATES.includes(status), status, message: NEWSLETTER_MESSAGES[status] },
          { status: httpStatus }
        );

  try {
    const raw = await readEmail(request);
    const validation = newsletterSchema.safeParse({ email: raw?.trim() ?? "" });

    if (!validation.success) {
      return respond("invalid", 400);
    }

    const email = validation.data.email.toLowerCase();

    /**
     * There is no database behind this endpoint any more, so the address is
     * delivered by email rather than stored. That has one visible consequence:
     * duplicates cannot be detected, so every submission is forwarded and the
     * `already` / `resubscribed` statuses are no longer emitted. They stay in
     * `NEWSLETTER_MESSAGES` because the client renders whatever status it is
     * given, and keeping the union intact avoids touching that contract.
     */
    const resend = getResend();
    if (!resend) {
      console.error("RESEND_API_KEY is not set — newsletter signup not delivered:", email);
      return respond("error", 503);
    }

    try {
      await resend.emails.send({
        from: "Hanif Design <noreply@hanifplanning.co.uk>",
        to: CONTACT_INFO.email,
        replyTo: email,
        subject: "Newsletter signup",
        text: [
          "A visitor asked to receive the newsletter:",
          "",
          email,
          "",
          "Add them to your mailing list. Note that this address is not stored",
          "anywhere on the site, so it only exists in this email.",
        ].join("\n"),
      });
    } catch (emailError) {
      console.error("Failed to send newsletter signup email:", emailError);
      return respond("error", 502);
    }

    return respond("subscribed", 201);
  } catch (error) {
    console.error("Newsletter API error:", error);
    return respond("error", 500);
  }
}
