"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { trackWebsiteEvent } from "@/lib/tracking/events";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trackWebsiteEvent("form_submitted", {
      pageUrl: window.location.href,
      referrer: document.referrer,
      payload: { form: "contact" }
    });
    setSent(true);
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-grid">
        <label>
          Name
          <input required name="name" />
        </label>
        <label>
          Phone
          <input required name="phone" inputMode="tel" />
        </label>
        <label>
          Email
          <input required name="email" type="email" />
        </label>
        <label>
          Service
          <select name="service">
            <option>Roofing</option>
            <option>Solar</option>
            <option>Battery</option>
            <option>Generator</option>
          </select>
        </label>
      </div>
      <label>
        What is going on?
        <textarea name="message" rows={5} />
      </label>
      <button className="button-link primary" type="submit">
        <span>{sent ? "Request noted" : "Send request"}</span>
        <Send aria-hidden="true" size={18} />
      </button>
      {sent ? <p className="muted">Thanks. The team will review your request and follow up with the right next step.</p> : null}
    </form>
  );
}
