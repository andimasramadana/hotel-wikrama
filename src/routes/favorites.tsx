import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { rooms, formatIDR } from "@/lib/rooms";
import { useFavorites } from "@/lib/useFavorites";
import { Star, Heart, MapPin, HeartCrack } from "lucide-react";

export const Route = createFileRoute("/favorites")({
  component: FavoritesPage,
});

function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();

  // Saring kamar yang hanya ada di daftar favorit
  const favoriteRooms = rooms.filter((r) => favorites.includes(r.id));

  return (
    <div className="min-h-screen flex flex-col bg-secondary/20">
      <SiteHeader />

      <main className="flex-1 pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
        <h1 className="font-serif text-4xl md:text-5xl mb-3">Kamar Tersimpan</h1>
        <p className="text-muted-foreground mb-12">
          Rencanakan liburan Anda selanjutnya dengan kamar-kamar favorit ini.
        </p>

        {/* Jika belum ada favorit, tampilkan pesan kosong */}
        {favoriteRooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-card rounded-xl border border-border text-center shadow-sm">
            <HeartCrack className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
            <h2 className="text-2xl font-serif mb-2">Belum ada yang disimpan</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Silakan telusuri akomodasi kami dan klik ikon hati untuk menyimpannya di sini.
            </p>
            <Link
              to="/"
              className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
            >
              Mulai Cari Kamar
            </Link>
          </div>
        ) : (
          /* Jika ada favorit, tampilkan card seperti di Beranda */
          <div className="grid md:grid-cols-3 gap-6">
            {favoriteRooms.map((r) => (
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
                  <button
                    className="absolute top-3 right-3 p-2 bg-white rounded-full transition-colors shadow-sm z-10"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(r.id);
                    }}
                  >
                    <Heart className="w-5 h-5 fill-red-500 text-red-500 hover:opacity-80 transition-opacity" />
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
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
