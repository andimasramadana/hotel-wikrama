import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { rooms, formatIDR } from "@/lib/rooms";
import { useFavorites } from "@/lib/useFavorites"; // <-- Import Hook Favorit
import heroImg from "@/assets/hero-hotel.jpg";
import { Wifi, Coffee, Utensils, Waves, Car, ShieldCheck, Star, Heart, MapPin } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "Wikrama Hotel Bogor — Penginapan Elegan di Kota Bogor" }],
  }),
  component: Home,
});

const amenities = [
  { icon: Wifi, label: "WiFi Cepat" },
  { icon: Coffee, label: "Sarapan Prasmanan" },
  { icon: Utensils, label: "Restoran 24 Jam" },
  { icon: Waves, label: "Kolam Renang" },
  { icon: Car, label: "Parkir Gratis" },
  { icon: ShieldCheck, label: "Resepsionis 24/7" },
];

function Home() {
  // Panggil fungsi favorit di sini
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="relative min-h-[92vh] flex items-end pb-32 pt-32">
        <img
          src={heroImg}
          alt="Wikrama Hotel Bogor"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl text-background">
            <div className="text-xs uppercase tracking-[0.3em] text-accent mb-4">
              Bogor · Sejak 2010
            </div>
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-6">
              Ketenangan di Tengah Kota Hujan
            </h1>
            <p className="text-lg text-background/85 max-w-lg leading-relaxed">
              Rasakan kehangatan menginap di Wikrama Hotel — sebuah peraduan elegan dengan sentuhan
              tropis khas Bogor.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Selamat Datang</div>
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Penginapan dengan Jiwa</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Setiap sudut Wikrama Hotel dirancang untuk membuat Anda merasa di rumah.
          </p>
        </div>
      </section>

      {/* FEATURED ROOMS DENGAN FITUR FAVORIT AKTIF */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl">Akomodasi Pilihan</h2>
            </div>
            <Link
              to="/rooms"
              className="text-sm text-primary hover:text-primary/70 underline underline-offset-4 font-medium"
            >
              Lihat semua kamar →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {rooms.map((r) => {
              // Cek apakah kamar ini ada di daftar favorit
              const isFav = favorites.includes(r.id);

              return (
                <Link
                  key={r.id}
                  to="/rooms/$roomId"
                  params={{ roomId: r.id.toString() }}
                  className="group flex flex-col bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition-all relative"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={r.image}
                      alt={r.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* TOMBOL HATI (FAVORIT) */}
                    <button
                      className="absolute top-3 right-3 p-2 bg-white rounded-full transition-colors shadow-sm z-10"
                      onClick={(e) => {
                        e.preventDefault(); // Mencegah pindah halaman saat klik Hati
                        toggleFavorite(r.id);
                      }}
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors ${isFav ? "fill-red-500 text-red-500" : "text-muted-foreground hover:text-red-500"}`}
                      />
                    </button>
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs text-muted-foreground">{r.type}</span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4].map((s) => (
                          <Star key={s} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="bg-[#003b95] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider ml-1">
                        Genius
                      </span>
                    </div>

                    <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
                      {r.name}
                    </h3>
                    <div className="text-xs text-muted-foreground mb-3">Bogor, Indonesia</div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-[#003b95] text-white font-bold p-1.5 rounded-sm rounded-tl-md rounded-br-md text-sm flex items-center justify-center min-w-[32px]">
                        {r.ratingScore}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold leading-none">{r.ratingWord}</span>
                        <span className="text-[10px] text-muted-foreground mt-0.5">
                          {r.reviews} ulasan
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{r.distance}</span>
                    </div>

                    <div className="mt-auto flex flex-col items-end text-right border-t border-border pt-4">
                      <div className="text-[10px] text-muted-foreground mb-0.5">Mulai dari</div>
                      <div className="flex items-center gap-2">
                        <span className="line-through text-red-500/80 text-xs font-medium">
                          {formatIDR(r.originalPrice)}
                        </span>
                        <span className="text-xl font-bold text-foreground">
                          {formatIDR(r.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
