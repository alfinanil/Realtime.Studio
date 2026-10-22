import { useEffect, useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import HeroHeader from "@/components/HeroHeader";
import VendorCard from "@/components/VendorCard";
import { CATEGORIES } from "@/data";
import { useApp } from "@/context/AppContext";
import { fetchQuote, fetchVendors } from "@/services/vendorService";
import { shared } from "@/styles/shared";
import { Vendor } from "@/types";

export default function Home() {
  const { c, dark, toggleDark, favs } = useApp();
  const s = shared(c);
  const router = useRouter();
  const [list, setList] = useState<Vendor[]>([]);
  const [quote, setQuote] = useState<string>("");

  useEffect(() => {
    fetchVendors().then(setList);
    fetchQuote()
      .then((q) => setQuote(`“${q.quote}” — ${q.author}`))
      .catch(() => setQuote("“Setiap momen layak diabadikan.” — RealTime.Studio"));
  }, []);

  return (
    <ScrollView style={s.screen} contentContainerStyle={{ paddingBottom: 40 }}>
      <Stack.Screen options={{
        headerRight: () => (
          <View style={{ flexDirection: "row", gap: 16 }}>
            <Pressable onPress={() => router.push("/favorites")}>
              <Ionicons name="heart" size={22} color={c.primary} />
              {favs.length > 0 && <Text style={{ position: "absolute", top: -6, right: -8, color: c.primary, fontSize: 11, fontWeight: "800" }}>{favs.length}</Text>}
            </Pressable>
            <Pressable onPress={toggleDark}><Ionicons name={dark ? "sunny" : "moon"} size={22} color={c.text} /></Pressable>
          </View>
        ),
      }} />
      <HeroHeader title={"Satu tempat untuk\nsemua momen terbaikmu"} subtitle="Temukan fotografer, videografer, dekor, MC & katering terpercaya untuk wedding, wisuda, dan event." onSearch={() => router.push("/vendors")} />

      <View style={s.pad}>
        <Text style={s.h2}>Kategori</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
          {CATEGORIES.map((cat) => (
            <Pressable key={cat.key} style={[s.card, { width: "31%", alignItems: "center", paddingVertical: 16 }]}
              onPress={() => router.push({ pathname: "/vendors", params: { cat: cat.key } })}>
              <Ionicons name={cat.icon as any} size={26} color={c.primary} />
              <Text style={{ color: c.text, marginTop: 6, fontWeight: "600" }}>{cat.key}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={[s.body, { fontStyle: "italic", marginVertical: 20, textAlign: "center" }]}>{quote}</Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={s.h2}>Vendor Pilihan</Text>
          <Pressable onPress={() => router.push("/vendors")}><Text style={{ color: c.primary, fontWeight: "700" }}>Lihat semua</Text></Pressable>
        </View>
        <FlatList data={list.slice(0, 4)} keyExtractor={(v) => v.id} scrollEnabled={false}
          renderItem={({ item }) => <VendorCard vendor={item} />}
          ListEmptyComponent={<Text style={s.body}>Memuat vendor…</Text>} />
      </View>
    </ScrollView>
  );
}
