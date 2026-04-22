import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Scale } from "lucide-react";

export default function TerminosPage() {
  const sections = [
    { title: "1. Aceptación", content: "Al usar QRentradas, aceptas estos términos." },
    { title: "2. Servicio", content: "Intermediamos en la venta de tickets digitales." },
    { title: "3. Pagos", content: "Procesados vía Mercado Pago. Ventas finales." },
    { title: "4. Devoluciones", content: "Sujetas a políticas del organizador." }
  ];

  return (
    <main className="min-h-screen bg-[#05070A]">
      <Navbar />
      <section className="pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <Scale className="w-12 h-12 text-[#00E5FF] mx-auto mb-4 opacity-50" />
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
               Términos & <span className="text-[#00E5FF]">Condiciones</span>
            </h1>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-10">
            {sections.map((s, i) => (
              <div key={i} className="space-y-4">
                <h3 className="text-[#00E5FF] font-bold uppercase text-sm italic">{s.title}</h3>
                <p className="text-white/60 leading-relaxed font-light text-lg">{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
