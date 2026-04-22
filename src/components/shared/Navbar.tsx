"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Ticket, Search, User, Menu, X, LogOut, LayoutDashboard, Music, Flame, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/actions/auth";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  const handleSignOut = async () => {
    console.log("Iniciando cierre de sesión...");
    await logout();
    setUser(null);
    setRole(null);
  };

  useEffect(() => {
    const supabase = createClient();
    
    // Check initial session
    const getSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        // Get role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        if (profile) setRole(profile.role);
      }
    };
    
    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        if (profile) setRole(profile.role);
      } else {
        setRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
    <header className="fixed top-0 w-full z-50 bg-[#05070A]/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00E5FF] to-[#0A1F44] flex items-center justify-center">
            <Ticket className="w-5 h-5 text-[#05070A]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white uppercase italic">
            QR<span className="text-[#00E5FF]">entrada</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Inicio</Link>
          <Link href="/boliches" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Boliches</Link>
          <Link href="/festivales" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Festivales</Link>
          {(role === 'organizer' || role === 'admin') && (
            <Link href="/dashboard" className="text-sm font-medium text-[#00E5FF] hover:text-[#00E5FF]/80 transition-colors">Dashboard</Link>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link href="/login" className="hidden md:block">
                <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
                  Ingresar
                </Button>
              </Link>
              <Link href="/login" className="hidden md:block">
                <Button className="bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#021227] font-bold">
                  Empezar
                </Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link href={role === 'organizer' || role === 'admin' ? '/dashboard' : '/mis-entradas'}>
                <Button variant="outline" className="hidden md:flex bg-white/5 border-white/10 text-white gap-2">
                  <User className="w-4 h-4" /> 
                  {role === 'organizer' || role === 'admin' ? 'Dashboard' : 'Mis QRentradas'}
                </Button>
              </Link>
                <button 
                  className="p-2 text-white/40 hover:text-red-400 transition-colors"
                  onClick={handleSignOut}
                  title="Cerrar Sesión"
                >
                  <LogOut className="w-5 h-5" />
                </button>
            </div>
          )}
          
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

    </header>
    
    {/* Mobile Menu - REFINED PREMIUM DESIGN */}
    {isMobileMenuOpen && (
      <div className="md:hidden fixed inset-0 top-20 bg-[#05070A] z-[9999] overflow-y-auto border-t border-[#00E5FF]/20">
        <div className="px-4 py-6 flex flex-col gap-1">

          {/* Nav Links */}
          <Link
            href="/boliches"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-white/5 active:bg-white/10 transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 flex items-center justify-center shrink-0">
              <Music className="w-5 h-5 text-[#00E5FF]" />
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-base">Boliches</p>
              <p className="text-white/40 text-xs">Las mejores pistas de la noche</p>
            </div>
            <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-[#00E5FF] transition-colors" />
          </Link>

          <Link
            href="/festivales"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-white/5 active:bg-white/10 transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5 text-purple-400" />
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-base">Festivales</p>
              <p className="text-white/40 text-xs">Grandes escenarios y lineups épicos</p>
            </div>
            <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-purple-400 transition-colors" />
          </Link>

          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-white/5 active:bg-white/10 transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
              <Ticket className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-base">Cartelera</p>
              <p className="text-white/40 text-xs">Todos los eventos de tu ciudad</p>
            </div>
            <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-emerald-400 transition-colors" />
          </Link>

          <div className="h-px bg-white/5 mx-4 my-3" />

          {/* User Actions */}
          <div className="px-4 flex flex-col gap-3 mt-2">
            {!user ? (
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full h-12 bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#021227] font-bold text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(0,229,255,0.25)]">
                  Iniciar Sesión
                </Button>
              </Link>
            ) : (
              <>
                <Link
                  href={role === 'organizer' || role === 'admin' ? '/dashboard' : '/mis-entradas'}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="outline" className="w-full h-12 border-white/10 text-white font-bold text-sm uppercase tracking-widest">
                    {role === 'organizer' || role === 'admin' ? 'Dashboard' : 'Mis Tickets'}
                  </Button>
                </Link>
                <button
                  className="w-full h-12 bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 rounded-xl active:scale-[0.98] transition-transform"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4" /> Cerrar Sesión
                </button>
              </>
            )}
          </div>

          <p className="text-center text-white/10 text-[10px] uppercase tracking-widest font-bold mt-8 mb-4">
            &copy; 2026 PASE<span className="text-[#00E5FF]/30">QR</span>
          </p>
        </div>
      </div>
    )}
    </>
  );
}
