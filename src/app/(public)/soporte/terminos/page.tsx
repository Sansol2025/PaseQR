import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Scale } from "lucide-react";

export default function TerminosPage() {
  const sections = [
    {
      title: "1. Aceptación de los Términos",
      content: "Al utilizar la plataforma QRentradas, el usuario acepta estos términos y condiciones en su totalidad. Si no está de acuerdo con alguno de los puntos, le recomendamos abstenerse de usar el servicio."
    },
    {
      title: "2. Prestación del Servicio",
      content: "QRentradas es una plataforma de intermediación tecnológica para la venta de tickets digitales. No somos organizadores de los eventos, sino los facilitadores de la tecnología de acceso y procesamiento de pagos."
    },
    {
      title: "3. Política de Pagos y Precios",
      content: "Todos los pagos son procesados a través de Mercado Pago. El precio final puede incluir un cargo por servicio que será informado antes de completar la transacción. Una vez emitido el ticket, se considera una venta final."
    },
    {
      title: "4. Política de Devoluciones",
      content: "Las devoluciones corren por cuenta del organizador del evento. QRentradas solo procesará reembolsos si el evento es cancelado oficialmente y el organizador autoriza la devolución de los fondos."
    },
    {
      title: "5. Uso Prohibido",
      content: "Queda prohibida la reventa de tickets generados en nuestra plataforma. El intento de duplicar o falsificar un código QR resultará en la cancelación inmediata de la membresía y el ticket, sin derecho a reclamo."
    }
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
            <p className="text-white/40 uppercase tracking-[0.2em] text-xs font-bold">
               Última actualización: Abril 2024
            </p>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 md:p-12 space-y-10">
            {sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-[#00E5FF] font-bold uppercase tracking-widest text-sm italic">
                  {section.title}
                </h3>
                <p className="text-white/60 leading-relaxed font-light text-lg">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center text-white/30 text-sm">
            Si tiene dudas sobre estos términos, contáctenos en legales@qrentrada.com.ar
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
