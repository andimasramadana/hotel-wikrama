import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { rooms, formatIDR } from "@/lib/rooms";
import { Users, Maximize2, BedDouble } from "lucide-react";

export const Route = createFileRoute("/rooms")({
  head: () => ({
    meta: [
      { title: "Kamar — Wikrama Hotel Bogor" },
      { name: "description", content: "Pilihan kamar Wikrama Hotel Bogor: Deluxe, Superior, dan Family Suite dengan harga terbaik." },
    ],
  }),
  component: RoomsPage,
});

function RoomsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <section className="pt-32 pb-12 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.3em] text-accent mb-3">Akomodasi</div>
          <h1 className="font-serif text-5xl md:text-6xl">Kamar Kami</h1>
          <p className="text-muted-foreground mt-4 max-w-xl">
            Setiap kamar dirancang dengan detail dan kenyamanan terbaik untuk
            membuat menginap Anda terasa istimewa.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background flex-1">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          {rooms.map((r, i) => (
            <article
              key={r.id}
              className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "md:[&>:first-child]:order-2" : ""}`}
            >
              <div className="aspect-[4/3] overflow-hidden rounded-sm shadow-[var(--shadow-soft)]">
                <img src={r.image} alt={r.name} loading="lazy" width={1280} height={896} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-accent mb-2">{r.type}</div>
                <h2 className="font-serif text-4xl mb-4">{r.name}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{r.description}</p>

                <div className="flex flex-wrap gap-6 text-sm mb-6 text-foreground/80">
                  <span className="flex items-center gap-2"><BedDouble className="w-4 h-4 text-primary" />{r.bed}</span>
                  <span className="flex items-center gap-2"><Maximize2 className="w-4 h-4 text-primary" />{r.size} m²</span>
                  <span className="flex items-center gap-2"><Users className="w-4 h-4 text-primary" />{r.capacity} tamu</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {r.amenities.map((a) => (
                    <span key={a} className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-sm">{a}</span>
                  ))}
                </div>

                <div className="flex items-center pt-6 border-t border-border">
                  <div>
                    <span className="font-serif text-3xl text-primary">{formatIDR(r.price)}</span>
                    <span className="text-sm text-muted-foreground"> /malam</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}