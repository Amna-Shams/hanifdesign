import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { MAIL_FROM, fail, getResend, spamResponse } from "@/lib/api";
import { CONTACT_INFO } from "@/lib/constants";
import { checkSpam, honeypotTripped } from "@/lib/spam";

/** Five enquiries a minute from one address; a person cannot exceed this. */
const RATE_LIMIT = { limit: 5, windowMs: 60_000 };

const SEND_FAILED = "We could not send your message. Please email us directly.";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().optional(),
  subject: z.string().trim().min(5, "Subject must be at least 5 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const rejection = spamResponse(
      checkSpam(request, RATE_LIMIT),
      "Too many messages sent. Please try again shortly.",
    );
    if (rejection) return rejection;

    const body = await request.json().catch(() => null);

    // A bot that filled the hidden field gets a success response it cannot tell
    // apart from a real send, so it learns nothing and moves on. Nothing is
    // emailed, so the Resend quota is untouched.
    if (honeypotTripped(body)) {
      return NextResponse.json({ success: true, message: "Message sent successfully" });
    }

    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      return fail("Validation failed", 400, validation.error.flatten().fieldErrors);
    }

    const data = validation.data;

    // Email is now the only delivery route: there is no database behind this
    // endpoint, so a failed send means the enquiry genuinely did not arrive.
    // Reporting success anyway would lose enquiries silently, so a failure is
    // surfaced to the visitor and they are invited to try again.
    const resend = getResend();
    if (!resend) {
      console.error("RESEND_API_KEY is not set — contact enquiry not delivered:", data.subject);
      return fail(SEND_FAILED, 503);
    }

    try {
      await resend.emails.send({
        from: MAIL_FROM,
        to: CONTACT_INFO.email,
        // Replies go straight to the sender rather than to the no-reply address.
        replyTo: data.email,
        subject: `New contact: ${data.subject}`,
        text: [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Phone: ${data.phone || "N/A"}`,
          "",
          data.message,
        ].join("\n"),
      });
    } catch (emailError) {
      console.error("Failed to send contact email:", emailError);
      return fail(SEND_FAILED, 502);
    }

    return NextResponse.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact API error:", error);
    return fail("Internal server error", 500);
  }
}
