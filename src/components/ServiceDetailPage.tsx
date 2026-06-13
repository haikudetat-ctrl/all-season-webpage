import { CheckCircle2 } from "lucide-react";
import { CallLink } from "./CallLink";
import { ButtonLink } from "./ButtonLink";

type ServiceDetailPageProps = {
  page: {
    eyebrow: string;
    title: string;
    body: string;
    image: string;
    bullets: readonly string[];
    cta: { label: string; href: string };
    introTitle: string;
    introBody: string;
    highlights: readonly { title: string; text: string }[];
    steps: readonly { title: string; text: string }[];
    faqs: readonly { question: string; answer: string }[];
  };
};

export function ServiceDetailPage({ page }: ServiceDetailPageProps) {
  return (
    <main>
      <section className="subhero">
        <div>
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p>{page.body}</p>
          <ButtonLink href={page.cta.href}>{page.cta.label}</ButtonLink>
        </div>
        <div className="subhero-image" style={{ backgroundImage: `url(${page.image})` }} aria-hidden="true" />
      </section>

      <section className="content-band">
        <div className="check-list">
          {page.bullets.map((bullet) => (
            <div key={bullet}>
              <CheckCircle2 aria-hidden="true" size={20} />
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="service-story">
        <div>
          <p className="eyebrow">What to know</p>
          <h2>{page.introTitle}</h2>
        </div>
        <p>{page.introBody}</p>
      </section>

      <section className="content-band service-detail-band">
        <div className="service-highlight-grid">
          {page.highlights.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="split-band service-process-band">
        <div>
          <p className="eyebrow">How it works</p>
          <h2>A simpler path to the right project.</h2>
          <p>
            You do not need to know every product detail before you reach out. Share what you know now, and the team can
            help narrow the next step.
          </p>
        </div>
        <div className="process-list">
          {page.steps.map((step, index) => (
            <article key={step.title}>
              <span>{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-band">
        <div className="section-kicker compact">
          <p className="eyebrow">Common questions</p>
          <h2>Questions worth asking before you sign.</h2>
        </div>
        <div className="faq-grid">
          {page.faqs.map((item) => (
            <article key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="enterprise-cta service-final-cta">
        <div>
          <p className="eyebrow">Next step</p>
          <h2>Get a clearer answer before you compare another bid.</h2>
          <p>Start with the details you already know. AllSeason can help you sort out price, timing, warranty, and fit.</p>
        </div>
        <div className="action-row">
          <ButtonLink href={page.cta.href}>{page.cta.label}</ButtonLink>
          <CallLink />
        </div>
      </section>
    </main>
  );
}
