import type { RoofQuoteInput } from "./types";

export type RoofQuoteRequest = {
  sessionId?: string;
  person: {
    firstName: string;
    lastName?: string;
    phone: string;
    email: string;
    preferredContactMethod?: "phone" | "sms" | "email";
  };
  property: {
    street?: string;
    city?: string;
    state: string;
    zip: string;
    homeType?: string;
    roofAge?: number | null;
    roofMaterial?: string;
  };
  quote: RoofQuoteInput & {
    homeSizeSqft?: number;
    roofCondition?: string;
  };
  consent: {
    tcpa: boolean;
    sms: boolean;
    email: boolean;
    languageVersion?: string;
  };
  attribution?: {
    landingPage?: string;
    referrer?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmContent?: string;
    keyword?: string;
    gclid?: string;
    gbraid?: string;
    wbraid?: string;
    fbclid?: string;
  };
};

export type RoofQuoteValidation =
  | { ok: true; value: RoofQuoteRequest }
  | { ok: false; status: number; error: string; details?: string[] };

export function validateRoofQuoteRequest(input: unknown): RoofQuoteValidation {
  if (!isRecord(input)) {
    return { ok: false, status: 400, error: "invalid_json" };
  }

  const request = input as RoofQuoteRequest;
  const missing: string[] = [];
  if (!request.person?.firstName?.trim()) missing.push("person.firstName");
  if (!request.person?.phone?.trim()) missing.push("person.phone");
  if (!request.person?.email?.trim()) missing.push("person.email");
  if (!request.property?.state?.trim()) missing.push("property.state");
  if (!request.property?.zip?.trim()) missing.push("property.zip");
  if (!Number.isFinite(request.quote?.roofSquares)) missing.push("quote.roofSquares");

  if (missing.length > 0) {
    return { ok: false, status: 400, error: "missing_required_fields", details: missing };
  }

  if (!isEmail(request.person.email)) {
    return { ok: false, status: 400, error: "invalid_email" };
  }

  if (normalizePhone(request.person.phone).length !== 10) {
    return { ok: false, status: 400, error: "invalid_phone" };
  }

  if (!request.consent?.tcpa && !request.consent?.sms && !request.consent?.email) {
    return { ok: false, status: 400, error: "consent_required" };
  }

  return { ok: true, value: request };
}

export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("1") && digits.length === 11 ? digits.slice(1) : digits;
}

function isEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim().toLowerCase());
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
