import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import heroImg from "@/assets/hero-hotel.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Tentang — Wikrama Hotel Bogor" },
      {
        name: "description",
        content:
          "Tentang Wikrama Hotel Bogor — penginapan boutique dengan kehangatan keramahan Nusantara.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <section className="pt-32 pb-16 bg-secondary/40">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.3em] text-accent mb-3">Tentang Kami</div>
          <h1 className="font-serif text-5xl md:text-6xl">Cerita di Balik Wikrama</h1>
        </div>
      </section>
      <section className="py-16 bg-background flex-1">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
          <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-[var(--shadow-soft)]">
            <img
              src={heroImg}
              alt="Wikrama Hotel"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Wikrama Hotel berdiri pada tahun 2010 sebagai sebuah penginapan boutique di Bogor —
              kota yang dikenal dengan hujan, kebun raya, dan kehangatan penduduknya.
            </p>
            <p>
              Filosofi kami sederhana: setiap tamu adalah keluarga. Karena itu, setiap detail di
              hotel kami — mulai dari pemilihan kopi pagi, tekstur seprai, hingga senyum staf di
              resepsionis — dirancang untuk membuat Anda merasa diterima.
            </p>
            <p>
              Kami percaya bahwa menginap bukan sekadar tidur di kamar lain, tetapi pengalaman yang
              membentuk kenangan perjalanan Anda.
            </p>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
