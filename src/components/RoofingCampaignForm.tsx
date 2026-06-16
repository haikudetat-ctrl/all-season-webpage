"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, LockKeyhole, Phone } from "lucide-react";
import { brand } from "@/content/brand";
import { collectAttribution, trackWebsiteEvent } from "@/lib/tracking/events";

type SubmitState = "idle" | "sent";

type RoofingCampaignFormProps = {
  sourceName: string;
  campaignSlug: string;
  heading: string;
  eyebrow: string;
  submitLabel: string;
  sourceHook: string;
  defaultUrgency?: "planning" | "active_leak" | "storm_damage" | "selling_home";
  defaultRoofCondition?: string;
};

type QuoteResponse = {
  ok: boolean;
  sessionId: string;
  lead?: {
    priority?: string;
    routeName?: string;
    sequenceName?: string;
    scriptId?: string;
  };
};

export function RoofingCampaignForm({
  sourceName,
  campaignSlug,
  heading,
  eyebrow,
  submitLabel,
  sourceHook,
  defaultUrgency = "planning",
  defaultRoofCondition = "aging_roof"
}: RoofingCampaignFormProps) {
  const [state, setState] = useState<SubmitState>("idle");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [routeContext, setRouteContext] = useState<QuoteResponse["lead"]>(undefined);
  const sessionId = useMemo(() => crypto.randomUUID(), []);

  function trackingBase() {
    const searchParams = new URLSearchParams(window.location.search);
    return {
      sessionId,
      pageUrl: window.location.href,
      referrer: document.referrer,
      attribution: collectAttribution(searchParams)
    };
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData(event.currentTarget);
    const firstName = String(data.get("firstName") ?? "").trim();
    const lastName = String(data.get("lastName") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const zip = String(data.get("zip") ?? "").trim();
    const stateValue = String(data.get("state") ?? "NJ");
    const roofAge = Number(String(data.get("roofAge") ?? "").replace(/\D/g, ""));
    const urgency = String(data.get("urgency") ?? defaultUrgency);
    const roofConcern = String(data.get("roofConcern") ?? defaultRoofCondition);
    const preferredContactMethod = String(data.get("preferredContactMethod") ?? "phone") as "phone" | "sms" | "email";
    const consent = data.get("consent") === "on";

    const payload = {
      form: campaignSlug,
      source_name: sourceName,
      source_type: "paid_social_landing_page",
      source_hook: sourceHook,
      zip,
      state: stateValue,
      roof_age: Number.isFinite(roofAge) && roofAge > 0 ? roofAge : null,
      urgency,
      roof_concern: roofConcern,
      preferred_contact_method: preferredContactMethod
    };

    trackWebsiteEvent("contact_submitted", {
      ...trackingBase(),
      payload
    });

    try {
      const response = await fetch("/api/roof-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          person: {
            firstName,
            lastName,
            phone,
            email,
            preferredContactMethod
          },
          property: {
            state: stateValue,
            zip,
            homeType: "single_family",
            roofAge: Number.isFinite(roofAge) && roofAge > 0 ? roofAge : null,
            roofMaterial: "asphalt_shingle"
          },
          quote: {
            roofSquares: 20,
            homeSizeSqft: 2200,
            urgency,
            roofPitch: "standard",
            roofLayers: 1,
            roofCondition: roofConcern,
            deckingConcern: roofConcern === "soft_spots_or_decking",
            skylights: 0,
            solarReady: false
          },
          consent: {
            tcpa: consent,
            sms: consent,
            email: consent,
            languageVersion: `${campaignSlug}_v1`
          },
          attribution: {
            sourceName,
            sourceType: "paid_social_landing_page",
            exclusiveStatus: "exclusive",
            landingPage: window.location.href,
            referrer: document.referrer,
            ...collectAttribution(new URLSearchParams(window.location.search))
          }
        })
      });

      const body = (await response.json()) as QuoteResponse & { error?: string; details?: string[] };
      if (!response.ok) {
        throw new Error(body.error === "outside_service_area" ? "That ZIP is outside the current service area." : body.error ?? "Request failed");
      }

      setRouteContext(body.lead);
      trackWebsiteEvent("estimate_shown", {
        ...trackingBase(),
        payload: {
          ...payload,
          priority: body.lead?.priority,
          route_name: body.lead?.routeName,
          sequence_name: body.lead?.sequenceName,
          script_id: body.lead?.scriptId
        }
      });
      trackWebsiteEvent("form_submitted", {
        ...trackingBase(),
        payload: {
          ...payload,
          priority: body.lead?.priority
        }
      });
      setState("sent");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Request failed. Please call the team directly.");
    } finally {
      setLoading(false);
    }
  }

  function trackCall(location: string) {
    trackWebsiteEvent("call_clicked", {
      ...trackingBase(),
      payload: { location, source_name: sourceName, campaign: campaignSlug }
    });
  }

  if (state === "sent") {
    return (
      <div className="solar-qualifier submitted roofing-qualifier" aria-live="polite">
        <CheckCircle2 aria-hidden="true" size={34} />
        <h2>Request received.</h2>
        <p>
          The team now has your campaign source, roof context, and contact preference. The next step is a fast roofing
          review with a local AllSeason specialist.
        </p>
        {routeContext?.priority ? <p className="campaign-route-pill">Routed {routeContext.priority}</p> : null}
        <a className="solar-call-button" href={brand.phoneHref} onClick={() => trackCall(`${campaignSlug}_success`)}>
          <Phone aria-hidden="true" size={18} />
          <span>Call now: {brand.phone}</span>
        </a>
      </div>
    );
  }

  return (
    <form className="solar-qualifier roofing-qualifier" onSubmit={submit}>
      <div className="solar-form-heading">
        <p>{eyebrow}</p>
        <h2>{heading}</h2>
      </div>

      <div className="solar-form-grid">
        <label>
          First name
          <input name="firstName" autoComplete="given-name" placeholder="First name" required />
        </label>
        <label>
          Last name
          <input name="lastName" autoComplete="family-name" placeholder="Last name" />
        </label>
        <label>
          ZIP code
          <input name="zip" inputMode="numeric" minLength={5} maxLength={10} placeholder="08205" required />
        </label>
        <label>
          State
          <select name="state" required defaultValue="NJ">
            {["NJ", "PA", "MD", "VA", "DE", "IL"].map((stateValue) => (
              <option key={stateValue} value={stateValue}>
                {stateValue}
              </option>
            ))}
          </select>
        </label>
        <label>
          Roof age
          <select name="roofAge" required defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            <option value="8">Under 10 years</option>
            <option value="15">10-15 years</option>
            <option value="18">15-20 years</option>
            <option value="25">20+ years</option>
            <option value="0">Not sure</option>
          </select>
        </label>
        <label>
          Main concern
          <select name="roofConcern" required defaultValue={defaultRoofCondition}>
            <option value="aging_roof">Older roof</option>
            <option value="active_leak">Leak or stains</option>
            <option value="storm_damage">Storm or wind damage</option>
            <option value="soft_spots_or_decking">Soft spots/decking concern</option>
            <option value="warranty_review">Warranty comparison</option>
          </select>
        </label>
        <label>
          Timing
          <select name="urgency" required defaultValue={defaultUrgency}>
            <option value="planning">Planning ahead</option>
            <option value="active_leak">Active leak</option>
            <option value="storm_damage">Storm damage</option>
            <option value="selling_home">Selling the home</option>
          </select>
        </label>
        <label>
          Phone
          <input name="phone" inputMode="tel" autoComplete="tel" placeholder="Best number" required />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" placeholder="Email address" required />
        </label>
        <label>
          Preferred follow-up
          <select name="preferredContactMethod" defaultValue="phone">
            <option value="phone">Call me</option>
            <option value="sms">Text me</option>
            <option value="email">Email me</option>
          </select>
        </label>
      </div>

      <label className="solar-consent">
        <input name="consent" type="checkbox" required />
        <span>
          I agree to be contacted by AllSeason about my roofing request by call, text, or email. Consent is not required
          to purchase.
        </span>
      </label>

      {error ? <p className="form-error">{error}</p> : null}

      <button className="solar-submit" type="submit" disabled={loading}>
        <span>{loading ? "Sending request" : submitLabel}</span>
        {loading ? <Loader2 aria-hidden="true" className="spin" size={20} /> : <ArrowRight aria-hidden="true" size={20} />}
      </button>

      <p className="solar-security">
        <LockKeyhole aria-hidden="true" size={16} />
        Your request is used to schedule and prepare a roofing review.
      </p>
    </form>
  );
}
