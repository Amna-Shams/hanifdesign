import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { collectUploads, toMeta, type AttachmentMeta } from "@/lib/uploads";
import {
  CONTACT_INFO,
  QUOTE_BUDGET_RANGES,
  QUOTE_PROJECT_TYPES,
  labelForOption,
} from "@/lib/constants";
import { checkSpam, honeypotTripped } from "@/lib/spam";

/** Four quote requests an hour from one address; covers genuine follow-ups. */
const RATE_LIMIT = { limit: 4, windowMs: 3_600_000 };

/**
 * Enforces a body limit that comfortably covers `MAX_FILES * 10MB` plus form
 * fields, so a huge upload is rejected by the platform before we buffer it.
 */
export const maxDuration = 30;

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

function getResend() {
  return process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
}

function fail(message: string, status: number, errors?: Record<string, string[]>) {
  return NextResponse.json({ success: false, message, ...(errors ? { errors } : {}) }, { status });
}

export async function POST(request: NextRequest) {
  try {
    const spam = checkSpam(request, RATE_LIMIT);
    if (!spam.ok) {
      if (spam.reason === "rate_limited") {
        return NextResponse.json(
          { success: false, message: "Too many requests. Please try again shortly." },
          { status: 429, headers: { "Retry-After": String(spam.retryAfter) } }
        );
      }
      return fail("Submission rejected.", 413);
    }

    const contentType = request.headers.get("content-type") ?? "";
    const isMultipart = contentType.includes("multipart/form-data");

    // The form posts JSON; multipart is still accepted so an endpoint caller
    // can attach drawings without going through the browser form.
    const raw = isMultipart
      ? Object.fromEntries((await request.formData()).entries())
      : await request.json().catch(() => null);

    if (!raw || typeof raw !== "object") {
      return fail("Invalid request body", 400);
    }

    // A bot that filled the hidden field is answered as though it succeeded, so
    // it learns nothing. Nothing is stored or emailed, so the send quota and
    // any attached uploads cost us nothing.
    if (honeypotTripped(raw)) {
      return NextResponse.json({ success: true, message: "Quote request received" });
    }

    // `files` is handled separately below; the text fields are validated here.
    const fields: Record<string, unknown> = { ...(raw as Record<string, unknown>) };
    delete fields.files;

    const validation = quoteSchema.safeParse(fields);
    if (!validation.success) {
      return fail("Validation failed", 400, validation.error.flatten().fieldErrors);
    }

    const data = validation.data;

    // `raw.files` holds one entry per selected file because the client appends
    // them all under the same field name.
    const { accepted, rejected } = collectUploads(
      isMultipart && Array.isArray(raw.files) ? raw.files : []
    );
    const attachments: AttachmentMeta[] = accepted.map(toMeta);

    // Email is the only delivery route now that there is no database behind
    // this endpoint, so a failed send means the enquiry and any attached
    // drawings genuinely did not arrive. Reporting success anyway would lose
    // them silently, so failure is surfaced to the visitor.
    const resend = getResend();
    if (!resend) {
      console.error("RESEND_API_KEY is not set — quote request not delivered:", data.email);
      return fail("We could not send your request. Please email us directly.", 503);
    }

    try {
      const bufferAttachments = await Promise.all(
        accepted.map(async (file) => ({
          filename: file.name,
          content: Buffer.from(await file.arrayBuffer()),
        })),
      );

      await resend.emails.send({
        from: "Hanif Design <noreply@hanifplanning.co.uk>",
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
          "",
          attachments.length > 0
            ? `Attachments: ${attachments.map((a) => `${a.filename} (${a.size} bytes)`).join(", ")}`
            : "Attachments: none",
          rejected.length > 0
            ? `Rejected: ${rejected.map((r) => `${r.filename} — ${r.reason}`).join(", ")}`
            : "",
        ]
          .filter(Boolean)
          .join("\n"),
        ...(bufferAttachments.length > 0 ? { attachments: bufferAttachments } : {}),
      });
    } catch (emailError) {
      console.error("Failed to send quote email:", emailError);
      return fail("We could not send your request. Please email us directly.", 502);
    }

    return NextResponse.json({
      success: true,
      message: "Quote request submitted successfully",
      ...(rejected.length > 0 ? { rejected } : {}),
    });
  } catch (error) {
    console.error("Quote API error:", error);
    return fail("Internal server error", 500);
  }
}
