"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

import { UserRole, UserProfile } from "@/types/users";
export type { UserRole, UserProfile };

export async function getAllUsers(): Promise<{ data: UserProfile[] | null; error: string | null }> {
  const supabase = await createClient();

  // Verify the caller is admin/organizer
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "No autenticado" };

  const { data: callerProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (callerProfile?.role !== "organizer") {
    return { data: null, error: "Sin permisos" };
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, email, role, created_at")
    .order("created_at", { ascending: false });

  if (error) return { data: null, error: error.message };

  return { data: data as UserProfile[], error: null };
}

export async function updateUserRole(
  targetUserId: string,
  newRole: UserRole
): Promise<{ error: string | null }> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No autenticado" };

  const { data: callerProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (callerProfile?.role !== "organizer") {
    return { error: "Sin permisos" };
  }
  if (targetUserId === user.id) {
    return { error: "No puedes cambiar tu propio rol" };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ role: newRole })
    .eq("id", targetUserId);

  if (error) return { error: error.message };

  revalidatePath("/dashboard/usuarios");
  return { error: null };
}

export async function deleteUser(
  targetUserId: string
): Promise<{ error: string | null }> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No autenticado" };

  const { data: callerProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (callerProfile?.role !== "organizer") {
    return { error: "Sin permisos" };
  }

  if (targetUserId === user.id) {
    return { error: "No puedes eliminarte a ti mismo" };
  }

  // Delete profile first (tickets/etc cascade or remain)
  const { error: profileError } = await supabase
    .from("profiles")
    .delete()
    .eq("id", targetUserId);

  if (profileError) return { error: profileError.message };

  revalidatePath("/dashboard/usuarios");
  return { error: null };
}
