"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function transferTicket(ticketId: string, recipientEmail: string) {
  const supabase = await createClient();

  // 1. Validate session
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return { error: "No tienes autorización para realizar esta acción." };
  }

  // 2. Wrap in try-catch to simulate atomic operation since we are using JS layer constraints
  // In a real prod scenario, it's better to do this in a PostgreSQL RPC function to guarantee atomicity.
  try {
    // Check if ticket exists, is owned by user and is valid
    const { data: ticket, error: fetchError } = await supabase
      .from('tickets')
      .select('*')
      .eq('id', ticketId)
      .eq('user_id', session.user.id)
      .eq('status', 'valid')
      .single();

    if (fetchError || !ticket) {
      return { error: "Entrada no encontrada o no es válida para transferir." };
    }

    // Attempt to find recipient by email
    const { data: recipientProfile, error: recipientError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', recipientEmail)
      .single();

    if (recipientError || !recipientProfile) {
      return { error: "No se encontró un usuario con ese correo electrónico registrado." };
    }

    // Update old ticket to transferred
    const { error: updateError } = await supabase
      .from('tickets')
      .update({ status: 'transferred' })
      .eq('id', ticketId);

    if (updateError) {
      throw updateError;
    }

    // Create new ticket for recipient
    const { error: insertError } = await supabase
      .from('tickets')
      .insert({
        event_id: ticket.event_id,
        user_id: recipientProfile.id,
        tier_id: ticket.tier_id,
        status: 'valid',
        price_paid: 0 // transferred, they paid 0
      });

    if (insertError) {
      // In a real RPC, we'd rollback. Since this is mock logic, we attempt to revert or log it.
      await supabase.from('tickets').update({ status: 'valid' }).eq('id', ticketId);
      return { error: "Error al generar la nueva entrada. Transferencia cancelada." };
    }

    revalidatePath('/mis-entradas');
    return { success: true };

  } catch (error: any) {
    return { error: error.message || "Ocurrió un error inesperado al transferir." };
  }
}
export async function purchaseTicket(eventId: string, tierId: string) {
  const supabase = await createClient();

  // 1. Validate session
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return { error: "AUTH_REQUIRED", message: "Iniciá sesión para adquirir tu pase." };
  }

  try {
    // 2. Get tier info (price and availability)
    const { data: tier, error: tierError } = await supabase
      .from('ticket_tiers')
      .select('*')
      .eq('id', tierId)
      .single();

    if (tierError || !tier) {
      return { error: "NOT_FOUND", message: "El lote de entradas seleccionado ya no está disponible." };
    }

    if (tier.current_sold >= tier.capacity) {
      return { error: "SOLD_OUT", message: "Este lote se ha agotado." };
    }

    // 3. Create the ticket (In a real flow, this would happen AFTER payment notification)
    // For now, we simulate success for the user to see the flow.
    const { data: ticket, error: insertError } = await supabase
      .from('tickets')
      .insert({
        event_id: eventId,
        user_id: session.user.id,
        tier_id: tierId,
        status: 'valid',
        price_paid: tier.price
      })
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    // 4. Increment sold count in tier
    await supabase
      .from('ticket_tiers')
      .update({ current_sold: (tier.current_sold || 0) + 1 })
      .eq('id', tierId);

    revalidatePath('/mis-entradas');
    revalidatePath(`/eventos/${eventId}`);
    
    return { success: true, ticketId: ticket.id };

  } catch (error: any) {
    console.error("Error in purchaseTicket:", error);
    return { error: "INTERNAL_ERROR", message: "Ocurrió un error al procesar tu solicitud." };
  }
}
