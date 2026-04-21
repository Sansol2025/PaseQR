// Tipos compartidos para el módulo de gestión de usuarios
// Este archivo NO tiene directivas "use client" / "use server" para que pueda
// ser importado tanto desde Server Components como desde Client Components.

export type UserRole = "user" | "organizer" | "scanner" | "pr" | "admin";

export interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  role: UserRole;
  created_at: string;
}
