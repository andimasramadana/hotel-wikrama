import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useState, useEffect } from "react";
import { ShoppingBag, Landmark, Wallet, CreditCard, CheckCircle2 } from "lucide-react";
import { formatIDR } from "@/lib/rooms";

export const Route = createFileRoute("/cafe")({
  component: CafePage,
});

// --- DATA MENU DENGAN KATEGORI ---
const MENU = [
  {
    id: 1,
    name: "Nasi Goreng Hotel",
    price: 10000,
    img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=800",
    category: "makanan",
  },
  {
    id: 2,
    name: "Ketan Susu",
    price: 10000,
    img: "https://cdn.yummy.co.id/content-images/images/20240215/iUPY8nXVP7bSAJx55AYZeZHqNbZ6sDr3-31373037393638393339d41d8cd98f00b204e9800998ecf8427e.jpg?x-oss-process=image/resize,w_388,h_388,m_fixed,x-oss-process=image/format,webp",
    category: "makanan",
  },
  {
    id: 3,
    name: "Teh Tarik",
    price: 5000,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTj4QpcU97EMB-JOEz7xpr029_cDTJImucBw&s",
    category: "minuman",
  },
  {
    id: 4,
    name: "Matcha",
    price: 5000,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZtWXO4dq5pQmhUUNKv7f5W-ApXc__OVGC4w&s",
    category: "minuman",
  },
  {
    id: 5,
    name: "Es Kopi",
    price: 5000,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpMQ4rhoMsysjYMjUJPiQgbOzYzJIPFKLSwA&s",
    category: "minuman",
  },
  {
    id: 6,
    name: "Pangsit Kuah",
    price: 10000,
    img: "https://dcostseafood.id/wp-content/uploads/2025/04/Pangsit-Kuah-600x600.jpg",
    category: "makanan",
  },
  {
    id: 7,
    name: "Roti Bakar",
    price: 10000,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhHiYk9wC9FQ5oTYbOKgSuLdIwuZIuH7_0mQ&s",
    category: "makanan",
  },
  {
    id: 8,
    name: "Cireng Rujak",
    price: 10000,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJRMc241tvxHdczKf63418voGKZjUty1OzLw&s",
    category: "makanan",
  },
];

// --- DATA LOGO PEMBAYARAN ---
const PAYMENT_PROVIDERS = {
  transfer: [
    {
      id: "bca",
      name: "BCA Transfer",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg",
    },
    {
      id: "mandiri",
      name: "Mandiri Transfer",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_Bank_Mandiri_Baru.svg",
    },
  ],
  ewallet: [
    {
      id: "dana",
      name: "DANA",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg",
    },
    {
      id: "gopay",
      name: "GoPay",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg",
    },
    {
      id: "ovo",
      name: "OVO",
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e9/OVO_logo.svg",
    },
  ],
  card: [
    {
      id: "visa",
      name: "Visa",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
    },
    {
      id: "mastercard",
      name: "Mastercard",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
    },
  ],
};

