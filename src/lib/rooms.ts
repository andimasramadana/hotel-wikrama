export const rooms = [
  {
    id: 1,
    type: "Kamar Hotel",
    name: "Deluxe King Room",
    price: 726188, // Harga diskon (harga saat ini)
    originalPrice: 1440000, // Harga coret
    image: "https://i.pinimg.com/1200x/c5/7b/3c/c57b3cd14908c90fe35547fa051b9982.jpg",
    bed: "1 King Bed",
    capacity: 2,
    size: 32,
    ratingScore: 8.7, // Rating ala aplikasi travel
    ratingWord: "Luar Biasa",
    reviews: 1088,
    distance: "1.2 km dari pusat kota",
    description: "Kamar Deluxe kami menawarkan kenyamanan modern dengan sentuhan elegan.",
    amenities: ["AC", 'Smart TV 43"', "Wi-Fi Cepat", "Shower Air Panas"],
  },
  {
    id: 2,
    type: "Kamar Standar",
    name: "Superior Twin Room",
    price: 315360,
    originalPrice: 1314000,
    image:
      "https://i.pinimg.com/1200x/e4/96/8d/e4968daeadbf214f26ffd1a8cb05b7bd.jpg",
    bed: "2 Single Bed",
    capacity: 2,
    size: 28,
    ratingScore: 7.2,
    ratingWord: "Baik",
    reviews: 99,
    distance: "5.9 km dari pusat kota",
    description:
      "Pilihan cerdas untuk rekan perjalanan. Menawarkan dua tempat tidur single yang nyaman.",
    amenities: ["AC", "TV Kabel", "Wi-Fi Cepat", "Amenities Mandi"],
  },
  {
    id: 3,
    type: "Suite Keluarga",
    name: "Family Suite",
    price: 513000,
    originalPrice: 1140000,
    image:
      "https://i.pinimg.com/1200x/b5/89/eb/b589eb78bb2cb68b2087c3596006d0b2.jpg",
    bed: "1 King & 1 Bunk Bed",
    capacity: 4,
    size: 54,
    ratingScore: 9.0,
    ratingWord: "Istimewa",
    reviews: 689,
    distance: "1.3 km dari pusat kota",
    description: "Kamar terluas kami yang dirancang khusus untuk keluarga.",
    amenities: ["AC x2", 'Smart TV 55"', "Bathtub", "Sofa Keluarga", "Balkon"],
  },
];

export const formatIDR = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
};
