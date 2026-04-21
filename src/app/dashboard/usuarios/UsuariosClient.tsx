"use client";

import React, { useState, useTransition, useCallback } from "react";
import {
  Users,
  Shield,
  ScanLine,
  User,
  Trash2,
  Search,
  ChevronDown,
  Crown,
  CheckCircle2,
  AlertTriangle,
  X,
  RefreshCw,
  UserCheck,
} from "lucide-react";
import { updateUserRole, deleteUser } from "@/lib/actions/users";
import type { UserRole, UserProfile } from "@/types/users";

const ROLE_CONFIG: Record<
  UserRole,
  {
    label: string;
    icon: React.ReactNode;
    color: string;
    bg: string;
    border: string;
    description: string;
  }
> = {
  organizer: {
    label: "Organizador",
    icon: <Crown className="w-3.5 h-3.5" />,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/30",
    description: "Acceso total al dashboard. Puede crear y gestionar eventos.",
  },
  scanner: {
    label: "Lector QR",
    icon: <ScanLine className="w-3.5 h-3.5" />,
    color: "text-[#00E5FF]",
    bg: "bg-[#00E5FF]/10",
    border: "border-[#00E5FF]/30",
    description: "Acceso exclusivo al escáner de QR en entradas.",
  },
  pr: {
    label: "Rel. Públicas",
    icon: <UserCheck className="w-3.5 h-3.5" />,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/30",
    description: "Puede generar links de venta y rastrear comisiones.",
  },
  user: {
    label: "Usuario",
    icon: <User className="w-3.5 h-3.5" />,
    color: "text-white/50",
    bg: "bg-white/5",
    border: "border-white/10",
    description: "Comprador de entradas. Solo accede a sus tickets.",
  },
};

type ConfirmAction =
  | { type: "delete"; user: UserProfile }
  | { type: "role"; user: UserProfile; newRole: UserRole }
  | null;

// ── Sub-components ──────────────────────────────────────────────────────────

function RoleBadge({ role }: { role: UserRole }) {
  const cfg = ROLE_CONFIG[role];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.color} ${cfg.bg} ${cfg.border}`}
    >
      {cfg.icon}
      {cfg.label}
    </span>
  );
}

function RoleDropdown({
  currentRole,
  userId,
  onRoleChange,
  disabled,
}: {
  currentRole: UserRole;
  userId: string;
  onRoleChange: (userId: string, role: UserRole) => void;
  disabled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const roles: UserRole[] = ["organizer", "scanner", "pr", "user"];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        disabled={disabled}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-xs font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Cambiar rol <ChevronDown className="w-3 h-3" />
      </button>
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full mt-1 z-50 bg-[#0D1B35] border border-white/10 rounded-xl overflow-hidden shadow-2xl w-52">
            {roles
              .filter((r) => r !== currentRole)
              .map((role) => {
                const cfg = ROLE_CONFIG[role];
                return (
                  <button
                    key={role}
                    onClick={() => {
                      onRoleChange(userId, role);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-4 py-3 text-xs font-medium hover:bg-white/5 transition-colors ${cfg.color}`}
                  >
                    {cfg.icon}
                    {cfg.label}
                  </button>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}

