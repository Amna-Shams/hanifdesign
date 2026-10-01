import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { COMPANY_NAME, REGISTERED_OFFICE, COMPANY_NUMBER, CONTACT_INFO } from "@/lib/constants";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: canonical("/cookies") },
  title: "Cookie Policy — Hanif Design & Consultancy",
  description: "Learn how Hanif Design & Consultancy uses cookies and similar technologies on our website, in line with UK GDPR and PECR.",
  robots: "noindex, follow",
};

export default function CookiesPage() {
  return (
    <>
      {/* HERO / BREADCRUMB */}
      <section className="relative py-16 lg:py-20 bg-surface-translucent overflow-hidden" aria-labelledby="cookies-heading">
        {/* Blueprint pattern background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(ellipse at 50% 50%, rgba(245, 166, 35, 0.08) 0%, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm">
              <li className="flex items-center gap-2">
                <Link href="/" className="text-gold hover:underline font-medium" aria-label="Home">
                  HOME
                </Link>
                <span className="w-4 h-4 text-text-tint/60" aria-hidden="true">›</span>
              </li>
              <li>
                <span className="text-text-tint" aria-current="page">COOKIE POLICY</span>
              </li>
            </ol>
          </nav>

          {/* The title block is deliberately static: it is the first viewport and
              the h1 is the LCP element, so a `whileInView` reveal would ship
              `opacity: 0` in the server HTML and hold it back until hydration. */}
          <h1 id="cookies-heading" className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-primary leading-tight mb-4">
            Cookie Policy
          </h1>
          <p className="text-secondary text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            How we use cookies and similar technologies on our website.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 lg:py-20 bg-surface-elevated-translucent">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-lg max-w-none text-primary">
          <Reveal>
            <p className="text-textmuted text-sm mb-12"><strong>Last updated:</strong> 29 September 2025</p>
          </Reveal>

          <Reveal>
            <h2 className="font-heading text-2xl text-primary mt-12 mb-4">1. Introduction</h2>
            <p>
                            {COMPANY_NAME} (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
                &ldquo;our&rdquo;) uses cookies and similar tracking technologies on our website to
                ensure the site functions properly, to understand how visitors use our services, and to provide a better user experience. This Cookie Policy explains what cookies are, which cookies we use, why we use them, and how you can control them.
            </p>
            <p>
              We are committed to being transparent about the data we collect and how it is used. Our use of cookies complies with the UK General Data Protection Regulation (UK GDPR) and the Privacy and Electronic Communications Regulations (PECR) 2003 (as amended).
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-heading text-2xl text-primary mt-12 mb-4">2. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your device (computer, smartphone, tablet) when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the site owners. Cookies can be &ldquo;persistent&rdquo; (stored until they expire or are deleted) or &ldquo;session&rdquo; (deleted when you close your browser).
            </p>
            <p>
              Cookies do not typically contain information that personally identifies a user, but personal information we store about you may be linked to the information stored in and obtained from cookies.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-heading text-2xl text-primary mt-12 mb-4">3. Types of Cookies We Use</h2>
          </Reveal>

          <Reveal>
            <h3 className="font-heading text-xl text-primary mt-8 mb-4">a) Strictly Necessary Cookies</h3>
            <p>
              These cookies are essential for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms. You can set your browser to block or alert you about these cookies, but some parts of the site will not then work.
            </p>
            <p><strong>Examples:</strong> Session cookies, security cookies, cookie consent preferences.</p>
            {/* Four columns need ~446px at minimum content width, which exceeds a
                320px viewport. The negative margin lets the scroll region bleed to
                the page gutter while the padding keeps the table off the edge;
                `min-w` gives the columns room to breathe inside that scroller. */}
            <div className="-mx-4 my-6 overflow-x-auto px-4 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[36rem] border-collapse">
              <thead>
                <tr className="bg-surface-elevated text-primary">
                  <th className="border border-subtle px-4 py-2 text-left">Name</th>
                  <th className="border border-subtle px-4 py-2 text-left">Purpose</th>
                  <th className="border border-subtle px-4 py-2 text-left">Duration</th>
                  <th className="border border-subtle px-4 py-2 text-left">Type</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-subtle">
                  <td className="border border-subtle px-4 py-2">cookie-consent</td>
                  <td className="border border-subtle px-4 py-2">Stores your cookie consent preference</td>
                  <td className="border border-subtle px-4 py-2">1 year</td>
                  <td className="border border-subtle px-4 py-2">Strictly Necessary</td>
                </tr>
                <tr className="border-b border-subtle">
                  <td className="border border-subtle px-4 py-2">cookie-consent-map</td>
                  <td className="border border-subtle px-4 py-2">
                    Records that you chose to load the Google Maps embed on our Contact page
                  </td>
                  <td className="border border-subtle px-4 py-2">1 year</td>
                  <td className="border border-subtle px-4 py-2">Strictly Necessary</td>
                </tr>
              </tbody>
            </table>
            </div>
          </Reveal>

          <Reveal>
            <h3 className="font-heading text-xl text-primary mt-8 mb-4">b) Analytics Cookies</h3>
            <p>
              Analytics cookies would allow us to count visits and traffic sources so we can measure
              and improve the performance of our site.
            </p>
            <p>
              We do not currently set any analytics cookies. If this changes, we will update this
              policy and ask for your consent before setting them.
            </p>
          </Reveal>

          <Reveal>
            <h3 className="font-heading text-xl text-primary mt-8 mb-4">c) Marketing Cookies</h3>
            <p>
              We do not currently use marketing or advertising cookies on our website. If this changes in the future, we will update this policy and obtain your consent before placing such cookies.
            </p>
          </Reveal>

          <Reveal>
            <h3 className="font-heading text-xl text-primary mt-8 mb-4">d) Preference Cookies</h3>
            <p>
              These cookies enable the website to remember choices you make (such as your language, region, or text size) and provide enhanced, more personal features. They may also be used to provide services you have asked for, such as watching a video or commenting on a blog.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-heading text-2xl text-primary mt-12 mb-4">4. Third-Party Cookies</h2>
            <p>
              Some features on our website may use third-party services that set their own cookies. We do not control these cookies. The following third parties may set cookies on your device when you use our website:
            </p>
            <ul className="list-disc list-inside space-y-2 my-4">
              <li>
                <strong>Google Maps</strong> &mdash; the map embedded on our Contact page. It is
                loaded from Google, so Google may set cookies in your browser.{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:underline"
                >
                  Google&rsquo;s Privacy Policy
                </a>
              </li>
            </ul>
            <p>
              The map is not loaded until you allow it. If you reject non-essential cookies on the
              banner, the map stays off &mdash; but the Contact page then offers a{" "}
              <strong>Load map</strong> button, and choosing it counts as your consent for that
              embed only, immediately before the request is made. Once loaded, a{" "}
              <strong>Hide map</strong> control appears so you can withdraw that consent just as
              easily. The office address and a link to Google Maps are shown either way, and neither
              requires the embed to load.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-heading text-2xl text-primary mt-12 mb-4">5. How to Manage Cookies</h2>
            <p>
              You have the right to accept or reject cookies. Most web browsers allow you to control cookies through their settings. You can:
            </p>
            <ul className="list-disc list-inside space-y-2 my-4">
              <li>Accept or reject all cookies</li>
              <li>Delete existing cookies</li>
              <li>Set your browser to notify you when a cookie is set</li>
              <li>Block third-party cookies</li>
            </ul>
            <p>
              Instructions for managing cookies in popular browsers:
            </p>
            <ul className="list-disc list-inside space-y-2 my-4">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b2-6d41e6d61d50" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Microsoft Edge</a></li>
            </ul>
            <p>
                You can also manage your preferences at any time by clicking the
                &ldquo;Cookie Settings&rdquo; link in our footer or clearing your browser cookies, which
                will cause our consent banner to reappear on your next visit.
            </p>
            <p>
              Please note that if you disable strictly necessary cookies, some parts of our website may not function correctly (for example, the contact form may not submit, or you may not be able to log in to your account).
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-heading text-2xl text-primary mt-12 mb-4">6. Updates to This Policy</h2>
            <p>
                We may update this Cookie Policy from time to time to reflect changes in the cookies
                we use or for other operational, legal, or regulatory reasons. When we make material
                changes, we will notify you by updating the &ldquo;Last updated&rdquo; date at the top
                of this page and, where appropriate, by displaying a prominent notice on our website.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-heading text-2xl text-primary mt-12 mb-4">7. Contact us</h2>
            <p>If you have any questions about our use of cookies or this Cookie Policy, please contact us:</p>
            <address className="not-italic my-4 space-y-1">
              {/* Sourced from CONTACT_INFO so the address a visitor is given here
                  cannot drift from the one shown in the header, footer and on
                  the contact page. This page previously hard-coded a second
                  address, which made two different emails public at once. */}
              <p><strong>Email:</strong> <a href={`mailto:${CONTACT_INFO.email}`} className="text-gold hover:underline">{CONTACT_INFO.email}</a></p>
              <p><strong>Address:</strong> {REGISTERED_OFFICE}</p>
              <p><strong>Company No:</strong> {COMPANY_NUMBER}</p>
            </address>
          </Reveal>
        </div>
      </section>
    </>
  );
}
