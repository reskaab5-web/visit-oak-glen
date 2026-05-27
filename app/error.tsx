"use client";

/**
 * Global error boundary — must be a Client Component.
 * Catches unhandled errors thrown by Server Components within a route segment.
 *
 * `reset` re-renders the segment from scratch — worth trying before
 * asking the user to navigate away.
 *
 * Lives at app/ root so it only inherits app/layout.tsx —
 * Header and Footer are included directly.
 */

import { useEffect }  from "react";
import Link           from "next/link";
import { Header }     from "@/components/layout/Header";
import { Footer }     from "@/components/layout/Footer";
import { AlertTriangle, RotateCcw, ArrowLeft } from "lucide-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log to your error-monitoring service here (e.g. Sentry)
    console.error("[app/error]", error);
  }, [error]);

  return (
    <>
      <Header />

      <main className="min-h-[70vh] bg-surface flex items-center justify-center px-4 py-24">
        <div className="max-w-lg w-full text-center space-y-8">

          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-accent-pale border border-brand-accent/20 mx-auto">
            <AlertTriangle size={28} className="text-brand-accent-dark" aria-hidden="true" />
          </div>

          {/* Copy */}
          <div className="space-y-3">
            <h1 className="font-serif text-heading-lg text-content-strong">
              Something went wrong
            </h1>
            <p className="font-sans text-body-md text-content-base leading-relaxed max-w-sm mx-auto">
              An unexpected error occurred. This has been logged. You can try again — it may resolve on its own.
            </p>
            {/* Show digest in development for easier debugging */}
            {error.digest && (
              <p className="font-sans text-body-sm text-content-subtle font-mono">
                Error ID: {error.digest}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="
                inline-flex items-center gap-2 px-6 py-3 rounded-md
                bg-brand-primary text-surface font-sans text-body-sm font-[500]
                hover:bg-brand-primary-mid transition-colors duration-200
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent
              "
            >
              <RotateCcw size={15} aria-hidden="true" />
              Try again
            </button>
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
