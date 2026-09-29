import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CONTACT_INFO, REGISTERED_OFFICE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Hanif Design & Consultancy Limited privacy policy. How we collect, use, and protect your personal data in compliance with UK GDPR.",
  robots: "noindex, follow",
};

const lastUpdated = "25 September 2025";

export default function PrivacyPage() {
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
            title="Privacy Policy"
            subtitle={`Last updated: ${lastUpdated}`}
            align="center"
          />

          <div className="mt-12 max-w-3xl mx-auto space-y-10 text-textmuted leading-relaxed">
            <Reveal>
              <h2 className="font-heading font-semibold text-xl text-primary mb-4">1. Introduction</h2>
              <p>
                Hanif Design &amp; Consultancy Limited (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
                &ldquo;our&rdquo;) is committed to protecting
                your personal information and your right to privacy. This policy explains how we
                collect, use, disclose, and safeguard your information when you visit our website
                or use our services. We comply with the UK General Data Protection Regulation
                (UK GDPR) and the Data Protection Act 2018.
              </p>
            </Reveal>

            <Reveal>
              <h2 className="font-heading font-semibold text-xl text-primary mb-4">2. Data We Collect</h2>
              <h3 className="font-medium text-primary mb-2">Personal Data You Provide</h3>
              <ul className="list-disc list-inside space-y-1 mb-4">
                <li>Name, email address, phone number (contact forms, quote requests)</li>
                <li>Project details, property address, budget information (quote forms)</li>
                <li>Communication records (emails, calls, meetings)</li>
              </ul>
              <h3 className="font-medium text-primary mb-2">Automatically Collected Data</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>IP address, browser type, operating system</li>
                <li>Pages visited, time spent, referral source</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="font-heading font-semibold text-xl text-primary mb-4">3. How We Use Your Data</h2>
              <p>We use your data for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>To respond to enquiries and provide planning consultancy services</li>
                <li>To prepare and submit planning applications on your behalf</li>
                <li>To send quotes, contracts, and service updates</li>
                <li>To improve our website and marketing (analytics)</li>
                <li>To comply with legal obligations (anti-money laundering, professional standards)</li>
                <li>To send marketing communications (only with your consent)</li>
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="font-heading font-semibold text-xl text-primary mb-4">4. Legal Basis for Processing</h2>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li><strong>Contract:</strong> Performing our consultancy agreement with you</li>
                <li><strong>Legal obligation:</strong> Regulatory and professional requirements</li>
                <li><strong>Legitimate interest:</strong> Business improvement, security, fraud prevention</li>
                <li><strong>Consent:</strong> Marketing communications, non-essential cookies</li>
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="font-heading font-semibold text-xl text-primary mb-4">5. Cookies</h2>
              <p>We use essential cookies for site functionality and optional analytics cookies (with your consent) to understand site usage. You can manage cookie preferences via our cookie banner or your browser settings.</p>
            </Reveal>

            <Reveal>
              <h2 className="font-heading font-semibold text-xl text-primary mb-4">6. Third Parties</h2>
              <p>We may share data with:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Local planning authorities (as part of applications)</li>
                <li>Professional insurers and regulators (RTPI, PI insurance)</li>
                <li>Sub-consultants (ecologists, transport planners) with your agreement</li>
                <li>IT providers (hosting, email, CRM) under data processing agreements</li>
              </ul>
              <p className="mt-2">We do not sell your personal data.</p>
            </Reveal>

            <Reveal>
              <h2 className="font-heading font-semibold text-xl text-primary mb-4">7. Your Rights</h2>
              <p>Under UK GDPR, you have the right to:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Access your personal data</li>
                <li>Rectify inaccurate data</li>
                <li>Erasure (&ldquo;right to be forgotten&rdquo;) where applicable</li>
                <li>Restrict or object to processing</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
                <li>Lodge a complaint with the ICO</li>
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="font-heading font-semibold text-xl text-primary mb-4">8. Data Retention</h2>
              <p>We retain client files for 6 years after project completion (professional indemnity requirements). Marketing data is retained until you unsubscribe. Analytics data is retained for 26 months.</p>
            </Reveal>

            <Reveal>
              <h2 className="font-heading font-semibold text-xl text-primary mb-4">9. Security</h2>
              <p>We implement appropriate technical and organisational measures to protect your data, including encryption, access controls, secure hosting, and staff training.</p>
            </Reveal>

            <Reveal>
              <h2 className="font-heading font-semibold text-xl text-primary mb-4">10. Contact Us</h2>
              <p>For privacy queries or to exercise your rights:</p>
              <address className="not-italic mt-2 space-y-1">
                <p>Data Protection Officer</p>
                <p>Hanif Design & Consultancy Limited</p>
                <p>{REGISTERED_OFFICE}</p>
                <p>Email: {CONTACT_INFO.email}</p>
                <p>Phone: {CONTACT_INFO.phone}</p>
              </address>
            </Reveal>

            <Reveal>
              <h2 className="font-heading font-semibold text-xl text-primary mb-4">11. Changes to This Policy</h2>
              <p>
                We may update this policy from time to time. Changes will be posted here with an
                updated &ldquo;last updated&rdquo; date. Material changes will be communicated
                directly.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
