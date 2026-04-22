"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, Loader2, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { purchaseTicket } from "@/lib/actions/tickets";
import Link from "next/link";

function PagoExitosoContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"verifying" | "done">("verifying");
  const paymentId = searchParams.get("payment_id");

  useEffect(() => {
    // Delay to let the webhook finish processing the transaction background
    const timer = setTimeout(() => {
      setStatus("done");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#05070A] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center space-y-8">
        {status === "verifying" ? (
          <div className="flex flex-col items-center gap-6 animate-pulse">
            <div className="w-20 h-20 rounded-full bg-[#00E5FF]/10 flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-[#00E5FF] animate-spin" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white uppercase italic tracking-tighter">Confirmando tu pase...</h2>
              <p className="text-white/40 text-sm">Estamos vinculando tu pago con tu cuenta.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in zoom-in duration-500">
            {/* Success Icon */}
            <div className="relative mx-auto w-24 h-24">
              <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full" />
              <div className="relative w-24 h-24 rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-400" />
              </div>
            </div>

            {/* Main Text */}
            <div>
              <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none mb-3">
                ¡Pago <span className="text-green-400">Exitoso!</span>
              </h1>
              <p className="text-white/60 text-sm max-w-[280px] mx-auto">
                Tu transacción se completó. Ya puedes ver tu QRentrada en tu perfil.
              </p>
            </div>

            {/* Information Card */}
            <div className="bg-[#0A1F44]/50 border border-[#00E5FF]/20 rounded-3xl p-6 backdrop-blur-xl text-left space-y-4">
              <div className="flex items-center gap-3 text-[#00E5FF]">
                <div className="p-2 bg-[#00E5FF]/10 rounded-lg">
                  <Ticket className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm uppercase tracking-widest text-[10px]">Entrada Generada</span>
              </div>
              
              <div className="space-y-1">
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">ID de Operación</p>
                <code className="text-[#00E5FF] text-xs font-mono">{paymentId || "MP-Ref"}</code>
              </div>

              <div className="pt-4 border-t border-white/5">
                <p className="text-white/70 text-xs leading-relaxed italic">
                  Si estás en el navegador de Mercado Pago, te recomendamos ir a "Mis Entradas" en tu navegador habitual.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Link href="/mis-entradas" className="w-full">
                <Button className="w-full bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-[#021227] font-black uppercase tracking-widest h-14 rounded-2xl group text-xs">
                  Ver mi pase QR
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/" className="w-full">
                <Button variant="ghost" className="w-full text-white/40 hover:text-white uppercase tracking-[0.2em] text-[10px] font-bold">
                  Volver al inicio
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PagoExitosoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#05070A] flex items-center justify-center">
        <Loader2 className="w-16 h-16 text-[#00E5FF] animate-spin" />
      </div>
    }>
      <PagoExitosoContent />
    </Suspense>
  );
}
