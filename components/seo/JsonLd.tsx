/**
 * components/seo/JsonLd.tsx
 *
 * Server component that renders one or more JSON-LD structured data blocks
 * into a <script type="application/ld+json"> tag.
 *
 * Usage — single schema:
 *   <JsonLd data={buildWebSiteSchema(siteConfig)} />
 *
 * Usage — multiple schemas on one page (preferred — one round-trip):
 *   <JsonLd data={[
 *     buildWebSiteSchema(siteConfig),
 *     buildOrganizationSchema(siteConfig),
 *     buildItemListSchema(businesses, "/directory", siteConfig),
 *   ]} />
 *
 * Placement: render inside <main> or directly in the page component —
 * Next.js hoists <script> tags out of RSC payloads automatically.
 */

// Use a loose object type — JSON-LD values can be strings, numbers, arrays,
// or nested objects. Using Record<string, unknown> keeps the call sites
// clean without resorting to `any`.
type JsonLdValue = Record<string, unknown>;

interface JsonLdProps {
  data: JsonLdValue | JsonLdValue[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
