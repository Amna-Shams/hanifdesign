import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { collectUploads, toMeta, type AttachmentMeta } from "@/lib/uploads";
import {
  CONTACT_INFO,
  QUOTE_BUDGET_RANGES,
  QUOTE_PROJECT_TYPES,
  labelForOption,
} from "@/lib/constants";

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

/** Written to the non-nullable `timeline` column when the form omits it. */
const TIMELINE_NOT_SPECIFIED = "Not specified";

function fail(message: string, status: number, errors?: Record<string, string[]>) {
  return NextResponse.json({ success: false, message, ...(errors ? { errors } : {}) }, { status });
}

export async function POST(request: NextRequest) {
  try {
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

    await prisma.quoteRequest.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        projectType: data.projectType,
        budget: data.budget,
        // The form no longer asks for a timeline, but the column is NOT NULL.
        // Making it nullable needs a migration, so the gap is recorded
        // explicitly rather than with an empty string.
        timeline: TIMELINE_NOT_SPECIFIED,
        description: data.message,
        // Metadata only — the bytes travel by email, not the database.
        files: attachments.length > 0 ? (attachments as unknown as object) : undefined,
      },
    });

    // Email is best-effort: the enquiry is already saved, so a Resend outage
    // must not turn a successful submission into an error for the visitor.
    const resend = getResend();
    if (resend) {
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
      }
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
