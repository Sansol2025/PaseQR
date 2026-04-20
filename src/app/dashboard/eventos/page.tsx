"use client";

import React, { useState, useEffect } from "react";
import { Plus, Settings2, Users, Calendar, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { createEvent } from "@/lib/actions/events";

export default function EventosDashboard() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  const fetchEvents = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });
    
    if (data) setEvents(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Usamos el ID de prueba por ahora (Socio PaseQR)
    const result = await createEvent({
      ...formData,
      organizer_id: '00000000-0000-0000-0000-000000000000'
    });

    if (result.success) {
      setIsOpen(false);
      setFormData({ title: "", description: "", date: "", location: "" });
      fetchEvents();
    }
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-white uppercase tracking-wider">Gestión de Eventos</h1>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#021227] px-6 py-6 rounded-xl font-bold uppercase gap-2">
              <Plus className="w-5 h-5" /> Crear Evento
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#05070A] border-white/10 text-white sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl uppercase italic font-black">Nuevo Evento</DialogTitle>
              <DialogDescription className="text-white/40">
                Completa los detalles básicos para lanzar tu evento.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-white/50">Nombre del Evento</label>
                <Input 
                  required
                  placeholder="Ej: Techno Night Genesis"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="bg-white/5 border-white/10 text-white h-12"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-white/50">Fecha y Hora</label>
                  <Input 
                    required
                    type="datetime-local"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="bg-white/5 border-white/10 text-white h-12 [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-white/50">Ubicación</label>
                  <Input 
                    required
                    placeholder="Ej: Mandarine Park"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="bg-white/5 border-white/10 text-white h-12"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-white/50">Descripción</label>
                <textarea 
                  required
                  rows={3}
                  placeholder="Breve reseña del evento..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-xl p-3 text-sm outline-none focus:ring-1 focus:ring-[#00E5FF]/50"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#021227] font-black h-14 uppercase tracking-widest mt-4"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Publicar Evento"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 text-[#00E5FF] animate-spin" />
        </div>
      ) : (
        <div className="bg-[#0A1F44] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 text-white/50 text-[10px] md:text-sm uppercase tracking-widest border-b border-white/5">
                <th className="p-4 md:p-6 font-medium">Evento</th>
                <th className="p-4 md:p-6 font-medium hidden md:table-cell">Ubicación</th>
                <th className="p-4 md:p-6 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {events.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-20 text-center text-white/20 uppercase font-bold">
                    No tienes eventos creados
                  </td>
                </tr>
              ) : (
                events.map(event => (
                  <tr key={event.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-4 md:p-6">
                      <p className="text-base md:text-lg font-bold text-white mb-1 group-hover:text-[#00E5FF] transition-colors">{event.title}</p>
                      <div className="flex items-center gap-2 text-white/40 text-[11px]">
                         <Calendar className="w-3 h-3" />
                         {new Date(event.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-4 md:p-6 hidden md:table-cell">
                       <div className="flex items-center gap-2 text-white/60 text-sm">
                          <MapPin className="w-4 h-4 text-[#00E5FF]" />
                          {event.location}
                       </div>
                    </td>
                    <td className="p-4 md:p-6">
                      <div className="flex justify-end gap-3">
                        <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-[#00E5FF]/10 hover:text-[#00E5FF] text-xs h-9">
                          Gestionar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      
    </div>
  );
}
