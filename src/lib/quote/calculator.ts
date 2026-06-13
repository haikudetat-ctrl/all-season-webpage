import { roofQuotePricing } from "./pricing";
import type { QuoteModifier, QuoteTier, RoofQuoteEstimate, RoofQuoteInput } from "./types";

export function calculateRoofQuote(input: RoofQuoteInput): RoofQuoteEstimate {
  const roofSquares = Math.max(1, roundTo(input.roofSquares, 2));
  const modifiers = collectModifiers(input);
  const modifierTotal = roundTo(
    modifiers.reduce((sum, modifier) => sum + modifier.rate, 0),
    4
  );

  return {
    roofSquares,
    modifierTotal,
    modifiers,
    tiers: {
      good: tier("good", roofQuotePricing.tiers.good.label, roofQuotePricing.tiers.good.pricePerSquare, roofSquares, modifierTotal),
      better: tier("better", roofQuotePricing.tiers.better.label, roofQuotePricing.tiers.better.pricePerSquare, roofSquares, modifierTotal),
      best: tier("best", roofQuotePricing.tiers.best.label, roofQuotePricing.tiers.best.pricePerSquare, roofSquares, modifierTotal)
    },
    disclaimer: roofQuotePricing.disclaimer
  };
}

function collectModifiers(input: RoofQuoteInput): QuoteModifier[] {
  const modifiers: QuoteModifier[] = [];

  if (input.urgency === "active_leak") {
    modifiers.push({ id: "active_leak", label: "Active leak priority", rate: roofQuotePricing.modifiers.activeLeak });
  }

  if (input.urgency === "storm_damage") {
    modifiers.push({ id: "storm_damage", label: "Storm damage review", rate: roofQuotePricing.modifiers.stormDamage });
  }

  if (input.roofPitch === "steep") {
    modifiers.push({ id: "steep_roof", label: "Steeper roof access", rate: roofQuotePricing.modifiers.steepRoof });
  }

  if (input.roofLayers > 1) {
    modifiers.push({ id: "second_layer", label: "Second layer tear-off", rate: roofQuotePricing.modifiers.secondLayer });
  }

  if (input.deckingConcern) {
    modifiers.push({ id: "decking_review", label: "Decking condition allowance", rate: roofQuotePricing.modifiers.deckingReview });
  }

  if (input.skylights > 0) {
    modifiers.push({
      id: "skylights",
      label: `${input.skylights} skylight${input.skylights === 1 ? "" : "s"}`,
      rate: Math.min(input.skylights * roofQuotePricing.modifiers.skylightEach, roofQuotePricing.modifiers.skylightCap)
    });
  }

  if (input.solarReady) {
    modifiers.push({ id: "solar_ready", label: "Solar-ready planning", rate: roofQuotePricing.modifiers.solarReady });
  }

  return modifiers;
}

function tier(
  id: QuoteTier["id"],
  label: string,
  pricePerSquare: number,
  roofSquares: number,
  modifierTotal: number
): QuoteTier {
  const base = roundCurrency(roofSquares * pricePerSquare * (1 + modifierTotal));
  return {
    id,
    label,
    pricePerSquare,
    base,
    low: roundCurrency(base * roofQuotePricing.range.low),
    high: roundCurrency(base * roofQuotePricing.range.high)
  };
}

function roundCurrency(value: number): number {
  return Math.round(value);
}

function roundTo(value: number, places: number): number {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}
