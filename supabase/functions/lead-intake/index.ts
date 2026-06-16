import { createClient } from "@supabase/supabase-js";

type Priority = "P0" | "P1" | "P2" | "P3";

type IntakePayload = {
  lead?: {
    external_ids?: Record<string, string | null | undefined>;
    person?: {
      first_name?: string;
      last_name?: string;
      phone?: string;
      email?: string;
      preferred_contact_method?: string;
    };
    property?: {
      street?: string;
      city?: string;
      state?: string;
      zip?: string;
      county?: string;
      home_type?: string;
      roof_age?: number | null;
      roof_material?: string;
      electric_bill_range?: string;
      solar_existing?: boolean;
    };
    interest?: {
      service_line?: string;
      secondary_interest?: string;
      urgency?: string;
      pain_points?: string[];
      requested_quote_type?: string;
      vendor_intent_score?: string;
    };
    source?: {
      source_name?: string;
      source_type?: string;
      exclusive_status?: string;
      vendor?: string;
      landing_page?: string;
      utm_source?: string;
      utm_medium?: string;
      utm_campaign?: string;
      utm_content?: string;
      keyword?: string;
      gclid?: string;
      gbraid?: string;
      wbraid?: string;
      fbclid?: string;
      callrail_tracking_number?: string;
    };
    consent?: {
      tcpa_consent?: boolean;
      sms_consent?: boolean;
      email_consent?: boolean;
      trustedform_cert_url?: string;
      consent_language_version?: string;
    };
  };
};

