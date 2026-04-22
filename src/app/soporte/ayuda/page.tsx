import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { HelpCircle, CreditCard, Ticket, ShieldCheck } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function AyudaPage() {
  const categories = [
    {
      title: "Pagos y Compras",
      icon: <CreditCard className="w-5 h-5 text-[#00E5FF]" />,
      questions: [
        {
          q: "¿Qué medios de pago aceptan?",
          a: "Aceptamos todos los medios de pago procesados por Mercado Pago, incluyendo tarjetas de crédito, débito, transferencia vía Dinero en Cuenta y efectivo (Rapipago/Pagofácil)."
        },
        {
          q: "¿Es seguro mi pago?",
          a: "Totalmente. QRentradas no almacena los datos de tu tarjeta. Todo es procesado de forma segura por Mercado Pago con estándares PCI-DSS."
        }
      ]
    },
    {
      title: "Tu Entrada QR",
      icon: <Ticket className="w-5 h-5 text-[#00E5FF]" />,
      questions: [
        {
          q: "¿Dónde encuentro mi entrada después de comprar?",
          a: "Tu entrada aparecerá instantáneamente en la sección 'Mis QRentradas' dentro de tu perfil. También recibirás un correo de confirmación."
        },
        {
          q: "¿Necesito imprimir mi entrada?",
          a: "No es necesario. Puedes mostrarla directamente desde tu celular. Asegúrate de tener suficiente brillo al momento de ingresar."
        }
      ]
    },
    {
      title: "Ingreso al Evento",
      icon: <ShieldCheck className="w-5 h-5 text-[#00E5FF]" />,
      questions: [
        {
          q: "¿Qué sucede si mi QR no escanea?",
          a: "Asegúrate de no tener el modo noche activado y que el brillo esté al máximo. Si el problema persiste, el personal de puerta puede verificar tu entrada con tu DNI."
        },
        {
          q: "¿Puedo transferir mi entrada?",
          a: "Por el momento las entradas son nominadas y personales. Consulta los términos específicos de cada evento para ver si se permiten cambios de titularidad."
        }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-[#05070A]">
      <Navbar />
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <HelpCircle className="w-16 h-16 text-[#00E5FF] mx-auto mb-6 opacity-50" />
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4">
             Centro de <span className="text-[#00E5FF]">Ayuda</span>
          </h1>
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            Todo lo que necesitas saber sobre el uso de QRentradas.
          </p>
        </div>
      </section>
      <section className="pb-24 px-4">
        <div className="container mx-auto max-w-3xl space-y-12">
          {categories.map((cat, idx) => (
            <div key={idx} className="space-y-6">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                {cat.icon}
                <h3 className="text-xl font-bold text-white uppercase tracking-wider italic">{cat.title}</h3>
              </div>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {cat.questions.map((item, qIdx) => (
                  <AccordionItem key={qIdx} value={`item-${idx}-${qIdx}`} className="border border-white/5 bg-white/[0.02] rounded-2xl px-6">
                    <AccordionTrigger className="text-left text-white font-medium py-6 hover:no-underline">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-white/50 pb-6 text-base">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
