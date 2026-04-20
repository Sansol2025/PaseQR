import { Hero } from "@/components/shared/Hero";
import { Ticket, Calendar, TrendingUp, MapPin } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  
  // Traemos los eventos reales desde Supabase
  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });

  if (error) {
    console.error("Error fetching events:", error);
  }

  return (
    <div className="flex flex-col items-center justify-between">
      <Hero />
      
      {/* Eventos Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white uppercase italic tracking-tighter flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-[#00E5FF]" />
              Cartelera de <span className="text-[#00E5FF]">Eventos</span>
            </h2>
            <p className="text-white/40 mt-2">Los mejores shows en tu ciudad</p>
          </div>
          <button className="text-[#00E5FF] text-sm font-bold tracking-widest hover:underline hidden md:block">
            VER TODO
          </button>
        </div>
        
        {/* Si no hay eventos, mostramos un mensaje amigable o los mocks anteriores */}
        {!events || events.length === 0 ? (
          <div className="w-full py-20 text-center border border-dashed border-white/10 rounded-[3rem] bg-white/5">
             <Ticket className="w-16 h-16 text-white/10 mx-auto mb-4" />
             <p className="text-white/40 text-lg uppercase tracking-widest font-black italic">No hay eventos publicados hoy</p>
             <p className="text-white/20 text-sm mt-2">Vuelve más tarde o revisa tus filtros</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {events.map((event) => (
              <Link 
                href={`/eventos/${event.id}`}
                key={event.id} 
                className="group relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-[#0A1F44]/50 border border-white/5 transition-all duration-500 block hover:border-[#00E5FF]/40"
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-[#05070A]/50 to-transparent opacity-90 z-[1]" />
                
                {/* Background image */}
                <img 
                  src={event.cover_image_url || "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=400&h=600"} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-[2]">
                  <p className="text-[#00E5FF] text-[11px] font-black tracking-widest mb-2 flex items-center gap-1.5 uppercase">
                     <Calendar className="w-3 h-3" /> {new Date(event.date).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </p>
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight uppercase italic tracking-tight drop-shadow-md">
                    {event.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <p className="text-white/60 text-xs flex items-center gap-1">
                       <MapPin className="w-3 h-3 text-[#00E5FF]" /> {event.location}
                    </p>
                    
                    <button className="bg-[#00E5FF]/10 text-[#00E5FF] hover:bg-[#00E5FF] hover:text-[#021227] p-3 rounded-xl transition-all duration-300">
                      <Ticket className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
