"use client";

import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { HelpCircle, CreditCard, Ticket, ShieldCheck, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function AyudaPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = [
    {
      title: "Pagos y Compras",
      icon: <CreditCard className="w-5 h-5 text-[#00E5FF]" />,
      questions: [
        { id: "p1", q: "¿Qué medios de pago aceptan?", a: "Aceptamos todos los medios de pago procesados por Mercado Pago." },
        { id: "p2", q: "¿Es seguro mi pago?", a: "Totalmente. QRentradas no almacena los datos de tu tarjeta." }
      ]
    },
    {
      title: "Tu Entrada QR",
      icon: <Ticket className="w-5 h-5 text-[#00E5FF]" />,
      questions: [
        { id: "t1", q: "¿Dónde encuentro mi entrada?", a: "En la sección 'Mis QRentradas' dentro de tu perfil." }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-[#05070A]">
      <Navbar />
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <HelpCircle className="w-16 h-16 text-[#00E5FF] mx-auto mb-6 opacity-30" />
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4">
             Centro de <span className="text-[#00E5FF]">Ayuda</span>
          </h1>
        </div>
      </section>

      <section className="pb-24 px-4">
        <div className="container mx-auto max-w-3xl space-y-12">
          {categories.map((cat, idx) => (
            <div key={idx} className="space-y-6">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                {cat.icon}
                <h2 className="text-xl font-bold text-white uppercase italic">{cat.title}</h2>
              </div>
              <div className="space-y-4">
                {cat.questions.map((item) => (
                  <div key={item.id} className="border border-white/5 bg-white/[0.02] rounded-2xl overflow-hidden">
                    <button 
                      onClick={() => toggleItem(item.id)}
                      className="w-full flex items-center justify-between p-6 text-left text-white hover:bg-white/[0.04] transition-colors"
                    >
                      <span className="font-medium">{item.q}</span>
                      <ChevronDown className={cn("w-5 h-5 text-[#00E5FF] transition-transform", openItems[item.id] && "rotate-180")} />
                    </button>
                    {openItems[item.id] && (
                      <div className="px-6 pb-6 text-white/50 leading-relaxed">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
