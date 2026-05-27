"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Menu, X, Leaf, Search } from "lucide-react";

// ─── Nav link definitions ─────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Directory",      href: "/directory"   },
  { label: "Categories",     href: "/categories"  },
  { label: "Map",            href: "/map"         },
  { label: "About Oak Glen", href: "/about"       },
] as const;

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvest-gold rounded-md"
      aria-label="Oak Glen Directory — return to home"
    >
      <div className="w-8 h-8 rounded-md bg-harvest-gold flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
        <Leaf size={16} className="text-earth-bark" strokeWidth={2.5} aria-hidden="true" />
      </div>
      <div className="flex flex-col leading-none select-none">
        <span className="font-serif text-parchment text-lg tracking-tight">
          Oak Glen
        </span>
        <span className="text-label text-harvest-warm uppercase tracking-[0.15em]">
          Directory
        </span>
      </div>
    </Link>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen]   = useState(false);
  const [isScrolled, setIsScrolled]   = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Scroll-aware shadow / blur
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll(); // set initial state
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full",
        "transition-all duration-slow ease-premium",
        isScrolled
          ? "bg-forest-deep/[0.97] backdrop-blur-md shadow-modal"
          : "bg-forest-deep",
      ].join(" ")}
    >
      <div className="max-w-site mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* ── Logo ── */}
          <Logo />

          {/* ── Desktop navigation ── */}
          <nav
            className="hidden lg:flex items-center gap-0.5"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "px-4 py-2 rounded-md font-sans text-body-sm",
                    "transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvest-gold",
                    isActive
                      ? "text-parchment bg-forest-mid/50"
                      : "text-parchment/75 hover:text-parchment hover:bg-forest-mid/35",
                  ].join(" ")}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop actions ── */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              aria-label="Open search"
              className="w-9 h-9 rounded-md flex items-center justify-center text-parchment/70 hover:text-parchment hover:bg-forest-mid/35 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvest-gold"
            >
              <Search size={18} aria-hidden="true" />
            </button>

            <Link
              href="/directory"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-harvest-gold hover:bg-harvest-amber text-label text-earth-bark uppercase tracking-widest transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvest-gold focus-visible:ring-offset-2 focus-visible:ring-offset-forest-deep"
            >
              Explore
            </Link>
          </div>

          {/* ── Mobile: search + hamburger ── */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              type="button"
              aria-label="Open search"
              className="w-9 h-9 rounded-md flex items-center justify-center text-parchment/70 hover:text-parchment hover:bg-forest-mid/35 transition-all duration-200"
            >
              <Search size={18} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              className="w-9 h-9 rounded-md flex items-center justify-center text-parchment/80 hover:text-parchment hover:bg-forest-mid/35 transition-all duration-200"
            >
              {isMenuOpen ? (
                <X size={20} aria-hidden="true" />
              ) : (
                <Menu size={20} aria-hidden="true" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile menu panel (max-h animation) ── */}
      <div
        id="mobile-nav"
        role="region"
        aria-label="Mobile navigation"
        className={[
          "lg:hidden overflow-hidden",
          "transition-all duration-slow ease-premium",
          isMenuOpen
            ? "max-h-[28rem] border-t border-forest-mid/40"
            : "max-h-0",
        ].join(" ")}
      >
        <nav className="px-6 py-4 space-y-1">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "block px-4 py-3 rounded-md font-sans text-body-md",
                  "transition-all duration-200",
                  isActive
                    ? "text-parchment bg-forest-mid/50"
                    : "text-parchment/80 hover:text-parchment hover:bg-forest-mid/35",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}

          <div className="pt-3 pb-1 border-t border-forest-mid/40">
            <Link
              href="/directory"
              className="block text-center px-5 py-3 rounded-md bg-harvest-gold hover:bg-harvest-amber text-label text-earth-bark uppercase tracking-widest transition-all duration-200"
            >
              Explore Directory
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
