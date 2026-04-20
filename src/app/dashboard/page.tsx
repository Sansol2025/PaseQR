"use client";

import React, { useState, useEffect } from "react";
import { BadgeDollarSign, Ticket, Activity, TrendingUp, Loader2, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function DashboardHome() {
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    totalSold: 0,
    eventCount: 0,
  });
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      const supabase = createClient();
      
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) return;
      setUser(authUser);

      const { data: profile } = await supabase.from('profiles').select('role').eq('id', authUser.id).single();
      const userRole = profile?.role as any;
      setRole(userRole);

      // Fetch Metrics
      let tiersQuery = supabase.from('ticket_tiers').select('price, current_sold');
      let eventsQuery = supabase.from('events').select('*', { count: 'exact', head: true });

      // Si es organizador, filtramos solo lo suyo
      if (userRole === 'organizer') {
        // Para filtrar tiers de un organizador, necesitamos join o subquery. 
        // Por simplicidad en este paso, si es organizador filtramos eventos por su ID.
        eventsQuery = eventsQuery.eq('organizer_id', authUser.id);
        
        // Obtenemos sus eventos primero para filtrar los tiers
        const { data: ownEvents } = await supabase.from('events').select('id').eq('organizer_id', authUser.id);
        const eventIds = ownEvents?.map(e => e.id) || [];
        tiersQuery = tiersQuery.in('event_id', eventIds);
      }

      const { data: tiers } = await tiersQuery;
      const { count: eventCount } = await eventsQuery;

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

    fetchAll();
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
      
      <div className="flex justify-between items-center bg-[#00E5FF]/10 border border-[#00E5FF]/20 p-6 rounded-2xl relative overflow-hidden">
        {role === 'admin' && (
          <div className="absolute top-0 right-0 px-4 py-1 bg-[#00E5FF] text-[#021227] text-[10px] font-black uppercase tracking-widest rounded-bl-xl flex items-center gap-1">
             <ShieldCheck className="w-3 h-3" /> VISTA SUPER ADMIN
          </div>
        )}
        <div>
          <h1 className="text-3xl font-black text-white uppercase italic tracking-widest">
            {role === 'admin' ? "Panel Global" : "Mi Resumen"}
          </h1>
          <p className="text-white/60 mt-1">
            {role === 'admin' ? "Estadísticas de toda la red PaseQR" : "Rendimiento de tus eventos"}
          </p>
        </div>
        <div className="bg-[#05070A] px-4 py-2 rounded-lg border border-white/10 hidden md:block text-right">
           <p className="text-white/20 text-[10px] uppercase font-bold">Total Sistema</p>
           <span className="text-[#00E5FF] font-bold">{metrics.eventCount}</span> <span className="text-white/40 text-xs uppercase">Eventos</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#0A1F44] border border-white/5 p-8 rounded-3xl flex flex-col gap-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#00E5FF]/5 blur-3xl group-hover:bg-[#00E5FF]/10 transition-colors" />
          <div className="p-4 bg-[#00E5FF]/10 rounded-2xl w-fit">
            <BadgeDollarSign className="w-8 h-8 text-[#00E5FF]" />
          </div>
          <div>
            <p className="text-white/40 text-xs font-black uppercase tracking-[0.2em]">{role === 'admin' ? "Volumen de Venta Global" : "Mi Recaudación"}</p>
            <h3 className="text-4xl font-black text-white mt-2">
              ${metrics.totalRevenue.toLocaleString('es-AR')}
            </h3>
          </div>
        </div>

        <div className="bg-[#0A1F44] border border-white/5 p-8 rounded-3xl flex flex-col gap-4 relative overflow-hidden group">
           <div className="p-4 bg-purple-500/10 rounded-2xl w-fit">
            <Ticket className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <p className="text-white/40 text-xs font-black uppercase tracking-[0.2em]">Tickets Totales</p>
            <h3 className="text-4xl font-black text-white mt-2">{metrics.totalSold}</h3>
          </div>
        </div>

        <div className="bg-[#0A1F44] border border-white/5 p-8 rounded-3xl flex flex-col gap-4 relative overflow-hidden group">
           <div className="p-4 bg-green-500/10 rounded-2xl w-fit">
            <TrendingUp className="w-8 h-8 text-green-400" />
          </div>
          <div>
            <p className="text-white/40 text-xs font-black uppercase tracking-[0.2em]">{role === 'admin' ? "Eventos en Red" : "Mis Eventos"}</p>
            <h3 className="text-4xl font-black text-white mt-2">{metrics.eventCount}</h3>
          </div>
        </div>
      </div>
      
    </div>
  );
}


