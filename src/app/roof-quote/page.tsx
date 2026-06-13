import { QuoteFlow } from "@/components/QuoteFlow";
import { SectionIntro } from "@/components/SectionIntro";

export default function RoofQuotePage() {
  return (
    <main>
      <section className="quote-page">
        <SectionIntro
          eyebrow="Roof quote"
          title="Get a good, better, best roof range before the sales call."
          body="Answer a few questions about your home, roof condition, and timing. We will show a planning range and help you decide what to review next."
        />
        <QuoteFlow />
      </section>
    </main>
  );
}