type RoutingDecision = {
  priority: Priority;
  route_name: string;
  sequence_name: string;
  script_id: string;
  decision_reasons: string[];
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-revops-intake-key",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return json({}, 204);
  }

  if (req.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405);
  }

  const admin = createClient(
    requiredEnv("SUPABASE_URL"),
    getAdminKey(),
    { auth: { persistSession: false } }
  );

  const intakeKey = req.headers.get("x-revops-intake-key") ?? "";
  if (!(await verifyIntakeKey(admin, intakeKey))) {
    return json({ error: "unauthorized" }, 401);
  }

  const payload = await readJson(req);
  const lead = payload.lead;
  if (!lead?.person?.first_name || !lead?.source?.source_name) {
    return json({ error: "invalid_payload", required: ["lead.person.first_name", "lead.source.source_name"] }, 400);
  }

  const normalizedPhone = normalizePhone(lead.person.phone ?? "");
  const normalizedEmail = normalizeEmail(lead.person.email ?? "");
  const normalizedState = (lead.property?.state ?? "").trim().toUpperCase();
  const normalizedZip = normalizeZip(lead.property?.zip ?? "");
  const consentStatus = getConsentStatus(payload);
  const duplicateLeadId = await findRecentDuplicate(admin, normalizedPhone, normalizedEmail);
  const routing = routeLead(payload, {
    phoneValid: isValidUsPhone(normalizedPhone),
    emailValid: isValidEmail(normalizedEmail),
    state: normalizedState,
    consentStatus,
    duplicateLeadId
  });

  const sourceId = await insertAndReturnId(admin, "lead_sources", {
    source_name: lead.source.source_name,
    source_type: lead.source.source_type ?? "unknown",
    exclusive_status: lead.source.exclusive_status ?? "unknown",
    vendor: lead.source.vendor ?? null,
    campaign: lead.source.utm_campaign ?? null,
    keyword: lead.source.keyword ?? null,
    landing_page: lead.source.landing_page ?? null,
    utm_source: lead.source.utm_source ?? null,
    utm_medium: lead.source.utm_medium ?? null,
    utm_campaign: lead.source.utm_campaign ?? null,
    utm_content: lead.source.utm_content ?? null,
    gclid: lead.source.gclid ?? null,
    gbraid: lead.source.gbraid ?? null,
    wbraid: lead.source.wbraid ?? null,
    fbclid: lead.source.fbclid ?? null,
    callrail_tracking_number: lead.source.callrail_tracking_number ?? null,
    external_payload: lead.source
  });

  const personId = await insertAndReturnId(admin, "people", {
    first_name: lead.person.first_name,
    last_name: lead.person.last_name ?? "",
    email: normalizedEmail,
    phone_e164: normalizedPhone,
    preferred_contact_method: lead.person.preferred_contact_method ?? "unknown",
    phone_valid: isValidUsPhone(normalizedPhone),
    email_valid: isValidEmail(normalizedEmail)
  });

  const propertyId = await insertAndReturnId(admin, "properties", {
    street: lead.property?.street ?? "",
    city: lead.property?.city ?? "",
    state: normalizedState,
    zip: normalizedZip,
    county: lead.property?.county ?? "",
    home_type: lead.property?.home_type ?? "unknown",
    roof_age: lead.property?.roof_age ?? null,
    roof_material: lead.property?.roof_material ?? "unknown",
    electric_bill_range: lead.property?.electric_bill_range ?? null,
    solar_existing: lead.property?.solar_existing ?? null
  });

  const leadId = await insertAndReturnId(admin, "leads", {
    person_id: personId,
    property_id: propertyId,
    source_id: sourceId,
    first_source: lead.source.source_name,
    latest_source: lead.source.source_name,
    service_line: lead.interest?.service_line ?? "unknown",
    priority: routing.priority,
    lead_status: routing.priority === "P3" ? "suppressed" : "accepted",
    consent_status: consentStatus
  });

  await admin.from("consent_certificates").insert({
    lead_id: leadId,
    trustedform_url: lead.consent?.trustedform_cert_url ?? lead.external_ids?.trustedform_cert_url ?? null,
    claim_status: lead.consent?.trustedform_cert_url || lead.external_ids?.trustedform_cert_url ? "claimed" : "missing",
    claimed_at: lead.consent?.trustedform_cert_url || lead.external_ids?.trustedform_cert_url ? new Date().toISOString() : null,
    source_url: lead.source.landing_page ?? null,
    consent_language_version: lead.consent?.consent_language_version ?? "unknown",
    retention_status: lead.consent?.trustedform_cert_url || lead.external_ids?.trustedform_cert_url ? "retained" : "not_applicable"
  }).throwOnError();

  await admin.from("routing_decisions").insert({
    lead_id: leadId,
    priority: routing.priority,
    route_name: routing.route_name,
    sequence_name: routing.sequence_name,
    script_id: routing.script_id,
    decision_reasons: routing.decision_reasons
  }).throwOnError();

  await admin.from("lead_events").insert([
    eventRow(leadId, "lead_received", "lead_intake_function", { source: lead.source }),
    eventRow(leadId, "routing_decision_created", "routing_engine", routing),
    eventRow(leadId, "stage1_external_sync_pending", "supabase_backend", {
      note: "LeadMaster and dialer adapters are handled in the next stage."
    })
  ]).throwOnError();

  await admin.from("communications").insert(planCommunications(leadId, routing, lead.consent ?? {})).throwOnError();

  return json({
    accepted: routing.priority !== "P3",
    lead_id: leadId,
    priority: routing.priority,
    route_name: routing.route_name,
    sequence_name: routing.sequence_name,
    script_id: routing.script_id,
    decision_reasons: routing.decision_reasons
  }, routing.priority === "P3" ? 200 : 202);
});

async function readJson(req: Request): Promise<IntakePayload> {
  try {
    return await req.json();
  } catch {
    return {};
  }
}

function getAdminKey(): string {
  const secretKeys = Deno.env.get("SUPABASE_SECRET_KEYS");
  if (secretKeys) {
    const parsed = JSON.parse(secretKeys);
    if (parsed.default) return parsed.default;
  }

  return requiredEnv("SUPABASE_SERVICE_ROLE_KEY");
}