function ConfirmModal({
  action,
  onConfirm,
  onCancel,
  loading,
}: {
  action: ConfirmAction;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  if (!action) return null;

  const isDelete = action.type === "delete";
  const userName =
    action.user.full_name || action.user.email || "este usuario";
  const newRoleCfg =
    action.type === "role" ? ROLE_CONFIG[action.newRole] : null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0A1F44] border border-white/10 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
            isDelete ? "bg-red-500/10" : "bg-amber-400/10"
          }`}
        >
          {isDelete ? (
            <AlertTriangle className="w-7 h-7 text-red-400" />
          ) : (
            <Shield className="w-7 h-7 text-amber-400" />
          )}
        </div>
        <h3 className="text-white font-bold text-center text-lg mb-2">
          {isDelete ? "¿Eliminar usuario?" : "¿Cambiar rol?"}
        </h3>
        <p className="text-white/60 text-sm text-center mb-6">
          {isDelete
            ? `Se eliminará permanentemente el perfil de "${userName}". Esta acción no se puede deshacer.`
            : `Se asignará el rol de "${newRoleCfg?.label}" a "${userName}".`}
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-sm font-medium transition-all disabled:opacity-40"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-40 flex items-center justify-center gap-2 ${
              isDelete
                ? "bg-red-500/20 hover:bg-red-500/30 text-red-400"
                : "bg-amber-400/20 hover:bg-amber-400/30 text-amber-400"
            }`}
          >
            {loading && <RefreshCw className="w-4 h-4 animate-spin" />}
            {isDelete ? "Sí, eliminar" : "Sí, cambiar"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Client Component ────────────────────────────────────────────────────

export default function UsuariosClient({
  initialUsers,
}: {
  initialUsers: UserProfile[];
}) {
  const [users, setUsers] = useState<UserProfile[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [isPending, startTransition] = useTransition();

  const showToast = useCallback((msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      u.full_name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q);
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleRoleRequest = (userId: string, newRole: UserRole) => {
    const user = users.find((u) => u.id === userId);
    if (user) setConfirmAction({ type: "role", user, newRole });
  };

  const handleDeleteRequest = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) setConfirmAction({ type: "delete", user });
  };

  const handleConfirm = () => {
    if (!confirmAction) return;

    startTransition(async () => {
      if (confirmAction.type === "delete") {
        const { error } = await deleteUser(confirmAction.user.id);
        if (error) {
          showToast(`Error: ${error}`, false);
        } else {
          setUsers((prev) =>
            prev.filter((u) => u.id !== confirmAction.user.id)
          );
          showToast("Usuario eliminado correctamente.", true);
        }
      } else {
        const { error } = await updateUserRole(
          confirmAction.user.id,
          confirmAction.newRole
        );
        if (error) {
          showToast(`Error: ${error}`, false);
        } else {
          const newRole = confirmAction.newRole;
          setUsers((prev) =>
            prev.map((u) =>
              u.id === confirmAction.user.id ? { ...u, role: newRole } : u
            )
          );
          showToast("Rol actualizado correctamente.", true);
        }
      }
      setConfirmAction(null);
    });
  };

  const stats = {
    total: users.length,
    organizers: users.filter((u) => u.role === "organizer").length,
    scanners: users.filter((u) => u.role === "scanner").length,
    regular: users.filter((u) => u.role === "user").length,
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Confirm Modal */}
      <ConfirmModal
        action={confirmAction}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmAction(null)}
        loading={isPending}
      />

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-2xl text-sm font-medium animate-in slide-in-from-bottom-5 duration-300 ${
            toast.ok
              ? "bg-green-500/10 border-green-500/30 text-green-400"
              : "bg-red-500/10 border-red-500/30 text-red-400"
          }`}
        >
          {toast.ok ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <X className="w-4 h-4" />
          )}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-br from-[#00E5FF]/5 to-[#0A1F44] border border-[#00E5FF]/15 p-8 rounded-[2rem]">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#00E5FF]" />
            </div>
            <h1 className="text-3xl font-black text-white uppercase tracking-wider">
              Usuarios
            </h1>
          </div>
          <p className="text-white/50 text-sm max-w-lg">
            Administrá los usuarios registrados en la plataforma. Podés
            asignar roles, o eliminar perfiles.
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-4xl font-black text-[#00E5FF]">{stats.total}</p>
          <p className="text-white/40 text-xs uppercase tracking-widest mt-1">
            Registrados
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Organizadores",
            value: stats.organizers,
            icon: <Crown className="w-4 h-4" />,
            color: "text-amber-400",
            bg: "bg-amber-400/10",
          },
          {
            label: "Lectores QR",
            value: stats.scanners,
            icon: <ScanLine className="w-4 h-4" />,
            color: "text-[#00E5FF]",
            bg: "bg-[#00E5FF]/10",
          },
          {
            label: "Usuarios",
            value: stats.regular,
            icon: <User className="w-4 h-4" />,
            color: "text-white/50",
            bg: "bg-white/5",
          },
          {
            label: "Total",
            value: stats.total,
            icon: <Users className="w-4 h-4" />,
            color: "text-purple-400",
            bg: "bg-purple-400/10",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-[#0A1F44] border border-white/5 rounded-2xl p-5"
          >
            <div
              className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center ${s.color} mb-3`}
            >
              {s.icon}
            </div>
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-white/40 text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#0A1F44] border border-white/10 rounded-xl text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#00E5FF]/40 transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["all", "organizer", "scanner", "pr", "user"] as const).map(
            (r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                  roleFilter === r
                    ? "bg-[#00E5FF]/15 border-[#00E5FF]/40 text-[#00E5FF]"
                    : "bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10"
                }`}
              >
                {r === "all" ? "Todos" : ROLE_CONFIG[r].label}
              </button>
            )
          )}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#0A1F44] border border-white/5 rounded-3xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <Users className="w-10 h-10 text-white/20 mx-auto mb-3" />
            <p className="text-white/40 text-sm">
              {users.length === 0
                ? "Aún no hay usuarios registrados."
                : "No se encontraron usuarios con esos filtros."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-6 py-4 text-left text-xs text-white/40 uppercase tracking-widest font-semibold">
                    Usuario
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-white/40 uppercase tracking-widest font-semibold hidden md:table-cell">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-white/40 uppercase tracking-widest font-semibold">
                    Rol
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-white/40 uppercase tracking-widest font-semibold hidden lg:table-cell">
                    Registrado
                  </th>
                  <th className="px-6 py-4 text-right text-xs text-white/40 uppercase tracking-widest font-semibold">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00E5FF]/20 to-[#0A1F44] border border-white/10 flex items-center justify-center shrink-0">
                          <span className="text-[#00E5FF] font-bold text-sm">
                            {(
                              user.full_name ||
                              user.email ||
                              "?"
                            )[0].toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm leading-tight">
                            {user.full_name || "Sin nombre"}
                          </p>
                          <p className="text-white/40 text-xs md:hidden">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white/50 text-sm hidden md:table-cell">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      <RoleBadge role={user.role} />
                    </td>
                    <td className="px-6 py-4 text-white/40 text-sm hidden lg:table-cell">
                      {new Date(user.created_at).toLocaleDateString("es-AR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <RoleDropdown
                          currentRole={user.role}
                          userId={user.id}
                          onRoleChange={handleRoleRequest}
                          disabled={isPending}
                        />
                        <button
                          onClick={() => handleDeleteRequest(user.id)}
                          disabled={isPending}
                          title="Eliminar usuario"
                          className="p-1.5 rounded-lg bg-red-500/5 hover:bg-red-500/15 border border-transparent hover:border-red-500/30 text-red-500/50 hover:text-red-400 transition-all disabled:opacity-40"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Role Legend */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(
          Object.entries(ROLE_CONFIG) as [
            UserRole,
            (typeof ROLE_CONFIG)[UserRole]
          ][]
        ).map(([role, cfg]) => (
          <div
            key={role}
            className={`flex items-start gap-4 p-4 rounded-2xl border ${cfg.bg} ${cfg.border}`}
          >
            <div className={`mt-0.5 ${cfg.color}`}>{cfg.icon}</div>
            <div>
              <p className={`text-sm font-bold ${cfg.color}`}>{cfg.label}</p>
              <p className="text-white/40 text-xs mt-0.5">{cfg.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
