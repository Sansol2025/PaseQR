import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Lock, Fingerprint, EyeOff, FileText } from "lucide-react";

export default function PrivacidadPage() {
  const points = [
    {
      icon: <Lock className="w-6 h-6 text-[#00E5FF]" />,
      title: "Cifrado de Datos",
      text: "Utilizamos protocolos SSL de 256 bits para asegurar que toda tu información viaje cifrada desde tu dispositivo a nuestros servidores."
    },
    {
      icon: <Fingerprint className="w-6 h-6 text-[#00E5FF]" />,
      title: "Información de Identidad",
      text: "Solo solicitamos los datos necesarios para emitir tu ticket y validar tu identidad al ingresar al evento (Nombre, Email y DNI)."
    },
    {
      icon: <EyeOff className="w-6 h-6 text-[#00E5FF]" />,
      title: "No cedemos datos",
      text: "Nunca compartiremos ni venderemos tu información personal a terceros con fines publicitarios. Tus datos pertenecen solo a ti."
    }
  ];

  return (
    <main className="min-h-screen bg-[#05070A]">
      <Navbar />
      
      <section className="pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
               Política de <span className="text-[#00E5FF]">Privacidad</span>
            </h1>
            <p className="text-white/40 max-w-lg mx-auto">
              Tu privacidad no es una opción, es un compromiso. Entiende cómo protegemos cada dato que compartes con nosotros.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {points.map((p, idx) => (
              <div key={idx} className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl text-center space-y-4">
                <div className="w-12 h-12 bg-[#00E5FF]/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  {p.icon}
                </div>
                <h3 className="text-white font-bold">{p.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>

          <article className="prose prose-invert max-w-none bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <FileText className="w-6 h-6 text-[#00E5FF]" /> 1. Recolección de Información
              </h2>
              <p className="text-white/60 font-light text-lg">
                Recopilamos información cuando te registras en nuestro sitio, realizas una compra o te suscribes a nuestro boletín informativo. Esto incluye tu nombre completo, dirección de correo electrónico y datos técnicos de inicio de sesión.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-[#00E5FF]" /> 2. Datos de Pago
              </h2>
              <p className="text-white/60 font-light text-lg">
                Es fundamental destacar que QRentradas **no almacena información de tarjetas**. Todas las transacciones se realizan directamente en los servidores de Mercado Pago, que garantizan el cumplimiento de las normativas de seguridad financiera internacionales.
              </p>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}
