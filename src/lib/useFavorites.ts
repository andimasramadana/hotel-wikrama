import { useState, useEffect } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  // Ambil data favorit dari localStorage saat web pertama kali dimuat
  useEffect(() => {
    const storedFavs = localStorage.getItem("hotel_favorites");
    if (storedFavs) {
      try {
        setFavorites(JSON.parse(storedFavs));
      } catch (e) {
        console.error("Gagal membaca favorit");
      }
    }
  }, []);

  // Fungsi untuk klik tombol hati (tambah/hapus dari favorit)
  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const isFav = prev.includes(id);
      let newFavs;
      
      if (isFav) {
        newFavs = prev.filter((favId) => favId !== id); // Hapus jika sudah ada
      } else {
        newFavs = [...prev, id]; // Tambah jika belum ada
      }
      
      localStorage.setItem("hotel_favorites", JSON.stringify(newFavs));
      return newFavs;
    });
  };

  return { favorites, toggleFavorite };
}