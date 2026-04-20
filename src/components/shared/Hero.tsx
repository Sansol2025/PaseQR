"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Ticket, Flame, Music, GlassWater } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORIES = [
  { id: 1, label: "PaseQR Live", image: "https://images.unsplash.com/photo-1514525253361-bee0431870a4?auto=format&fit=crop&q=80&w=200&h=200" },
  { id: 2, label: "Festivales", image: "https://images.unsplash.com/photo-1459749411177-042180ce673b?auto=format&fit=crop&q=80&w=200&h=200" },
  { id: 3, label: "VIP Experiencias", image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80&w=200&h=200" },
  { id: 4, label: "After Office", image: "https://images.unsplash.com/photo-1541532748991-99af99ad30af?auto=format&fit=crop&q=80&w=200&h=200" },
  { id: 5, label: "Sorteos", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=200&h=200" },
];

export function Hero() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden flex flex-col pt-20">
      {/* Background with Dark Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05070A]/50 to-[#05070A] z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,229,255,0.05),transparent_50%)]" />
        <img
          src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1920&h=1080"
          alt="Premium Nightclub"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="container relative z-20 mx-auto px-4 flex-1 flex flex-col justify-end pb-12">
        
        {/* Stories Section (Instagram Style) */}
        <div className="w-full flex items-center gap-6 overflow-x-auto pb-12 no-scrollbar">
          {STORIES.map((story) => (
            <motion.div
              key={story.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2 cursor-pointer flex-shrink-0"
            >
              <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-[#00E5FF] to-[#0A1F44]">
                <div className="w-full h-full rounded-full border-2 border-[#05070A] overflow-hidden bg-muted">
                  <img src={story.image} alt={story.label} className="w-full h-full object-cover" />
                </div>
              </div>
              <span className="text-[10px] font-medium text-white/70 uppercase tracking-tighter">
                {story.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Hero Text */}
        <div className="max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 uppercase italic"
          >
            Tu entrada al <span className="text-[#00E5FF] drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">Próximo Nivel</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl font-light"
          >
            Seguridad absoluta con QR Dinámicos. Compra, transfiere y disfruta de los mejores eventos sin fricción.
          </motion.p>

          {/* Quick Filters / Interaction */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.4 }}
             className="flex flex-wrap gap-3 mb-10"
          >
            <Button variant="outline" className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white gap-2">
               <Music className="w-4 h-4 text-[#00E5FF]" /> Boliches
            </Button>
            <Button variant="outline" className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white gap-2">
               <Flame className="w-4 h-4 text-[#00E5FF]" /> Festivales
            </Button>
            <Button variant="outline" className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white gap-2">
               <GlassWater className="w-4 h-4 text-[#00E5FF]" /> After Office
            </Button>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex flex-col md:flex-row items-stretch md:items-center gap-2 max-w-4xl"
          >
            <div className="flex-1 flex items-center px-4 gap-3 border-b md:border-b-0 md:border-r border-white/10 py-3">
               <Search className="w-5 h-5 text-white/40" />
               <input 
                 type="text" 
                 placeholder="Buscar eventos, boliches o artistas..." 
                 className="bg-transparent border-none outline-none text-white w-full placeholder:text-white/20"
               />
            </div>
            <div className="flex items-center px-4 gap-3 py-3">
               <MapPin className="w-5 h-5 text-[#00E5FF]" />
               <select className="bg-transparent border-none outline-none text-white focus:ring-0 cursor-pointer">
                  <option className="bg-[#05070A]">La Rioja, AR</option>
                  <option className="bg-[#05070A]">Córdoba, AR</option>
                  <option className="bg-[#05070A]">Buenos Aires, AR</option>
               </select>
            </div>
            <Button className="bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#021227] font-bold rounded-xl px-8 h-12">
               EXPLORAR
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
