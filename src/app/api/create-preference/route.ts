import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { createClient } from "@/lib/supabase/server";

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN! 
});

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const { eventId, tierId } = await req.json();

    // SECURITY BLINDING: Fetch price and titles from DB instead of trusting client input
    const { data: tier, error: tierError } = await supabase
      .from('ticket_tiers')
      .select('name, price, event:events(title)')
      .eq('id', tierId)
      .single();

    if (tierError || !tier) {
      return NextResponse.json({ error: "Lote de entradas no encontrado." }, { status: 404 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const preference = new Preference(client);
    const response = await preference.create({
      body: {
        items: [
          {
            id: tierId,
            title: `${(tier.event as any).title} - ${tier.name}`,
            quantity: 1,
            unit_price: Number(tier.price),
            currency_id: "ARS",
          },
        ],
        metadata: {
          event_id: eventId,
          tier_id: tierId,
          user_id: session.user.id,
        },
        back_urls: {
          success: `${appUrl}/pago/exitoso`,
          failure: `${appUrl}/pago/fallido`,
          pending: `${appUrl}/pago/pendiente`,
        },
        auto_return: "approved",
        notification_url: `${appUrl}/api/webhook/mercadopago`,
        // External reference for easy tracking
        external_reference: `${eventId}|${tierId}|${session.user.id}`,
        statement_descriptor: "QRENTRADA",
      },
    });

    return NextResponse.json({ init_point: response.init_point });
  } catch (error: any) {
    console.error("Error creating preference:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
