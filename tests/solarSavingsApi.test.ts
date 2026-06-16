import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/solar-savings/route";

const originalEnv = process.env;

beforeEach(() => {
  process.env = {
    ...originalEnv,
    REVOPS_INTAKE_URL: "https://revops.example/functions/v1/lead-intake",
    REVOPS_INTAKE_KEY: "server-only-test-key"
  };
});

afterEach(() => {
  process.env = originalEnv;
  vi.restoreAllMocks();
});

describe("POST /api/solar-savings", () => {
  it("rejects missing consent before calling lead intake", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const response = await POST(request({ consent: { tcpa: false, sms: false, email: false } }));

    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({ error: "consent_required" });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("rejects unsupported service states without creating a lead", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const response = await POST(request({ property: { ...validPayload.property, zip: "90210", state: "CA" } }));

    expect(response.status).toBe(422);
    expect(await response.json()).toMatchObject({ error: "outside_service_area" });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("submits Fight The Power as a paid social solar lead without exposing server keys", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({
        accepted: true,
        lead_id: "lead_solar_123",
        priority: "P0",
        route_name: "solar_preview_queue",
        sequence_name: "solar_day0_high_intent",
        script_id: "fight_the_power_opener"
      }), {
        status: 202,
        headers: { "Content-Type": "application/json" }
      })
    );

    const response = await POST(request());
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(JSON.stringify(body)).not.toContain("server-only-test-key");
    expect(body.lead).toMatchObject({
      accepted: true,
      priority: "P0",
      routeName: "solar_preview_queue",
      sequenceName: "solar_day0_high_intent",
      scriptId: "fight_the_power_opener"
    });
    const intakeBody = JSON.parse(String(fetchSpy.mock.calls[0]?.[1]?.body));
    expect(intakeBody.lead.source).toMatchObject({
      source_name: "AllSeason Meta Fight The Power",
      source_type: "paid_social_landing_page",
      exclusive_status: "exclusive",
      landing_page: "https://allseason.example/meta/fight-the-power",
      utm_campaign: "fight_the_power_v1"
    });
    expect(intakeBody.lead.interest).toMatchObject({
      service_line: "solar",
      requested_quote_type: "solar_savings_review"
    });
    expect(intakeBody.lead.property).toMatchObject({
      electric_bill_range: "$250"
    });
  });
});

function request(overrides: Record<string, unknown> = {}) {
  return new Request("http://localhost:3000/api/solar-savings", {
    method: "POST",
    body: JSON.stringify({ ...validPayload, ...overrides })
  });
}

const validPayload = {
  sessionId: "33333333-3333-4333-8333-333333333333",
  person: {
    name: "Jane Homeowner",
    phone: "609-555-1212",
    email: "jane@example.com",
    preferredContactMethod: "phone"
  },
  property: {
    state: "NJ",
    zip: "08080",
    monthlyBill: "$250",
    roofStatus: "Good condition",
    ownsHome: "Yes"
  },
  consent: {
    tcpa: true,
    sms: true,
    email: true,
    languageVersion: "meta_fight_power_v1"
  },
  attribution: {
    sourceName: "AllSeason Meta Fight The Power",
    sourceType: "paid_social_landing_page",
    exclusiveStatus: "exclusive",
    landingPage: "https://allseason.example/meta/fight-the-power",
    utmSource: "meta",
    utmMedium: "paid_social",
    utmCampaign: "fight_the_power_v1"
  }
};
