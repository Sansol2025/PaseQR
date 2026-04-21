"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createEvent(formData: {
  title: string;
  description: string;
  date: string;
  location: string;
  cover_image_url?: string;
}) {
  const supabase = await createClient();

  // Obtener el ID del usuario directamente en el servidor
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { success: false, error: "Usuario no autenticado" };
  }

  const { data, error } = await supabase
    .from('events')
    .insert([
      {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        location: formData.location,
        cover_image_url: formData.cover_image_url || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000',
        organizer_id: user.id,
      }
    ])
    .select();

  if (error) {
    console.error("Error creating event:", error);
    return { success: false, error: error.message };
  }

  revalidatePath('/dashboard/eventos');
  revalidatePath('/');
  return { success: true, data };
}

export async function deleteEvent(id: string) {
  const supabase = await createClient();

  // Primero eliminamos los lotes asociados (por integridad)
  await supabase.from('ticket_tiers').delete().eq('event_id', id);

  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/dashboard/eventos');
  revalidatePath('/');
  return { success: true };
}
