"use client";

import { FormEvent, useMemo, useState } from "react";
import { Calculator, CheckCircle2, Loader2 } from "lucide-react";
import { collectAttribution, trackWebsiteEvent } from "@/lib/tracking/events";

type QuoteResponse = {
  ok: boolean;
  sessionId: string;
  estimate: {
    tiers: Record<"good" | "better" | "best", { label: string; low: number; high: number; base: number }>;
    disclaimer: string;
  };
  lead: {
    priority?: string;
    routeName?: string;
    scriptId?: string;
  };
};

const defaultForm = {
  zip: "08080",
  state: "NJ",
  city: "Sewell",
  street: "",
  roofSquares: 20,
  homeSizeSqft: 2200,
  roofCondition: "aging",
  urgency: "planning",
  roofPitch: "standard",
  roofLayers: 1,
  deckingConcern: false,
  skylights: 0,
  solarReady: true,
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  consent: false
};

export function QuoteFlow() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(defaultForm);
  const [result, setResult] = useState<QuoteResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const sessionId = useMemo(() => crypto.randomUUID(), []);

  function setField<T extends keyof typeof defaultForm>(field: T, value: (typeof defaultForm)[T]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function pagePayload() {
    const searchParams = new URLSearchParams(window.location.search);
    return {
      sessionId,
      pageUrl: window.location.href,
      referrer: document.referrer,
      attribution: collectAttribution(searchParams)
    };
  }

  function advance(nextStep: number) {
    if (step === 1) {
      trackWebsiteEvent("quote_started", { ...pagePayload(), payload: { zip: form.zip, state: form.state } });
      trackWebsiteEvent("zip_checked", { ...pagePayload(), payload: { zip: form.zip, state: form.state } });
    }
    trackWebsiteEvent("quote_step_completed", { ...pagePayload(), payload: { step } });
    setStep(nextStep);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    trackWebsiteEvent("contact_submitted", { ...pagePayload(), payload: { service: "roofing" } });

    try {
      const response = await fetch("/api/roof-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          person: {
            firstName: form.firstName,
            lastName: form.lastName,
            phone: form.phone,
            email: form.email,
            preferredContactMethod: "phone"
          },
          property: {
            street: form.street,
            city: form.city,
            state: form.state,
            zip: form.zip,
            homeType: "single_family",
            roofMaterial: "asphalt_shingle"
          },
          quote: {
            roofSquares: Number(form.roofSquares),
            homeSizeSqft: Number(form.homeSizeSqft),
            urgency: form.urgency,
            roofPitch: form.roofPitch,
            roofLayers: Number(form.roofLayers),
            roofCondition: form.roofCondition,
            deckingConcern: form.deckingConcern,
            skylights: Number(form.skylights),
            solarReady: form.solarReady
          },
          consent: {
            tcpa: form.consent,
            sms: form.consent,
            email: form.consent,
            languageVersion: "roof_quote_v1"
          },
          attribution: {
            landingPage: window.location.href,
            referrer: document.referrer,
            ...collectAttribution(new URLSearchParams(window.location.search))
          }
        })
      });

      const body = await response.json();
      if (!response.ok) {
        throw new Error(body.error ?? "Quote request failed");
      }

      setResult(body);
      setStep(4);
      trackWebsiteEvent("estimate_shown", { ...pagePayload(), payload: { priority: body.lead?.priority } });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Quote request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="quote-shell">
      <div className="quote-progress" aria-label="Quote progress">
        {[1, 2, 3, 4].map((item) => (
          <span key={item} className={item <= step ? "active" : ""} />
        ))}
      </div>

      {step === 1 ? (
        <div className="quote-step">
          <p className="eyebrow">Step 1</p>
          <h2>Start with the home.</h2>
          <div className="form-grid">
            <label>
              ZIP code
              <input value={form.zip} onChange={(event) => setField("zip", event.target.value)} inputMode="numeric" />
            </label>
            <label>
              State
              <select value={form.state} onChange={(event) => setField("state", event.target.value)}>
                {["NJ", "PA", "MD", "VA", "DE", "IL"].map((state) => (
                  <option key={state}>{state}</option>
                ))}
              </select>
            </label>
            <label>
              Approx. roof squares
              <input value={form.roofSquares} min={8} max={80} onChange={(event) => setField("roofSquares", Number(event.target.value))} type="number" />
            </label>
            <label>
              Home size helper
              <input value={form.homeSizeSqft} min={800} max={9000} onChange={(event) => setField("homeSizeSqft", Number(event.target.value))} type="number" />
            </label>
          </div>
          <button className="button-link primary" type="button" onClick={() => advance(2)}>
            <span>Continue</span>
            <Calculator aria-hidden="true" size={18} />
          </button>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="quote-step">
          <p className="eyebrow">Step 2</p>
          <h2>Tell us what changes the scope.</h2>
          <div className="form-grid">
            <label>
              Main reason
              <select value={form.urgency} onChange={(event) => setField("urgency", event.target.value)}>
                <option value="planning">Planning ahead</option>
                <option value="active_leak">Active leak</option>
                <option value="storm_damage">Storm damage</option>
                <option value="selling_home">Selling the home</option>
              </select>
            </label>
            <label>
              Roof pitch
              <select value={form.roofPitch} onChange={(event) => setField("roofPitch", event.target.value)}>
                <option value="standard">Standard</option>
                <option value="steep">Steep</option>
                <option value="low_slope">Low slope area</option>
              </select>
            </label>
            <label>
              Existing layers
              <input type="number" min={1} max={3} value={form.roofLayers} onChange={(event) => setField("roofLayers", Number(event.target.value))} />
            </label>
            <label>
              Skylights
              <input type="number" min={0} max={8} value={form.skylights} onChange={(event) => setField("skylights", Number(event.target.value))} />
            </label>
          </div>
          <div className="toggle-row">
            <label>
              <input type="checkbox" checked={form.deckingConcern} onChange={(event) => setField("deckingConcern", event.target.checked)} />
              Decking may need review
            </label>
            <label>
              <input type="checkbox" checked={form.solarReady} onChange={(event) => setField("solarReady", event.target.checked)} />
              Make it solar-ready
            </label>
          </div>
          <button className="button-link primary" type="button" onClick={() => advance(3)}>
            <span>See my options</span>
            <Calculator aria-hidden="true" size={18} />
          </button>
        </div>
      ) : null}

      {step === 3 ? (
        <form className="quote-step" onSubmit={submit}>
          <p className="eyebrow">Step 3</p>
          <h2>Where should we send the range?</h2>
          <p className="muted">We collect contact details before showing the final range so the team can help turn the online estimate into a real quote.</p>
          <div className="form-grid">
            <label>
              First name
              <input required value={form.firstName} onChange={(event) => setField("firstName", event.target.value)} />
            </label>
            <label>
              Last name
              <input value={form.lastName} onChange={(event) => setField("lastName", event.target.value)} />
            </label>
            <label>
              Phone
              <input required value={form.phone} onChange={(event) => setField("phone", event.target.value)} inputMode="tel" />
            </label>
            <label>
              Email
              <input required value={form.email} onChange={(event) => setField("email", event.target.value)} type="email" />
            </label>
          </div>
          <label className="consent-line">
            <input required type="checkbox" checked={form.consent} onChange={(event) => setField("consent", event.target.checked)} />
            I agree AllSeason may call, text, or email me about my roof quote. Message/data rates may apply.
          </label>
          {error ? <p className="form-error">{error}</p> : null}
          <button className="button-link primary" type="submit" disabled={loading}>
            <span>{loading ? "Building estimate" : "Show my estimate"}</span>
            {loading ? <Loader2 aria-hidden="true" className="spin" size={18} /> : <Calculator aria-hidden="true" size={18} />}
          </button>
        </form>
      ) : null}

      {step === 4 && result ? (
        <div className="quote-step">
          <p className="eyebrow">Your estimate range</p>
          <h2>Good, better, best options are ready.</h2>
          <div className="tier-grid">
            {Object.values(result.estimate.tiers).map((tier) => (
              <div className="tier-card" key={tier.label}>
                <span>{tier.label}</span>
                <strong>
                  {currency(tier.low)} - {currency(tier.high)}
                </strong>
                <small>Online planning range</small>
              </div>
            ))}
          </div>
          <p className="muted">{result.estimate.disclaimer}</p>
          <div className="result-note">
            <CheckCircle2 aria-hidden="true" size={20} />
            <span>Your request is ready for a roofing review. The next conversation can start with these details.</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}
