import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { rooms, formatIDR } from "@/lib/rooms";
import { useMemo, useState } from "react";
import { CheckCircle2, CreditCard, Landmark, Wallet, BedDouble, Users } from "lucide-react";
import { z } from "zod";
import { supabase } from "../supabaseClient";

const search = z.object({ room: z.string().optional() });

export const Route = createFileRoute("/booking")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Pesan Kamar — Wikrama Hotel Bogor" },
      {
        name: "description",
        content: "Reservasi kamar di Wikrama Hotel Bogor — proses cepat dan konfirmasi instan.",
      },
    ],
  }),
  component: BookingPage,
});

// KONFIGURASI METODE PEMBAYARAN
const PAYMENT_PROVIDERS: Record<
  string,
  { name: string; category: string; number: string; logo: string }
> = {
  bri: {
    name: "Bank BRI",
    category: "transfer",
    number: "0123-456-789",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/BRI_2020.svg",
  },
  bca: {
    name: "Bank BCA",
    category: "transfer",
    number: "1234-5678-90",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg",
  },
  gopay: {
    name: "GoPay",
    category: "ewallet",
    number: "0812-3456-7890",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg",
  },
  dana: {
    name: "DANA",
    category: "ewallet",
    number: "0812-3456-7890",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg",
  },
  ovo: {
    name: "OVO",
    category: "ewallet",
    number: "0812-3456-7890",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Logo_ovo_purple.svg",
  },
};

