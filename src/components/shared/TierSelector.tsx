"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Ticket, Check, AlertCircle } from "lucide-react";

interface Tier {
  id: string;
  name: string;
  price: number;
  capacity: number;
  current_sold: number;
}

export function TierSelector({ tiers }: { tiers: Tier[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (!tiers || tiers.length === 0) {
    return (
      <div className="bg-[#0A1F44] border border-[#00E5FF]/20 rounded-3xl p-8 text-center">
         <AlertCircle className="w-12 h-12 text-white/20 mx-auto mb-4" />
         <p className="text-white/40 uppercase font-black tracking-widest italic">Tickets próximamente</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0A1F44] border border-white/5 rounded-3xl p-6 lg:sticky lg:top-24 mt-2">
      <h4 className="text-white font-bold mb-6 flex items-center gap-2">
        <Ticket className="w-5 h-5 text-[#00E5FF]" /> Asegura tu lugar
      </h4>
      <div className="space-y-3">
        {tiers.map((tier) => (
          <button
            key={tier.id}
            onClick={() => setSelectedId(tier.id)}
            className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
              selectedId === tier.id
                ? "bg-[#00E5FF]/10 border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                : "bg-white/5 border-white/5 hover:bg-white/10"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className={`font-bold ${selectedId === tier.id ? "text-[#00E5FF]" : "text-white"}`}>
                {tier.name}
              </span>
              <span className="text-white font-black">${tier.price}</span>
            </div>
            <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mt-1">
              Últimas {tier.capacity - tier.current_sold} unidades
            </p>
          </button>
        ))}
      </div>
      <Button 
        disabled={!selectedId}
        className="w-full mt-8 bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#021227] font-black uppercase py-6 rounded-2xl tracking-widest shadow-lg shadow-[#00E5FF]/20 disabled:bg-white/10 disabled:text-white/20 transition-all active:scale-[0.98]"
      >
        ADQUIRIR PASE
      </Button>
      <p className="text-[10px] text-white/30 text-center mt-6 uppercase tracking-widest font-bold">
        Pago seguro con Mercado Pago
      </p>
    </div>
  );
}
