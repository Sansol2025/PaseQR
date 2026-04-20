"use client";

import React, { useState } from "react";
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

const MY_TICKETS = [
  {
    id: "f3c834a0-5b12-4f76-8051-bd15de358bfb", // Real UUID for the QR
    event_title: "Techno Night: Genesis",
    event_date: "VIERNES 24 MAYO • 23:30",
    tier_name: "VIP Experience",
    status: "valid",
    location: "Club Mamba, City Center"
  },
  {
    id: "b9e94441-2b0e-43bd-a8b2-a4e9b9cfec09",
    event_title: "Bresh: Edición Especial",
    event_date: "SÁBADO 25 MAYO • 23:59",
    tier_name: "Preventa 1",
    status: "transferred",
    location: "Estadio Norte"
  }
];

export default function MyTicketsPage() {
  const [transferEmail, setTransferEmail] = useState("");
  const [isTransferring, setIsTransferring] = useState(false);
  const [tickets, setTickets] = useState(MY_TICKETS);

  const activeTickets = tickets.filter(t => t.status === "valid");
  const pastTickets = tickets.filter(t => t.status !== "valid");

  const handleTransfer = async (ticketId: string) => {
    setIsTransferring(true);
    // Simulate server action
    await new Promise(res => setTimeout(res, 1500));
    
    setTickets(prev => prev.map(t => 
      t.id === ticketId ? { ...t, status: "transferred" } : t
    ));
    setIsTransferring(false);
  };

  return (
    <div className="container mx-auto px-4 pt-28 pb-20">
      
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold text-white uppercase italic tracking-tighter mb-3">
          Mi <span className="text-[#00E5FF]">Billetera</span>
        </h1>
        <p className="text-white/60">Tus entradas digitales con QR de alta seguridad.</p>
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
               <Button className="font-bold text-[#021227] bg-[#00E5FF] hover:bg-[#00E5FF]/90 uppercase">Explorar Cartelera</Button>
            </div>
          ) : (
            <div className="space-y-6">
              {activeTickets.map(ticket => (
                <div key={ticket.id} className="bg-[#0A1F44] border-2 border-[#00E5FF]/20 rounded-3xl overflow-hidden flex flex-col md:flex-row">
                  
                  {/* Left Side: Ticket Details */}
                  <div className="p-6 md:p-8 flex-1 relative bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#00E5FF]/10 via-[#0A1F44] to-[#0A1F44]">
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
                  <div className="bg-white p-6 md:p-8 flex flex-col items-center justify-center border-l-2 border-dashed border-[#05070A] relative w-full md:w-64 shrink-0">
                     {/* Perforation holes trick */}
                     <div className="absolute top-0 -left-3 w-6 h-6 bg-[#05070A] rounded-full -translate-y-1/2" />
                     <div className="absolute bottom-0 -left-3 w-6 h-6 bg-[#05070A] rounded-full translate-y-1/2" />
                     
                     <div className="flex flex-col items-center gap-2 w-full text-center mb-4">
                        <div className="flex items-center gap-1 text-[#021227]/50 uppercase font-black text-[10px] tracking-widest mb-1">
                          <Sun className="w-3 h-3" /> BRILLO MÁXIMO
                        </div>
                        <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                           <QRCodeSVG 
                             value={ticket.id}
                             size={160}
                             level={"H"}
                             fgColor="#05070A"
                             bgColor="#ffffff"
                           />
                        </div>
                     </div>
                     <p className="text-[#021227]/60 text-[10px] uppercase font-bold tracking-widest text-center mt-2 break-all max-w-[160px]">
                        {ticket.id.split('-')[0]}-{ticket.id.split('-')[4]}
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
