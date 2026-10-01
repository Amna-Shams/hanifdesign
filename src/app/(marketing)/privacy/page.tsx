import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { COMPANY_NAME, COMPANY_NUMBER, CONTACT_INFO, REGISTERED_OFFICE } from "@/lib/constants";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: canonical("/privacy") },
  title: "Privacy Policy",
  description:
    "How we collect, use, and protect your personal data, in compliance with the UK GDPR, the Data Protection Act 2018, and PECR.",
  robots: "noindex, follow",
};

const lastUpdated = "30 September 2025";

/**
 * The controller details for the data below. Kept in constants alongside the rest
 * of the company's registered particulars so the legal entity, company number,
 * and registered office can only ever be changed in one place.
 */
const CONTROLLER = COMPANY_NAME;

/**
 * Numbered policy section.
 *
 * The gold figure is a sibling rather than a child of the prose because the
 * desktop two-column layout puts it in a fixed-width track to the left, and on
 * mobile it stacks above the heading. `aria-hidden` keeps the decorative
 * numbering out of the accessibility tree so screen readers hear the heading
 * text alone rather than "zero one, Information We Collect".
 */
function PolicySection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal amount={0.2} className="border-t border-subtle py-10 first:border-t-0 first:pt-0 sm:py-12">
      <div className="grid gap-4 sm:grid-cols-[4.5rem_1fr] sm:gap-8 lg:grid-cols-[6rem_1fr]">
        <span
          aria-hidden="true"
          className="font-heading text-4xl font-bold leading-none text-gold sm:text-5xl lg:text-6xl"
        >
          {number}
        </span>
        <div className="min-w-0">
          <h2 className="font-heading text-2xl font-semibold text-primary sm:text-3xl">{title}</h2>
          <div className="mt-4 space-y-4 text-textmuted leading-relaxed">{children}</div>
        </div>
      </div>
    </Reveal>
  );
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-surface-elevated-translucent">
      {/* ----------------------------------------------------------------
          Title block. Deliberately static and outside any Reveal: it is the
          first viewport and the h1 is the LCP element, so a `whileInView`
          animation would ship `opacity: 0` in the server HTML and hold the
          LCP paint back until hydration. Every section below animates.
          ---------------------------------------------------------------- */}
      <section className="bg-surface-translucent py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em]">
              <li>
                <Link href="/" className="text-gold transition-colors hover:text-gold/80">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-textmuted">
                &rsaquo;
              </li>
              <li aria-current="page" className="text-textmuted">
                Legal
              </li>
            </ol>
          </nav>

          <h1 className="font-heading text-4xl font-bold leading-tight text-primary sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 font-mono text-sm uppercase tracking-[0.14em] text-textmuted">
            Last Updated: {lastUpdated}
          </p>

          <p className="mt-8 max-w-3xl text-textmuted leading-relaxed">
            This policy explains how {CONTROLLER} (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
            &ldquo;our&rdquo;) collects, uses, and protects your personal data when you visit this
            website or ask us for a quotation. We handle your information in line with the UK
            General Data Protection Regulation (UK GDPR), the Data Protection Act 2018, and the
            Privacy and Electronic Communications (EC Directive) Regulations 2003 (PECR).
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <PolicySection number="01" title="Information We Collect">
            <p>
              We only collect what we need to respond to you and, where you engage us, to carry
              out the agreed work. In practice that falls into three groups.
            </p>

            <div className="space-y-4 pt-2">
              <div>
                <h3 className="font-heading text-lg font-semibold text-primary">
                  Identity and contact data
                </h3>
                <p className="mt-1">
                  Your name, email address, telephone number, and postal address, supplied when
                  you complete an enquiry or quotation form, email us, or speak with us directly.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-lg font-semibold text-primary">
                  Technical and usage data
                </h3>
                <p className="mt-1">
                  Information collected automatically when you browse, such as your IP address,
                  browser type and version, device, the pages you visit, and the referring site.
                  This helps us keep the website secure and understand which pages are useful.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-lg font-semibold text-primary">Project data</h3>
                <p className="mt-1">
                  Details you give us about a property or proposed project, including the address,
                  the type of work, constraints you describe, and any budget range you choose to
                  share. We use this solely to assess and quote for your enquiry.
                </p>
              </div>
            </div>
          </PolicySection>

          <PolicySection number="02" title="Cookies and Tracking">
            <p>
              We use essential cookies to make the site function, and optional analytics cookies
              to understand usage. Under PECR, non-essential cookies may only be set on your
              device after you have given consent, and you may withdraw that consent at any time.
            </p>
            <p>
              Full detail on what we store and how to change your preferences is in our{" "}
              <Link href="/cookies" className="text-gold underline underline-offset-4 hover:text-gold/80">
                cookie policy
              </Link>
              , or via the cookie banner and your browser settings.
            </p>
          </PolicySection>

          <PolicySection number="03" title="How We Use Data">
            <p>
              We rely on the following lawful bases under UK GDPR, and use your data only for the
              purposes they allow.
            </p>

            <RevealStagger amount={0.2} stagger={0.12} className="grid gap-4 pt-2 sm:grid-cols-2">
              <RevealItem className="rounded-md border border-subtle bg-surface-elevated p-5">
                <h3 className="font-heading text-lg font-semibold text-primary">Service Delivery</h3>
                <p className="mt-2 text-sm">
                  Responding to enquiries, preparing quotations, and delivering the consultancy
                  services you engage us for. This is necessary to perform our contract with you,
                  so it does not rely on consent.
                </p>
              </RevealItem>

              <RevealItem className="rounded-md border border-subtle bg-surface-elevated p-5">
                <h3 className="font-heading text-lg font-semibold text-primary">Security</h3>
                <p className="mt-2 text-sm">
                  Keeping our systems and your information secure, detecting fraud, and
                  investigating misuse. This is based on our legitimate interest in protecting
                  both you and us.
                </p>
              </RevealItem>
            </RevealStagger>
          </PolicySection>

          <PolicySection number="04" title="Data Protection &amp; Retention">
            <p>
              All information you send us is transmitted over an encrypted connection. Access is
              restricted to those who need it to do their job, and we keep an audit trail of
              access to client files.
            </p>
            <p>
              We keep your data only as long as we have a reason to. Enquiry data that does not
              lead to an instruction is deleted after 12 months. Client project records are
              retained for 6 years after completion, in line with professional indemnity insurance
              requirements. Marketing records are kept until you unsubscribe.
            </p>
            <p>
              Where we depend on legitimate interest, we have assessed that your rights do not
              override ours. You can ask for a summary of that assessment at any time.
            </p>
          </PolicySection>

          <PolicySection number="05" title="Your Privacy Rights">
            <p>Under UK GDPR you have the following rights over the personal data we hold.</p>

            <RevealStagger amount={0.2} stagger={0.12} className="grid gap-4 pt-2 sm:grid-cols-3">
              <RevealItem className="rounded-md border border-subtle bg-surface-elevated p-5">
                <h3 className="font-heading text-base font-semibold text-primary">
                  Right to Access
                </h3>
                <p className="mt-2 text-sm">
                  Ask for a copy of the personal data we hold about you, and how we use it.
                </p>
              </RevealItem>

              <RevealItem className="rounded-md border border-subtle bg-surface-elevated p-5">
                <h3 className="font-heading text-base font-semibold text-primary">
                  Right to Rectify
                </h3>
                <p className="mt-2 text-sm">
                  Have anything inaccurate or incomplete corrected without undue delay.
                </p>
              </RevealItem>

              <RevealItem className="rounded-md border border-subtle bg-surface-elevated p-5">
                <h3 className="font-heading text-base font-semibold text-primary">
                  Right to Erasure
                </h3>
                <p className="mt-2 text-sm">
                  Ask us to delete your data where we no longer have a lawful reason to keep it.
                </p>
              </RevealItem>
            </RevealStagger>

            <p className="pt-4">
              You also have the right to restrict or object to processing, to data portability,
              to withdraw consent at any time without affecting prior processing, and to complain
              to the Information Commissioner&rsquo;s Office (ICO), the UK supervisory authority, at{" "}
              <a
                href="https://ico.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline underline-offset-4 hover:text-gold/80"
              >
                ico.org.uk
              </a>
              .
            </p>
          </PolicySection>

          <PolicySection number="06" title="Contact">
            <p>
              For any privacy question, or to exercise one of the rights above, contact us using
              the details below.
            </p>
            <address className="not-italic space-y-1 rounded-md border border-subtle bg-surface-elevated p-5">
              <p className="font-heading font-semibold text-primary">{CONTROLLER}</p>
              <p>Company No. {COMPANY_NUMBER}</p>
              <p>{REGISTERED_OFFICE}</p>
              <p>
                Email:{" "}
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-gold underline underline-offset-4 hover:text-gold/80"
                >
                  {CONTACT_INFO.email}
                </a>
              </p>
              <p>
                Phone:{" "}
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                  className="text-gold underline underline-offset-4 hover:text-gold/80"
                >
                  {CONTACT_INFO.phone}
                </a>
              </p>
            </address>
          </PolicySection>
        </div>
      </section>

      {/* Closing CTA. The navy panel is the one deliberate departure from the
          site's surface tokens: it closes the page with the brand colour and
          carries the same call to action used elsewhere in the marketing site. */}
      <section className="pb-20 sm:pb-24 lg:pb-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal amount={0.2} className="rounded-lg bg-[#0A2540] p-8 sm:p-10">
            <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              Data Privacy Inquiries?
            </h2>
            <p className="mt-3 max-w-xl text-white/70 leading-relaxed">
              If anything here is unclear, or you would like to talk through how we handle your
              information, we would rather hear from you than have you assume.
            </p>
            <div className="mt-7">
              <Button href="/contact" variant="gold" size="lg" asChild={false}>
                Contact us
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
