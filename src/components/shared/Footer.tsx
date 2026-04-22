import Link from "next/link";
import { Ticket, ShieldCheck, CreditCard, ChevronRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#05070A] border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00E5FF] to-[#0A1F44] flex items-center justify-center">
                <Ticket className="w-5 h-5 text-[#05070A]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white uppercase italic">
                QR<span className="text-[#00E5FF]">entradas</span>
              </span>
            </Link>
            <p className="text-sm text-white/50 mb-6 font-light">
              La puerta al próximo nivel. Entradas digitales seguras, dinámicas y sin fricción.
            </p>
            <div className="flex gap-4">
              {/* Trust badges */}
              <div className="flex items-center gap-2 text-xs text-white/70 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                <ShieldCheck className="w-4 h-4 text-[#00E5FF]" /> 100% Seguro
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Explorar</h4>
            <ul className="space-y-3">
              <li><Link href="/boliches" className="text-sm text-white/60 hover:text-[#00E5FF] transition-colors flex items-center gap-1 group"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"/> Boliches</Link></li>
              <li><Link href="/festivales" className="text-sm text-white/60 hover:text-[#00E5FF] transition-colors flex items-center gap-1 group"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"/> Festivales</Link></li>
              <li><Link href="/after-office" className="text-sm text-white/60 hover:text-[#00E5FF] transition-colors flex items-center gap-1 group"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"/> After Office</Link></li>
              <li><Link href="/hoy" className="text-sm text-white/60 hover:text-[#00E5FF] transition-colors flex items-center gap-1 group"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"/> Eventos de Hoy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Organiza</h4>
            <ul className="space-y-3">
              <li><Link href="/dashboard" className="text-sm text-white/60 hover:text-[#00E5FF] transition-colors flex items-center gap-1 group"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"/> Vende Entradas</Link></li>
              <li><Link href="#" className="text-sm text-white/60 hover:text-[#00E5FF] transition-colors flex items-center gap-1 group"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"/> Precios</Link></li>
              <li><Link href="#" className="text-sm text-white/60 hover:text-[#00E5FF] transition-colors flex items-center gap-1 group"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"/> App de Puerta (Escáner)</Link></li>
              <li><Link href="#" className="text-sm text-white/60 hover:text-[#00E5FF] transition-colors flex items-center gap-1 group"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"/> Agencias e Influencers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Soporte</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-white/60 hover:text-[#00E5FF] transition-colors flex items-center gap-1 group"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"/> Centro de Ayuda</Link></li>
              <li><Link href="#" className="text-sm text-white/60 hover:text-[#00E5FF] transition-colors flex items-center gap-1 group"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"/> Términos y Condiciones</Link></li>
              <li><Link href="#" className="text-sm text-white/60 hover:text-[#00E5FF] transition-colors flex items-center gap-1 group"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"/> Privacidad</Link></li>
              <li><Link href="#" className="text-sm text-white/60 hover:text-[#00E5FF] transition-colors flex items-center gap-1 group"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"/> Contacto</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} QRentradas Platform. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/40">MÉTODOS DE PAGO:</span>
            <div className="flex gap-2 opacity-50">
               <CreditCard className="w-6 h-6 shrink-0" />
               <span className="text-xs font-bold self-center">Mercado Pago</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
