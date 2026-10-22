import { Category, Vendor } from "@/types";

export const CATEGORIES: { key: Category; icon: string }[] = [
  { key: "Foto", icon: "camera" }, { key: "Video", icon: "videocam" }, { key: "Dekor", icon: "flower" },
  { key: "MC", icon: "mic" }, { key: "Katering", icon: "restaurant" }, { key: "MUA", icon: "color-palette" },
];
export const EVENT_TYPES = ["Wedding", "Wisuda", "Event", "Ulang Tahun"] as const;

const pk = (base: number, a: string) => [
  { name: "Basic", price: base, items: [a, "Konsultasi gratis", "1x revisi"] },
  { name: "Premium", price: Math.round(base * 1.8), items: [a, "Tim tambahan", "Prioritas jadwal", "2x revisi"] },
];
const v = (id: string, name: string, category: Category, rating: number, price: number, tagline: string, lat: number, lng: number): Vendor => ({
  id, name, category, city: "Malang", rating, reviews: 40 + Number(id) * 17, priceFrom: price, tagline,
  description: `${name} berpengalaman menangani wedding, wisuda, dan event. ${tagline}. Hasil rapi, tepat waktu, komunikasi cepat.`,
  events: ["Wedding", "Wisuda", "Event"], packages: pk(price, category), lat, lng,
});

export const vendors: Vendor[] = [
  v("1", "Lumiere Photography", "Foto", 4.9, 2500000, "Momen jujur, cahaya hangat", -7.9666, 112.6326),
  v("2", "Frame & Motion", "Video", 4.8, 3500000, "Sinematik, emosional, berkesan", -7.9797, 112.6304),
  v("3", "Bloomhaus Decor", "Dekor", 4.7, 5000000, "Dekor floral estetik & elegan", -7.9525, 112.6149),
  v("4", "Raka Sanjaya MC", "MC", 4.9, 1500000, "Hangat, luwes, interaktif", -7.9439, 112.6195),
  v("5", "Dapur Senja Catering", "Katering", 4.6, 45000, "Menu prasmanan per porsi", -7.9863, 112.6335),
  v("6", "Aurora Makeup Artist", "MUA", 4.8, 1200000, "Natural glam tahan seharian", -7.9722, 112.6212),
  v("7", "Kampus Moments", "Foto", 4.7, 800000, "Spesialis wisuda & prewedding", -7.9246, 112.5995),
  v("8", "Vivid Live Event", "Dekor", 4.5, 6500000, "Panggung, lighting, sound", -7.9615, 112.6481),
];
