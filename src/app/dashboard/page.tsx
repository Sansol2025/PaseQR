import React from "react";
import { BadgeDollarSign, Ticket, Activity, TrendingUp } from "lucide-react";

export default function DashboardHome() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex justify-between items-center bg-[#00E5FF]/10 border border-[#00E5FF]/20 p-6 rounded-2xl">
        <div>
          <h1 className="text-3xl font-black text-white uppercase italic tracking-widest">Resumen Financiero</h1>
          <p className="text-white/60 mt-1">Periodo actual (Últimos 30 días)</p>
        </div>
        <button className="bg-[#00E5FF] text-[#021227] px-6 py-2 rounded-lg font-bold uppercase text-sm hidden md:block">
           Exportar Excel
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-[#0A1F44] border border-white/5 p-6 rounded-2xl flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-[#00E5FF]/10 rounded-xl">
              <BadgeDollarSign className="w-6 h-6 text-[#00E5FF]" />
            </div>
            <span className="text-green-400 text-xs font-bold">+12.5%</span>
          </div>
          <div>
            <p className="text-white/50 text-sm font-medium uppercase tracking-wider">Ingresos Brutos</p>
            <h3 className="text-3xl font-bold text-white mt-1">$4.250.000</h3>
          </div>
        </div>

        <div className="bg-[#0A1F44] border border-white/5 p-6 rounded-2xl flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-purple-500/10 rounded-xl">
              <Ticket className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-green-400 text-xs font-bold">+5.2%</span>
          </div>
          <div>
            <p className="text-white/50 text-sm font-medium uppercase tracking-wider">Tickets Vendidos</p>
            <h3 className="text-3xl font-bold text-white mt-1">875</h3>
          </div>
        </div>

        <div className="bg-[#0A1F44] border border-white/5 p-6 rounded-2xl flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-orange-500/10 rounded-xl">
              <Activity className="w-6 h-6 text-orange-400" />
            </div>
          </div>
          <div>
            <p className="text-white/50 text-sm font-medium uppercase tracking-wider">Tasa de Conversión</p>
            <h3 className="text-3xl font-bold text-white mt-1">4.2%</h3>
          </div>
        </div>

        <div className="bg-[#0A1F44] border border-white/5 p-6 rounded-2xl flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-green-500/10 rounded-xl">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <div>
            <p className="text-white/50 text-sm font-medium uppercase tracking-wider">Comisiones RRPP</p>
            <h3 className="text-3xl font-bold text-white mt-1">$212.500</h3>
            <p className="text-white/30 text-xs mt-1">Pendientes de liquidar</p>
          </div>
        </div>

      </div>

      {/* Mock Chart Area */}
      <div className="bg-[#0A1F44] border border-white/5 p-6 rounded-2xl relative overflow-hidden h-96 flex flex-col">
          <h3 className="text-white font-bold mb-6">Tráfico vs Compras (Mock)</h3>
          <div className="flex-1 border-b border-l border-white/10 flex items-end gap-2 px-4 pb-0 opacity-50">
             {/* Bars */}
             {[40, 60, 35, 70, 90, 50, 100].map((h, i) => (
               <div key={i} className="flex-1 bg-gradient-to-t from-[#0A1F44] to-[#00E5FF] rounded-t-sm" style={{ height: `${h}%` }}></div>
             ))}
          </div>
          <div className="absolute inset-0 bg-[#05070A]/20 backdrop-blur-[2px] flex items-center justify-center">
             <div className="bg-black/50 px-6 py-3 rounded-full text-white/50 font-medium border border-white/10">
               Gráficos Dinámicos de Chart.js / Recharts irán aquí.
             </div>
          </div>
      </div>
      
    </div>
  );
}
