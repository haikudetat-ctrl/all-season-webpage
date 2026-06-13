export type RoofUrgency = "planning" | "active_leak" | "storm_damage" | "selling_home";
export type RoofPitch = "standard" | "steep" | "low_slope";

export type RoofQuoteInput = {
  roofSquares: number;
  urgency: RoofUrgency | string;
  roofPitch: RoofPitch | string;
  roofLayers: number;
  deckingConcern: boolean;
  skylights: number;
  solarReady: boolean;
};

export type QuoteModifier = {
  id: string;
  label: string;
  rate: number;
};

export type QuoteTier = {
  id: "good" | "better" | "best";
  label: string;
  pricePerSquare: number;
  base: number;
  low: number;
  high: number;
};

export type RoofQuoteEstimate = {
  roofSquares: number;
  modifierTotal: number;
  modifiers: QuoteModifier[];
  tiers: Record<QuoteTier["id"], QuoteTier>;
  disclaimer: string;
};
