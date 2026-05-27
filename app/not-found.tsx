import Link          from "next/link";
import { Header }    from "@/components/layout/Header";
import { Footer }    from "@/components/layout/Footer";
import { MapPin, ArrowLeft, Search } from "lucide-react";

/**
 * Global 404 — shown for any URL that doesn't match a route,
 * and when a page calls notFound() (e.g. unknown business slug).
 *
 * Lives at app/ root so it only inherits app/layout.tsx —
 * Header and Footer are included directly.
 */
export default function NotFound() {
  return (
    <>
      <Header />

      <main className="min-h-[70vh] bg-surface flex items-center justify-center px-4 py-24">
        <div className="max-w-lg w-full text-center space-y-8">

          {/* Large 404 */}
          <div className="space-y-2">
            <p className="font-serif text-[7rem] leading-none font-[400] text-brand-primary-pale select-none"
               aria-hidden="true">
              404
            </p>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary-pale -mt-8 relative z-10 mx-auto">
              <MapPin size={20} className="text-brand-primary-mid" aria-hidden="true" />
            </div>
          </div>

          {/* Copy */}
          <div className="space-y-3">
            <h1 className="font-serif text-heading-lg text-content-strong">
              This page doesn't exist
            </h1>
            <p className="font-sans text-body-md text-content-base leading-relaxed max-w-sm mx-auto">
              The listing or page you're looking for may have moved, been removed, or never existed. Let's get you back on track.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/directory"
              className="
                inline-flex items-center gap-2 px-6 py-3 rounded-md
                bg-brand-primary text-surface font-sans text-body-sm font-[500]
                hover:bg-brand-primary-mid transition-colors duration-200
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent
              "
            >
              <Search size={15} aria-hidden="true" />
              Browse the directory
            </Link>
            <Link
              href="/"
              className="
                inline-flex items-center gap-2 px-6 py-3 rounded-md
                border border-surface-muted bg-surface text-content-strong
                font-sans text-body-sm font-[500]
                hover:border-brand-primary-light hover:bg-surface-warm
                transition-colors duration-200
              "
            >
              <ArrowLeft size={15} aria-hidden="true" />
              Go home
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
