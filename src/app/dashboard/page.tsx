"use client";

import React, { useState, useEffect } from "react";
import { BadgeDollarSign, Ticket, Activity, TrendingUp, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function DashboardHome() {
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    totalSold: 0,
    eventCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      const supabase = createClient();
      
      // Fetch all tiers to calculate revenue and total sold
      const { data: tiers } = await supabase
        .from('ticket_tiers')
        .select('price, current_sold');
      
      const { count: eventCount } = await supabase
        .from('events')
        .select('*', { count: 'exact', head: true });

      if (tiers) {
        const totalRevenue = tiers.reduce((acc, tier) => acc + (tier.price * tier.current_sold), 0);
        const totalSold = tiers.reduce((acc, tier) => acc + tier.current_sold, 0);
        
        setMetrics({
          totalRevenue,
          totalSold,
          eventCount: eventCount || 0,
        });
      }
      setLoading(false);
    }

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-10 h-10 text-[#00E5FF] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex justify-between items-center bg-[#00E5FF]/10 border border-[#00E5FF]/20 p-6 rounded-2xl">
        <div>
          <h1 className="text-3xl font-black text-white uppercase italic tracking-widest">Resumen Real</h1>
          <p className="text-white/60 mt-1">Acumulado total de la plataforma</p>
        </div>
        <div className="bg-[#05070A] px-4 py-2 rounded-lg border border-white/10 hidden md:block">
           <span className="text-[#00E5FF] font-bold">{metrics.eventCount}</span> <span className="text-white/40 text-xs uppercase">Eventos Activos</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div className="bg-[#0A1F44] border border-white/5 p-8 rounded-3xl flex flex-col gap-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#00E5FF]/5 blur-3xl group-hover:bg-[#00E5FF]/10 transition-colors" />
          <div className="p-4 bg-[#00E5FF]/10 rounded-2xl w-fit">
            <BadgeDollarSign className="w-8 h-8 text-[#00E5FF]" />
          </div>
          <div>
            <p className="text-white/40 text-xs font-black uppercase tracking-[0.2em]">Recaudación Total</p>
            <h3 className="text-4xl font-black text-white mt-2">
              ${metrics.totalRevenue.toLocaleString('es-AR')}
            </h3>
          </div>
        </div>

        <div className="bg-[#0A1F44] border border-white/5 p-8 rounded-3xl flex flex-col gap-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 blur-3xl group-hover:bg-purple-500/10 transition-colors" />
          <div className="p-4 bg-purple-500/10 rounded-2xl w-fit">
            <Ticket className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <p className="text-white/40 text-xs font-black uppercase tracking-[0.2em]">Entradas Vendidas</p>
            <h3 className="text-4xl font-black text-white mt-2">{metrics.totalSold}</h3>
          </div>
        </div>

        <div className="bg-[#0A1F44] border border-white/5 p-8 rounded-3xl flex flex-col gap-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 blur-3xl group-hover:bg-green-500/10 transition-colors" />
          <div className="p-4 bg-green-500/10 rounded-2xl w-fit">
            <TrendingUp className="w-8 h-8 text-green-400" />
          </div>
          <div>
            <p className="text-white/40 text-xs font-black uppercase tracking-[0.2em]">Eventos Creados</p>
            <h3 className="text-4xl font-black text-white mt-2">{metrics.eventCount}</h3>
          </div>
        </div>

      </div>

      {/* Empty State / Welcome */}
      <div className="bg-[#0A1F44] border border-white/5 p-12 rounded-3xl flex flex-col items-center text-center gap-6">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
             <Activity className="w-10 h-10 text-white/20" />
          </div>
          <div>
             <h3 className="text-xl font-bold text-white uppercase italic">Sistema en Línea</h3>
             <p className="text-white/40 max-w-md mt-2">
                PaseQR está listo para procesar pagos y emitir entradas. Las métricas se actualizarán automáticamente con cada nueva venta.
             </p>
          </div>
      </div>
      
    </div>
  );
}

