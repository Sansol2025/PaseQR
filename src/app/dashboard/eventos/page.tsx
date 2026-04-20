import React from "react";
import { Plus, Settings2, Users } from "lucide-react";

export default function EventosDashboard() {
  const MOCK_ADMIN_EVENTS = [
    {
      id: "1",
      title: "Techno Night: Genesis",
      date: "Viernes 24 Mayo",
      sold: 850,
      revenue: "$12.750.000",
      status: "Active"
    },
    {
      id: "2",
      title: "Bresh VIP",
      date: "Sábado 25 Mayo",
      sold: 1200,
      revenue: "$24.000.000",
      status: "Active"
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-white uppercase tracking-wider">Gestión de Eventos</h1>
        <button className="bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#021227] px-6 py-3 rounded-xl font-bold uppercase flex items-center gap-2">
          <Plus className="w-5 h-5" /> Crear Evento
        </button>
      </div>

      <div className="bg-[#0A1F44] border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/20 text-white/50 text-sm uppercase tracking-widest border-b border-white/5">
              <th className="p-6 font-medium">Evento</th>
              <th className="p-6 font-medium">Tickets Vendidos</th>
              <th className="p-6 font-medium">Recaudación</th>
              <th className="p-6 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {MOCK_ADMIN_EVENTS.map(event => (
              <tr key={event.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-6">
                  <p className="text-lg font-bold text-white mb-1">{event.title}</p>
                  <p className="text-sm text-[#00E5FF]">{event.date}</p>
                </td>
                <td className="p-6">
                   <div className="flex items-center gap-2 text-white">
                      <Users className="w-4 h-4 text-white/40" />
                      {event.sold}
                   </div>
                </td>
                <td className="p-6 text-green-400 font-medium">
                  {event.revenue}
                </td>
                <td className="p-6">
                  <div className="flex justify-end gap-3">
                    <button className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-white/10">
                      Lotes y Precios
                    </button>
                    <button className="bg-white/5 hover:bg-white/10 text-white p-2 rounded-lg transition-colors border border-white/10">
                      <Settings2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}
