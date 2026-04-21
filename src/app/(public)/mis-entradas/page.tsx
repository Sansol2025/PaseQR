"use client";

import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Ticket, Send, History, AlertTriangle, ScreenShare, ShieldCheck, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { getMyTickets } from "@/lib/actions/tickets";

export default function MyTicketsPage() {
  const [transferEmail, setTransferEmail] = useState("");
  const [isTransferring, setIsTransferring] = useState(false);
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchTickets() {
      try {
        const { data, error } = await getMyTickets();
        if (data) {
          setTickets(data);
        } else if (error) {
          console.error("Error from getMyTickets:", error);
        }
      } catch (error) {
        console.error("Error loading tickets:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTickets();
  }, [router]);

  const handleTransfer = async (ticketId: string) => {
    // Implementación futura de transferencia
    console.log("Transferring ticket:", ticketId);
  };

  const activeTickets = tickets.filter(t => t.status === "valid");
  const pastTickets = tickets.filter(t => (t.status !== "valid" && t.status !== "active"));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 text-[#00E5FF] animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-28 pb-20">
      
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-bold text-white uppercase italic tracking-tighter mb-3">
          Mis <span className="text-[#00E5FF]">QRentradas</span>
        </h1>
        <p className="text-white/60 text-sm md:text-base">Tus pases digitales con tecnología QR de alta seguridad.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Active Tickets */}
        <div className="lg:w-2/3 space-y-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-wide">
             <Ticket className="w-5 h-5 text-[#00E5FF]"/> Próximos Eventos
          </h2>

          {activeTickets.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center">
               <p className="text-white/50 mb-4 text-lg">No tienes entradas vigentes.</p>
               <Link href="/">
                 <Button className="font-bold text-[#021227] bg-[#00E5FF] hover:bg-[#00E5FF]/90 uppercase">Explorar Cartelera</Button>
               </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {activeTickets.map(ticket => (
                <div key={ticket.id} className="bg-[#0A1F44] border-2 border-[#00E5FF]/20 rounded-3xl overflow-hidden flex flex-col md:flex-row">
                  
                  {/* Left Side: Ticket Details */}
                  <div className="p-6 md:p-10 flex-1 relative bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#00E5FF]/10 via-[#0A1F44] to-[#0A1F44]">
                    <div className="mb-4">
                      <Badge className="bg-[#00E5FF]/20 text-[#00E5FF] border-none mb-2 hover:bg-[#00E5FF]/30">{ticket.tier_name}</Badge>
                      <h3 className="text-2xl font-bold text-white uppercase italic leading-tight mb-2">
                        {ticket.event_title}
                      </h3>
                      <p className="text-[#00E5FF] font-black text-sm tracking-widest">{ticket.event_date}</p>
                      <p className="text-white/60 text-sm mt-1">{ticket.location}</p>
                    </div>

                    <div className="border-t border-white/10 pt-4 mt-6 flex justify-between items-center gap-4">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-green-400" />
                        <span className="text-white/80 text-sm font-medium">Autenticidad Verificada</span>
                      </div>

                      <Dialog>
                        <DialogTrigger 
                          render={
                            <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white rounded-xl gap-2 font-bold text-xs uppercase tracking-wider">
                              <Send className="w-4 h-4" /> Transferir
                            </Button>
                          }
                        />
                        <DialogContent className="bg-[#05070A] border-white/10 text-white sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle className="text-xl uppercase italic">Transferir Entrada</DialogTitle>
                            <DialogDescription className="text-white/60">
                              Esta acción invalidará tu ticket actual y enviará uno nuevo al correo del destinatario.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex flex-col gap-4 py-4">
                            <Input 
                              type="email" 
                              placeholder="correo@ejemplo.com"
                              value={transferEmail}
                              onChange={(e) => setTransferEmail(e.target.value)}
                              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12"
                            />
                            <div className="bg-orange-500/10 border border-orange-500/20 p-3 rounded-lg flex items-start gap-3">
                               <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0" />
                               <p className="text-xs text-orange-200/80">Al transferir, pierdes absolutamente el derecho de acceso. La transferencia es final e irreversible.</p>
                            </div>
                          </div>
                          <Button 
                             disabled={!transferEmail || isTransferring}
                             onClick={() => handleTransfer(ticket.id)}
                             className="w-full h-12 bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#021227] font-black uppercase tracking-widest"
                          >
                             {isTransferring ? "Procesando..." : "Confirmar Transferencia"}
                          </Button>
                        </DialogContent>
                      </Dialog>

                    </div>
                  </div>

                  {/* Right Side: QR Code Area (Bright inside) */}
                  <div className="bg-white p-8 md:p-10 flex flex-col items-center justify-center border-t-2 md:border-t-0 md:border-l-2 border-dashed border-[#05070A] relative w-full md:w-72 shrink-0">
                     {/* Perforation holes trick */}
                     <div className="absolute -top-3 md:top-0 -left-3 w-6 h-6 bg-[#05070A] rounded-full" />
                     <div className="absolute -bottom-3 md:bottom-0 -left-3 w-6 h-6 bg-[#05070A] rounded-full" />
                     
                     <div className="flex flex-col items-center gap-2 w-full text-center">
                        <div className="flex items-center gap-1 text-[#021227]/50 uppercase font-black text-[10px] tracking-widest mb-2">
                          <Sun className="w-3 h-3" /> BRILLO MÁXIMO
                        </div>
                        <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                           <QRCodeSVG 
                             value={ticket.id}
                             size={180}
                             level={"H"}
                             fgColor="#05070A"
                             bgColor="#ffffff"
                           />
                        </div>
                     </div>
                     <p className="text-[#021227]/60 text-[10px] uppercase font-bold tracking-widest text-center mt-4 break-all opacity-40">
                        {ticket.id}
                     </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: History */}
        <div className="lg:w-1/3">
           <h2 className="text-xl font-bold text-white/50 mb-4 flex items-center gap-2 uppercase tracking-wide">
             <History className="w-5 h-5"/> Historial
          </h2>
          <div className="bg-white/5 border border-white/5 rounded-3xl p-6 flex flex-col gap-4">
             {pastTickets.map(ticket => (
               <div key={ticket.id} className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0 last:pb-0 opacity-50 grayscale">
                 <div>
                   <h4 className="text-white font-bold text-sm uppercase italic">{ticket.event_title}</h4>
                   <p className="text-white/60 text-xs">{ticket.event_date}</p>
                 </div>
                 <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-bold">
                   {ticket.status === 'transferred' ? 'Transferido' : ticket.status}
                 </Badge>
               </div>
             ))}
             {pastTickets.length === 0 && (
               <p className="text-white/40 text-sm text-center">No hay tickets en el historial.</p>
             )}
          </div>
        </div>

      </div>
    </div>
  );
}
