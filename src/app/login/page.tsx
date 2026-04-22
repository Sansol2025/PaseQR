"use client";

import React, { useState } from "react";
import { Ticket, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login, signup } from "@/lib/actions/auth";
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
