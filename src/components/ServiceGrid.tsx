import Link from "next/link";
import { serviceCards } from "@/content/pages";

export function ServiceGrid() {
  return (
    <div className="service-grid">
      {serviceCards.map((service) => {
        const Icon = service.icon;
        return (
          <Link className="service-card" key={service.href} href={service.href}>
            <Icon aria-hidden="true" size={24} />
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </Link>
        );
      })}
    </div>
  );
}
