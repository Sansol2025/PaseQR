import { Ticket, Calendar, MapPin, Music } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function FestivalesPage() {
  const supabase = await createClient();
  
  // Traemos solo los eventos de categoría 'festival'
  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .eq('category', 'festival')
    .order('date', { ascending: true });

  if (error) {
    console.error("Error fetching festivales:", error);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-[#0A1F44]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#05070A] z-10" />
        <div className="absolute inset-0 bg-purple-500/5 animate-pulse" />
        
        <div className="container mx-auto px-4 relative z-20 text-center">
          <Badge className="bg-purple-500 text-white font-black mb-4 uppercase tracking-widest">Experiencia Masiva</Badge>
          <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase mb-4">
            Grandes <span className="text-purple-500">Festivales</span>
          </h1>
          <p className="text-white/40 max-w-2xl mx-auto uppercase tracking-widest text-sm font-bold">
            Los escenarios más grandes y los lineups que hacen historia
          </p>
        </div>
      </section>
      
      {/* Eventos Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-center gap-3 mb-12">
          <Music className="w-8 h-8 text-purple-500" />
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
            Próximas <span className="text-purple-500">Ediciones</span>
          </h2>
        </div>
        
        {!events || events.length === 0 ? (
          <div className="w-full py-32 text-center border border-dashed border-white/10 rounded-[3rem] bg-white/5">
             <Music className="w-16 h-16 text-white/10 mx-auto mb-4" />
             <p className="text-white/40 text-lg uppercase tracking-widest font-black italic">No hay festivales programados</p>
             <p className="text-white/20 text-sm mt-2">Prepárate, grandes anuncios vienen en camino</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {events.map((event) => (
              <Link 
                href={`/eventos/${event.id}`}
                key={event.id} 
                className="group relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-[#0A1F44]/50 border border-white/5 transition-all duration-500 block hover:border-purple-500/40"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-[#05070A]/50 to-transparent opacity-90 z-[1]" />
                <img 
                  src={event.cover_image_url || "https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=400&h=600"} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 z-[2]">
                  <p className="text-purple-400 text-[11px] font-black tracking-widest mb-2 flex items-center gap-1.5 uppercase">
                     <Calendar className="w-3 h-3" /> {new Date(event.date).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </p>
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight uppercase italic tracking-tight drop-shadow-md">
                    {event.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <p className="text-white/60 text-xs flex items-center gap-1">
                       <MapPin className="w-3 h-3 text-purple-400" /> {event.location}
                    </p>
                    <div className="bg-purple-500/10 text-purple-400 p-3 rounded-xl">
                      <Ticket className="w-5 h-5" />
                    </div>
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

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`px-4 py-1.5 rounded-full text-[10px] tracking-widest font-black uppercase inline-block ${className}`}>
      {children}
    </span>
  );
}
