export type Category = "Foto" | "Video" | "Dekor" | "MC" | "Katering" | "MUA";
export type EventType = "Wedding" | "Wisuda" | "Event" | "Ulang Tahun";
export interface Pkg { name: string; price: number; items: string[] }
export interface Vendor {
  readonly id: string; name: string; category: Category; city: string;
  rating: number; reviews: number; priceFrom: number; tagline: string; description: string;
  events: EventType[]; packages: Pkg[]; lat: number; lng: number; whatsapp?: string;
}
