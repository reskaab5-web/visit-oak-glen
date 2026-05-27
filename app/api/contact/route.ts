import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

/**
 * POST /api/contact
 *
 * Receives contact form submissions and forwards them to GHL (GoHighLevel).
 *
 * Rate limit: 5 requests per 15 minutes per IP.
 *
 * Required env var:
 *   GHL_CONTACT_WEBHOOK_URL — the GHL workflow webhook URL for inbound contact
 *
 * TODO: Set GHL_CONTACT_WEBHOOK_URL in .env.local (and in your deployment
 * environment) before going live. Until it is set, this route returns 503
 * so the form shows a visible error rather than silently swallowing messages.
 */

// 5 submissions per 15 minutes — generous for a real user, tight for a bot
const CONTACT_LIMIT = { windowMs: 15 * 60_000, max: 5 };

interface ContactPayload {
  name:    string;
  email:   string;
  subject: string;
  message: string;
}

function isValidPayload(body: unknown): body is ContactPayload {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name    === "string" && b.name.trim().length > 0 &&
    typeof b.email   === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    typeof b.subject === "string" && b.subject.trim().length > 0 &&
    typeof b.message === "string" && b.message.trim().length >= 10
  );
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  // ── Rate limit ───────────────────────────────────────────────────────────

  const ip     = getClientIp(req);
  const limit  = rateLimit(`contact:${ip}`, CONTACT_LIMIT);

  if (!limit.allowed) {
    const retryAfterSec = Math.ceil((limit.resetAt - Date.now()) / 1000);
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes and try again." },
      {
        status: 429,
        headers: {
          "Retry-After":          String(retryAfterSec),
          "X-RateLimit-Limit":    String(CONTACT_LIMIT.max),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset":    String(Math.ceil(limit.resetAt / 1000)),
        },
      }
    );
  }

  // ── Env guard ────────────────────────────────────────────────────────────

  const webhookUrl = process.env.GHL_CONTACT_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error(
      "[/api/contact] GHL_CONTACT_WEBHOOK_URL is not set. " +
      "Configure this environment variable before going live."
    );
    return NextResponse.json(
      { error: "Contact form is not configured yet." },
      { status: 503 }
    );
  }

  // ── Parse + validate ─────────────────────────────────────────────────────

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json({ error: "Missing or invalid fields." }, { status: 422 });
  }

  // ── Forward to GHL ───────────────────────────────────────────────────────

  try {
    const ghlRes = await fetch(webhookUrl, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({
        name:    body.name,
        email:   body.email,
        subject: body.subject,
        message: body.message,
        source:  "contact-form",
      }),
    });

    if (!ghlRes.ok) {
      console.error(`[/api/contact] GHL webhook returned ${ghlRes.status}`);
      return NextResponse.json(
        { error: "Failed to forward message." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { success: true, remaining: limit.remaining },
      { status: 200 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[/api/contact] Error forwarding to GHL:", message);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
