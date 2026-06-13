import { marqueeItems } from "@/content/pages";

export function EnterpriseMarquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="enterprise-marquee" aria-label="AllSeason platform strengths">
      <div className="marquee-track">
        {items.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
