import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Send, Mail, MapPin } from "lucide-react";
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
            <div className="space-y-12">
              <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-tight">
                Estamos para <br /><span className="text-[#00E5FF]">ayudarte.</span>
              </h1>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-[#00E5FF]" />
                  <p className="text-white">hola@qrentrada.com.ar</p>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-[#00E5FF]" />
                  <p className="text-white">Buenos Aires, Argentina</p>
                </div>
              </div>
            </div>
            <div className="bg-white/[0.03] border border-white/5 p-8 rounded-3xl">
              <form className="space-y-6">
                <Input placeholder="Tu nombre" className="bg-white/5 border-white/10" />
                <Input type="email" placeholder="tu@email.com" className="bg-white/5 border-white/10" />
                <Textarea placeholder="¿En qué podemos ayudarte?" className="bg-white/5 border-white/10 min-h-[120px]" />
                <Button className="w-full bg-[#00E5FF] text-[#021227] font-bold uppercase tracking-widest py-6">
                  Enviar Mensaje
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
