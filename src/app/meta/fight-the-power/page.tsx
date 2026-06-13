import type { Metadata } from "next";
import Image from "next/image";
import { BatteryCharging, BadgeCheck, Home, ShieldCheck, SunMedium, Zap } from "lucide-react";
import { CampaignCallLink } from "@/components/CampaignCallLink";
import { SolarSavingsForm } from "@/components/SolarSavingsForm";
import { brand } from "@/content/brand";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Fight The Power Bill | AllSeason Solar",
  description: "See whether your home may qualify for solar savings with AllSeason Solar.",
  robots: {
    index: false,
    follow: false
  }
};

const proofItems = [
  {
    icon: Home,
    title: "Roof + solar planning",
    text: "Review roof condition before anyone promises panel savings."
  },
  {
    icon: BadgeCheck,
    title: "Local installer context",
    text: "Built for New Jersey homeowners who want one accountable team."
  },
  {
    icon: ShieldCheck,
    title: "Warranty-backed service",
    text: "Position solar, roof, and backup power around long-term support."
  }
] as const;

const steps = [
  "Share your ZIP and monthly electric bill.",
  "Confirm roof status and home ownership.",
  "Get a fast follow-up on whether solar is worth reviewing."
] as const;

export default function FightThePowerPage() {
  return (
    <>
      <style>{`
        .site-header,
        .site-footer {
          display: none;
        }
      `}</style>
      <main className="meta-landing overflow-x-hidden w-full max-w-full">
        <section className="meta-hero">
          <div className="meta-hero-bg" aria-hidden="true" />
          <div className="meta-hero-shell">
            <div className="meta-hero-copy">
              <img className="meta-logo" src="/brand/as-og-logo.svg" alt={`${brand.name} Solar`} />
              <p className="meta-kicker">
                <Zap aria-hidden="true" size={18} />
                Static Meta ad landing page
              </p>
              <h1>
                Fight the
                <span>power bill.</span>
              </h1>
              <p className="meta-subhead">
                Your electric company hopes you never check what solar could do. See if your bill, roof, and home fit
                AllSeason's solar savings review.
              </p>
              <div className="meta-actions">
                <a className="meta-primary" href="#qualify">
                  <SunMedium aria-hidden="true" size={20} />
                  <span>Check my savings</span>
                </a>
                <CampaignCallLink className="meta-secondary" label={brand.phone} location="meta_fight_the_power_hero" />
              </div>
            </div>

            <div id="qualify" className="meta-form-panel">
              <SolarSavingsForm />
            </div>
          </div>

          <div className="meta-proof-row" aria-label="Why AllSeason">
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
            <p className="eyebrow">Message matched to the ad</p>
            <h2>From thumb-stopping creative to a focused qualification path.</h2>
            <p>
              This route is built for paid social traffic. It keeps the promise from the Meta creative, removes standard
              website navigation, and asks only for the context needed to decide whether a solar conversation makes sense.
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
          <div className="meta-ad-preview">
            <Image
              src="/campaigns/fight-the-power-meta.png"
              alt="AllSeason Solar Fight The Power Meta ad creative"
              width={1500}
              height={900}
            />
          </div>
        </section>

        <section className="meta-final-cta">
          <div>
            <p className="eyebrow">Lower bills. Energy independence. A better future.</p>
            <h2>See whether the numbers are worth a closer look.</h2>
          </div>
          <a className="meta-primary" href="#qualify">
            <BatteryCharging aria-hidden="true" size={20} />
            <span>Qualify now</span>
          </a>
        </section>
      </main>
    </>
  );
}
