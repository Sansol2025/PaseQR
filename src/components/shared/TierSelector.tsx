"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Ticket, AlertCircle, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

interface Tier {
  id: string;
  name: string;
  price: number;
  capacity: number;
  current_sold: number;
}

export function TierSelector({ 
  tiers, 
  eventId, 
  eventTitle 
}: { 
  tiers: Tier[]; 
  eventId: string; 
  eventTitle: string;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  if (!tiers || tiers.length === 0) {
    return (
      <div className="bg-[#0A1F44] border border-[#00E5FF]/20 rounded-3xl p-8 text-center">
         <AlertCircle className="w-12 h-12 text-white/20 mx-auto mb-4" />
         <p className="text-white/40 uppercase font-black tracking-widest italic">Tickets próximamente</p>
      </div>
    );
  }

  const selectedTier = tiers.find(t => t.id === selectedId);

  const handlePurchase = () => {
    if (!selectedId || !selectedTier) return;
    setError(null);

    startTransition(async () => {
      try {
        const res = await fetch("/api/create-preference", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventId,
            tierId: selectedId,
            tierName: selectedTier.name,
            price: selectedTier.price,
            eventTitle,
          }),
        });

        const data = await res.json();

        if (!res.ok || data.error) {
          if (res.status === 401) {
            router.push("/login");
            return;
          }
          setError(data.error || "Error al iniciar el pago.");
          return;
        }

        // Redirect to Mercado Pago checkout
        window.location.href = data.init_point;

      } catch (err: any) {
        setError("No se pudo conectar con el servicio de pago.");
      }
    });
  };

  return (
    <div className="bg-[#0A1F44] border border-white/5 rounded-3xl p-6 lg:sticky lg:top-24 mt-2">
      <h4 className="text-white font-bold mb-6 flex items-center gap-2">
        <Ticket className="w-5 h-5 text-[#00E5FF]" /> Asegura tu lugar
      </h4>
      <div className="space-y-3">
        {tiers.map((tier) => {
          const available = tier.capacity - tier.current_sold;
          const isSoldOut = available <= 0;
          return (
            <button
              key={tier.id}
              onClick={() => !isSoldOut && setSelectedId(tier.id)}
              disabled={isPending || isSoldOut}
              className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 disabled:cursor-not-allowed ${
                isSoldOut
                  ? "bg-white/5 border-white/5 opacity-40"
                  : selectedId === tier.id
                  ? "bg-[#00E5FF]/10 border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                  : "bg-white/5 border-white/5 hover:bg-white/10"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className={`font-bold ${selectedId === tier.id ? "text-[#00E5FF]" : "text-white"}`}>
                  {tier.name}
                </span>
                <span className="text-white font-black">${tier.price.toLocaleString('es-AR')}</span>
              </div>
              <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mt-1">
                {isSoldOut ? "AGOTADO" : `Últimas ${available} unidades`}
              </p>
            </button>
          );
        })}
      </div>

      {error && (
        <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-red-400 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <Button 
        onClick={handlePurchase}
        disabled={!selectedId || isPending}
        className="w-full mt-8 bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#021227] font-black uppercase py-6 rounded-2xl tracking-widest shadow-lg shadow-[#00E5FF]/20 disabled:bg-white/10 disabled:text-white/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <RefreshCw className="w-5 h-5 animate-spin" />
            Iniciando pago...
          </>
        ) : (
          "ADQUIRIR PASE"
        )}
      </Button>
      <p className="text-[10px] text-white/30 text-center mt-6 uppercase tracking-widest font-bold">
        Pago seguro con Mercado Pago
      </p>
    </div>
  );
}