function CafePage() {
  const [cart, setCart] = useState<{ item: any; qty: number }[]>([]);
  const [roomNum, setRoomNum] = useState("");
  const [guestName, setGuestName] = useState("");
  const [paymentCategory, setPaymentCategory] = useState<"transfer" | "ewallet" | "card">(
    "transfer"
  );
  const [selectedProvider, setSelectedProvider] = useState(""); 
  
  // State baru untuk filter kategori menu
  const [activeCategory, setActiveCategory] = useState<"makanan" | "minuman">("makanan");
  
  const [isLoading, setIsLoading] = useState(false);
  const [done, setDone] = useState(false);

  // Filter menu berdasarkan kategori aktif
  const displayedMenu = MENU.filter((m) => m.category === activeCategory);

  // Reset pilihan provider kalau kategori pembayaran berubah
  useEffect(() => {
    setSelectedProvider("");
  }, [paymentCategory]);

  const addToCart = (item: any) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.item.id === item.id);
      if (ex) return prev.map((i) => (i.item.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { item, qty: 1 }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart((prev) => {
      const existingItem = prev.find((i) => i.item.id === itemId);
      if (!existingItem) return prev; 

      if (existingItem.qty === 1) {
        // Jika qty sisa 1, hapus item sepenuhnya dari keranjang
        return prev.filter((i) => i.item.id !== itemId);
      }
      
      // Jika qty > 1, kurangi 1
      return prev.map((i) =>
        i.item.id === itemId ? { ...i, qty: i.qty - 1 } : i
      );
    });
  };

  const total = cart.reduce((sum, i) => sum + i.item.price * i.qty, 0);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Keranjang kosong!");
    if (!selectedProvider)
      return alert("Pilih metode pembayaran (BCA, DANA, dll) terlebih dahulu!");

    setIsLoading(true);

    try {
      // Simulasi delay untuk realism
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Langsung set done tanpa menyimpan ke database
      setDone(true);
    } catch (err: any) {
      alert("Gagal memproses pesanan: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (done)
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center p-6 bg-secondary/40">
          <div className="max-w-md w-full bg-card p-8 border text-center rounded-sm shadow-[var(--shadow-soft)] animate-in zoom-in">
            <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="font-serif text-3xl mb-2">Pesanan Dikirim</h2>
            <p className="text-muted-foreground mt-2 mb-6">
              Mohon tunggu di Kamar <span className="font-bold text-foreground">{roomNum}</span>,
              pesanan Anda sedang disiapkan.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-primary text-white font-bold rounded-sm hover:bg-primary/90 transition-colors"
            >
              Pesan Lagi
            </button>
          </div>
        </div>
        <SiteFooter />
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="pt-32 pb-12 bg-secondary/40 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-5xl">Wikrama Cafe</h1>
        </div>
      </section>

      <section className="py-16 bg-background flex-1">
        <form
          onSubmit={handleOrder}
          className="max-w-5xl mx-auto px-6 grid md:grid-cols-[1fr_360px] gap-10"
        >
          <div className="space-y-12">
            
            {/* Bagian Menu (Terdapat Tombol Filter) */}
            <div>
              <div className="flex items-center gap-6 mb-6 border-b border-border">
                <button
                  type="button"
                  onClick={() => setActiveCategory("makanan")}
                  className={`font-serif text-2xl pb-3 transition-colors ${
                    activeCategory === "makanan"
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Makanan
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategory("minuman")}
                  className={`font-serif text-2xl pb-3 transition-colors ${
                    activeCategory === "minuman"
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Minuman
                </button>
              </div>

              {/* Grid Menu yang tampil sesuai kategori aktif */}
              <div className="grid sm:grid-cols-2 gap-4">
                {displayedMenu.map((m) => (
                  <div
                    key={m.id}
                    className="border rounded-sm overflow-hidden flex bg-card border-border hover:border-primary/50 transition-colors"
                  >
                    <img src={m.img} alt={m.name} className="w-24 object-cover" />
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="font-serif text-lg">{m.name}</div>
                      <div className="text-primary font-bold mt-1">{formatIDR(m.price)}</div>
                      <button
                        type="button"
                        onClick={() => addToCart(m)}
                        className="mt-auto self-start text-[11px] bg-secondary px-3 py-1.5 rounded-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                      >
                        + Tambah
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Informasi Tamu */}
            <div>
              <h2 className="font-serif text-2xl mb-4">Informasi Pemesan</h2>
              <div className="grid grid-cols-2 gap-4">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Nomor Kamar
                  <input
                    required
                    value={roomNum}
                    onChange={(e) => setRoomNum(e.target.value)}
                    className="w-full p-3 border border-border rounded-sm mt-1.5 text-sm font-sans uppercase focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary bg-background text-foreground"
                    placeholder="Contoh: 101"
                  />
                </label>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Nama Tamu
                  <input
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full p-3 border border-border rounded-sm mt-1.5 text-sm font-sans focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary bg-background text-foreground"
                    placeholder="Sesuai Reservasi"
                  />
                </label>
              </div>
            </div>

            {/* Metode Pembayaran */}
            <div>
              <h2 className="font-serif text-2xl mb-4">Metode Pembayaran</h2>

              {/* Kategori (Bank / E-Wallet / Kartu) */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentCategory("transfer")}
                  className={`p-3 border rounded-sm flex flex-col items-center gap-1 transition-colors ${paymentCategory === "transfer" ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:border-primary/50 border-border text-muted-foreground"}`}
                >
                  <Landmark size={18} />
                  <span className="text-[10px] font-bold uppercase">Bank</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentCategory("ewallet")}
                  className={`p-3 border rounded-sm flex flex-col items-center gap-1 transition-colors ${paymentCategory === "ewallet" ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:border-primary/50 border-border text-muted-foreground"}`}
                >
                  <Wallet size={18} />
                  <span className="text-[10px] font-bold uppercase">E-Wallet</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentCategory("card")}
                  className={`p-3 border rounded-sm flex flex-col items-center gap-1 transition-colors ${paymentCategory === "card" ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:border-primary/50 border-border text-muted-foreground"}`}
                >
                  <CreditCard size={18} />
                  <span className="text-[10px] font-bold uppercase">Kartu</span>
                </button>
              </div>

              {/* Logo Provider (DANA, BCA, dll) */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {PAYMENT_PROVIDERS[paymentCategory].map((provider) => (
                  <label
                    key={provider.id}
                    className={`cursor-pointer flex items-center justify-center p-4 border rounded-sm transition-all h-16 ${selectedProvider === provider.name ? "border-primary ring-1 ring-primary bg-primary/5" : "border-border bg-card hover:border-primary/50"}`}
                  >
                    <input
                      type="radio"
                      name="payment_provider"
                      value={provider.name}
                      checked={selectedProvider === provider.name}
                      onChange={(e) => setSelectedProvider(e.target.value)}
                      className="hidden"
                    />
                    <img
                      src={provider.logo}
                      alt={provider.name}
                      className="max-h-full max-w-[80%] object-contain grayscale hover:grayscale-0 transition-all"
                      style={selectedProvider === provider.name ? { filter: "none" } : {}}
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Ringkasan Pesanan */}
          <aside className="md:sticky md:top-24 self-start bg-card border border-border p-6 rounded-sm space-y-4 shadow-[var(--shadow-soft)]">
            <h3 className="font-serif text-xl border-b border-border pb-4 flex items-center gap-2">
              <ShoppingBag size={20} /> Keranjang
            </h3>
            <div className="text-sm space-y-3">
              {cart.length === 0 ? (
                <div className="text-muted-foreground text-center py-4 text-xs italic">
                  Keranjang masih kosong
                </div>
              ) : (
                cart.map((i) => (
                  <div key={i.item.id} className="flex justify-between items-center py-1">
                    <div className="flex flex-col max-w-[140px]">
                      <span className="font-medium text-sm leading-tight">{i.item.name}</span>
                      <span className="text-[11px] text-muted-foreground">{formatIDR(i.item.price)}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {/* Tombol Plus Minus */}
                      <div className="flex items-center border border-border rounded-sm bg-background">
                        <button
                          type="button"
                          onClick={() => removeFromCart(i.item.id)}
                          className="px-2 py-0.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors font-bold"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{i.qty}</span>
                        <button
                          type="button"
                          onClick={() => addToCart(i.item)}
                          className="px-2 py-0.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors font-bold"
                        >
                          +
                        </button>
                      </div>
                      
                      {/* Subtotal Item */}
                      <span className="font-bold text-sm w-[70px] text-right">
                        {formatIDR(i.item.price * i.qty)}
                      </span>
                    </div>
                  </div>
                ))
              )}
              <div className="flex justify-between font-bold text-lg pt-4 border-t border-border text-primary mt-2">
                <span>Total</span>
                <span>{formatIDR(total)}</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading || cart.length === 0}
              className="w-full py-3 mt-4 bg-primary text-primary-foreground font-bold rounded-sm disabled:opacity-50 hover:bg-primary/90 transition-colors"
            >
              {isLoading ? "Memproses..." : "Pesan & Antar Sekarang"}
            </button>
          </aside>
        </form>
      </section>

      <SiteFooter />
    </div>
  );
}