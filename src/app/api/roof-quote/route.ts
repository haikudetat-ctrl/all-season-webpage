import { NextResponse } from "next/server";
import { calculateRoofQuote } from "@/lib/quote/calculator";
import { validateRoofQuoteRequest } from "@/lib/quote/request";
import { checkServiceArea } from "@/lib/quote/serviceArea";
import { storeQuoteJourney, submitQuoteLead } from "@/lib/revops/backend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const validation = validateRoofQuoteRequest(payload);

  if (!validation.ok) {
    return NextResponse.json(
      { error: validation.error, details: validation.details ?? [] },
      { status: validation.status }
    );
  }

  const serviceArea = checkServiceArea(validation.value.property);
  if (!serviceArea.accepted) {
    return NextResponse.json(
      { error: "outside_service_area", reason: serviceArea.reason },
      { status: 422 }
    );
  }

  const sessionId = validation.value.sessionId ?? crypto.randomUUID();
  const quoteRequest = { ...validation.value, sessionId };
  const estimate = calculateRoofQuote(quoteRequest.quote);

  await storeQuoteJourney(quoteRequest, estimate);
  const lead = await submitQuoteLead(quoteRequest, estimate);

  return NextResponse.json({
    ok: true,
    sessionId,
    estimate,
    lead: {
      accepted: lead.accepted,
      leadId: lead.lead_id,
      priority: lead.priority,
      routeName: lead.route_name,
      sequenceName: lead.sequence_name,
      scriptId: lead.script_id
    }
  });
}
