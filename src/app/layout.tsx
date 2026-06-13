import type { Metadata } from "next";
import { Geist, Merriweather } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { brand } from "@/content/brand";

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans"
});

const serif = Merriweather({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-serif"
});

export const metadata: Metadata = {
  title: `${brand.name} | Roofing, solar, batteries, and generators`,
  description: brand.tagline,
  openGraph: {
    title: `${brand.name} Roofing + Energy`,
    description: brand.tagline,
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <div id="main">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
