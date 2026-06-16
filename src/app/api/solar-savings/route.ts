import { NextResponse } from "next/server";
import { checkServiceArea } from "@/lib/quote/serviceArea";
import { submitSolarLead } from "@/lib/revops/backend";
import { validateSolarSavingsRequest } from "@/lib/solar/request";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const validation = validateSolarSavingsRequest(payload);

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
  const solarRequest = { ...validation.value, sessionId };
  const lead = await submitSolarLead(solarRequest);

  return NextResponse.json({
    ok: true,
    sessionId,
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
