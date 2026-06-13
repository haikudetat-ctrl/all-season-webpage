import { ProofBand } from "@/components/ProofBand";
import { SectionIntro } from "@/components/SectionIntro";
import { ButtonLink } from "@/components/ButtonLink";
import { CallLink } from "@/components/CallLink";
import { brand } from "@/content/brand";
import { proofCards } from "@/content/pages";

export default function AboutProofPage() {
  return (
    <main>
      <section className="subhero simple">
        <div>
          <p className="eyebrow">About and proof</p>
          <h1>A roofing and solar team built around long-term home decisions.</h1>
          <p>
            AllSeason brings decades of roofing, building, electrical, and solar experience to projects where the roof,
            energy system, warranty, and service path all need to work together.
          </p>
          <div className="action-row">
            <ButtonLink href="/roof-quote">Start my roof quote</ButtonLink>
            <CallLink />
          </div>
        </div>
      </section>
      <ProofBand />
      <section className="content-band">
        <SectionIntro
          eyebrow="Why homeowners call"
          title={brand.tagline}
          body={`${brand.warrantyProof}. ${brand.yearsProof}.`}
        />
        <div className="proof-card-grid">
          {proofCards.map((card) => {
            const Icon = card.icon;
            return (
              <article className="proof-card" key={card.title}>
                <Icon aria-hidden="true" size={24} />
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="service-story">
        <div>
          <p className="eyebrow">What makes this different</p>
          <h2>Roofing, solar, batteries, and generators are not separate conversations.</h2>
        </div>
        <p>
          The roof protects the home. Solar sits on that roof. Batteries and generators change how the home uses power.
          AllSeason helps homeowners look at the connected decision instead of managing several disconnected vendors.
        </p>
      </section>

      <section className="enterprise-cta service-final-cta">
        <div>
          <p className="eyebrow">Start with clarity</p>
          <h2>Ask the roof and energy questions before you choose a contractor.</h2>
          <p>We can help you compare project timing, warranty, roof condition, and solar fit before the proposal stage.</p>
        </div>
        <div className="action-row">
          <ButtonLink href="/contact">Talk to AllSeason</ButtonLink>
          <CallLink />
        </div>
      </section>
    </main>
  );
}
