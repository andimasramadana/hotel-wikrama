import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, Users, Search } from "lucide-react";

export function SearchBar() {
  const navigate = useNavigate();
  const today = new Date().toISOString().slice(0, 10);
  const tmrw = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tmrw);
  const [guests, setGuests] = useState(2);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        navigate({ to: "/rooms" });
      }}
      className="bg-card shadow-[var(--shadow-elegant)] rounded-sm p-2 grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-2 border border-border"
    >
      <label className="flex items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-border">
        <CalendarDays className="w-4 h-4 text-primary" />
        <div className="flex-1">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Check-in</div>
          <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="bg-transparent w-full text-sm outline-none text-foreground" />
        </div>
      </label>
      <label className="flex items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-border">
        <CalendarDays className="w-4 h-4 text-primary" />
        <div className="flex-1">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Check-out</div>
          <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="bg-transparent w-full text-sm outline-none text-foreground" />
        </div>
      </label>
      <label className="flex items-center gap-3 px-4 py-3">
        <Users className="w-4 h-4 text-primary" />
        <div className="flex-1">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Tamu</div>
          <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="bg-transparent w-full text-sm outline-none text-foreground">
            {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n} tamu</option>)}
          </select>
        </div>
      </label>
      <button type="submit" className="bg-primary text-primary-foreground px-6 md:px-8 py-4 rounded-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
        <Search className="w-4 h-4" />
        <span className="text-sm font-medium">Cari Kamar</span>
      </button>
    </form>
  );
}
