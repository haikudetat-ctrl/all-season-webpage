export const brand = {
  name: "AllSeason",
  legalName: "AllSeason Solar",
  tagline: "Roofing and home energy under one accountable local team.",
  phone: "1 (888) 832-5050",
  phoneHref: "tel:+18888325050",
  email: "info@allseasonsolar.net",
  address: "28 S New York Rd, Suite B3, Galloway, NJ 08205",
  serviceStates: ["New Jersey", "Pennsylvania", "Maryland", "Virginia", "Delaware", "Illinois"],
  warrantyProof: "CertainTeed-backed roofing and solar warranty expertise",
  yearsProof: "Decades of roofing, building, and solar installation experience"
} as const;

export const navItems = [
  { label: "Roofing", href: "/roofing" },
  { label: "Solar", href: "/solar" },
  { label: "Roof + Solar", href: "/roof-solar-readiness" },
  { label: "Warranty", href: "/financing-warranty" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Proof", href: "/about-proof" }
] as const;
