import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Lock, Fingerprint, EyeOff } from "lucide-react";

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-[#05070A]">
      <Navbar />
      <section className="pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
               Políticas de <span className="text-[#00E5FF]">Privacidad</span>
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl text-center space-y-4">
               <Lock className="w-12 h-12 text-[#00E5FF] mx-auto opacity-50" />
               <h3 className="text-white font-bold">Cifrado SSL</h3>
               <p className="text-white/40 text-sm">Tus datos viajan 100% seguros.</p>
            </div>
            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl text-center space-y-4">
               <Fingerprint className="w-12 h-12 text-[#00E5FF] mx-auto opacity-50" />
               <h3 className="text-white font-bold">Identidad Única</h3>
               <p className="text-white/40 text-sm">Vinculamos tu QR a tu identidad.</p>
            </div>
            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl text-center space-y-4">
               <EyeOff className="w-12 h-12 text-[#00E5FF] mx-auto opacity-50" />
               <h3 className="text-white font-bold">Sin Datos a Terceros</h3>
               <p className="text-white/40 text-sm">Privacidad absoluta de tus datos.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
