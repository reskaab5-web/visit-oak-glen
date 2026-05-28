import type { Metadata } from "next";
import { AnimatedSectionReveal } from "@/components/motion/AnimatedHeroContent";
import { siteConfig }            from "@/lib/config/site";
import { buildWebPageSchema }    from "@/lib/schema/builders";
import { JsonLd }                from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title:       `Terms of Use — ${siteConfig.name}`,
  description: `Terms of use for the Oak Glen Directory at ${siteConfig.url}.`,
  alternates:  { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <JsonLd data={[
        buildWebPageSchema(siteConfig, "/terms", `Terms of Use — ${siteConfig.name}`, "Terms of use for the Oak Glen Directory."),
      ]} />
      <main>
        <section className="bg-brand-primary py-20 px-6 lg:px-8">
          <div className="max-w-site mx-auto">
            <p className="text-label text-brand-accent uppercase tracking-[0.22em] mb-4">Legal</p>
            <h1 className="font-serif text-display-lg text-surface leading-tight">Terms of Use</h1>
            <p className="mt-4 text-body-md text-surface/70">Last updated: May 2026</p>
          </div>
        </section>

        <AnimatedSectionReveal>
        <section className="py-section px-6 lg:px-8 bg-surface">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-10 font-sans text-body-md text-content-base leading-relaxed">

              <div>
                <h2 className="font-serif text-heading-lg text-content-strong mb-4">Acceptance of terms</h2>
                <p>
                  By accessing or using the Oak Glen Directory at <strong>{siteConfig.url}</strong> (the &ldquo;Directory&rdquo;), you agree to be bound by these Terms of Use. If you do not agree, please do not use the Directory. The Directory is operated by Local Launch Media.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-heading-lg text-content-strong mb-4">Use of the Directory</h2>
                <p className="mb-4">The Directory is provided for informational purposes to help visitors discover businesses in the Oak Glen, CA area. You may use the Directory for personal, non-commercial purposes. You may not:</p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li>Scrape, crawl, or systematically copy Directory content without permission</li>
                  <li>Use the Directory to send unsolicited communications to listed businesses</li>
                  <li>Submit false, misleading, or fraudulent business listing information</li>
                  <li>Attempt to disrupt or interfere with the operation of the Directory</li>
                  <li>Use the Directory in any way that violates applicable laws or regulations</li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-heading-lg text-content-strong mb-4">Business listings</h2>
                <p className="mb-4">
                  Businesses may submit a listing request through the Directory. By submitting a listing, you represent that:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li>The information you provide is accurate and up to date</li>
                  <li>You are authorized to submit the listing on behalf of the business</li>
                  <li>The business is located in or primarily serves the Oak Glen, CA area</li>
                </ul>
                <p className="mt-4">
                  We reserve the right to accept, reject, edit, or remove any listing at our discretion, including listings that contain inaccurate information, violate these terms, or are otherwise inappropriate.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-heading-lg text-content-strong mb-4">Intellectual property</h2>
                <p className="mb-4">
                  The Directory&rsquo;s design, code, and original content are the property of Local Launch Media. Business names, logos, descriptions, and images submitted by or on behalf of businesses remain the property of their respective owners.
                </p>
                <p>
                  If you believe content on the Directory infringes your intellectual property rights, please contact us at{" "}
                  <a href={`mailto:${siteConfig.contactEmail}`} className="text-brand-primary-mid hover:text-brand-primary underline underline-offset-2">
                    {siteConfig.contactEmail}
                  </a>.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-heading-lg text-content-strong mb-4">Accuracy of information</h2>
                <p>
                  Business information in the Directory (hours, pricing, contact details, etc.) is provided by or on behalf of the businesses and may not always be current. We make reasonable efforts to maintain accuracy but cannot guarantee that all information is up to date. Always confirm details directly with a business before visiting.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-heading-lg text-content-strong mb-4">Disclaimer of warranties</h2>
                <p>
                  The Directory is provided &ldquo;as is&rdquo; without warranties of any kind, express or implied. We do not warrant that the Directory will be error-free, uninterrupted, or free of harmful components. Your use of the Directory is at your own risk.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-heading-lg text-content-strong mb-4">Limitation of liability</h2>
                <p>
                  To the fullest extent permitted by law, Local Launch Media shall not be liable for any indirect, incidental, special, or consequential damages arising out of your use of or inability to use the Directory, even if we have been advised of the possibility of such damages.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-heading-lg text-content-strong mb-4">Changes</h2>
                <p>
                  We may update these Terms at any time. The &ldquo;last updated&rdquo; date at the top of this page reflects the most recent revision. Continued use of the Directory after changes are posted constitutes acceptance of the revised Terms.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-heading-lg text-content-strong mb-4">Governing law</h2>
                <p>
                  These Terms are governed by the laws of the State of California, without regard to its conflict of law provisions.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-heading-lg text-content-strong mb-4">Contact</h2>
                <p>
                  Questions about these Terms? Email{" "}
                  <a href={`mailto:${siteConfig.contactEmail}`} className="text-brand-primary-mid hover:text-brand-primary underline underline-offset-2">
                    {siteConfig.contactEmail}
                  </a>.
                </p>
              </div>

            </div>
          </div>
        </section>
        </AnimatedSectionReveal>
      </main>
    </>
  );
}
