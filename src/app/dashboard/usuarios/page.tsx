import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { UserProfile } from "@/types/users";
import UsuariosClient from "./UsuariosClient";

export const metadata = {
  title: "Usuarios | Dashboard PaseQR",
  description: "Administrá usuarios, asigná roles y gestioná permisos.",
};

export default async function UsuariosPage() {
  const supabase = await createClient();

  // 1. Verificar sesión
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // 2. Verificar rol del caller — solo organizers acceden
  const { data: callerProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const role = callerProfile?.role;
  if (role !== "organizer" && role !== "admin") {
    redirect("/dashboard");
  }

  // 3. Fetch real de todos los perfiles
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("id, full_name, email, role, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    // Renderizamos igualmente, con lista vacía y un mensaje de error
    console.error("[UsuariosPage] Error fetching profiles:", error.message);
  }

  const users = (profiles ?? []) as UserProfile[];

  return <UsuariosClient initialUsers={users} />;
}
