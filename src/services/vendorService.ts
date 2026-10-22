import { vendors } from "@/data";
import { Vendor } from "@/types";

export const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

// async function (custom): simulasi fetch dari server
export async function fetchVendors(): Promise<Vendor[]> {
  await delay(500);
  return vendors;
}
// Promise manual: resolve & reject
export function fetchVendorById(id: string): Promise<Vendor> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const found = vendors.find((x) => x.id === id);
      found ? resolve(found) : reject("Vendor tidak ditemukan");
    }, 400);
  });
}
// External API (pre-built fetch) + .then()
export interface Quote { quote: string; author: string }
export function fetchQuote(): Promise<Quote> {
  return fetch("https://dummyjson.com/quotes/random")
    .then((res) => { if (!res.ok) throw new Error("Gagal memuat"); return res.json(); })
    .then((d: Quote) => d);
}
