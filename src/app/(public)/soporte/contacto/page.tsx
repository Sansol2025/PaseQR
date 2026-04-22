import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Send, Mail, MapPin, Instagram, Facebook, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-[#05070A]">
      <Navbar />
      
      <section className="pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Info Side */}
            <div className="space-y-12">
              <div>
                <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-6 leading-[0.9]">
                  Hablemos de tu próximo <br />
                  <span className="text-[#00E5FF]">evento.</span>
                </h1>
                <p className="text-white/40 text-lg max-w-md">
                   Estamos aquí para ayudarte. Si eres un organizador o un asistente, contáctanos y te responderemos a la brevedad.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-[#00E5FF]/40 transition-colors">
                    <Mail className="w-5 h-5 text-[#00E5FF]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest">Email de soporte</p>
                    <p className="text-white font-medium">hola@qrentrada.com.ar</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-[#00E5FF]/40 transition-colors">
                    <MapPin className="w-5 h-5 text-[#00E5FF]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest">Ubicación</p>
                    <p className="text-white font-medium">Buenos Aires, Argentina</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00E5FF]/20 cursor-pointer transition-colors text-white">
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600/20 cursor-pointer transition-colors text-white">
                  <Facebook className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="relative">
              <div className="absolute inset-0 bg-[#00E5FF]/5 blur-[100px] rounded-full pointer-events-none" />
              <div className="relative bg-white/[0.03] backdrop-blur-3xl border border-white/5 p-8 md:p-12 rounded-[2.5rem]">
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-white/40 tracking-widest">Nombre Completo</label>
                    <Input 
                      placeholder="Tu nombre" 
                      className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-[#00E5FF]/30 italic font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-white/40 tracking-widest">Email</label>
                    <Input 
                      type="email" 
                      placeholder="tu@email.com" 
                      className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-[#00E5FF]/30 font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-white/40 tracking-widest">Mensaje</label>
                    <Textarea 
                      placeholder="Cuéntanos en qué podemos ayudarte..." 
                      className="bg-white/5 border-white/10 min-h-[150px] rounded-2xl focus:ring-[#00E5FF]/30 font-medium"
                    />
                  </div>

                  <Button className="w-full h-14 bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#021227] font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-[#00E5FF]/10 flex items-center gap-3">
                    <Send className="w-5 h-5" />
                    Enviar Mensaje
                  </Button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
