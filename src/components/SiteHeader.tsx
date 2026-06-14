import Link from "next/link";
import { Calculator, Phone } from "lucide-react";
import { brand, navItems } from "@/content/brand";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand-mark" href="/" aria-label={`${brand.name} home`}>
        <img className="brand-logo" src="/brand/as-og-logo.svg" alt={`${brand.name} Solar logo`} />
        <span className="brand-lockup">
          <small>Roofing + Energy</small>
        </span>
      </Link>

      <nav className="main-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <a className="icon-link" href={brand.phoneHref} aria-label={`Call ${brand.name}`}>
          <Phone aria-hidden="true" size={18} />
          <span>{brand.phone}</span>
        </a>
        <Link className="quote-button" href="/roof-quote" aria-label="Start roof quote">
          <Calculator aria-hidden="true" size={18} />
          <span>Roof quote</span>
        </Link>
      </div>
    </header>
  );
}
