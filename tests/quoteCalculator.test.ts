import { describe, expect, it } from "vitest";
import { calculateRoofQuote } from "@/lib/quote/calculator";

describe("calculateRoofQuote", () => {
  it("returns good, better, best ranges from the transcript pricing defaults", () => {
    const quote = calculateRoofQuote({
      roofSquares: 20,
      urgency: "planning",
      roofPitch: "standard",
      roofLayers: 1,
      deckingConcern: false,
      skylights: 0,
      solarReady: false
    });

    expect(quote.tiers.good.base).toBe(11000);
    expect(quote.tiers.better.base).toBe(13000);
    expect(quote.tiers.best.base).toBe(15000);
    expect(quote.tiers.good.low).toBe(10120);
    expect(quote.tiers.good.high).toBe(12320);
  });

  it("applies configurable project complexity modifiers", () => {
    const quote = calculateRoofQuote({
      roofSquares: 20,
      urgency: "active_leak",
      roofPitch: "steep",
      roofLayers: 2,
      deckingConcern: true,
      skylights: 2,
      solarReady: true
    });

    expect(quote.modifierTotal).toBeCloseTo(0.28);
    expect(quote.tiers.good.base).toBe(14080);
    expect(quote.modifiers.map((modifier) => modifier.id)).toEqual([
      "active_leak",
      "steep_roof",
      "second_layer",
      "decking_review",
      "skylights",
      "solar_ready"
    ]);
  });
});
