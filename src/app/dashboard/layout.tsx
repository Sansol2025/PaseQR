import React from "react";
import Link from "next/link";
import { LayoutDashboard, Ticket, Users, Settings, LogOut, TicketCheck } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#05070A] flex flex-col md:flex-row">
      
      {/* Sidebar Desktop */}
      <aside className="w-full md:w-64 bg-[#0A1F44] border-r border-[#00E5FF]/10 flex flex-col sticky top-0 h-screen overflow-y-auto">
        <div className="p-6 border-b border-[#00E5FF]/10 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00E5FF] to-[#0A1F44] flex items-center justify-center">
             <TicketCheck className="w-5 h-5 text-[#05070A]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white uppercase italic">
            Dashboard<span className="text-[#00E5FF]">.</span>
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 active:bg-white/10 transition-all font-medium">
            <LayoutDashboard className="w-5 h-5" /> Resumen
          </Link>
          <Link href="/dashboard/eventos" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 active:bg-white/10 transition-all font-medium">
            <Ticket className="w-5 h-5" /> Mis Eventos
          </Link>
          <Link href="/dashboard/rrpp" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 active:bg-white/10 transition-all font-medium">
            <Users className="w-5 h-5" /> Equipo RRPP
          </Link>
          <Link href="/dashboard/config" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 active:bg-white/10 transition-all font-medium">
            <Settings className="w-5 h-5" /> Configuración
          </Link>
        </nav>

        <div className="p-4 border-t border-[#00E5FF]/10">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all font-medium">
            <LogOut className="w-5 h-5" /> Volver al Inicio
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden p-6 md:p-10">
        {children}
      </main>

    </div>
  );
}
