/**
 * Contact formatting utilities
 *
 * Single source of truth for how phone numbers, email addresses, and
 * website URLs are formatted and linked throughout the directory.
 *
 * Rules:
 *  - Phone hrefs always use E.164 format: tel:+1XXXXXXXXXX
 *  - Website display strips protocol and trailing slash
 *  - All helpers return safe fallbacks so callers never produce empty hrefs
 */

// ─── Phone ────────────────────────────────────────────────────────────────────

/**
 * Returns a `tel:` href for a US phone number string.
 * Strips all non-digit characters and prepends the +1 country code.
 *
 * @example
 *   toTelHref("(909) 797-4249")  // "tel:+19097974249"
 *   toTelHref("")                // ""  (empty → no link)
 */
export function toTelHref(phone: string): string {
  const digits = phone.replace(/\D/g, "")
  if (!digits) return ""
  return `tel:+1${digits}`
}

/**
 * Returns true if a phone string is non-empty and contains enough digits
 * to be considered a valid US number (10 digits).
 */
export function hasPhone(phone: string): boolean {
  return phone.replace(/\D/g, "").length === 10
}

// ─── Email ────────────────────────────────────────────────────────────────────

/**
 * Returns a `mailto:` href.
 *
 * @example
 *   toMailtoHref("hello@example.com")  // "mailto:hello@example.com"
 *   toMailtoHref("")                   // ""
 */
export function toMailtoHref(email: string): string {
  return email ? `mailto:${email.trim()}` : ""
}

// ─── Website ─────────────────────────────────────────────────────────────────

/**
 * Returns the website URL stripped of its protocol and trailing slash,
 * suitable for display in a link label.
 *
 * @example
 *   displayUrl("https://momsoakglen.com/")  // "momsoakglen.com"
 *   displayUrl("http://example.com")        // "example.com"
 */
export function displayUrl(url: string): string {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "")
}

/**
 * Ensures a website URL has a protocol prefix so it works as an href.
 * Passes through URLs that already have one.
 *
 * @example
 *   normalizeUrl("momsoakglen.com")        // "https://momsoakglen.com"
 *   normalizeUrl("https://example.com")   // "https://example.com"
 */
export function normalizeUrl(url: string): string {
  if (!url) return ""
  return /^https?:\/\//i.test(url) ? url : `https://${url}`
}
