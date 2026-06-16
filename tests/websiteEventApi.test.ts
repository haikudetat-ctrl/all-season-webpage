import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/website-event/route";

const originalEnv = process.env;

beforeEach(() => {
  process.env = {
    ...originalEnv,
    SUPABASE_URL: "https://supabase.example",
    SUPABASE_SERVICE_ROLE_KEY: "service-role-test-key"
  };
});

afterEach(() => {
  process.env = originalEnv;
  vi.restoreAllMocks();
});

describe("POST /api/website-event", () => {
  it("stores abandoned quote events without requiring a lead", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("{}", { status: 201 }));

    const response = await POST(
      new Request("http://localhost:3000/api/website-event", {
        method: "POST",
        body: JSON.stringify({
          eventName: "quote_started",
          sessionId: "22222222-2222-4222-8222-222222222222",
          pageUrl: "https://allseason.example/roof-quote",
          attribution: { utmCampaign: "roof_quote_v1" },
          payload: { step: "zip" }
        })
      })
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ ok: true, stored: true });
    expect(fetchSpy).toHaveBeenCalledWith(
      "https://supabase.example/rest/v1/website_events",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          apikey: "service-role-test-key"
        })
      })
    );
    const body = JSON.parse(String(fetchSpy.mock.calls[0]?.[1]?.body));
    expect(body).toMatchObject({
      event_name: "quote_started",
      quote_session_id: "22222222-2222-4222-8222-222222222222",
      page_url: "https://allseason.example/roof-quote"
    });
  });

  it("rejects unknown tracking events", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    const response = await POST(
      new Request("http://localhost:3000/api/website-event", {
        method: "POST",
        body: JSON.stringify({ eventName: "random_event" })
      })
    );

    expect(response.status).toBe(400);
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
