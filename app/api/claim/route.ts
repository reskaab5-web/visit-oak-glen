import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

/**
 * POST /api/claim
 *
 * Receives business listing/update requests and forwards them to GHL.
 *
 * Rate limit: 3 requests per hour per IP.
 *
 * Required env var:
 *   GHL_CLAIM_WEBHOOK_URL — the GHL workflow webhook URL for inbound claim requests
 *
 * TODO: Set GHL_CLAIM_WEBHOOK_URL in .env.local (and in your deployment
 * environment) before going live. Until it is set, this route returns 503
 * so the form shows a visible error rather than silently swallowing submissions.
 */

// 3 submissions per hour — a real business owner has no reason to exceed this
const CLAIM_LIMIT = { windowMs: 60 * 60_000, max: 3 };

interface ClaimPayload {
  requestType:  string;
  businessName: string;
  contactName:  string;
  email:        string;
  phone?:       string;
  category:     string;
  website?:     string;
  message?:     string;
}

function isValidPayload(body: unknown): body is ClaimPayload {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.requestType  === "string" && ["new", "update"].includes(b.requestType) &&
    typeof b.businessName === "string" && b.businessName.trim().length > 0 &&
    typeof b.contactName  === "string" && b.contactName.trim().length > 0 &&
    typeof b.email        === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    typeof b.category     === "string" && b.category.trim().length > 0
  );
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  // ── Rate limit ───────────────────────────────────────────────────────────

  const ip    = getClientIp(req);
  const limit = rateLimit(`claim:${ip}`, CLAIM_LIMIT);

  if (!limit.allowed) {
    const retryAfterSec = Math.ceil((limit.resetAt - Date.now()) / 1000);
    return NextResponse.json(
      { error: "Too many requests. Please wait a while and try again." },
      {
        status: 429,
        headers: {
          "Retry-After":           String(retryAfterSec),
          "X-RateLimit-Limit":     String(CLAIM_LIMIT.max),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset":     String(Math.ceil(limit.resetAt / 1000)),
        },
      }
    );
  }

  // ── Env guard ────────────────────────────────────────────────────────────

  const webhookUrl = process.env.GHL_CLAIM_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error(
      "[/api/claim] GHL_CLAIM_WEBHOOK_URL is not set. " +
      "Configure this environment variable before going live."
    );
    return NextResponse.json(
      { error: "Claim form is not configured yet." },
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
        request_type:  body.requestType,
        business_name: body.businessName,
        contact_name:  body.contactName,
        email:         body.email,
        phone:         body.phone ?? "",
        category:      body.category,
        website:       body.website ?? "",
        message:       body.message ?? "",
        source:        "claim-form",
      }),
    });

    if (!ghlRes.ok) {
      console.error(`[/api/claim] GHL webhook returned ${ghlRes.status}`);
      return NextResponse.json(
        { error: "Failed to forward submission." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { success: true, remaining: limit.remaining },
      { status: 200 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[/api/claim] Error forwarding to GHL:", message);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
