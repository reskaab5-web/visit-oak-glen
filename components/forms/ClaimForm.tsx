"use client";

/**
 * ClaimForm
 *
 * Interactive form for business owners to request a new listing or
 * update an existing one in the Oak Glen Directory.
 *
 * States: idle → submitting → success | server-error
 *
 * Posts to /api/claim, which forwards to GHL via GHL_CLAIM_WEBHOOK_URL.
 */

import {
  useState,
  useId,
  type FormEvent,
  type ChangeEvent,
} from "react";
import Link              from "next/link";
import { ArrowRight, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

// ─── Category options ─────────────────────────────────────────────────────────

const CATEGORIES = [
  { value: "",              label: "Select a category…"       },
  { value: "farms",         label: "Farms & Orchards"         },
  { value: "restaurants",   label: "Restaurants & Cafés"      },
  { value: "cider-houses",  label: "Cider Houses & Wineries"  },
  { value: "shops",         label: "Shops & Stores"           },
  { value: "accommodation", label: "Accommodation & Lodging"  },
  { value: "entertainment", label: "Entertainment & Activities"},
  { value: "weddings",      label: "Weddings & Private Events"},
  { value: "education",     label: "Education & Museums"      },
  { value: "other",         label: "Other"                    },
] as const;

// ─── Request type ─────────────────────────────────────────────────────────────

type RequestType = "new" | "update";

// ─── Form state ───────────────────────────────────────────────────────────────

interface FormFields {
  requestType:  RequestType;
  businessName: string;
  contactName:  string;
  email:        string;
  phone:        string;
  category:     string;
  website:      string;
  message:      string;
}

const INITIAL: FormFields = {
  requestType:  "new",
  businessName: "",
  contactName:  "",
  email:        "",
  phone:        "",
  category:     "",
  website:      "",
  message:      "",
};

// ─── Validation ───────────────────────────────────────────────────────────────

type Errors = Partial<Record<keyof FormFields, string>>;

function validate(fields: FormFields): Errors {
  const errors: Errors = {};

  if (!fields.businessName.trim()) {
    errors.businessName = "Business name is required.";
  }
  if (!fields.contactName.trim()) {
    errors.contactName = "Your name is required.";
  }
  if (!fields.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!fields.category) {
    errors.category = "Please select a category.";
  }

  return errors;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface FieldProps {
  id:          string;
  label:       string;
  required?:   boolean;
  error?:      string;
  hint?:       string;
  children:    React.ReactNode;
}

function Field({ id, label, required, error, hint, children }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-sans text-body-sm font-[500] text-content-strong mb-1.5"
      >
        {label}
        {required && (
          <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>
        )}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 font-sans text-[12px] text-red-600" role="alert">
          <AlertCircle size={12} aria-hidden="true" />
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="mt-1.5 font-sans text-[12px] text-content-subtle">{hint}</p>
      )}
    </div>
  );
}

const inputClass = [
  "w-full bg-surface-warm border border-surface-muted rounded-md",
  "px-4 py-2.5 font-sans text-body-sm text-content-strong placeholder:text-content-subtle",
  "focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent",
  "transition-all duration-200 min-h-[44px]",
].join(" ");

const inputErrorClass = inputClass.replace(
  "border-surface-muted",
  "border-red-400 bg-red-50/40",
);

// ─── ClaimForm ────────────────────────────────────────────────────────────────

