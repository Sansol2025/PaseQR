"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LayoutDashboard, Ticket, UserCog, Settings, LogOut, TicketCheck, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#05070A] flex flex-col md:flex-row">
      
      {/* Mobile Dashboard Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0A1F44] border-b border-[#00E5FF]/10 sticky top-0 z-50">
        <div className="flex items-center gap-2">
           <TicketCheck className="w-6 h-6 text-[#00E5FF]" />
           <span className="font-bold text-white uppercase italic">Dashboard</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white">
           {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Sidebar - Conditional for Mobile */}
      <aside className={`
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300
        fixed md:relative w-64 bg-[#0A1F44] border-r border-[#00E5FF]/10 flex flex-col z-40 h-screen overflow-y-auto
      `}>
        <div className="p-6 border-b border-[#00E5FF]/10 hidden md:flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00E5FF] to-[#0A1F44] flex items-center justify-center">
             <TicketCheck className="w-5 h-5 text-[#05070A]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white uppercase italic">
            Dashboard<span className="text-[#00E5FF]">.</span>
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 active:bg-white/10 transition-all font-medium">
            <LayoutDashboard className="w-5 h-5" /> Resumen
          </Link>
          <Link href="/dashboard/eventos" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 active:bg-white/10 transition-all font-medium">
            <Ticket className="w-5 h-5" /> Mis Eventos
          </Link>
          <Link href="/dashboard/usuarios" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 active:bg-white/10 transition-all font-medium">
            <UserCog className="w-5 h-5" /> Usuarios
          </Link>
          <Link href="/dashboard/config" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 active:bg-white/10 transition-all font-medium">
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
