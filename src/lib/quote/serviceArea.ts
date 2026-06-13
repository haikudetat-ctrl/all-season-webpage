const supportedStates = new Set(["NJ", "PA", "MD", "VA", "DE", "IL"]);

export type ServiceAreaResult =
  | { accepted: true; state: string; zip: string }
  | { accepted: false; state: string; zip: string; reason: "unsupported_state" | "invalid_zip" };

export function checkServiceArea(input: { state: string; zip: string }): ServiceAreaResult {
  const state = input.state.trim().toUpperCase();
  const zip = input.zip.replace(/\D/g, "").slice(0, 5);

  if (zip.length !== 5) {
    return { accepted: false, state, zip, reason: "invalid_zip" };
  }

  if (!supportedStates.has(state)) {
    return { accepted: false, state, zip, reason: "unsupported_state" };
  }

  return { accepted: true, state, zip };
}
