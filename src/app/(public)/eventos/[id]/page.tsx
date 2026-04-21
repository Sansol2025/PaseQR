import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Share2, Ticket, Check, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TierSelector } from "@/components/shared/TierSelector"; // We'll extract the client logic here

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const supabase = await createClient();

  // Fetch Event and Tiers (using joined queries if needed, or separate)
  const { data: event, error } = await supabase
    .from('events')
    .select(`
      *,
      ticket_tiers (*)
    `)
    .eq('id', resolvedParams.id)
    .single();

  if (error || !event) {
    return notFound();
  }

  const dateObj = new Date(event.date);

  return (
    <div className="min-h-screen bg-[#05070A] pb-24">
      {/* Event Hero */}
      <div className="relative h-[60vh] w-full mt-20">
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-[#05070A]/40 to-transparent z-10" />
        <img
          src={event.cover_image_url || "/hero-bg.jpg"}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="container mx-auto px-4 pb-12">
            <Badge className="bg-[#00E5FF] text-[#021227] font-bold px-3 py-1 mb-4 uppercase rounded-full border-none">
              Noche & Eventos
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white uppercase italic tracking-tighter mb-4 drop-shadow-xl">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#00E5FF]" />
                <span className="font-medium">
                  {dateObj.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#00E5FF]" />
                <span className="font-medium">
                   {dateObj.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })} HS
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#00E5FF]" />
                <span className="font-medium">{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h3 className="text-2xl font-bold text-white mb-4">Acerca del Evento</h3>
              <p className="text-white/60 leading-relaxed text-lg font-light">
                {event.description}
              </p>
            </section>
          </div>

          <div className="lg:col-span-1">
             <TierSelector tiers={event.ticket_tiers} eventId={event.id} />
          </div>
          
        </div>
      </div>
    </div>
  );
}
