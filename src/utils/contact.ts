import { Alert, Linking } from "react-native";
import { CONTACT } from "@/constants/theme";

export const rupiah = (n: number) => "Rp " + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const open = async (url: string) => {
  try { await Linking.openURL(url); } catch { Alert.alert("Gagal", "Tidak bisa membuka aplikasi tujuan."); }
};
export const openWhatsApp = (msg: string) => open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`);
export const openMail = (subject: string, body: string) =>
  open(`mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
export const openMaps = (lat: number, lng: number) =>
  open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`);
