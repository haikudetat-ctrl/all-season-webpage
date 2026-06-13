export const roofQuotePricing = {
  tiers: {
    good: {
      label: "Good",
      pricePerSquare: 550
    },
    better: {
      label: "Better",
      pricePerSquare: 650
    },
    best: {
      label: "Best",
      pricePerSquare: 750
    }
  },
  range: {
    low: 0.92,
    high: 1.12
  },
  modifiers: {
    activeLeak: 0.04,
    stormDamage: 0.04,
    steepRoof: 0.08,
    secondLayer: 0.05,
    deckingReview: 0.06,
    skylightEach: 0.015,
    skylightCap: 0.06,
    solarReady: 0.02
  },
  disclaimer: "Online estimate only. Final proposal requires property review and scope confirmation."
} as const;
