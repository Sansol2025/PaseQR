import React from "react";
import { Link as LinkIcon, DollarSign, Copy, CheckCircle2 } from "lucide-react";

export default function RRPPDashboard() {
  const MOCK_RRPP = [
    {
      id: "1",
      name: "Sofi M.",
      slug: "sofi_vip",
      sales: 45,
      commission: "$67.500",
      status: "paid"
    },
    {
      id: "2",
      name: "Tomi G.",
      slug: "tomi_entradas",
      sales: 120,
      commission: "$180.000",
      status: "pending"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <div className="flex justify-between items-center bg-purple-500/10 border border-purple-500/20 p-8 rounded-[2rem]">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-wider">Módulo de Relaciones Públicas</h1>
          <p className="text-white/60 mt-2 max-w-2xl">
            Genera links únicos para tu equipo de promociones. PaseQR rastrea automáticamente las ventas que se generan desde estos links y te ayuda a liquidar comisiones.
          </p>
        </div>
        <button className="bg-purple-500 text-white px-6 py-3 rounded-xl font-bold uppercase shrink-0 hidden md:flex items-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
          <LinkIcon className="w-5 h-5" /> Generar Link
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_RRPP.map(rrpp => (
          <div key={rrpp.id} className="bg-[#0A1F44] border border-white/10 p-6 rounded-3xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4">
                {rrpp.status === 'paid' ? (
                  <span className="flex items-center gap-1 text-xs text-green-400 font-bold bg-green-400/10 px-2 py-1 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> Liquidado
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-orange-400 font-bold bg-orange-400/10 px-2 py-1 rounded-full">
                    <DollarSign className="w-3 h-3" /> Pendiente
                  </span>
                )}
             </div>

             <h3 className="text-xl font-bold text-white mb-1">{rrpp.name}</h3>
             <p className="text-white/40 text-sm mb-6 font-mono">paseqr.com/e/tecno?ref={rrpp.slug}</p>

             <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-white/40 text-xs uppercase font-bold tracking-wider mb-1">Tickets</p>
                  <p className="text-2xl font-black text-white">{rrpp.sales}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase font-bold tracking-wider mb-1">Comisión</p>
                  <p className="text-2xl font-black text-[#00E5FF]">{rrpp.commission}</p>
                </div>
             </div>

             <div className="flex gap-2">
               <button className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-colors">
                 <Copy className="w-4 h-4" /> Copiar Link
               </button>
               {rrpp.status === 'pending' && (
                 <button className="flex-1 bg-green-500/10 hover:bg-green-500/20 text-green-400 py-3 rounded-xl font-medium text-sm flex items-center justify-center transition-colors">
                   Liquidar
                 </button>
               )}
             </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}
