import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useApp } from "@/context/AppContext";
import { fetchVendorById } from "@/services/vendorService";
import { shared } from "@/styles/shared";
import { openMail, openMaps, openWhatsApp, rupiah } from "@/utils/contact";
import { Vendor } from "@/types";

export default function VendorDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { c, isFav, toggleFav } = useApp();
  const s = shared(c);
  const router = useRouter();
  const [v, setV] = useState<Vendor | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchVendorById(id)
      .then(setV)
      .catch((error: unknown) => setError(String(error)));
  }, [id]);

  const goBack = () => (router.canGoBack() ? router.back() : router.replace("/"));

  if (error) return (
    <View style={[s.screen, s.pad, { justifyContent: "center" }]}>
      <Text style={s.h2}>{error}</Text>
      <Pressable style={s.btn} onPress={goBack}><Text style={s.btnText}>Kembali</Text></Pressable>
    </View>
  );
  if (!v) return <View style={[s.screen, s.pad]}><Text style={s.body}>Memuat…</Text></View>;

  const msg = `Halo ${v.name}, saya tertarik dengan layanan Anda via RealTime.Studio. Boleh minta info paket & ketersediaan tanggal?`;
  return (
    <ScrollView style={s.screen} contentContainerStyle={{ paddingBottom: 40 }}>
      <Stack.Screen options={{
        title: v.name,
        headerRight: () => (
          <Pressable onPress={() => toggleFav(v.id)}>
            <Ionicons name={isFav(v.id) ? "heart" : "heart-outline"} size={24} color={c.primary} />
          </Pressable>
        ),
      }} />
      <Image source={{ uri: `https://picsum.photos/seed/rts${v.id}/900/560` }} style={{ height: 240, width: "100%", backgroundColor: c.soft }} />
      <View style={s.pad}>
        <Text style={{ color: c.primary, fontWeight: "700", fontSize: 12 }}>{v.category.toUpperCase()} • {v.city}</Text>
        <Text style={s.h1}>{v.name}</Text>
        <Text style={{ color: c.text, marginVertical: 6 }}><Ionicons name="star" size={14} color={c.accent} /> {v.rating} • {v.reviews} ulasan</Text>
        <Text style={s.body}>{v.description}</Text>

        <Text style={[s.h2, { marginTop: 22 }]}>Cocok untuk</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {v.events.map((e: string) => <View key={e} style={s.chip}><Text style={{ color: c.text }}>{e}</Text></View>)}
        </View>

        <Text style={[s.h2, { marginTop: 22 }]}>Paket</Text>
        {v.packages.map((p: Vendor["packages"][number], i: number) => (
          <View key={p.name} style={[s.card, { padding: 16, marginBottom: 12 }, i === 1 && { borderColor: c.primary, borderWidth: 2 }]}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ color: c.text, fontWeight: "800", fontSize: 16 }}>{p.name}{i === 1 ? "  ⭐ Terpopuler" : ""}</Text>
              <Text style={{ color: c.primary, fontWeight: "800" }}>{rupiah(p.price)}</Text>
            </View>
            {p.items.map((it: string) => <Text key={it} style={s.body}>✓ {it}</Text>)}
          </View>
        ))}

        <Pressable style={[s.btn, { marginTop: 8 }]} onPress={() => router.push({ pathname: "/booking", params: { vendorId: v.id } })}>
          <Ionicons name="calendar" size={18} color="#fff" /><Text style={s.btnText}>Ajukan Booking</Text>
        </Pressable>
        <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
          <Pressable style={[s.btnGhost, { flex: 1 }]} onPress={() => openWhatsApp(msg)}>
            <Ionicons name="logo-whatsapp" size={18} color={c.primary} /><Text style={{ color: c.primary, fontWeight: "700" }}>WhatsApp</Text>
          </Pressable>
          <Pressable style={[s.btnGhost, { flex: 1 }]} onPress={() => openMail(`Tanya ${v.name}`, msg)}>
            <Ionicons name="mail" size={18} color={c.primary} /><Text style={{ color: c.primary, fontWeight: "700" }}>Gmail</Text>
          </Pressable>
        </View>
        <Pressable style={[s.btnGhost, { marginTop: 10 }]} onPress={() => openMaps(v.lat, v.lng)}>
          <Ionicons name="location" size={18} color={c.primary} /><Text style={{ color: c.primary, fontWeight: "700" }}>Lihat Lokasi</Text>
        </Pressable>
        <Pressable style={{ alignItems: "center", marginTop: 16 }} onPress={goBack}><Text style={s.body}>← Kembali</Text></Pressable>
      </View>
    </ScrollView>
  );
}
