import { ButtonLink } from "./ButtonLink";
import { CallLink } from "./CallLink";

export function EnterpriseCta() {
  return (
    <section className="enterprise-cta">
      <div>
        <p className="eyebrow">Ready for a clearer next step?</p>
        <h2>Start with the roof. Then decide what energy plan makes sense.</h2>
        <p>
          Get a practical roof range, ask solar-readiness questions, or talk through battery and generator options with one
          accountable local team.
        </p>
      </div>
      <div className="action-row">
        <ButtonLink href="/roof-quote">Start my roof quote</ButtonLink>
        <CallLink />
      </div>
    </section>
  );
}
