import { parseMonthlyBill, splitName, type SolarSavingsRequest } from "@/lib/solar/request";

export function buildSolarLeadIntakePayload(request: SolarSavingsRequest) {
  const attribution = request.attribution ?? {};
  const sourceName = attribution.sourceName ?? "AllSeason Meta Fight The Power";
  const sourceType = attribution.sourceType ?? "paid_social_landing_page";
  const exclusiveStatus = attribution.exclusiveStatus ?? "exclusive";
  const { firstName, lastName } = splitName(request.person.name);
  const monthlyBill = parseMonthlyBill(request.property.monthlyBill);
  const ownsHome = request.property.ownsHome.trim().toLowerCase();
  const roofStatus = request.property.roofStatus.trim();
  const qualifiedBill = monthlyBill >= 150;
  const homeowner = ownsHome === "yes";

  return {
    lead: {
      external_ids: {
        quote_session_id: request.sessionId ?? null
      },
      person: {
        first_name: firstName,
        last_name: lastName,
        phone: request.person.phone,
        email: request.person.email?.trim().toLowerCase() ?? "",
        preferred_contact_method: request.person.preferredContactMethod ?? "phone"
      },
      property: {
        street: "",
        city: "",
        state: request.property.state,
        zip: request.property.zip,
        home_type: homeowner ? "single_family" : "unknown",
        roof_age: null,
        roof_material: "unknown",
        electric_bill_range: request.property.monthlyBill,
        solar_existing: null
      },
      interest: {
        service_line: "solar",
        secondary_interest: roofStatus.toLowerCase().includes("roof") ? "roof_plus_solar_review" : "solar_savings_review",
        urgency: "planning",
        pain_points: [
          "high_electric_bill",
          qualifiedBill ? "bill_150_plus" : "bill_below_150",
          homeowner ? "owns_home" : "does_not_own_home",
          `roof_status:${roofStatus.toLowerCase().replace(/\s+/g, "_")}`
        ],
        requested_quote_type: "solar_savings_review"
      },
      source: {
        source_name: sourceName,
        source_type: sourceType,
        exclusive_status: exclusiveStatus,
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
        campaign_source_name: sourceName,
        ad_hook: "Fight the power bill",
        monthly_bill_amount: monthlyBill,
        owns_home: homeowner,
        roof_status: roofStatus
      },
      consent: {
        tcpa_consent: request.consent.tcpa,
        sms_consent: request.consent.sms,
        email_consent: request.consent.email,
        consent_language_version: request.consent.languageVersion ?? "meta_fight_power_v1"
      }
    }
  };
}
