import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck, CalendarCheck, Hammer, Home, ShieldCheck, UsersRound } from "lucide-react";
import { CampaignCallLink } from "@/components/CampaignCallLink";
import { RoofingCampaignForm } from "@/components/RoofingCampaignForm";
import { brand } from "@/content/brand";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Lifetime Warranty Roof Quote | AllSeason Roofing",
  description: "Request a roofing review from AllSeason with certified installation and lifetime warranty options.",
  robots: {
    index: false,
    follow: false
  }
};

const proofItems = [
  {
    icon: BadgeCheck,
    title: "Lifetime warranty options",
    text: "Compare roof systems built around stronger long-term protection."
  },
  {
    icon: Hammer,
    title: "Certified installers",
    text: "Get the roof installed by a team that understands warranty standards."
  },
  {
    icon: UsersRound,
    title: "Decades of trust",
    text: "Work with an experienced local team, not a lead seller."
  }
] as const;

const steps = [
  "Capture warranty interest, roof condition, ZIP, and preferred follow-up.",
  "Review the roof condition and the protection level that makes sense.",
  "Compare clear good, better, best options before deciding what comes next."
] as const;

const creatives = [
  {
    src: "/campaigns/roof-warranty-primary.png",
    alt: "The roof above everything that matters lifetime warranty creative",
    width: 1440,
    height: 1800
  },
  {
    src: "/campaigns/roof-warranty-neighborhood.png",
    alt: "The roof above everything that matters neighborhood protection creative",
    width: 1440,
    height: 1800
  },
  {
    src: "/campaigns/roof-warranty-family.png",
    alt: "Your family protected forever roofing warranty creative",
    width: 1122,
    height: 1402
  }
] as const;

export default function RoofWarrantyLandingPage() {
  return (
    <>
      <style>{`
        .site-header,
        .site-footer {
          display: none;
        }
      `}</style>
      <main className="meta-landing meta-roofing warranty-campaign overflow-x-hidden w-full max-w-full">
        <section className="meta-hero">
          <div className="meta-hero-bg meta-hero-bg-warranty" aria-hidden="true" />
          <div className="meta-hero-shell">
            <div className="meta-hero-copy">
              <img className="meta-logo" src="/brand/as-og-logo.svg" alt={`${brand.name} Roofing`} />
              <p className="meta-kicker">
                <ShieldCheck aria-hidden="true" size={18} />
                Warranty-backed roofing
              </p>
              <h1>
                The roof above
                <span>everything that matters.</span>
              </h1>
              <p className="meta-subhead">
                Your roof protects the people, rooms, memories, and investment underneath it. See what a certified,
                warranty-backed roof plan could look like for your home.
              </p>
              <div className="meta-actions">
                <a className="meta-primary" href="#warranty-review">
                  <CalendarCheck aria-hidden="true" size={20} />
                  <span>Get free quote</span>
                </a>
                <CampaignCallLink className="meta-secondary" label={brand.phone} location="meta_roof_warranty_hero" />
              </div>
            </div>

            <div id="warranty-review" className="meta-form-panel">
              <RoofingCampaignForm
                sourceName="AllSeason Meta Lifetime Warranty"
                campaignSlug="meta_lifetime_warranty"
                sourceHook="The roof above everything that matters / lifetime warranty."
                eyebrow="Warranty review"
                heading="Get my quote"
                submitLabel="Get my free quote"
                defaultUrgency="planning"
                defaultRoofCondition="warranty_review"
              />
            </div>
          </div>

          <div className="meta-proof-row" aria-label="Why AllSeason warranty roofing">
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
            <h2>Start with protection, then compare the roof options clearly.</h2>
            <p>
              A strong roof decision should make the system, installation standard, warranty, timing, and price easy to
              understand. Start with a quick review and see which option fits your home.
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
          <div className="meta-creative-grid" aria-label="Warranty campaign creative set">
            {creatives.map((creative) => (
              <div className="meta-ad-preview" key={creative.src}>
                <Image src={creative.src} alt={creative.alt} width={creative.width} height={creative.height} />
              </div>
            ))}
          </div>
        </section>

        <section className="meta-final-cta">
          <div>
            <p className="eyebrow">Your family. Protected. For the long run.</p>
            <h2>Compare roofing options built around lifetime protection.</h2>
          </div>
          <a className="meta-primary" href="#warranty-review">
            <Home aria-hidden="true" size={20} />
            <span>Get free quote</span>
          </a>
        </section>
      </main>
    </>
  );
}
