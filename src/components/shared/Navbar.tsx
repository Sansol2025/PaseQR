import Link from "next/link";
import { Ticket, Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#05070A]/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00E5FF] to-[#0A1F44] flex items-center justify-center">
            <Ticket className="w-5 h-5 text-[#05070A]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white uppercase italic">
            Pase<span className="text-[#00E5FF]">QR</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Inicio</Link>
          <Link href="/boliches" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Boliches</Link>
          <Link href="/festivales" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Festivales</Link>
          <Link href="/dashboard" className="text-sm font-medium text-[#00E5FF] hover:text-[#00E5FF]/80 transition-colors">Soy Organizador</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10 hidden md:flex">
            <Search className="w-5 h-5" />
          </Button>
          <Link href="/login">
            <Button variant="outline" className="hidden md:flex bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white">
              Iniciar Sesión
            </Button>
          </Link>
          <Link href="/mis-entradas">
            <Button className="hidden md:flex bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#021227] font-bold">
              Mis Entradas
            </Button>
          </Link>
          
          {/* Mobile Menu Toggle */}
          <Button variant="ghost" size="icon" className="md:hidden text-white/70">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}