function BookingPage() {
  const { room: preselected } = Route.useSearch();
  const navigate = useNavigate();
  const today = new Date().toISOString().slice(0, 10);
  const tmrw = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

  const [roomId, setRoomId] = useState(preselected ?? (rooms[0]?.id || ""));
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tmrw);

  const [jamCheckin, setJamCheckin] = useState("14:00");
  const [jamCheckout, setJamCheckout] = useState("12:00");

  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [paymentCategory, setPaymentCategory] = useState("transfer");
  const [paymentProvider, setPaymentProvider] = useState("bri");

  const [submitted, setSubmitted] = useState<null | { code: string }>(null);
  const [isLoading, setIsLoading] = useState(false);

  const room = rooms.find((r) => String(r.id) === String(roomId)) || rooms[0];

  const nights = useMemo(() => {
    const d = (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000;
    return Math.max(1, Math.round(d));
  }, [checkIn, checkOut]);

  const total = room ? room.price * nights : 0;

  const handleCategoryChange = (cat: string) => {
    setPaymentCategory(cat);
    setPaymentProvider(cat === "transfer" ? "bri" : cat === "ewallet" ? "gopay" : "card");
  };

  const handleReservasi = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const methodName =
      paymentProvider === "card" ? "Kartu Kredit" : PAYMENT_PROVIDERS[paymentProvider].name;

    try {
      const { error } = await supabase.from("reservasi").insert([
        {
          nama_lengkap: name,
          email: email,
          nomor_telepon: phone,
          check_in: checkIn,
          check_out: checkOut,
          jam_checkin: jamCheckin,
          jam_checkout: jamCheckout,
          jumlah_tamu: guests,
          kamar_id: room.id, // Sekarang akan mengirim angka kembali, tidak akan error
          total_harga: total,
          metode_pembayaran: methodName,
        },
      ]);

      if (error) throw error;
      setSubmitted({ code: "WKR-" + Math.random().toString(36).slice(2, 8).toUpperCase() });
    } catch (error: any) {
      alert("Gagal mengirim data: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!room) return null;

  // --- TAMPILAN SUKSES (ASLI DARI ANDA) ---
  if (submitted) {
    const provider = PAYMENT_PROVIDERS[paymentProvider];
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <section className="flex-1 flex items-center justify-center py-20 px-6 bg-secondary/40">
          <div className="max-w-md w-full bg-card border border-border rounded-sm p-8 text-center shadow-[var(--shadow-soft)]">
            <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="font-serif text-2xl mb-2">Pemesanan Diterima</h1>
            <p className="text-sm text-muted-foreground mb-6">
              Kode Booking: <span className="text-foreground font-bold">{submitted.code}</span>
            </p>

            {paymentProvider !== "card" && provider ? (
              <div className="bg-background border rounded-sm p-6 mb-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                  Selesaikan Pembayaran ke:
                </p>
                <img src={provider.logo} alt={provider.name} className="h-8 mx-auto mb-3" />
                <div className="text-2xl font-mono font-bold text-primary tracking-wider">
                  {provider.number}
                </div>
                <p className="text-sm mt-1">a/n Wikrama Hotel Bogor</p>
              </div>
            ) : (
              <div className="bg-background border rounded-sm p-6 mb-6 text-sm">
                Link pembayaran kartu kredit telah dikirim ke email Anda.
              </div>
            )}

            <button
              onClick={() => navigate({ to: "/" })}
              className="w-full py-3 bg-primary text-primary-foreground rounded-sm text-sm"
            >
              Kembali ke Beranda
            </button>
          </div>
        </section>
        <SiteFooter />
      </div>
    );
  }

  // --- TAMPILAN FORM ---
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <section className="pt-32 pb-12 bg-secondary/40">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="font-serif text-5xl">Pesan Kamar</h1>
        </div>
      </section>

      <section className="py-16 bg-background flex-1">
        <form
          onSubmit={handleReservasi}
          className="max-w-5xl mx-auto px-6 grid md:grid-cols-[1fr_360px] gap-10"
        >
          <div className="space-y-10">
            {/* 1. Pilih Kamar (HANYA BAGIAN INI TAMPILANNYA SAYA UBAH) */}
            <div>
              <h2 className="font-serif text-2xl mb-4">Pilih Kamar</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {rooms.map((r) => (
                  <button
                    type="button"
                    key={r.id}
                    onClick={() => setRoomId(r.id)}
                    className={`flex flex-col text-left border rounded-sm overflow-hidden transition-all group ${String(roomId) === String(r.id) ? "border-primary ring-1 ring-primary shadow-md" : "border-border hover:border-primary/50 hover:shadow-sm"}`}
                  >
                    {/* Foto Kamar */}
                    <div className="h-40 w-full overflow-hidden relative bg-muted">
                      <img
                        src={r.image}
                        alt={r.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {String(roomId) === String(r.id) && (
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-sm flex items-center gap-1">
                          <CheckCircle2 size={12} /> DIPILIH
                        </div>
                      )}
                    </div>

                    {/* Info Kamar */}
                    <div className="p-5 flex-1 flex flex-col bg-card">
                      <div className="font-serif text-xl mb-3">{r.name}</div>

                      {/* Detail Kasur & Kapasitas */}
                      <div className="space-y-2 mb-4">
                        <div className="flex gap-2.5 items-start">
                          <BedDouble size={16} className="text-muted-foreground shrink-0 mt-0.5" />
                          <div>
                            <div className="text-sm font-medium">{r.bed}</div>
                            <div className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                              {r.bedDesc}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2.5 items-center">
                          <Users size={16} className="text-muted-foreground shrink-0" />
                          <div className="text-sm font-medium">Maksimal {r.capacity} Orang</div>
                        </div>
                      </div>

                      <div className="mt-auto pt-4 border-t border-border">
                        <div className="font-serif text-lg text-primary">
                          {formatIDR(r.price)}{" "}
                          <span className="text-xs text-muted-foreground font-sans font-normal">
                            / malam
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Tanggal, Tamu & Jam (ASLI DARI ANDA) */}
            <div>
              <h2 className="font-serif text-2xl mb-4">Waktu & Tamu</h2>

              <div className="grid sm:grid-cols-3 gap-3">
                <Field label="Check-in">
                  <input
                    required
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                  />
                </Field>
                <Field label="Check-out">
                  <input
                    required
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                  />
                </Field>
                <Field label="Jumlah tamu">
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n} tamu
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <label className="block">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">
                    Jam Check-in (Estimasi)
                  </div>
                  <input
                    type="time"
                    className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                    value={jamCheckin}
                    onChange={(e) => setJamCheckin(e.target.value)}
                  />
                </label>

                <label className="block">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">
                    Jam Check-out
                  </div>
                  <input
                    type="time"
                    className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                    value={jamCheckout}
                    onChange={(e) => setJamCheckout(e.target.value)}
                  />
                </label>
              </div>
            </div>

            {/* 3. Informasi Tamu (ASLI DARI ANDA) */}
            <div>
              <h2 className="font-serif text-2xl mb-4">Informasi Tamu</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Nama Lengkap">
                  <input
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Field>
                <Field label="Email">
                  <input
                    required
                    type="email"
                    className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Field>
                <Field label="Nomor Telepon">
                  <input
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Field>
              </div>
            </div>

            {/* 4. Metode Pembayaran (ASLI DARI ANDA) */}
            <div>
              <h2 className="font-serif text-2xl mb-4">Metode Pembayaran</h2>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <TabBtn
                  active={paymentCategory === "transfer"}
                  onClick={() => handleCategoryChange("transfer")}
                  icon={<Landmark size={18} />}
                  label="Bank"
                />
                <TabBtn
                  active={paymentCategory === "ewallet"}
                  onClick={() => handleCategoryChange("ewallet")}
                  icon={<Wallet size={18} />}
                  label="E-Wallet"
                />
                <TabBtn
                  active={paymentCategory === "card"}
                  onClick={() => handleCategoryChange("card")}
                  icon={<CreditCard size={18} />}
                  label="Kartu"
                />
              </div>

              {paymentCategory !== "card" && (
                <div className="p-4 border border-dashed border-border rounded-sm grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.entries(PAYMENT_PROVIDERS)
                    .filter(([_, p]) => p.category === paymentCategory)
                    .map(([key, p]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setPaymentProvider(key)}
                        className={`p-3 border rounded-sm flex flex-col items-center gap-2 transition-all ${paymentProvider === key ? "border-primary bg-primary/5 ring-1 ring-primary" : "bg-card border-border"}`}
                      >
                        <img src={p.logo} alt={p.name} className="h-5 object-contain" />
                        <span className="text-[10px] font-bold uppercase">{p.name}</span>
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* SIDEBAR RINGKASAN (ASLI DARI ANDA) */}
          <aside className="md:sticky md:top-24 self-start bg-card border border-border p-6 rounded-sm space-y-4 shadow-[var(--shadow-soft)]">
            <div className="font-serif text-xl border-b border-border pb-4">{room.name}</div>
            <div className="text-sm space-y-2 text-foreground/80">
              <div className="flex justify-between">
                <span>Durasi</span>
                <span>{nights} Malam</span>
              </div>
              <div className="flex justify-between">
                <span>Tamu</span>
                <span>{guests} Orang</span>
              </div>
              <div className="flex justify-between">
                <span>Check-in</span>
                <span>{jamCheckin}</span>
              </div>
              <div className="flex justify-between font-bold text-primary mt-2 pt-2 border-t border-border">
                <span>Total</span>
                <span>{formatIDR(total)}</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-primary text-primary-foreground rounded-sm font-bold disabled:opacity-50 hover:bg-primary/90 transition-colors mt-2"
            >
              {isLoading ? "Memproses..." : "Konfirmasi Reservasi"}
            </button>
            <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest italic">
              Info rekening muncul setelah klik konfirmasi
            </p>
          </aside>
        </form>
      </section>
      <SiteFooter />
    </div>
  );
}

// Komponen Kecil untuk Input Label & Tombol Tab (ASLI DARI ANDA)
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
        {label}
      </div>
      {children}
    </label>
  );
}

function TabBtn({ active, onClick, icon, label }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-3 border rounded-sm gap-1 transition-colors ${active ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:border-primary/50 border-border text-muted-foreground"}`}
    >
      {icon}
      <span className="text-[10px] font-bold uppercase">{label}</span>
    </button>
  );
}
