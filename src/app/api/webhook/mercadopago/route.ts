import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    // 1. Try to get payment ID and type from URL (IPN) or Body (Webhook)
    const { searchParams } = new URL(req.url);
    const topic = searchParams.get("topic") || searchParams.get("type");
    const id = searchParams.get("id");

    let paymentId = id;
    let type = topic;

    // 2. If not in URL, try to parse JSON body (Modern Webhook)
    if (!paymentId) {
      try {
        const body = await req.json();
        paymentId = body.data?.id || body.id;
        type = body.type || body.topic;
      } catch (e) {
        // Body might be empty or not JSON
      }
    }

    // 3. Handle Mercado Pago Test button (ID 123456) or non-payment notifications
    if (!paymentId || paymentId === "123456" || (type && type !== "payment")) {
      return NextResponse.json({ ok: true });
    }

    const mpResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      }
    );

    // If payment not found in MP (happens with some tests), return 200 to acknowledge
    if (!mpResponse.ok) {
      return NextResponse.json({ ok: true });
    }

    const payment = await mpResponse.json();

    if (payment.status !== "approved") {
      return NextResponse.json({ ok: true });
    }

    const { event_id, tier_id, user_id } = payment.metadata || {};

    if (!event_id || !tier_id || !user_id) {
      console.warn("Webhook: Missing metadata for payment", paymentId);
      return NextResponse.json({ ok: true });
    }

    const supabase = await createClient();
    const { error } = await supabase.rpc('buy_ticket', {
      p_event_id: event_id,
      p_tier_id: tier_id,
      p_user_id: user_id,
      p_payment_id: String(paymentId)
    });

    if (error) {
      console.error("Webhook buy_ticket error:", error);
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    // Always return 200 to MP to avoid infinite retries
    return NextResponse.json({ ok: true }, { status: 200 });
  }
}
