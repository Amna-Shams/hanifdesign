import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { MAIL_FROM, fail, getResend, spamResponse } from "@/lib/api";
import {
  CONTACT_INFO,
  QUOTE_BUDGET_RANGES,
  QUOTE_PROJECT_TYPES,
  labelForOption,
} from "@/lib/constants";
import { checkSpam, honeypotTripped } from "@/lib/spam";

/** Four quote requests an hour from one address; covers genuine follow-ups. */
const RATE_LIMIT = { limit: 4, windowMs: 3_600_000 };

const quoteSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().min(10, "Please enter a valid phone number"),
  // Refined against the shared option lists rather than merely "non-empty", so
  // a hand-rolled POST cannot fill the column with anything unrecognised.
  projectType: z
    .string()
    .refine((value) => QUOTE_PROJECT_TYPES.some((type) => type.value === value), {
      message: "Unrecognised project type",
    }),
  budget: z
    .string()
    .refine((value) => QUOTE_BUDGET_RANGES.some((range) => range.value === value), {
      message: "Unrecognised budget range",
    }),
  message: z.string().trim().min(20, "Message must be at least 20 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const rejection = spamResponse(
      checkSpam(request, RATE_LIMIT),
      "Too many requests. Please try again shortly.",
    );
    if (rejection) return rejection;

    const raw = await request.json().catch(() => null);
    if (!raw || typeof raw !== "object") {
      return fail("Invalid request body", 400);
    }

    // A bot that filled the hidden field is answered as though it succeeded, so
    // it learns nothing. Nothing is emailed, so the send quota is untouched.
    if (honeypotTripped(raw)) {
      return NextResponse.json({ success: true, message: "Quote request received" });
    }

    const validation = quoteSchema.safeParse(raw);
    if (!validation.success) {
      return fail("Validation failed", 400, validation.error.flatten().fieldErrors);
    }

    const data = validation.data;

    // Email is the only delivery route (there is no database behind this
    // endpoint), so a failed send means the enquiry genuinely did not
    // arrive. Reporting success anyway would lose it silently, so failure is
    // surfaced to the visitor.
    const resend = getResend();
    if (!resend) {
      console.error("RESEND_API_KEY is not set — quote request not delivered:", data.email);
      return fail("We could not send your request. Please email us directly.", 503);
    }

    try {
      await resend.emails.send({
        from: MAIL_FROM,
        to: CONTACT_INFO.email,
        replyTo: data.email,
        subject: `New quote request: ${labelForOption(QUOTE_PROJECT_TYPES, data.projectType)}`,
        text: [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Phone: ${data.phone}`,
          `Project type: ${labelForOption(QUOTE_PROJECT_TYPES, data.projectType)}`,
          `Budget: ${labelForOption(QUOTE_BUDGET_RANGES, data.budget)}`,
          "",
          "Message:",
          data.message,
        ].join("\n"),
      });
    } catch (emailError) {
      console.error("Failed to send quote email:", emailError);
      return fail("We could not send your request. Please email us directly.", 502);
    }

    return NextResponse.json({ success: true, message: "Quote request submitted successfully" });
  } catch (error) {
    console.error("Quote API error:", error);
    return fail("Internal server error", 500);
  }
}
