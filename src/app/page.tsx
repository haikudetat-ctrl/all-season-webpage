import { ButtonLink } from "@/components/ButtonLink";
import { CallLink } from "@/components/CallLink";
import { EnterpriseBento } from "@/components/EnterpriseBento";
import { EnterpriseCta } from "@/components/EnterpriseCta";
import { EnterpriseMarquee } from "@/components/EnterpriseMarquee";
import { MotionNarrative } from "@/components/MotionNarrative";
import { ServiceAccordion } from "@/components/ServiceAccordion";
import { hero, proofStats } from "@/content/pages";

export default function HomePage() {
  return (
    <main className="premium-home overflow-x-hidden w-full max-w-full">
      <section className="hero-section premium-hero">
        <div className="hero-media" style={{ backgroundImage: `url(${hero.image})` }} aria-hidden="true" />
        <div className="hero-content premium-hero-content">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>{hero.title}</h1>
          <p>{hero.body}</p>
          <div className="action-row hero-actions">
            <ButtonLink href="/roof-quote">Start my roof quote</ButtonLink>
            <CallLink />
          </div>
        </div>
      </section>

      <EnterpriseMarquee />

      <section className="content-band">
        <div className="section-kicker">
          <p className="eyebrow">One home, one plan</p>
          <h2>Stop shopping disconnected roof and energy advice.</h2>
          <p>
            Your roof, solar panels, battery, generator, warranty, and financing all affect each other. AllSeason helps you
            understand the right order before you commit to the wrong project.
          </p>
        </div>
        <EnterpriseBento />
      </section>

      <section className="proof-strip" aria-label="AllSeason proof points">
        {proofStats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="content-band">
        <div className="section-kicker compact">
          <p className="eyebrow">Services</p>
          <h2>Roofing and home energy, planned together.</h2>
        </div>
        <ServiceAccordion />
      </section>

      <MotionNarrative />

      <EnterpriseCta />
    </main>
  );
}
