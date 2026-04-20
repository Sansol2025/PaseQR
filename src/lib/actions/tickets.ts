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
