"use client";

import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PagoFallidoPage() {
  return (
    <div className="min-h-screen bg-[#05070A] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center flex flex-col items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center">
          <XCircle className="w-12 h-12 text-red-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white uppercase italic tracking-tighter mb-2">
            Pago <span className="text-red-400">fallido</span>
          </h1>
          <p className="text-white/50 text-sm">
            No se pudo procesar tu pago. No se realizó ningún cobro.
          </p>
        </div>
        <Link href="/" className="w-full">
          <Button className="w-full bg-white/10 hover:bg-white/20 text-white font-black uppercase tracking-widest h-12">
            Volver a la Cartelera
          </Button>
        </Link>
      </div>
    </div>
  );
}
