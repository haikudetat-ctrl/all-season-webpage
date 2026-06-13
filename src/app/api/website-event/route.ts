import { NextResponse } from "next/server";
import { postSupabaseRest } from "@/lib/revops/rest";

export const runtime = "nodejs";

const allowedEvents = new Set([
  "quote_started",
  "zip_checked",
  "quote_step_completed",
  "contact_submitted",
  "estimate_shown",
  "call_clicked",
  "form_submitted"
]);

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!isRecord(body) || typeof body.eventName !== "string" || !allowedEvents.has(body.eventName)) {
    return NextResponse.json({ error: "invalid_event_name" }, { status: 400 });
  }

  const stored = await postSupabaseRest("website_events", {
    quote_session_id: typeof body.sessionId === "string" ? body.sessionId : null,
    event_name: body.eventName,
    page_url: typeof body.pageUrl === "string" ? body.pageUrl : null,
    referrer: typeof body.referrer === "string" ? body.referrer : null,
    attribution: isRecord(body.attribution) ? normalizeAttribution(body.attribution) : {},
    payload_json: isRecord(body.payload) ? body.payload : {}
  });

  return NextResponse.json({ ok: true, stored });
}

function normalizeAttribution(value: Record<string, unknown>) {
  return {
    utm_source: value.utmSource,
    utm_medium: value.utmMedium,
    utm_campaign: value.utmCampaign,
    utm_content: value.utmContent,
    keyword: value.keyword,
    gclid: value.gclid,
    gbraid: value.gbraid,
    wbraid: value.wbraid,
    fbclid: value.fbclid
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
