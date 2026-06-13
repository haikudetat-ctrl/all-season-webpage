import Link from "next/link";
import { brand, navItems } from "@/content/brand";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="footer-brand" href="/">
          {brand.name}
        </Link>
        <p>{brand.tagline}</p>
      </div>
      <div className="footer-grid">
        <div>
          <strong>Contact</strong>
          <a href={brand.phoneHref}>{brand.phone}</a>
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
          <span>{brand.address}</span>
        </div>
        <div>
          <strong>Services</strong>
          {navItems.slice(0, 4).map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div>
          <strong>Company</strong>
          <Link href="/about-proof">About and proof</Link>
          <Link href="/service-areas">Service areas</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
