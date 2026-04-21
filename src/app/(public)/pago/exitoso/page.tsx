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
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "done">("loading");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const paymentId = searchParams.get("payment_id");
    const externalRef = searchParams.get("external_reference");
    const eventId = externalRef?.split("|")[0];
    const tierId = externalRef?.split("|")[1];

    if (eventId && tierId) {
      purchaseTicket(eventId, tierId, paymentId || undefined).then(() => setStatus("done"));
    } else {
      setStatus("done");
    }
  }, [searchParams]);

  useEffect(() => {
    if (status === "done") {
      const timer = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) {
            clearInterval(timer);
            router.push("/mis-entradas");
            return 0;
          }
          return c - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status, router]);

  return (
    <div className="min-h-screen bg-[#05070A] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {status === "loading" ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-16 h-16 text-[#00E5FF] animate-spin" />
            <p className="text-white/60">Confirmando tu pago...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white uppercase italic tracking-tighter mb-2">
                ¡Pago <span className="text-green-400">exitoso!</span>
              </h1>
              <p className="text-white/50 text-sm">
                Tu entrada fue generada. Redirigiendo en {countdown}s...
              </p>
            </div>
            <div className="bg-[#0A1F44] border border-[#00E5FF]/20 rounded-2xl p-6 w-full text-left">
              <div className="flex items-center gap-3 text-[#00E5FF]">
                <Ticket className="w-5 h-5" />
                <span className="font-bold text-sm uppercase tracking-widest">Tu entrada fue generada</span>
              </div>
              <p className="text-white/40 text-xs mt-2">
                Encontrá tu código QR en la sección Mis QRentradas
              </p>
            </div>
            <Link href="/mis-entradas" className="w-full">
              <Button className="w-full bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#021227] font-black uppercase tracking-widest h-12">
                Ver Mis QRentradas
              </Button>
            </Link>
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
