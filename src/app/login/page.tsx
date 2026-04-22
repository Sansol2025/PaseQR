"use client";

import React, { useState } from "react";
import { Ticket, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login, signup } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = mode === "login" ? await login(formData) : await signup(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      setLoading(true);
      const supabase = createClient();
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${appUrl}/auth/callback?next=/mis-entradas`,
        },
      });

      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (mode === "login" || mode === "signup") && (
    <div className="min-h-screen bg-[#05070A] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00E5FF]/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <Link href="/" className="flex items-center gap-2 mb-4">
             <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00E5FF] to-[#0A1F44] flex items-center justify-center shadow-lg shadow-[#00E5FF]/20">
                <Ticket className="w-7 h-7 text-[#05070A]" />
             </div>
          </Link>
          <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">
            QR<span className="text-[#00E5FF]">entrada</span>
          </h1>
          <p className="text-white/40 text-sm mt-2 font-medium tracking-widest uppercase">
            {mode === "login" ? "Bienvenido de vuelta" : "Crea tu cuenta ahora"}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/5 p-8 rounded-[2.5rem] shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === "signup" && (
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-white/40 tracking-widest ml-1">Nombre Completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 h-5 w-5 text-white/20" />
                  <Input 
                    name="full_name" 
                    required 
                    placeholder="Tu nombre y apellido" 
                    className="pl-12 bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-[#00E5FF]/50"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black text-white/40 tracking-widest ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-white/20" />
                <Input 
                  name="email" 
                  type="email" 
                  required 
                  placeholder="ejemplo@email.com" 
                  className="pl-12 bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-[#00E5FF]/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black text-white/40 tracking-widest ml-1">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-white/20" />
                <Input 
                  name="password" 
                  type="password" 
                  required 
                  placeholder="••••••••" 
                  className="pl-12 bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-[#00E5FF]/50"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-xs font-bold bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                {error}
              </p>
            )}

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-14 bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#021227] font-black uppercase tracking-widest shadow-lg shadow-[#00E5FF]/20 rounded-xl"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <div className="flex items-center gap-2">
                  {mode === "login" ? "Ingresar" : "Comenzar"}
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-center space-x-4">
            <div className="h-px bg-white/10 w-full" />
            <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">O</span>
            <div className="h-px bg-white/10 w-full" />
          </div>

          <Button 
            type="button" 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full mt-6 h-14 bg-white hover:bg-gray-100 text-[#05070A] font-bold rounded-xl transition-colors"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuar con Google
          </Button>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-white/40 text-sm hover:text-[#00E5FF] transition-colors"
            >
              {mode === "login" ? (
                <>¿No tienes cuenta? <span className="text-[#00E5FF] font-bold">Regístrate</span></>
              ) : (
                <>¿Ya tienes cuenta? <span className="text-[#00E5FF] font-bold">Inicia sesión</span></>
              )}
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-[10px] text-white/20 uppercase font-bold tracking-[0.2em]">
          QRentradas Secure Access • v1.0
        </p>
      </div>
    </div>
  );
}
