"use client";

/**
 * Global error boundary of last resort.
 * Catches errors thrown inside app/layout.tsx itself — rare, but catastrophic
 * without this file (Next.js shows a blank white page).
 *
 * Must render its own <html> and <body> because the root layout is broken.
 * Keep this self-contained — no imports from components that might also fail.
 */

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("[app/global-error]", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, -apple-system, sans-serif",
          backgroundColor: "#F5F0E8",
          color: "#2C2416",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "480px" }}>
          <p style={{ fontSize: "4rem", lineHeight: 1, color: "#EEF4EE", margin: "0 0 1rem" }}>
            ⚠
          </p>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "0.75rem" }}>
            Something went wrong
          </h1>
          <p style={{ color: "#5C5040", lineHeight: 1.6, marginBottom: "2rem" }}>
            A critical error occurred. Please try again — if the problem persists,
            contact us directly.
          </p>
          {error.digest && (
            <p style={{ fontSize: "0.75rem", color: "#8C7E6A", fontFamily: "monospace", marginBottom: "1.5rem" }}>
              Error ID: {error.digest}
            </p>
          )}
          <button
            type="button"
            onClick={reset}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.375rem",
              backgroundColor: "#1A2E1A",
              color: "#F5F0E8",
              border: "none",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
