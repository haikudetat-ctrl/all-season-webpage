export type WebsiteEventName =
  | "quote_started"
  | "zip_checked"
  | "quote_step_completed"
  | "contact_submitted"
  | "estimate_shown"
  | "call_clicked"
  | "form_submitted";

type TrackingPayload = {
  sessionId?: string;
  pageUrl?: string;
  referrer?: string;
  attribution?: Record<string, string | undefined>;
  payload?: Record<string, unknown>;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function collectAttribution(searchParams: URLSearchParams): Record<string, string | undefined> {
  return {
    utmSource: searchParams.get("utm_source") ?? undefined,
    utmMedium: searchParams.get("utm_medium") ?? undefined,
    utmCampaign: searchParams.get("utm_campaign") ?? undefined,
    utmContent: searchParams.get("utm_content") ?? undefined,
    keyword: searchParams.get("keyword") ?? undefined,
    gclid: searchParams.get("gclid") ?? undefined,
    gbraid: searchParams.get("gbraid") ?? undefined,
    wbraid: searchParams.get("wbraid") ?? undefined,
    fbclid: searchParams.get("fbclid") ?? undefined
  };
}

export function trackWebsiteEvent(eventName: WebsiteEventName, payload: TrackingPayload = {}) {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({
      event: eventName,
      event_id: `${eventName}:${payload.sessionId ?? "site"}:${Date.now()}`,
      quote_session_id: payload.sessionId,
      ...payload.payload
    });
  }

  void fetch("/api/website-event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventName,
      sessionId: payload.sessionId,
      pageUrl: payload.pageUrl,
      referrer: payload.referrer,
      attribution: payload.attribution,
      payload: payload.payload
    })
  }).catch(() => undefined);
}
