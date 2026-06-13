"use client";

import { Phone } from "lucide-react";
import { brand } from "@/content/brand";
import { trackWebsiteEvent } from "@/lib/tracking/events";

export function CallLink() {
  return (
    <a
      className="button-link secondary"
      href={brand.phoneHref}
      onClick={() =>
        trackWebsiteEvent("call_clicked", {
          pageUrl: window.location.href,
          referrer: document.referrer,
          payload: { location: "cta" }
        })
      }
    >
      <span>{brand.phone}</span>
      <Phone aria-hidden="true" size={18} />
    </a>
  );
}
