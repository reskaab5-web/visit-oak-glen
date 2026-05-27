"use client";

/**
 * ContactForm
 *
 * General-purpose enquiry form. On submit it POSTs to /api/contact,
 * which should forward the payload to GHL or send a transactional email.
 *
 * TODO: create app/api/contact/route.ts and wire to GHL webhook /
 * email provider before going live.
 */

import { useState } from "react";
import { Loader2, Send, CheckCircle2 } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Subject =
  | ""
  | "general"
  | "listing"
  | "correction"
  | "partnership"
  | "other";

interface FormFields {
  name:    string;
  email:   string;
  subject: Subject;
  message: string;
}

type Errors = Partial<Record<keyof FormFields, string>>;

// ─── Constants ────────────────────────────────────────────────────────────────

const SUBJECTS: { value: Subject; label: string }[] = [
  { value: "general",     label: "General inquiry"              },
  { value: "listing",     label: "Business listing question"    },
  { value: "correction",  label: "Report incorrect information" },
  { value: "partnership", label: "Partnership or advertising"   },
  { value: "other",       label: "Other"                        },
];

const INITIAL: FormFields = {
  name:    "",
  email:   "",
  subject: "",
  message: "",
};

// ─── Shared style tokens ──────────────────────────────────────────────────────

const inputBase =
  "w-full rounded-md border px-4 py-3 font-sans text-body-md " +
  "text-content-strong placeholder:text-content-subtle/60 " +
  "bg-white transition-colors duration-200 " +
  "focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent";

const inputDefault = `${inputBase} border-surface-muted hover:border-content-subtle/40`;
const inputError   = `${inputBase} border-red-400 bg-red-50/40`;

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(f: FormFields): Errors {
  const e: Errors = {};
  if (!f.name.trim())                           e.name    = "Your name is required.";
  if (!f.email.trim())                          e.email   = "Your email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
                                                e.email   = "Please enter a valid email address.";
  if (!f.subject)                               e.subject = "Please choose a subject.";
  if (!f.message.trim())                        e.message = "A message is required.";
  else if (f.message.trim().length < 10)        e.message = "Message must be at least 10 characters.";
  return e;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface FieldProps {
  id:       string;
  label:    string;
  error?:   string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({ id, label, error, required = true, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block font-sans text-body-sm font-[500] text-content-strong"
      >
        {label}
        {required && <span className="ml-0.5 text-brand-accent" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="font-sans text-body-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ContactForm() {
  const [fields,    setFields]    = useState<FormFields>(INITIAL);
  const [errors,    setErrors]    = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]  = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  function update(key: keyof FormFields, value: string) {
    setFields(prev => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);

    const validation = validate(fields);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      // Move focus to the first error field for accessibility
      const firstKey = Object.keys(validation)[0];
      document.getElementById(firstKey)?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
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
          : "Something went wrong. Please try emailing us directly."
      );
    } finally {
      setSubmitting(false);
    }
  }

  // ── Success state ──────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div className="rounded-xl bg-brand-primary-pale border border-brand-primary-light/30 p-8 text-center space-y-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary-light/20">
          <CheckCircle2 size={24} className="text-brand-primary-mid" aria-hidden="true" />
        </div>
        <h2 className="font-serif text-heading-md text-content-strong">
          Message received
        </h2>
        <p className="font-sans text-body-md text-content-base max-w-sm mx-auto leading-relaxed">
          Thanks for reaching out, {fields.name.split(" ")[0]}. We'll get back to you at{" "}
          <span className="font-[500] text-content-strong">{fields.email}</span> within
          one to two business days.
        </p>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="space-y-6"
    >

      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field id="name" label="Your name" error={errors.name}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Smith"
            value={fields.name}
            onChange={e => update("name", e.target.value)}
            className={errors.name ? inputError : inputDefault}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
        </Field>

        <Field id="email" label="Email address" error={errors.email}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="jane@example.com"
            value={fields.email}
            onChange={e => update("email", e.target.value)}
            className={errors.email ? inputError : inputDefault}
            aria-invalid={!!errors.email}
          />
        </Field>
      </div>

      {/* Subject */}
      <Field id="subject" label="Subject" error={errors.subject}>
        <select
          id="subject"
          value={fields.subject}
          onChange={e => update("subject", e.target.value)}
          className={`${errors.subject ? inputError : inputDefault} cursor-pointer`}
          aria-invalid={!!errors.subject}
        >
          <option value="" disabled>Select a subject…</option>
          {SUBJECTS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </Field>

      {/* Message */}
      <Field id="message" label="Message" error={errors.message}>
        <textarea
          id="message"
          rows={6}
          placeholder="Tell us what's on your mind…"
          value={fields.message}
          onChange={e => update("message", e.target.value)}
          className={`${errors.message ? inputError : inputDefault} resize-y min-h-[120px]`}
          aria-invalid={!!errors.message}
        />
      </Field>

      {/* Server error */}
      {serverError && (
        <div role="alert" className="rounded-md bg-red-50 border border-red-200 px-4 py-3">
          <p className="font-sans text-body-sm text-red-700">{serverError}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="
          inline-flex items-center gap-2 px-8 py-3.5 rounded-md font-sans text-body-md font-[500]
          bg-brand-primary text-surface
          hover:bg-brand-primary-mid
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent
          disabled:opacity-60 disabled:cursor-not-allowed
          transition-colors duration-200
        "
      >
        {submitting ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send size={16} aria-hidden="true" />
            Send message
          </>
        )}
      </button>

      <p className="font-sans text-body-sm text-content-subtle">
        * Required fields. We'll never share your contact details.
      </p>

    </form>
  );
}
