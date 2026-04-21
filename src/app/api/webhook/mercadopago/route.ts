import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Mercado Pago sends payment data in the body
    const { type, data } = body;
    
    if (type !== "payment") {
      return NextResponse.json({ ok: true });
    }

    // Fetch payment details from MP
    const paymentId = data.id;
    const mpResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      }
    );

    const payment = await mpResponse.json();

    if (payment.status !== "approved") {
      return NextResponse.json({ ok: true });
    }

    const { event_id, tier_id, user_id } = payment.metadata;

    if (!event_id || !tier_id || !user_id) {
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    // Create the ticket using our buy_ticket function
    const supabase = await createClient();
    const { error } = await supabase.rpc('buy_ticket', {
      p_event_id: event_id,
      p_tier_id: tier_id,
      p_user_id: user_id,
    });

    if (error) {
      console.error("Error creating ticket from webhook:", error);
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
