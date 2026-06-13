"use client";

import { Phone } from "lucide-react";
import { brand } from "@/content/brand";
import { collectAttribution, trackWebsiteEvent } from "@/lib/tracking/events";

type CampaignCallLinkProps = {
  className: string;
  label?: string;
  location: string;
};

export function CampaignCallLink({ className, label = brand.phone, location }: CampaignCallLinkProps) {
  return (
    <a
      className={className}
      href={brand.phoneHref}
      onClick={() =>
        trackWebsiteEvent("call_clicked", {
          pageUrl: window.location.href,
          referrer: document.referrer,
          attribution: collectAttribution(new URLSearchParams(window.location.search)),
          payload: { location }
        })
      }
    >
      <Phone aria-hidden="true" size={18} />
      <span>{label}</span>
    </a>
  );
}
