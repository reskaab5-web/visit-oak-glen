/**
 * GoogleMapEmbed
 *
 * Renders a Google Maps Embed API v1 iframe for a business location.
 * Requires NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to be set in your environment.
 *
 * The embed resolves the pin directly from Google's index — matching the
 * business's Google Business Profile — so it stays accurate even if the
 * business updates their GBP location without telling you.
 *
 * Usage:
 *   <GoogleMapEmbed
 *     businessName="Mom's Country Orchards"
 *     address="38695 Oak Glen Road, Oak Glen, CA 92399"
 *   />
 */

interface GoogleMapEmbedProps {
  /** The business's full name — used to find the GBP pin */
  businessName: string;
  /** Formatted street address including city, state, zip */
  address: string;
  /** iframe height in pixels. Default: 300 */
  height?: number;
  /** Optional additional class names for the wrapper div */
  className?: string;
}

export function GoogleMapEmbed({
  businessName,
  address,
  height = 300,
  className,
}: GoogleMapEmbedProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Silently render nothing if the key is not configured yet.
  // The address "Get directions" link still works as a fallback.
  if (!apiKey) return null;

  // Query by name + address so Google finds the exact GBP listing.
  const query = encodeURIComponent(`${businessName}, ${address}`);
  const src   = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${query}&zoom=15`;

  return (
    <div
      className={[
        "rounded-lg overflow-hidden border border-surface-muted shadow-card bg-surface-muted",
        className ?? "",
      ].join(" ")}
    >
      <iframe
        src={src}
        width="100%"
        height={height}
        style={{ border: 0, display: "block" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map showing the location of ${businessName}`}
        aria-label={`Google Map for ${businessName} at ${address}`}
      />
    </div>
  );
}
