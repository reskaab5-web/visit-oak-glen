"use client";

import { useState, useRef } from "react";
import { useRouter }        from "next/navigation";
import { Search, X }        from "lucide-react";

interface SearchBarProps {
  /** Placeholder text inside the input */
  placeholder?: string;
  /** Default query value (e.g. pre-filled from URL params) */
  defaultValue?: string;
  /** Visual variant — "hero" renders larger for homepage embedding */
  variant?: "default" | "hero";
  /** Called with the trimmed query string after form submission */
  onSearch?: (query: string) => void;
}

export function SearchBar({
  placeholder  = "Search businesses, orchards, cafés…",
  defaultValue = "",
  variant      = "default",
  onSearch,
}: SearchBarProps) {
  const [query, setQuery]   = useState(defaultValue);
  const inputRef            = useRef<HTMLInputElement>(null);
  const router              = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    onSearch?.(trimmed);
    router.push(`/directory?q=${encodeURIComponent(trimmed)}`);
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const isHero = variant === "hero";

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Search Oak Glen businesses"
      className={[
        "flex items-center w-full overflow-hidden",
        "bg-parchment border border-parchment-muted",
        "shadow-card focus-within:shadow-card-hover",
        "focus-within:border-forest-light",
        "transition-all duration-slow ease-premium",
        isHero ? "rounded-xl" : "rounded-md",
      ].join(" ")}
    >
      {/* Search icon */}
      <div
        className={[
          "flex items-center justify-center flex-shrink-0 text-oak-fog",
          isHero ? "pl-5 pr-2" : "pl-4 pr-2",
        ].join(" ")}
        aria-hidden="true"
      >
        <Search size={isHero ? 20 : 17} strokeWidth={1.75} />
      </div>

      {/* Input */}
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-label="Search query"
        autoComplete="off"
        className={[
          "flex-1 bg-transparent font-sans text-oak-charcoal placeholder:text-oak-fog",
          "focus:outline-none",
          isHero ? "text-body-lg py-4 px-2" : "text-body-md py-2.5 px-2",
        ].join(" ")}
      />

      {/* Clear button */}
      {query.length > 0 && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="flex-shrink-0 p-2 text-oak-fog hover:text-oak-stone transition-colors duration-200"
        >
          <X size={16} aria-hidden="true" />
        </button>
      )}

      {/* Submit button */}
      <button
        type="submit"
        aria-label="Submit search"
        className={[
          "flex-shrink-0 font-sans text-label uppercase tracking-widest",
          "bg-forest-deep hover:bg-forest-mid text-parchment",
          "transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvest-gold focus-visible:ring-inset",
          isHero
            ? "px-7 py-4 text-[11px] rounded-r-xl"
            : "px-5 py-2.5 text-[10px] rounded-r-md",
        ].join(" ")}
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
