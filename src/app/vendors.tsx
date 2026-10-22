import { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import VendorCard from "@/components/VendorCard";
import { useApp } from "@/context/AppContext";
import { fetchVendors } from "../services/vendorService";
import { shared } from "../styles/shared";
import { Vendor } from "../types";

export default function Vendors() {
  const { c } = useApp();
  const s = shared(c);
  const { cat } = useLocalSearchParams<{ cat?: string }>();
  const [all, setAll] = useState<Vendor[]>([]);
  const [q, setQ] = useState("");
  const [active, setActive] = useState<string>(cat ?? "Semua");

  useEffect(() => { fetchVendors().then(setAll); }, []);

  const categoryKeys = useMemo(
    () => ["Semua", ...Array.from(new Set(all.map((vendor) => vendor.category)))],
    [all],
  );

  const filtered = useMemo(() => all.filter((v) =>
    (active === "Semua" || v.category === active) &&
    (v.name + v.tagline + v.category).toLowerCase().includes(q.toLowerCase())), [all, q, active]);

  return (
    <View style={s.screen}>
      <View style={{ padding: 20, paddingBottom: 0 }}>
        <TextInput value={q} onChangeText={setQ} placeholder="Cari vendor…" placeholderTextColor={c.sub} style={s.input} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
          {categoryKeys.map((k) => (
            <Pressable key={k} onPress={() => setActive(k)}
              style={[s.chip, { marginRight: 8 }, active === k && { backgroundColor: c.primary, borderColor: c.primary }]}>
              <Text style={{ color: active === k ? "#fff" : c.text, fontWeight: "600" }}>{k}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <FlatList data={filtered} keyExtractor={(v) => v.id} contentContainerStyle={{ padding: 20, paddingTop: 8 }}
        renderItem={({ item }) => <VendorCard vendor={item} />}
        ListEmptyComponent={<Text style={[s.body, { textAlign: "center", marginTop: 40 }]}>Vendor tidak ditemukan. Coba kata kunci lain.</Text>} />
    </View>
  );
}
