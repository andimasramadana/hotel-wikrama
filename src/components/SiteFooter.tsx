import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background/90 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="font-serif text-2xl mb-3">Wikrama Hotel Bogor</div>
          <p className="text-sm text-background/70 max-w-sm leading-relaxed">
            Penginapan elegan di jantung Kota Bogor — perpaduan kenyamanan modern
            dengan kehangatan keramahan khas Nusantara.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-accent mb-3">Tautan</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/rooms" className="hover:text-accent">Kamar</Link></li>
            <li><Link to="/about" className="hover:text-accent">Tentang Kami</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Kontak</Link></li>
            <li><Link to="/booking" className="hover:text-accent">Pesan Kamar</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-accent mb-3">Hubungi</div>
          <ul className="space-y-2 text-sm text-background/70">
            <li>Jl. Raya Wikrama, Bogor</li>
            <li>+62 251 000 0000</li>
            <li>reservasi@wikramahotel.id</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-6 py-6 text-xs text-background/50 flex justify-between">
          <span>© {new Date().getFullYear()} Wikrama Hotel Bogor</span>
          <span>Made with care in Bogor</span>
        </div>
      </div>
    </footer>
  );
}
