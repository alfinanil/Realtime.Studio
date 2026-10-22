import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import VendorCard from "@/components/VendorCard";
import { useApp } from "@/context/AppContext";
import { fetchVendors } from "@/services/vendorService";
import { shared } from "@/styles/shared";
import { Vendor } from "@/types";

export default function Favorites() {
  const { c, favs } = useApp();
  const s = shared(c);
  const [all, setAll] = useState<Vendor[]>([]);
  useEffect(() => { fetchVendors().then(setAll); }, []);
  return (
    <View style={s.screen}>
      <FlatList data={all.filter((v) => favs.includes(v.id))} keyExtractor={(v) => v.id} contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => <VendorCard vendor={item} />}
        ListEmptyComponent={<Text style={[s.body, { textAlign: "center", marginTop: 60 }]}>Belum ada favorit. Ketuk ikon ♥ pada vendor yang kamu suka.</Text>} />
    </View>
  );
}
