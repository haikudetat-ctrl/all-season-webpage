export type SolarSavingsRequest = {
  sessionId?: string;
  person: {
    name: string;
    phone: string;
    email?: string;
    preferredContactMethod?: "phone" | "sms" | "email";
  };
  property: {
    state: string;
    zip: string;
    roofStatus: string;
    ownsHome: string;
    monthlyBill: string;
  };
  consent: {
    tcpa: boolean;
    sms: boolean;
    email: boolean;
    languageVersion?: string;
  };
  attribution?: {
    sourceName?: string;
    sourceType?: string;
    exclusiveStatus?: string;
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

export type SolarSavingsValidation =
  | { ok: true; value: SolarSavingsRequest }
  | { ok: false; status: number; error: string; details?: string[] };

export function validateSolarSavingsRequest(input: unknown): SolarSavingsValidation {
  if (!isRecord(input)) {
    return { ok: false, status: 400, error: "invalid_json" };
  }

  const request = input as SolarSavingsRequest;
  const missing: string[] = [];
  if (!request.person?.name?.trim()) missing.push("person.name");
  if (!request.person?.phone?.trim()) missing.push("person.phone");
  if (!request.property?.zip?.trim()) missing.push("property.zip");
  if (!request.property?.monthlyBill?.trim()) missing.push("property.monthlyBill");
  if (!request.property?.ownsHome?.trim()) missing.push("property.ownsHome");
  if (!request.property?.roofStatus?.trim()) missing.push("property.roofStatus");

  if (missing.length > 0) {
    return { ok: false, status: 400, error: "missing_required_fields", details: missing };
  }

  if (normalizePhone(request.person.phone).length !== 10) {
    return { ok: false, status: 400, error: "invalid_phone" };
  }

  if (request.person.email?.trim() && !isEmail(request.person.email)) {
    return { ok: false, status: 400, error: "invalid_email" };
  }

  if (!request.consent?.tcpa && !request.consent?.sms && !request.consent?.email) {
    return { ok: false, status: 400, error: "consent_required" };
  }

  return { ok: true, value: request };
}

export function splitName(name: string) {
  const parts = name.trim().replace(/\s+/g, " ").split(" ");
  const firstName = parts.shift() ?? "";
  return {
    firstName,
    lastName: parts.join(" ")
  };
}

export function parseMonthlyBill(value: string): number {
  const numeric = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
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
