"use client";

import Link from "next/link";
import { useState } from "react";
import { Ticket, Search, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <Link href="/login" className="hidden md:block">
            <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white">
              Iniciar Sesión
            </Button>
          </Link>
          <Link href="/mis-entradas" className="hidden md:block">
            <Button className="bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#021227] font-bold">
              Mis Entradas
            </Button>
          </Link>
          
          {/* Mobile Menu Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-white/70"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-20 bg-[#05070A] z-40 md:hidden flex flex-col p-6 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-6 mb-10">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-white uppercase italic border-b border-white/5 pb-4">Inicio</Link>
            <Link href="/boliches" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-white uppercase italic border-b border-white/5 pb-4">Boliches</Link>
            <Link href="/festivales" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-white uppercase italic border-b border-white/5 pb-4">Festivales</Link>
            <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-[#00E5FF] uppercase italic">Soy Organizador</Link>
          </nav>
          
          <div className="flex flex-col gap-4">
            <Link href="/mis-entradas" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full h-14 bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#021227] font-black uppercase text-lg">
                Mis Entradas
              </Button>
            </Link>
            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full h-14 border-white/10 text-white font-bold uppercase text-lg">
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
