import Link from "next/link";
import {
  Apple,
  MapPin,
  Mail,
  Instagram,
  Facebook,
  ArrowUpRight,
} from "lucide-react";

// ─── Nav columns ──────────────────────────────────────────────────────────────

const NAV_COLUMNS = [
  {
    heading: "Directory",
    links: [
      { label: "All Listings",       href: "/directory"                   },
      { label: "Farms & Orchards",   href: "/categories/farms"            },
      { label: "Cider Houses",       href: "/categories/cider-houses"     },
      { label: "Restaurants & Cafés",href: "/categories/restaurants"      },
      { label: "Entertainment",      href: "/categories/entertainment"    },
      { label: "Accommodation",      href: "/categories/accommodation"    },
      { label: "Weddings & Events",  href: "/categories/weddings"         },
    ],
  },
  {
    heading: "Explore",
    links: [
      { label: "About Oak Glen",  href: "/about"        },
      { label: "Events",          href: "/events"       },
      { label: "Plan Your Visit", href: "/plan"         },
      { label: "Getting Here",    href: "/getting-here" },
      { label: "Season Guide",    href: "/season-guide" },
    ],
  },
  {
    heading: "For Businesses",
    links: [
      { label: "List Your Business", href: "/claim"    },
      { label: "Advertise",          href: "/advertise"},
      { label: "Press Inquiries",    href: "/press"    },
      { label: "Contact Us",         href: "/contact"  },
    ],
  },
] as const;

// ─── Footer ───────────────────────────────────────────────────────────────────

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-oak-charcoal text-parchment/70" aria-label="Site footer">

      {/* ── Upper block ── */}
      <div className="max-w-site mx-auto px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo mark */}
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 mb-5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvest-gold rounded-sm"
              aria-label="Oak Glen Directory — home"
            >
              <div className="w-8 h-8 rounded-md bg-harvest-gold flex items-center justify-center flex-shrink-0 group-hover:bg-harvest-amber transition-colors duration-200">
                <Apple size={18} className="text-earth-bark" aria-hidden="true" />
              </div>
              <span className="font-serif text-heading-sm text-parchment leading-none">
                Oak Glen<br />
                <span className="font-sans text-label text-parchment/50 uppercase tracking-widest font-normal">
                  Directory
                </span>
              </span>
            </Link>

            <p className="text-body-sm leading-relaxed max-w-xs mb-6">
              A curated guide to Oak Glen's finest orchards, cideries, artisan shops, and mountain lodges.
            </p>

            {/* Location chip */}
            <div className="inline-flex items-center gap-1.5 text-label text-parchment/45 mb-7">
              <MapPin size={12} aria-hidden="true" />
              Oak Glen, CA 92399 — San Bernardino Mountains
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
                { icon: Facebook,  label: "Facebook",  href: "https://facebook.com"  },
                { icon: Mail,      label: "Email us",  href: "mailto:hello@visitoakglen.com" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-9 h-9 rounded-full border border-parchment/15 hover:border-harvest-gold/60 flex items-center justify-center text-parchment/45 hover:text-harvest-gold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvest-gold"
                >
                  <Icon size={15} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <p className="text-label text-parchment/40 uppercase tracking-widest mb-4">
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-body-sm text-parchment/60 hover:text-parchment transition-colors duration-200 inline-flex items-center gap-1 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-harvest-gold rounded-sm"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-parchment/8 mx-6 lg:mx-8" aria-hidden="true" />

      {/* ── Bottom bar ── */}
      <div className="max-w-site mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-label text-parchment/35">
        <p>© {year} Oak Glen Directory. All rights reserved.</p>
        <div className="flex items-center gap-5">
          {[
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Use",   href: "/terms"   },
            { label: "Sitemap",        href: "/sitemap.xml", external: true },
          ].map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="hover:text-parchment/60 transition-colors duration-200 inline-flex items-center gap-0.5"
            >
              {label}
              {external && <ArrowUpRight size={10} aria-hidden="true" />}
            </a>
          ))}
        </div>
      </div>

    </footer>
  );
}
