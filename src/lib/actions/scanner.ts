"use server";

import { createClient } from "@/lib/supabase/server";

export async function scanTicket(ticketId: string, isValidMock: boolean = true) {
  // En un entorno de producción, aquí solo haríamos la llamada RPC.
  // Como estamos en FASE 5 interactiva sin DB local conectada aún usando UI simulada,
  // mezclamos la lógica base de Supabase con el mock para que la UI funcione.

  try {
    const supabase = await createClient();
    
    // Obtenemos la supuesta sesión del scanner
    const { data: { session } } = await supabase.auth.getSession();
    
    // =============================================
    // CÓDIGO DE PRODUCCIÓN (Comentado esperando BD real conectada con JWT y data):
    // if (!session) return { success: false, message: "NO AUTORIZADO" };
    // 
    // const { data, error } = await supabase.rpc('update_ticket_status_atomic', {
    //   qr_ticket_id: ticketId,
    //   scanner_uid: session.user.id
    // });
    // 
    // if (error) return { success: false, message: error.message };
    // return { success: data.success, message: data.error || data.message };
    // =============================================


    // SIMULACIÓN (Mock) DEL FUNCIONAMIENTO DE LA FUNCION RPC
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (isValidMock) {
      return { success: true, message: "ACCESO PERMITIDO" };
    } else {
      return { success: false, message: "TICKET YA FUE ESCANEADO" };
    }

  } catch (error: any) {
    return { success: false, message: error.message || "ERROR DESCONOCIDO" };
  }
}
