import type { Metadata } from "next";
import { AnimatedSectionReveal } from "@/components/motion/AnimatedHeroContent";
import { siteConfig }            from "@/lib/config/site";
import { buildWebPageSchema }    from "@/lib/schema/builders";
import { JsonLd }                from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title:       `Privacy Policy — ${siteConfig.name}`,
  description: `Privacy policy for the Oak Glen Directory at ${siteConfig.url}.`,
  alternates:  { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={[
        buildWebPageSchema(siteConfig, "/privacy", `Privacy Policy — ${siteConfig.name}`, "Privacy policy for the Oak Glen Directory."),
      ]} />
      <main>
        <section className="bg-brand-primary py-20 px-6 lg:px-8">
          <div className="max-w-site mx-auto">
            <p className="text-label text-brand-accent uppercase tracking-[0.22em] mb-4">Legal</p>
            <h1 className="font-serif text-display-lg text-surface leading-tight">Privacy Policy</h1>
            <p className="mt-4 text-body-md text-surface/70">Last updated: May 2026</p>
          </div>
        </section>

        <AnimatedSectionReveal>
        <section className="py-section px-6 lg:px-8 bg-surface">
          <div className="max-w-3xl mx-auto prose-oak">
            <div className="space-y-10 font-sans text-body-md text-content-base leading-relaxed">

              <div>
                <h2 className="font-serif text-heading-lg text-content-strong mb-4">Overview</h2>
                <p>
                  The Oak Glen Directory (<strong>{siteConfig.url}</strong>) is operated by Local Launch Media. This policy describes what information we collect when you use the directory, how we use it, and your rights regarding that information. We take privacy seriously and aim to collect only what&rsquo;s necessary to operate the site.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-heading-lg text-content-strong mb-4">Information we collect</h2>
                <p className="mb-4"><strong>Information you provide.</strong> When you submit a business listing claim or use the contact form, we collect the name, email address, business name, and any other information you choose to include. This information is used solely to process your request and respond to you.</p>
                <p className="mb-4"><strong>Automatically collected information.</strong> Like most websites, our hosting provider and analytics tools may collect standard server log data including your IP address, browser type, referring pages, and pages visited. We use this data in aggregate to understand how the site is used and to improve it.</p>
                <p><strong>Cookies.</strong> We may use cookies or similar technologies to remember your preferences (such as search filters). We do not use advertising cookies or share cookie data with third parties for advertising purposes.</p>
              </div>

              <div>
                <h2 className="font-serif text-heading-lg text-content-strong mb-4">How we use your information</h2>
                <p className="mb-3">We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li>Process and respond to business listing submissions</li>
                  <li>Respond to contact and press inquiries</li>
                  <li>Improve the directory&rsquo;s content and functionality</li>
                  <li>Send operational communications related to your submission (not marketing)</li>
                </ul>
                <p className="mt-4">We do not sell, rent, or share your personal information with third parties for their marketing purposes.</p>
              </div>

              <div>
                <h2 className="font-serif text-heading-lg text-content-strong mb-4">Third-party services</h2>
                <p className="mb-3">The directory uses the following third-party services, each of which has its own privacy policy:</p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li><strong>Google Maps</strong> — embedded maps on business listing pages and the /map page</li>
                  <li><strong>Vercel</strong> — website hosting and deployment infrastructure</li>
                  <li><strong>GoHighLevel</strong> — processes business listing and contact form submissions</li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-heading-lg text-content-strong mb-4">Data retention</h2>
                <p>
                  Form submission data is retained only as long as needed to process your request or maintain your business listing. You may request deletion of your submitted information at any time by contacting us.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-heading-lg text-content-strong mb-4">Your rights</h2>
                <p className="mb-4">
                  Depending on your location, you may have rights to access, correct, or delete personal information we hold about you. To exercise these rights, email us at{" "}
                  <a href={`mailto:${siteConfig.contactEmail}`} className="text-brand-primary-mid hover:text-brand-primary underline underline-offset-2">
                    {siteConfig.contactEmail}
                  </a>.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-heading-lg text-content-strong mb-4">Changes to this policy</h2>
                <p>
                  We may update this policy from time to time. When we do, we&rsquo;ll update the &ldquo;last updated&rdquo; date at the top of this page. Continued use of the directory after any changes constitutes acceptance of the updated policy.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-heading-lg text-content-strong mb-4">Contact</h2>
                <p>
                  Questions about this policy? Email{" "}
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
