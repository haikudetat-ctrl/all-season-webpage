import type { Metadata } from "next";
import Image from "next/image";
import { CalendarCheck, Clock3, CloudRain, Home, ShieldCheck, Wrench } from "lucide-react";
import { CampaignCallLink } from "@/components/CampaignCallLink";
import { RoofingCampaignForm } from "@/components/RoofingCampaignForm";
import { brand } from "@/content/brand";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "15+ Year Old Roof Inspection | AllSeason Roofing",
  description: "Schedule a free roof inspection if your roof is 15+ years old, leaking, or showing signs of wear.",
  robots: {
    index: false,
    follow: false
  }
};

const proofItems = [
  {
    icon: ShieldCheck,
    title: "Prevent expensive damage",
    text: "Find aging-roof issues before a small problem turns into a leak."
  },
  {
    icon: Home,
    title: "Protect what matters",
    text: "Review the roof over your family, belongings, and long-term home value."
  },
  {
    icon: Clock3,
    title: "Plan before pressure",
    text: "Know your options before an emergency forces a rushed decision."
  }
] as const;

const steps = [
  "Confirm ZIP, roof age, and the concern that brought you in.",
  "Get a fast follow-up from a roofing specialist who knows what you asked about.",
  "Choose the right next step: inspection, repair review, or replacement planning."
] as const;

const creatives = [
  {
    src: "/campaigns/old-roof-15-primary.png",
    alt: "15 plus year old roof storm creative"
  },
  {
    src: "/campaigns/old-roof-15-sunny.png",
    alt: "15 plus year old roof sunny gable creative"
  },
  {
    src: "/campaigns/old-roof-15-family.png",
    alt: "15 plus year old roof family protection creative"
  }
] as const;

export default function OldRoofLandingPage() {
  return (
    <>
      <style>{`
        .site-header,
        .site-footer {
          display: none;
        }
      `}</style>
      <main className="meta-landing meta-roofing old-roof-campaign overflow-x-hidden w-full max-w-full">
        <section className="meta-hero">
          <div className="meta-hero-bg meta-hero-bg-old-roof" aria-hidden="true" />
          <div className="meta-hero-shell">
            <div className="meta-hero-copy">
              <img className="meta-logo" src="/brand/as-og-logo.svg" alt={`${brand.name} Roofing`} />
              <p className="meta-kicker">
                <CloudRain aria-hidden="true" size={18} />
                Free roof inspection
              </p>
              <h1>
                If your roof is
                <span>15+ years old,</span>
                <span>do not wait for the leak.</span>
              </h1>
              <p className="meta-subhead">
                Older roofs can look fine from the driveway while shingles, flashing, and decking are already starting
                to fail. Get a clear review before weather makes the decision for you.
              </p>
              <div className="meta-actions">
                <a className="meta-primary" href="#inspection">
                  <CalendarCheck aria-hidden="true" size={20} />
                  <span>Schedule free inspection</span>
                </a>
                <CampaignCallLink className="meta-secondary" label={brand.phone} location="meta_old_roof_hero" />
              </div>
            </div>

            <div id="inspection" className="meta-form-panel">
              <RoofingCampaignForm
                sourceName="AllSeason Meta Old Roof 15"
                campaignSlug="meta_old_roof_15"
                sourceHook="If your roof is 15+ years old, do not wait for the leak."
                eyebrow="Roof inspection request"
                heading="Check my roof"
                submitLabel="Schedule my inspection"
                defaultUrgency="planning"
                defaultRoofCondition="aging_roof"
              />
            </div>
          </div>

          <div className="meta-proof-row" aria-label="Why schedule an inspection">
            {proofItems.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title}>
                  <Icon aria-hidden="true" size={28} />
                  <div>
                    <h2>{item.title}</h2>
                    <p>{item.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="meta-ad-match">
          <div className="meta-ad-copy">
            <p className="eyebrow">What happens next</p>
            <h2>A simple path from roof concern to a clear answer.</h2>
            <p>
              If your roof is getting older, the goal is not to guess from the driveway. Share the basics, talk with a
              local roofing specialist, and decide whether the roof needs attention now or can be planned around.
            </p>
            <div className="meta-step-list">
              {steps.map((step, index) => (
                <div key={step}>
                  <span>{index + 1}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="meta-creative-grid" aria-label="Old roof campaign creative set">
            {creatives.map((creative) => (
              <div className="meta-ad-preview" key={creative.src}>
                <Image src={creative.src} alt={creative.alt} width={1122} height={1402} />
              </div>
            ))}
          </div>
        </section>

        <section className="meta-final-cta">
          <div>
            <p className="eyebrow">Older roof. New weather. Better to know.</p>
            <h2>Get the roof checked before a leak chooses the timeline.</h2>
          </div>
          <a className="meta-primary" href="#inspection">
            <Wrench aria-hidden="true" size={20} />
            <span>Schedule inspection</span>
          </a>
        </section>
      </main>
    </>
  );
}
