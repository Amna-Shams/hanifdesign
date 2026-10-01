import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { COMPANY_NAME, CONTACT_INFO, REGISTERED_OFFICE, COMPANY_NUMBER } from "@/lib/constants";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: canonical("/terms") },
  title: "Terms of Service",
  description: `${COMPANY_NAME} terms and conditions of service. Governing law: England & Wales`,
  robots: "noindex, follow",
};

const lastUpdated = "25 September 2025";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-surface-elevated-translucent">
      <section className="py-16 sm:py-20 lg:py-28 bg-surface-translucent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* The title block is deliberately static: it is the first viewport and
              the h1 is the LCP element, so a `whileInView` reveal would ship
              `opacity: 0` in the server HTML and hold it back until hydration. */}
          <SectionHeading
            as="h1"
            eyebrow="Legal"
            title="Terms of Service"
            subtitle={`Last updated: ${lastUpdated}`}
            align="center"
          />

          <div className="mt-12 max-w-3xl mx-auto space-y-10 text-textmuted leading-relaxed">
            <Reveal>
              <h2 className="font-heading font-semibold text-xl text-primary mb-4">1. Acceptance of Terms</h2>
              <p>
                By engaging {COMPANY_NAME} (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
                &ldquo;our&rdquo;) for planning consultancy services, you
                (&ldquo;the Client&rdquo;) agree to these terms. These terms,
                together with any written proposal or engagement letter, constitute the entire
                agreement between us.
              </p>
            </Reveal>

            <Reveal>
              <h2 className="font-heading font-semibold text-xl text-primary mb-4">2. Services</h2>
              <p>We provide planning consultancy services including but not limited to:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Planning applications and appeals</li>
                <li>Permitted development assessments and lawful development certificates</li>
                <li>Pre-application advice and design & access statements</li>
                <li>Planning drawings, visualisations, and supporting documents</li>
                <li>Condition discharge and post-approval support</li>
              </ul>
              <p className="mt-2">The scope of services is defined in the written proposal. Additional services require a separate agreement.</p>
            </Reveal>

            <Reveal>
              <h2 className="font-heading font-semibold text-xl text-primary mb-4">3. Fees and Payment</h2>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Fees are as quoted in the proposal. Fixed fees apply to defined scopes; hourly rates apply to additional work.</li>
                <li>Payment terms: 50% on instruction, 50% on submission (or as agreed in writing).</li>
                <li>Late payments incur interest at 4% above the Bank of England base rate.</li>
                <li>Council fees, third-party consultant fees, and disbursements are payable in addition.</li>
                <li>VAT is not currently charged (below threshold). If registration changes, VAT will be added.</li>
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="font-heading font-semibold text-xl text-primary mb-4">4. Client Responsibilities</h2>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Provide accurate, complete instructions and information promptly</li>
                <li>Confirm ownership/authority to make the application</li>
                <li>Pay fees as agreed</li>
                <li>Respond to our queries within reasonable timeframes</li>
                <li>Inform us of any changes to instructions or circumstances</li>
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="font-heading font-semibold text-xl text-primary mb-4">5. Intellectual Property</h2>
              <p>All drawings, reports, and documents produced by us remain our copyright until full payment is received. Upon full payment, the Client receives a licence to use the documents for the specific project only. We retain the right to use anonymised project examples for marketing.</p>
            </Reveal>

            <Reveal>
              <h2 className="font-heading font-semibold text-xl text-primary mb-4">6. Limitation of Liability</h2>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>We exercise reasonable skill and care in accordance with RTPI standards.</li>
                <li>We do not guarantee planning approval — decisions rest with the local authority.</li>
                <li>Our total liability is limited to the fees paid for the relevant service.</li>
                <li>We are not liable for indirect, consequential, or pure economic loss.</li>
                <li>Nothing in these terms excludes liability for death, personal injury, or fraud.</li>
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="font-heading font-semibold text-xl text-primary mb-4">7. Professional Indemnity Insurance</h2>
              <p>We maintain professional indemnity insurance in accordance with RTPI requirements. Details available on request.</p>
            </Reveal>

            <Reveal>
              <h2 className="font-heading font-semibold text-xl text-primary mb-4">8. Confidentiality</h2>
              <p>Both parties agree to keep confidential all non-public information exchanged, except where disclosure is required by law or regulatory obligation.</p>
            </Reveal>

            <Reveal>
              <h2 className="font-heading font-semibold text-xl text-primary mb-4">9. Termination</h2>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Either party may terminate with 14 days&rsquo; written notice.</li>
                <li>Fees for work completed to termination date are payable in full.</li>
                <li>We may terminate immediately for non-payment or material breach.</li>
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="font-heading font-semibold text-xl text-primary mb-4">10. Governing Law and Jurisdiction</h2>
              <p>These terms are governed by the laws of <strong>England and Wales</strong>. The courts of England and Wales have exclusive jurisdiction over any disputes arising from or in connection with these terms.</p>
            </Reveal>

            <Reveal>
              <h2 className="font-heading font-semibold text-xl text-primary mb-4">11. Company Information</h2>
              <address className="not-italic mt-2 space-y-1">
              <p>{COMPANY_NAME}</p>
                <p>Registered in England & Wales | Company No. {COMPANY_NUMBER}</p>
                <p>Registered Office: {REGISTERED_OFFICE}</p>
              </address>
            </Reveal>

            <Reveal>
              <h2 className="font-heading font-semibold text-xl text-primary mb-4">12. Contact</h2>
              <address className="not-italic mt-2 space-y-1">
                <p>Email: {CONTACT_INFO.email}</p>
                <p>Phone: {CONTACT_INFO.phone}</p>
              </address>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
