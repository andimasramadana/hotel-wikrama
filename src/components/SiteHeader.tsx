import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { User, LogOut, Menu, X, Coffee, Heart } from "lucide-react";
import { useFavorites } from "@/lib/useFavorites";
import wikikamaLogo from "../assets/wikrama-logo.png";

export function SiteHeader() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Panggil data favorit
  const { favorites } = useFavorites();

  // Logika untuk memantau status login
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  return (
    // Wrapper diubah menjadi floating dengan margin top dan padding kanan-kiri
    <header className="fixed top-4 md:top-6 left-0 right-0 z-50 px-4 md:px-8 w-full flex justify-center">
      
      {/* Inner container dibuat melengkung (rounded-full) dan blur (glassmorphism) */}
      <div className="relative w-full max-w-6xl h-16 md:h-[72px] px-6 flex items-center justify-between bg-background/40 backdrop-blur-xl border border-border/50 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] transition-all duration-300">
        
        {/* LOGO AREA */}
        <Link to="/" className="flex items-center gap-3">
          <img src={wikikamaLogo} alt="Wikrama Logo" className="w-9 h-9 md:w-10 md:h-10 object-contain" />
          <div className="hidden sm:block">
            <div className="font-serif text-lg md:text-xl leading-none">Wikrama Hotel</div>
            <div className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-accent mt-1">Bogor</div>
          </div>
        </Link>

        {/* --- 1. DESKTOP NAVIGATION (Laptop/PC) --- */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-medium hover:text-primary transition-colors text-foreground/70 [&.active]:text-primary"
          >
            Beranda
          </Link>
          <Link
            to="/rooms"
            className="text-sm font-medium hover:text-primary transition-colors text-foreground/70 [&.active]:text-primary"
          >
            Kamar
          </Link>

          {/* MENU CAFE */}
          <Link
            to="/cafe"
            className="text-sm font-medium hover:text-primary transition-colors text-foreground/70 [&.active]:text-primary flex items-center gap-1"
          >
            Cafe
          </Link>

          <Link
            to="/about"
            className="text-sm font-medium hover:text-primary transition-colors text-foreground/70 [&.active]:text-primary"
          >
            Tentang
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium hover:text-primary transition-colors text-foreground/70 [&.active]:text-primary"
          >
            Kontak
          </Link>

          {/* TOMBOL FAVORIT (DESKTOP) */}
          <Link
            to="/favorites"
            className="relative p-2 text-muted-foreground hover:text-red-500 transition-colors group"
            title="Kamar Tersimpan"
          >
            <Heart className="w-5 h-5 transition-all group-hover:fill-red-500/20" />
            {favorites.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                {favorites.length}
              </span>
            )}
          </Link>
        </nav>

        {/* AUTH & BUTTON AREA */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          <Link
            to="/booking"
            className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/90 transition-colors shadow-sm"
          >
            Pesan Sekarang
          </Link>

          {/* Tampilkan tombol logout jika sudah login */}
          {user && (
            <button
              onClick={handleLogout}
              className="text-muted-foreground hover:text-red-500 p-2"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          )}
        </div>

        {/* TOMBOL MENU MOBILE */}
        <button className="md:hidden p-2 text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* --- 2. MOBILE NAVIGATION (Tampilan HP) --- */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full mt-4 left-0 w-full bg-background/95 backdrop-blur-2xl border border-border/50 p-6 flex flex-col gap-5 animate-in fade-in slide-in-from-top-4 shadow-2xl rounded-3xl">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-serif">
              Beranda
            </Link>
            <Link to="/rooms" onClick={() => setIsMenuOpen(false)} className="text-lg font-serif">
              Kamar
            </Link>

            {/* MENU CAFE MOBILE */}
            <Link
              to="/cafe"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-serif flex items-center gap-2"
            >
              Cafe & Resto <Coffee size={16} className="text-orange-500" />
            </Link>

            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-lg font-serif">
              Tentang
            </Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-lg font-serif">
              Kontak
            </Link>

            {/* TOMBOL FAVORIT (MOBILE) */}
            <Link
              to="/favorites"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-serif flex items-center gap-2 text-red-500"
            >
              Favorit Tersimpan
              <Heart size={18} className="fill-red-500" />
              {favorites.length > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {favorites.length}
                </span>
              )}
            </Link>

            <hr className="border-border/50" />

            {!user ? (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-serif flex items-center gap-2"
              >
                <User size={18} /> Login
              </Link>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="text-lg font-serif flex items-center gap-2 text-left text-red-500"
              >
                <LogOut size={18} /> Logout
              </button>
            )}

            <Link
              to="/booking"
              onClick={() => setIsMenuOpen(false)}
              className="w-full py-3 mt-2 bg-primary text-primary-foreground text-center rounded-full font-medium shadow-sm"
            >
              Pesan Sekarang
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}