"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Ticket, 
  Users, 
  TrendingUp, 
  Plus, 
  Loader2, 
  Calendar, 
  MapPin,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function EventManagementPage() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [tiers, setTiers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTierModalOpen, setIsTierModalOpen] = useState(false);

  // New Tier State
  const [newTier, setNewTier] = useState({
    name: "",
    price: "",
    capacity: ""
  });

  const fetchData = async () => {
    const supabase = createClient();
    
    // Fetch Event
    const { data: eventData } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
    
    // Fetch Tiers
    const { data: tiersData } = await supabase
      .from('ticket_tiers')
      .select('*')
      .eq('event_id', id);

    if (eventData) setEvent(eventData);
    if (tiersData) setTiers(tiersData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleAddTier = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const supabase = createClient();

    const { error } = await supabase
      .from('ticket_tiers')
      .insert([
        {
          event_id: id,
          name: newTier.name,
          price: parseFloat(newTier.price),
          capacity: parseInt(newTier.capacity),
          current_sold: 0
        }
      ]);

    if (!error) {
      setIsTierModalOpen(false);
      setNewTier({ name: "", price: "", capacity: "" });
      fetchData();
    } else {
      alert("Error al crear lote: " + error.message);
    }
    setIsSubmitting(false);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-[60vh]">
      <Loader2 className="w-10 h-10 text-[#00E5FF] animate-spin" />
    </div>
  );

  if (!event) return <div className="text-white text-center py-20">Evento no encontrado</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-4">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm uppercase font-bold tracking-widest bg-white/5 active:bg-white/10 px-4 py-2 rounded-lg w-fit"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </button>
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-4 mt-2">
               <span className="flex items-center gap-1.5 text-white/40 text-xs uppercase font-bold tracking-wider">
                  <Calendar className="w-3.5 h-3.5 text-[#00E5FF]" /> 
                  {new Date(event.date).toLocaleDateString('es-AR')}
               </span>
               <span className="flex items-center gap-1.5 text-white/40 text-xs uppercase font-bold tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-[#00E5FF]" /> 
                  {event.location}
               </span>
            </div>
          </div>
        </div>

        <Dialog open={isTierModalOpen} onOpenChange={setIsTierModalOpen}>
            <DialogTrigger 
              render={
                <Button className="bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#021227] font-black h-12 px-6 rounded-xl uppercase tracking-wider flex items-center gap-2">
                  <Plus className="w-5 h-5" /> Nuevo Lote de Entradas
                </Button>
              }
            />
            <DialogContent className="bg-[#05070A] border-white/10 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black uppercase italic">Crear Lote de Tickets</DialogTitle>
                <DialogDescription className="text-white/40">Define el nombre, precio y cantidad de entradas para este lote.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddTier} className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-white/40">Nombre del Lote</label>
                  <Input 
                    required
                    placeholder="Ej: Early Bird - Fase 1" 
                    value={newTier.name} 
                    onChange={e => setNewTier({...newTier, name: e.target.value})}
                    className="bg-white/5 border-white/10 text-white h-12"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-white/40">Precio ($)</label>
                    <Input 
                      required
                      type="number"
                      placeholder="Ej: 5000" 
                      value={newTier.price} 
                      onChange={e => setNewTier({...newTier, price: e.target.value})}
                      className="bg-white/5 border-white/10 text-white h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-white/40">Stock / Capacidad</label>
                    <Input 
                      required
                      type="number"
                      placeholder="Ej: 200" 
                      value={newTier.capacity} 
                      onChange={e => setNewTier({...newTier, capacity: e.target.value})}
                      className="bg-white/5 border-white/10 text-white h-12"
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#021227] font-black h-14 uppercase tracking-widest mt-4"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Guardar Lote"}
                </Button>
              </form>
            </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0A1F44] border border-white/5 p-6 rounded-2xl">
          <div className="flex items-center gap-3 text-white/40 mb-2 uppercase text-[10px] font-black tracking-widest">
             <Ticket className="w-4 h-4 text-[#00E5FF]" /> Entradas Vendidas
          </div>
          <p className="text-4xl font-black text-white italic">
            {tiers.reduce((acc, t) => acc + (t.current_sold || 0), 0)}
          </p>
          <div className="mt-2 w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
             <div className="bg-[#00E5FF] h-full" style={{ width: '15%' }} />
          </div>
        </div>
        
        <div className="bg-[#0A1F44] border border-white/5 p-6 rounded-2xl">
          <div className="flex items-center gap-3 text-white/40 mb-2 uppercase text-[10px] font-black tracking-widest">
             <TrendingUp className="w-4 h-4 text-green-400" /> Recaudación Est.
          </div>
          <p className="text-4xl font-black text-white italic">
            ${tiers.reduce((acc, t) => acc + ((t.current_sold || 0) * t.price), 0).toLocaleString()}
          </p>
        </div>

        <div className="bg-[#0A1F44] border border-white/5 p-6 rounded-2xl">
          <div className="flex items-center gap-3 text-white/40 mb-2 uppercase text-[10px] font-black tracking-widest">
             <Users className="w-4 h-4 text-[#00E5FF]" /> Lotes Activos
          </div>
          <p className="text-4xl font-black text-white italic">{tiers.length}</p>
        </div>
      </div>

      {/* Tiers Management */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white uppercase italic flex items-center gap-2">
          <Ticket className="w-5 h-5 text-[#00E5FF]" /> Lotes de Tickets
        </h3>
        <div className="bg-[#0A1F44] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-black/20 text-white/50 text-[10px] md:text-sm uppercase tracking-widest border-b border-white/5">
                <th className="p-6 font-medium">Nombre del Lote</th>
                <th className="p-6 font-medium">Precio</th>
                <th className="p-6 font-medium text-center">Ventas / Stock</th>
                <th className="p-6 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {tiers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-white/20 uppercase font-bold tracking-widest">
                    No has creado ningún lote de entradas
                  </td>
                </tr>
              ) : (
                tiers.map(tier => (
                  <tr key={tier.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-6">
                       <span className="text-white font-bold">{tier.name}</span>
                    </td>
                    <td className="p-6">
                       <span className="text-white font-black">${tier.price.toLocaleString()}</span>
                    </td>
                    <td className="p-6">
                       <div className="flex flex-col items-center gap-1">
                          <span className="text-white font-medium">{tier.current_sold} / {tier.capacity}</span>
                          <div className="w-32 bg-white/5 h-1 rounded-full overflow-hidden">
                             <div 
                                className="bg-[#00E5FF] h-full transition-all duration-1000" 
                                style={{ width: `${(tier.current_sold / tier.capacity) * 100}%` }}
                             />
                          </div>
                       </div>
                    </td>
                    <td className="p-6">
                       <div className="flex justify-end gap-3 opacity-20 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="text-white/40 hover:text-red-400">
                             <Trash2 className="w-5 h-5" />
                          </Button>
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
