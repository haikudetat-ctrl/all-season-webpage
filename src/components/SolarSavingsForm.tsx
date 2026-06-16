"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, LockKeyhole, Phone } from "lucide-react";
import { brand } from "@/content/brand";
import { collectAttribution, trackWebsiteEvent } from "@/lib/tracking/events";

type SubmitState = "idle" | "sent";

type SolarLeadResponse = {
  ok: boolean;
  sessionId: string;
  lead?: {
    priority?: string;
    routeName?: string;
    sequenceName?: string;
    scriptId?: string;
  };
};

export function SolarSavingsForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [routeContext, setRouteContext] = useState<SolarLeadResponse["lead"]>(undefined);
  const sessionId = useMemo(() => crypto.randomUUID(), []);

  function trackingBase() {
    return {
      sessionId,
      pageUrl: window.location.href,
      referrer: document.referrer,
      attribution: collectAttribution(new URLSearchParams(window.location.search))
    };
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData(event.currentTarget);
    const payload = {
      form: "meta_fight_the_power",
      source_name: "AllSeason Meta Fight The Power",
      source_type: "paid_social_landing_page",
      zip: String(data.get("zip") ?? ""),
      monthly_bill: String(data.get("monthlyBill") ?? ""),
      roof_status: String(data.get("roofStatus") ?? ""),
      owns_home: String(data.get("ownsHome") ?? ""),
      preferred_contact_method: String(data.get("preferredContactMethod") ?? "phone")
    };

    trackWebsiteEvent("contact_submitted", {
      ...trackingBase(),
      payload
    });

    try {
      const response = await fetch("/api/solar-savings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          person: {
            name: String(data.get("name") ?? ""),
            phone: String(data.get("phone") ?? ""),
            email: String(data.get("email") ?? ""),
            preferredContactMethod: String(data.get("preferredContactMethod") ?? "phone")
          },
          property: {
            state: String(data.get("state") ?? "NJ"),
            zip: String(data.get("zip") ?? ""),
            monthlyBill: String(data.get("monthlyBill") ?? ""),
            roofStatus: String(data.get("roofStatus") ?? ""),
            ownsHome: String(data.get("ownsHome") ?? "")
          },
          consent: {
            tcpa: data.get("consent") === "on",
            sms: data.get("consent") === "on",
            email: data.get("consent") === "on",
            languageVersion: "meta_fight_power_v1"
          },
          attribution: {
            sourceName: "AllSeason Meta Fight The Power",
            sourceType: "paid_social_landing_page",
            exclusiveStatus: "exclusive",
            landingPage: window.location.href,
            referrer: document.referrer,
            ...collectAttribution(new URLSearchParams(window.location.search))
          }
        })
      });

      const body = (await response.json()) as SolarLeadResponse & { error?: string };
      if (!response.ok) {
        throw new Error(body.error === "outside_service_area" ? "That ZIP is outside the current service area." : body.error ?? "Request failed");
      }

      setRouteContext(body.lead);
      trackWebsiteEvent("form_submitted", {
        ...trackingBase(),
        payload: {
          ...payload,
          priority: body.lead?.priority,
          route_name: body.lead?.routeName,
          sequence_name: body.lead?.sequenceName,
          script_id: body.lead?.scriptId
        }
      });
      setState("sent");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Request failed. Please call the team directly.");
    } finally {
      setLoading(false);
    }
  }

  function trackCall() {
    trackWebsiteEvent("call_clicked", {
      pageUrl: window.location.href,
      referrer: document.referrer,
      attribution: collectAttribution(new URLSearchParams(window.location.search)),
      payload: { location: "meta_fight_the_power_form" }
    });
  }

  if (state === "sent") {
    return (
      <div className="solar-qualifier submitted" aria-live="polite">
        <CheckCircle2 aria-hidden="true" size={34} />
        <h2>Request received.</h2>
        <p>
          The next step is a quick review of your utility bill, home, and roof fit so the team can tell you whether solar
          savings are worth pursuing.
        </p>
        {routeContext?.priority ? <p className="campaign-route-pill">Routed {routeContext.priority}</p> : null}
        <a className="solar-call-button" href={brand.phoneHref} onClick={trackCall}>
          <Phone aria-hidden="true" size={18} />
          <span>Call now: {brand.phone}</span>
        </a>
      </div>
    );
  }

  return (
    <form className="solar-qualifier" onSubmit={submit}>
      <div className="solar-form-heading">
        <p>See if you qualify</p>
        <h2>Check solar savings</h2>
      </div>

      <div className="solar-form-grid">
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
          Monthly electric bill
          <input name="monthlyBill" inputMode="decimal" placeholder="$250" required />
        </label>
        <label>
          Roof status
          <select name="roofStatus" required defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            <option>Good condition</option>
            <option>Older roof</option>
            <option>Planning roof work</option>
            <option>Not sure</option>
          </select>
        </label>
        <label>
          Do you own the home?
          <select name="ownsHome" required defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </label>
        <label>
          Name
          <input name="name" autoComplete="name" placeholder="Your name" required />
        </label>
        <label>
          Phone
          <input name="phone" inputMode="tel" autoComplete="tel" placeholder="Best number" required />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" placeholder="Email address" />
        </label>
        <label className="full">
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
          I agree to be contacted by AllSeason Solar about roofing, solar, battery, or generator options. Consent is not
          required to purchase.
        </span>
      </label>

      {error ? <p className="form-error">{error}</p> : null}

      <button className="solar-submit" type="submit" disabled={loading}>
        <span>{loading ? "Sending request" : "Check my savings"}</span>
        {loading ? <Loader2 aria-hidden="true" className="spin" size={20} /> : <ArrowRight aria-hidden="true" size={20} />}
      </button>

      <p className="solar-security">
        <LockKeyhole aria-hidden="true" size={16} />
        Your information is used to review eligibility and follow up on this request.
      </p>
    </form>
  );
}
