"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Ticket, Search, User, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
    router.push("/");
    router.refresh();
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
                  {role === 'organizer' || role === 'admin' ? 'Dashboard' : 'Mis Tickets'}
                </Button>
              </Link>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white/40 hover:text-red-400"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-5 h-5" />
                </Button>
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-20 bg-[#05070A] z-40 md:hidden flex flex-col p-6 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-6 mb-10">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-white uppercase italic border-b border-white/5 pb-4">Inicio</Link>
            <Link href="/boliches" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-white uppercase italic border-b border-white/5 pb-4">Boliches</Link>
            <Link href="/festivales" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-white uppercase italic border-b border-white/5 pb-4">Festivales</Link>
            {user && (
               <Link href={role === 'organizer' || role === 'admin' ? '/dashboard' : '/mis-entradas'} onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-[#00E5FF] uppercase italic">
                  Mi Perfil
               </Link>
            )}
          </nav>
          
          <div className="flex flex-col gap-4">
            {!user ? (
               <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full h-14 bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#021227] font-black uppercase text-lg">
                    Iniciar Sesión
                  </Button>
               </Link>
            ) : (
                <Button 
                  variant="destructive" 
                  className="w-full h-14 font-black uppercase text-lg gap-2"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-5 h-5" /> Cerrar Sesión
                </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
