import { ContactForm } from "@/components/ContactForm";
import { ButtonLink } from "@/components/ButtonLink";
import { brand } from "@/content/brand";

export default function ContactPage() {
  return (
    <main>
      <section className="contact-layout">
        <div>
          <p className="eyebrow">Contact</p>
          <h1>Talk through your roof, solar, or backup power options.</h1>
          <p>
            Send the basics and the team can help you decide whether you need a roof quote, a solar review, a battery or
            generator conversation, or a warranty question answered first.
          </p>
          <div className="action-row">
            <ButtonLink href="/roof-quote">Start my roof quote</ButtonLink>
          </div>
          <div className="contact-card">
            <strong>{brand.phone}</strong>
            <span>{brand.email}</span>
            <span>{brand.address}</span>
          </div>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