export function ClaimForm() {
  const uid     = useId();
  const id      = (key: string) => `${uid}-${key}`;

  const [fields,       setFields]      = useState<FormFields>(INITIAL);
  const [errors,       setErrors]      = useState<Errors>({});
  const [submitting,   setSubmitting]  = useState(false);
  const [submitted,    setSubmitted]   = useState(false);
  const [serverError,  setServerError] = useState<string | null>(null);

  const set = (key: keyof FormFields) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);

    const errs = validate(fields);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstKey = Object.keys(errs)[0] as keyof FormFields;
      document.getElementById(id(firstKey))?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/claim", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(fields),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(data.error ?? `Server responded with ${res.status}`);
      }
      setSubmitted(true);
    } catch (err: unknown) {
      setServerError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or email us directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success state ──────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center py-16 px-6">
        <div className="w-16 h-16 rounded-full bg-brand-primary-pale flex items-center justify-center mb-5">
          <CheckCircle2
            size={28}
            className="text-brand-primary-mid"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </div>
        <h2 className="font-serif text-heading-md text-content-strong mb-3">
          Request received — thank you!
        </h2>
        <p className="font-sans text-body-md text-content-base max-w-sm leading-relaxed mb-8">
          We'll review your submission for{" "}
          <strong className="text-content-strong font-[500]">
            {fields.businessName}
          </strong>{" "}
          and be in touch at{" "}
          <span className="text-brand-primary-mid">{fields.email}</span> within a few
          business days.
        </p>
        <Link
          href="/directory"
          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md bg-brand-primary hover:bg-brand-primary-mid text-label text-surface uppercase tracking-widest transition-all duration-200 hover:-translate-y-px min-h-[48px]"
        >
          Browse the directory
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Business listing request">

      {/* Request type toggle */}
      <fieldset className="mb-8">
        <legend className="block font-sans text-body-sm font-[500] text-content-strong mb-3">
          I want to…
        </legend>
        <div className="flex gap-3 flex-wrap">
          {(["new", "update"] as const).map((type) => (
            <label
              key={type}
              className={[
                "flex items-center gap-2.5 px-4 py-2.5 rounded-md border cursor-pointer transition-all duration-200 min-h-[44px]",
                fields.requestType === type
                  ? "bg-brand-primary border-brand-primary text-surface"
                  : "bg-surface-warm border-surface-muted text-content-base hover:border-brand-primary-light",
              ].join(" ")}
            >
              <input
                type="radio"
                name="requestType"
                value={type}
                checked={fields.requestType === type}
                onChange={set("requestType")}
                className="sr-only"
                aria-label={
                  type === "new"
                    ? "Add a new listing"
                    : "Update an existing listing"
                }
              />
              <span className="font-sans text-body-sm font-[500]">
                {type === "new"
                  ? "Add a new listing"
                  : "Update an existing listing"}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Business details */}
      <div className="space-y-5 mb-8">
        <h2 className="font-sans text-label text-content-subtle uppercase tracking-widest pb-1 border-b border-surface-muted">
          Business details
        </h2>

        <Field
          id={id("businessName")}
          label="Business name"
          required
          error={errors.businessName}
        >
          <input
            id={id("businessName")}
            type="text"
            value={fields.businessName}
            onChange={set("businessName")}
            placeholder="e.g. Snow-Line Orchards"
            autoComplete="organization"
            className={errors.businessName ? inputErrorClass : inputClass}
            aria-describedby={errors.businessName ? `${id("businessName")}-err` : undefined}
            aria-invalid={!!errors.businessName}
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field
            id={id("category")}
            label="Category"
            required
            error={errors.category}
          >
            <div className="relative">
              <select
                id={id("category")}
                value={fields.category}
                onChange={set("category")}
                className={[
                  errors.category ? inputErrorClass : inputClass,
                  "appearance-none pr-10 cursor-pointer",
                ].join(" ")}
                aria-invalid={!!errors.category}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value} disabled={c.value === ""}>
                    {c.label}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-content-subtle"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </Field>

          <Field
            id={id("website")}
            label="Website"
            hint="Optional — include https://"
          >
            <input
              id={id("website")}
              type="url"
              value={fields.website}
              onChange={set("website")}
              placeholder="https://yourbusiness.com"
              autoComplete="url"
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      {/* Contact details */}
      <div className="space-y-5 mb-8">
        <h2 className="font-sans text-label text-content-subtle uppercase tracking-widest pb-1 border-b border-surface-muted">
          Your contact details
        </h2>

        <Field
          id={id("contactName")}
          label="Your name"
          required
          error={errors.contactName}
        >
          <input
            id={id("contactName")}
            type="text"
            value={fields.contactName}
            onChange={set("contactName")}
            placeholder="Jane Smith"
            autoComplete="name"
            className={errors.contactName ? inputErrorClass : inputClass}
            aria-invalid={!!errors.contactName}
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field
            id={id("email")}
            label="Email address"
            required
            error={errors.email}
          >
            <input
              id={id("email")}
              type="email"
              value={fields.email}
              onChange={set("email")}
              placeholder="you@example.com"
              autoComplete="email"
              className={errors.email ? inputErrorClass : inputClass}
              aria-invalid={!!errors.email}
            />
          </Field>

          <Field
            id={id("phone")}
            label="Phone number"
            hint="Optional"
          >
            <input
              id={id("phone")}
              type="tel"
              value={fields.phone}
              onChange={set("phone")}
              placeholder="(909) 555-0100"
              autoComplete="tel"
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-5 mb-8">
        <h2 className="font-sans text-label text-content-subtle uppercase tracking-widest pb-1 border-b border-surface-muted">
          Additional details
        </h2>

        <Field
          id={id("message")}
          label="Tell us about your business"
          hint="Hours, a short description, what makes you unique — anything that helps us build an accurate listing."
        >
          <textarea
            id={id("message")}
            value={fields.message}
            onChange={set("message")}
            rows={5}
            placeholder="We're a family-run orchard offering u-pick apples every autumn…"
            className={[
              inputClass,
              "resize-y min-h-[120px]",
            ].join(" ")}
          />
        </Field>
      </div>

      {/* Server error */}
      {serverError && (
        <div role="alert" className="rounded-md bg-red-50 border border-red-200 px-4 py-3">
          <p className="font-sans text-body-sm text-red-700">{serverError}</p>
        </div>
      )}

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-md bg-brand-primary hover:bg-brand-primary-mid disabled:opacity-60 disabled:cursor-not-allowed text-label text-surface uppercase tracking-widest transition-all duration-200 hover:-translate-y-px disabled:hover:translate-y-0 shadow-card min-h-[52px]"
        >
          {submitting ? (
            <>
              <Loader2 size={15} className="animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Submit request
              <ArrowRight size={14} aria-hidden="true" />
            </>
          )}
        </button>
        <p className="font-sans text-[12px] text-content-subtle">
          Fields marked <span className="text-red-500">*</span> are required
        </p>
      </div>

    </form>
  );
}

export default ClaimForm;
