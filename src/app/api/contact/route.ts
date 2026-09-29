import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { CONTACT_INFO } from "@/lib/constants";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().optional(),
  subject: z.string().trim().min(5, "Subject must be at least 5 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

function getResend() {
  return process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    await prisma.contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject,
        message: data.message,
      },
    });

    // Best-effort: the submission is already stored, so a mail outage must not
    // surface as a failed submission to the visitor.
    const resend = getResend();
    if (resend) {
      try {
        await resend.emails.send({
          from: "Hanif Design <noreply@hanifplanning.co.uk>",
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
      }
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
