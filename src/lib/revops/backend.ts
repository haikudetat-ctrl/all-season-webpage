import type { RoofQuoteRequest } from "@/lib/quote/request";
import type { RoofQuoteEstimate } from "@/lib/quote/types";
import type { SolarSavingsRequest } from "@/lib/solar/request";
import { buildLeadIntakePayload } from "./intakePayload";
import { postSupabaseRest } from "./rest";
import { buildSolarLeadIntakePayload } from "./solarIntakePayload";

type IntakeResponse = {
  accepted: boolean;
  lead_id?: string;
  priority?: string;
  route_name?: string;
  sequence_name?: string;
  script_id?: string;
  decision_reasons?: string[];
};

export async function submitQuoteLead(request: RoofQuoteRequest, estimate: RoofQuoteEstimate): Promise<IntakeResponse> {
  return submitLeadIntakePayload(buildLeadIntakePayload(request, estimate));
}

export async function submitSolarLead(request: SolarSavingsRequest): Promise<IntakeResponse> {
  return submitLeadIntakePayload(buildSolarLeadIntakePayload(request));
}

async function submitLeadIntakePayload(payload: Record<string, unknown>): Promise<IntakeResponse> {
  const intakeUrl = process.env.REVOPS_INTAKE_URL;
  const intakeKey = process.env.REVOPS_INTAKE_KEY;

  if (!intakeUrl || !intakeKey) {
    throw new Error("Missing REVOPS_INTAKE_URL or REVOPS_INTAKE_KEY");
  }

  const response = await fetch(intakeUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-revops-intake-key": intakeKey
    },
    body: JSON.stringify(payload)
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`Lead intake failed: ${response.status} ${JSON.stringify(body)}`);
  }

  return body as IntakeResponse;
}

export async function storeQuoteJourney(request: RoofQuoteRequest, estimate: RoofQuoteEstimate): Promise<void> {
  const sessionId = request.sessionId;
  if (!sessionId) return;
  const sourceName = request.attribution?.sourceName ?? "AllSeason Roof Quote";

  await postSupabaseRest("quote_sessions", {
    id: sessionId,
    session_token: sessionId,
    status: "completed",
    landing_page: request.attribution?.landingPage ?? null,
    referrer: request.attribution?.referrer ?? null,
    attribution: request.attribution ?? {},
    service_area_zip: request.property.zip,
    service_area_state: request.property.state,
    service_area_status: "accepted",
    contact_captured_at: new Date().toISOString()
  });

  await postSupabaseRest("quote_estimates", {
    quote_session_id: sessionId,
    home_size_sqft: request.quote.homeSizeSqft ?? null,
    roof_squares: estimate.roofSquares,
    roof_pitch: request.quote.roofPitch,
    roof_layers: request.quote.roofLayers,
    roof_condition: request.quote.roofCondition ?? "unknown",
    urgency: request.quote.urgency,
    decking_concern: request.quote.deckingConcern,
    skylights: request.quote.skylights,
    solar_ready: request.quote.solarReady,
    good_low: estimate.tiers.good.low,
    good_high: estimate.tiers.good.high,
    better_low: estimate.tiers.better.low,
    better_high: estimate.tiers.better.high,
    best_low: estimate.tiers.best.low,
    best_high: estimate.tiers.best.high,
    modifiers: {
      modifier_total: estimate.modifierTotal,
      modifiers: estimate.modifiers
    },
    estimate_disclaimer: estimate.disclaimer
  });

  await postSupabaseRest("website_events", {
    quote_session_id: sessionId,
    event_name: "estimate_shown",
    page_url: request.attribution?.landingPage ?? null,
    referrer: request.attribution?.referrer ?? null,
    attribution: request.attribution ?? {},
    payload_json: {
      source_name: sourceName,
      tiers: estimate.tiers,
      modifier_total: estimate.modifierTotal
    }
  });
}
