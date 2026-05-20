import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Kontak — Wikrama Hotel Bogor" },
      { name: "description", content: "Hubungi tim Wikrama Hotel Bogor untuk reservasi dan informasi lebih lanjut." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <section className="pt-32 pb-16 bg-secondary/40">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.3em] text-accent mb-3">Kontak</div>
          <h1 className="font-serif text-5xl md:text-6xl">Hubungi Kami</h1>
        </div>
      </section>

      <section className="py-16 bg-background flex-1">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            {[
              { icon: MapPin, title: "Alamat", body: "Jalan Raya Wangun, Kelurahan Sindangsari, Kecamatan Bogor Timur, Kota Bogor" },
              { icon: Phone, title: "Telepon", body: "+62857 7201 3534" },
              { icon: Mail, title: "Email", body: "reservasi@wikrama.sch.id" },
              { icon: Clock, title: "Resepsionis", body: "Buka 24 jam setiap hari" },
            ].map((c) => (
              <div key={c.title} className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0">
                  <c.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-accent mb-1">{c.title}</div>
                  <div className="text-foreground">{c.body}</div>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); alert("Terima kasih! Tim kami akan menghubungi Anda."); }}
            className="bg-card border border-border rounded-sm p-8 space-y-4 shadow-[var(--shadow-soft)]"
          >
            <h2 className="font-serif text-2xl">Kirim Pesan</h2>
            <input required placeholder="Nama lengkap" className="w-full px-4 py-3 bg-background border border-border rounded-sm text-sm outline-none focus:border-primary" />
            <input required type="email" placeholder="Email" className="w-full px-4 py-3 bg-background border border-border rounded-sm text-sm outline-none focus:border-primary" />
            <textarea required rows={5} placeholder="Pesan Anda" className="w-full px-4 py-3 bg-background border border-border rounded-sm text-sm outline-none focus:border-primary resize-none" />
            <button className="w-full py-3 bg-primary text-primary-foreground rounded-sm text-sm hover:bg-primary/90">Kirim</button>
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
