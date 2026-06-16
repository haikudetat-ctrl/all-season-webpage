import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/roof-quote/route";

const originalEnv = process.env;

beforeEach(() => {
  process.env = {
    ...originalEnv,
    REVOPS_INTAKE_URL: "https://revops.example/functions/v1/lead-intake",
    REVOPS_INTAKE_KEY: "server-only-test-key",
    SUPABASE_URL: "https://supabase.example",
    SUPABASE_SERVICE_ROLE_KEY: "service-role-test-key"
  };
});

afterEach(() => {
  process.env = originalEnv;
  vi.restoreAllMocks();
});

describe("POST /api/roof-quote", () => {
  it("rejects missing consent before calling backend services", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const response = await POST(request({ consent: { tcpa: false, sms: false, email: false } }));

    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({ error: "consent_required" });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("rejects unsupported ZIP codes without creating a lead", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const response = await POST(request({ property: { ...validPayload.property, zip: "90210", state: "CA" } }));

    expect(response.status).toBe(422);
    expect(await response.json()).toMatchObject({ error: "outside_service_area" });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("submits a completed quote as the owned roof quote source without exposing server keys", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ accepted: true, lead_id: "lead_123", priority: "P0" }), {
        status: 202,
        headers: { "Content-Type": "application/json" }
      })
    );

    const response = await POST(request());
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.estimate.tiers.good.base).toBe(11220);
    expect(JSON.stringify(body)).not.toContain("server-only-test-key");
    expect(fetchSpy).toHaveBeenCalledWith(
      "https://revops.example/functions/v1/lead-intake",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "x-revops-intake-key": "server-only-test-key"
        })
      })
    );

    const intakeBody = JSON.parse(String(fetchSpy.mock.calls.at(-1)?.[1]?.body));
    expect(intakeBody.lead.source).toMatchObject({
      source_name: "AllSeason Roof Quote",
      source_type: "owned_website",
      exclusive_status: "exclusive",
      landing_page: "https://allseason.example/roof-quote",
      utm_campaign: "roof_quote_v1",
      gclid: "gclid-test"
    });
    expect(intakeBody.lead.interest).toMatchObject({
      service_line: "roofing",
      requested_quote_type: "good_better_best"
    });
  });
});

function request(overrides: Record<string, unknown> = {}) {
  return new Request("http://localhost:3000/api/roof-quote", {
    method: "POST",
    body: JSON.stringify({ ...validPayload, ...overrides })
  });
}

const validPayload = {
  sessionId: "11111111-1111-4111-8111-111111111111",
  person: {
    firstName: "Jane",
    lastName: "Homeowner",
    phone: "609-555-1212",
    email: "jane@example.com",
    preferredContactMethod: "phone"
  },
  property: {
    street: "123 Main St",
    city: "Sewell",
    state: "NJ",
    zip: "08080",
    homeType: "single_family",
    roofAge: 18,
    roofMaterial: "asphalt_shingle"
  },
  quote: {
    roofSquares: 20,
    urgency: "planning",
    roofPitch: "standard",
    roofLayers: 1,
    roofCondition: "aging",
    deckingConcern: false,
    skylights: 0,
    solarReady: true
  },
  consent: {
    tcpa: true,
    sms: true,
    email: true,
    languageVersion: "roof_quote_v1"
  },
  attribution: {
    landingPage: "https://allseason.example/roof-quote",
    referrer: "https://google.com",
    utmSource: "google",
    utmMedium: "cpc",
    utmCampaign: "roof_quote_v1",
    utmContent: "warranty_angle",
    gclid: "gclid-test"
  }
};
