import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { rooms, formatIDR } from "@/lib/rooms";
import { Users, Maximize2, BedDouble, Check } from "lucide-react";

export const Route = createFileRoute("/rooms/$roomId")({
  head: ({ params }) => {
    // Perbaikan: Konversi params ke Number agar cocok dengan data di rooms.ts
    const room = rooms.find((r) => r.id === Number(params.roomId));
    return {
      meta: [
        { title: room ? `${room.name} — Wikrama Hotel Bogor` : "Kamar tidak ditemukan" },
        { name: "description", content: room?.description ?? "" },
        ...(room ? [{ property: "og:image", content: room.image }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    // Perbaikan: Konversi params ke Number agar cocok dengan data di rooms.ts
    const room = rooms.find((r) => r.id === Number(params.roomId));
    if (!room) throw notFound();
    return { room };
  },
  component: RoomDetail,
});

function RoomDetail() {
  const { room } = Route.useLoaderData();

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="pt-24">
        <div className="aspect-[21/9] md:aspect-[21/8] overflow-hidden">
          <img 
            src={room.image} 
            alt={room.name} 
            className="w-full h-full object-cover" 
          />
        </div>
      </section>

      <section className="py-16 bg-background flex-1">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[1fr_360px] gap-12">
          <div>
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary">← Kembali ke Beranda</Link>
            <div className="text-[10px] uppercase tracking-widest text-accent mt-6 mb-2">{room.type}</div>
            <h1 className="font-serif text-5xl mb-4">{room.name}</h1>
            
            <div className="flex flex-wrap gap-6 text-sm text-foreground/80 mb-8">
              <span className="flex items-center gap-2"><BedDouble className="w-4 h-4 text-primary" />{room.bed}</span>
              <span className="flex items-center gap-2"><Maximize2 className="w-4 h-4 text-primary" />{room.size} m²</span>
              <span className="flex items-center gap-2"><Users className="w-4 h-4 text-primary" />{room.capacity} tamu</span>
            </div>
            
            <p className="text-muted-foreground leading-relaxed text-lg mb-10">{room.description}</p>

            <h2 className="font-serif text-2xl mb-4">Fasilitas Kamar</h2>
            <ul className="grid grid-cols-2 gap-3 mb-10">
              {room.amenities.map((a: string) => (
                <li key={a} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary" />{a}
                </li>
              ))}
            </ul>

            <h2 className="font-serif text-2xl mb-4">Kebijakan</h2>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>Check-in mulai pukul 14:00, Check-out maksimal pukul 12:00.</li>
              <li>Pembatalan gratis hingga 24 jam sebelum check-in.</li>
              <li>Anak di bawah 6 tahun gratis menginap bersama orang tua.</li>
            </ul>
          </div>

          <aside className="md:sticky md:top-24 self-start bg-card border border-border rounded-sm p-6 shadow-[var(--shadow-soft)]">
            <div className="text-sm text-muted-foreground">Mulai dari</div>
            <div className="font-serif text-4xl text-primary mt-1">{formatIDR(room.price)}</div>
            <div className="text-xs text-muted-foreground mb-6">per malam, sudah termasuk pajak</div>
            
            <Link
              to="/booking"
              search={{ room: String(room.id) }} // Konversi ID ke string agar sesuai dengan rute booking
              className="block text-center w-full px-6 py-3 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90"
            >
              Pesan Kamar Ini
            </Link>
            
            <div className="text-xs text-muted-foreground text-center mt-4">
              Konfirmasi instan · Tanpa biaya tersembunyi
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}