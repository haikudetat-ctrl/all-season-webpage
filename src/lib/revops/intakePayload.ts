import type { RoofQuoteRequest } from "@/lib/quote/request";
import type { RoofQuoteEstimate } from "@/lib/quote/types";

export function buildLeadIntakePayload(request: RoofQuoteRequest, estimate: RoofQuoteEstimate) {
  const attribution = request.attribution ?? {};
  return {
    lead: {
      external_ids: {
        quote_session_id: request.sessionId ?? null
      },
      person: {
        first_name: request.person.firstName.trim(),
        last_name: request.person.lastName?.trim() ?? "",
        phone: request.person.phone,
        email: request.person.email.trim().toLowerCase(),
        preferred_contact_method: request.person.preferredContactMethod ?? "phone"
      },
      property: {
        street: request.property.street ?? "",
        city: request.property.city ?? "",
        state: request.property.state,
        zip: request.property.zip,
        home_type: request.property.homeType ?? "unknown",
        roof_age: request.property.roofAge ?? null,
        roof_material: request.property.roofMaterial ?? "asphalt_shingle"
      },
      interest: {
        service_line: "roofing",
        secondary_interest: request.quote.solarReady ? "solar_ready_roof" : "roof_only",
        urgency: request.quote.urgency,
        pain_points: [
          request.quote.roofCondition ?? "roof_quote",
          request.quote.deckingConcern ? "decking_concern" : "",
          request.quote.solarReady ? "solar_ready" : ""
        ].filter(Boolean),
        requested_quote_type: "good_better_best"
      },
      source: {
        source_name: "AllSeason Roof Quote",
        source_type: "owned_website",
        exclusive_status: "exclusive",
        landing_page: attribution.landingPage,
        utm_source: attribution.utmSource,
        utm_medium: attribution.utmMedium,
        utm_campaign: attribution.utmCampaign,
        utm_content: attribution.utmContent,
        keyword: attribution.keyword,
        gclid: attribution.gclid,
        gbraid: attribution.gbraid,
        wbraid: attribution.wbraid,
        fbclid: attribution.fbclid,
        quote_session_id: request.sessionId,
        quote_estimate: {
          roof_squares: estimate.roofSquares,
          good: estimate.tiers.good,
          better: estimate.tiers.better,
          best: estimate.tiers.best,
          modifier_total: estimate.modifierTotal,
          modifiers: estimate.modifiers
        }
      },
      consent: {
        tcpa_consent: request.consent.tcpa,
        sms_consent: request.consent.sms,
        email_consent: request.consent.email,
        consent_language_version: request.consent.languageVersion ?? "roof_quote_v1"
      }
    }
  };
}
