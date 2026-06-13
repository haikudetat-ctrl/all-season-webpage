import { MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { CallLink } from "@/components/CallLink";
import { brand } from "@/content/brand";

export default function ServiceAreasPage() {
  return (
    <main>
      <section className="subhero simple">
        <div>
          <p className="eyebrow">Service areas</p>
          <h1>Roofing and energy service across New Jersey and nearby states.</h1>
          <p>
            Start by checking your ZIP. AllSeason reviews roofing, solar, battery, and generator requests across its active
            service footprint and can confirm the right next step for your home.
          </p>
          <div className="action-row">
            <ButtonLink href="/roof-quote">Check my ZIP</ButtonLink>
            <CallLink />
          </div>
        </div>
      </section>
      <section className="content-band">
        <div className="section-kicker">
          <p className="eyebrow">Current footprint</p>
          <h2>Local context matters when the roof, utility, and weather are part of the project.</h2>
          <p>
            Service availability can depend on ZIP code, licensing, crew schedule, project type, and utility territory.
            The fastest way to confirm fit is to start a quote or contact the team.
          </p>
        </div>
        <div className="area-grid">
          {brand.serviceStates.map((state) => (
            <article key={state}>
              <MapPin aria-hidden="true" size={20} />
              <span>{state}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="enterprise-cta service-final-cta">
        <div>
          <p className="eyebrow">Not sure if you are covered?</p>
          <h2>Send the address and project type. We will help route the request.</h2>
          <p>Roof replacement, solar, battery, generator, and roof-plus-solar requests can each have different coverage details.</p>
        </div>
        <div className="action-row">
          <ButtonLink href="/contact">Ask about my area</ButtonLink>
          <CallLink />
        </div>
      </section>
    </main>
  );
}