function requiredEnv(name: string): string {
  const value = Deno.env.get(name);
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

async function findRecentDuplicate(admin: ReturnType<typeof createClient>, phone: string, email: string): Promise<string | undefined> {
  if (!phone && !email) return undefined;

  let peopleQuery = admin.from("people").select("id").limit(1);
  if (phone && email) {
    peopleQuery = peopleQuery.or(`phone_e164.eq.${phone},email.eq.${email}`);
  } else if (phone) {
    peopleQuery = peopleQuery.eq("phone_e164", phone);
  } else {
    peopleQuery = peopleQuery.eq("email", email);
  }

  const { data: people, error: peopleError } = await peopleQuery;
  if (peopleError) throw peopleError;
  const personId = people?.[0]?.id;
  if (!personId) return undefined;

  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const { data: leads, error: leadsError } = await admin
    .from("leads")
    .select("id")
    .eq("person_id", personId)
    .gte("created_at", since)
    .limit(1);

  if (leadsError) throw leadsError;
  return leads?.[0]?.id;
}

async function verifyIntakeKey(admin: ReturnType<typeof createClient>, intakeKey: string): Promise<boolean> {
  if (!intakeKey) return false;
  const keyHash = await sha256Hex(intakeKey);
  const { data, error } = await admin
    .from("revops_intake_keys")
    .select("id")
    .eq("key_hash", keyHash)
    .eq("active", true)
    .limit(1);

  if (error) throw error;
  const keyId = data?.[0]?.id;
  if (!keyId) return false;

  await admin
    .from("revops_intake_keys")
    .update({ last_used_at: new Date().toISOString() })
    .eq("id", keyId);

  return true;
}

async function sha256Hex(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function insertAndReturnId(admin: ReturnType<typeof createClient>, table: string, values: Record<string, unknown>): Promise<string> {
  const { data, error } = await admin.from(table).insert(values).select("id").single();
  if (error) throw error;
  return data.id;
}

function getConsentStatus(payload: IntakePayload): "valid" | "missing" | "invalid" {
  const consent = payload.lead?.consent;
  const externalIds = payload.lead?.external_ids;
  const hasTrustedForm = Boolean(consent?.trustedform_cert_url || externalIds?.trustedform_cert_url);
  const hasChannelConsent = Boolean(consent?.tcpa_consent || consent?.sms_consent || consent?.email_consent);
  return hasTrustedForm || hasChannelConsent ? "valid" : "missing";
}

function routeLead(input: IntakePayload, context: {
  phoneValid: boolean;
  emailValid: boolean;
  state: string;
  consentStatus: "valid" | "missing" | "invalid";
  duplicateLeadId?: string;
}): RoutingDecision {
  const sourceName = input.lead?.source?.source_name?.toLowerCase() ?? "";
  const serviceLine = input.lead?.interest?.service_line ?? "unknown";
  const urgency = input.lead?.interest?.urgency?.toLowerCase() ?? "";
  const vendorIntentScore = input.lead?.interest?.vendor_intent_score;
  const painPoints = input.lead?.interest?.pain_points ?? [];
  const serviceAreaStates = new Set(["NJ", "PA", "MD", "VA", "DE", "IL", ""]);

  if (context.consentStatus !== "valid") {
    return decision("P3", "manual_consent_review", "no_sequence", "consent_review", ["missing_or_invalid_consent"]);
  }

  if (context.duplicateLeadId) {
    return decision("P3", "suppressed_duplicate", "no_sequence", "duplicate_review", [`duplicate_seen_recently:${context.duplicateLeadId}`]);
  }

  if (!serviceAreaStates.has(context.state)) {
    return decision("P3", "manual_service_area_review", "no_sequence", "service_area_review", [`outside_service_area:${context.state}`]);
  }

  if (!context.phoneValid && context.emailValid) {
    return decision("P2", "email_first_nurture", "no_phone_email_first", "email_first_opener", ["bad_or_missing_phone_email_valid"]);
  }

  if (serviceLine === "roofing" && sourceName.includes("allseason roof quote") && context.phoneValid) {
    return decision("P0", "roofing_preview_queue", "roofing_day0_high_intent", "roof_quote_widget_opener", ["owned_roof_quote_roofing"]);
  }

  if (serviceLine === "roofing" && sourceName.includes("instaquote") && context.phoneValid) {
    return decision("P0", "roofing_preview_queue", "roofing_day0_high_intent", "instaquote_roofing_opener", ["owned_instaquote_roofing"]);
  }

  if (serviceLine === "roofing" && sourceName.includes("roofing calculator") && ["3", "4"].includes(vendorIntentScore ?? "")) {
    return decision("P0", "vendor_roofing_preview_queue", "roofing_vendor_quote_request", "roofing_calculator_opener", ["roofing_calculator_high_intent"]);
  }

  if (serviceLine === "roofing" && sourceName.includes("nest")) {
    return decision("P0", "vendor_roofing_preview_queue", "roofing_vendor_quote_request", "nest_builder_opener", ["nest_builder_roofing_quote_request"]);
  }

  if (sourceName.includes("lsa") || sourceName.includes("local services")) {
    return decision("P0", `${serviceLine}_preview_queue`, `${serviceLine}_day0_high_intent`, "lsa_opener", ["google_lsa_high_intent"]);
  }

  if (urgency.includes("leak") || urgency.includes("urgent")) {
    return decision("P0", "roofing_preview_queue", "roofing_day0_high_intent", "urgent_roofing_opener", ["urgent_need"]);
  }

  if (
    serviceLine === "solar" &&
    sourceName.includes("fight the power") &&
    context.phoneValid &&
    painPoints.includes("bill_150_plus") &&
    painPoints.includes("owns_home")
  ) {
    return decision("P0", "solar_preview_queue", "solar_day0_high_intent", "fight_the_power_opener", ["meta_fight_power_solar_qualified"]);
  }

  if (serviceLine === "solar" && context.phoneValid) {
    return decision("P1", "solar_same_day_queue", "solar_2026_options_high_intent", "solar_2026_options_opener", ["solar_same_day_response"]);
  }

  return decision("P1", `${serviceLine}_same_day_queue`, `${serviceLine}_standard_followup`, `${serviceLine}_default_opener`, ["default_same_day_followup"]);
}

function decision(priority: Priority, routeName: string, sequenceName: string, scriptId: string, reasons: string[]): RoutingDecision {
  return {
    priority,
    route_name: routeName,
    sequence_name: sequenceName,
    script_id: scriptId,
    decision_reasons: reasons
  };
}

function planCommunications(leadId: string, routing: RoutingDecision, consent: NonNullable<IntakePayload["lead"]>["consent"]) {
  if (routing.priority === "P3") return [];
  const rows = [
    communicationRow(leadId, "task", "internal", routing.script_id, `created:${routing.route_name}`)
  ];

  if (routing.priority === "P0") {
    rows.push(
      communicationRow(leadId, "call", "outbound", routing.script_id, "queued_for_preview_call"),
      communicationRow(leadId, "sms", "outbound", `${routing.sequence_name}_sms_day0`, consent?.sms_consent ? "queued" : "blocked_no_sms_consent"),
      communicationRow(leadId, "email", "outbound", `${routing.sequence_name}_email_day0`, consent?.email_consent ? "queued" : "blocked_no_email_consent")
    );
  }

  if (routing.route_name === "email_first_nurture") {
    rows.push(communicationRow(leadId, "email", "outbound", "no_phone_email_first_day0", consent?.email_consent ? "queued" : "blocked_no_email_consent"));
  }

  return rows;
}

function communicationRow(leadId: string, channel: string, direction: string, templateId: string, outcome: string) {
  return {
    lead_id: leadId,
    channel,
    direction,
    template_id: templateId,
    sent_at: new Date().toISOString(),
    outcome
  };
}

function eventRow(leadId: string, eventType: string, sourceSystem: string, payload: Record<string, unknown>) {
  return {
    lead_id: leadId,
    event_type: eventType,
    source_system: sourceSystem,
    payload_json: payload,
    actor_type: "system"
  };
}

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  if (phone.startsWith("+")) return phone;
  return digits;
}

function isValidUsPhone(phone: string): boolean {
  return /^\+1\d{10}$/.test(normalizePhone(phone));
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(email));
}

function normalizeZip(zip: string): string {
  return zip.replace(/\D/g, "").slice(0, 5);
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json"
    }
  });
}
