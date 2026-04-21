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

    const { eventId, tierId, tierName, price, eventTitle } = await req.json();

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const preference = new Preference(client);
    const response = await preference.create({
      body: {
        items: [
          {
            id: tierId,
            title: `${eventTitle} - ${tierName}`,
            quantity: 1,
            unit_price: Number(price),
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
      },
    });

    return NextResponse.json({ init_point: response.init_point });
  } catch (error: any) {
    console.error("Error creating preference:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
