"use client";

import React, { useState, useEffect } from "react";
import { Scan, CheckCircle, XCircle, RefreshCcw } from "lucide-react";
import { scanTicket } from "@/lib/actions/scanner";

type ScanResult = {
  success: boolean;
  message: string;
} | null;

export default function ScannerDashboard() {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult>(null);

  // MOCK: In a real app we would use html5-qrcode or similar to continuously read the camera feed
  const simulateScan = async (mockTicketId: string, isValid: boolean) => {
    setIsScanning(true);
    setResult(null);

    try {
      // Calling the Server Action which executes the RPC 
      // For this interactive mock, if isValid is false, it forces a failure path
      const res = await scanTicket(mockTicketId, isValid);
      setResult(res);
    } catch (e: any) {
      setResult({ success: false, message: e.message || "ERROR DESCONOCIDO" });
    } finally {
      setIsScanning(false);
    }
  };

  // Auto-reset UI after 3 seconds so the bouncer can keep scanning fast
  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => {
        setResult(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [result]);

  if (result) {
    return (
      <div className={`flex-1 flex flex-col items-center justify-center p-6 ${result.success ? 'bg-green-600' : 'bg-red-600'}`}>
        {result.success ? (
          <CheckCircle className="w-48 h-48 text-white mb-8" />
        ) : (
          <XCircle className="w-48 h-48 text-white mb-8" />
        )}
        <h1 className="text-4xl md:text-6xl font-black text-white text-center uppercase tracking-tighter leading-tight drop-shadow-xl">
          {result.message}
        </h1>
        <button 
           onClick={() => setResult(null)}
           className="mt-12 bg-black/30 hover:bg-black/50 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest transition-all"
        >
          Siguiente
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col pt-12 pb-6 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-black text-white uppercase italic tracking-widest">Pase<span className="text-[#00E5FF]">QR</span> Scanner</h2>
          <p className="text-white/50 text-sm font-bold tracking-widest">PUERTA PRINCIPAL</p>
        </div>
        <div className="bg-[#00E5FF]/20 text-[#00E5FF] px-3 py-1 rounded-full text-xs font-black uppercase">
          En línea (Realtime)
        </div>
      </div>

      {/* Viewfinder (Mock) */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        {/* Animated Scanning Box */}
        <div className="relative w-72 h-72 border-2 border-white/20 rounded-[2rem] flex items-center justify-center overflow-hidden">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#00E5FF] rounded-tl-[2rem]" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#00E5FF] rounded-tr-[2rem]" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#00E5FF] rounded-bl-[2rem]" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#00E5FF] rounded-br-[2rem]" />
          
          <Scan className={`w-24 h-24 text-white/20 ${isScanning ? 'animate-pulse text-[#00E5FF]' : ''}`} />

          {/* Laser scanning effect */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#00E5FF] shadow-[0_0_15px_#00E5FF] animate-[scan_2s_ease-in-out_infinite]" />
        </div>
        <p className="mt-8 text-white/50 text-lg font-bold tracking-widest uppercase">
          Apunta al código QR
        </p>

        {/* Buttons for MOCK interactions */}
        <div className="mt-12 flex gap-4 w-full max-w-sm">
          <button 
             onClick={() => simulateScan("mock-valid-uuid", true)}
             disabled={isScanning}
             className="flex-1 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white font-bold py-4 rounded-2xl transition-all"
          >
             Simular OK
          </button>
          <button 
             onClick={() => simulateScan("mock-invalid-uuid", false)}
             disabled={isScanning}
             className="flex-1 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white font-bold py-4 rounded-2xl transition-all"
          >
             Simular RECHAZO
          </button>
        </div>
      </div>
      
    </div>
  );
}
