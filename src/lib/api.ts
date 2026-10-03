import { NextResponse } from "next/server";
import { Resend } from "resend";
import type { SpamVerdict } from "@/lib/spam";

export const MAIL_FROM = "Hanif Design <noreply@hanifplanning.co.uk>";

/** `null` when `RESEND_API_KEY` is not configured, so callers can report it. */
export function getResend() {
  return process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
}

export function fail(message: string, status: number, errors?: Record<string, string[]>) {
  return NextResponse.json({ success: false, message, ...(errors ? { errors } : {}) }, { status });
}

/** The error response for a rejected spam verdict, or `null` when the request may proceed. */
export function spamResponse(verdict: SpamVerdict, rateLimitedMessage: string) {
  if (verdict.ok) return null;
  if (verdict.reason === "rate_limited") {
    const response = fail(rateLimitedMessage, 429);
    response.headers.set("Retry-After", String(verdict.retryAfter));
    return response;
  }
  return fail("Submission rejected.", 413);
}
