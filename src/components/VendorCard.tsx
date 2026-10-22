import { Image, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useApp } from "@/context/AppContext";
import { shared } from "@/styles/shared";
import { rupiah } from "@/utils/contact";
import { Vendor } from "@/types";

export default function VendorCard({ vendor }: { vendor: Vendor }) {
  const { c, isFav, toggleFav } = useApp();
  const s = shared(c);
  const router = useRouter();
  return (
    <Pressable
      style={[s.card, { marginBottom: 16 }]}
      onPress={() => router.push({ pathname: "/vendor/[id]", params: { id: vendor.id } })}
    >
      <Image source={{ uri: `https://picsum.photos/seed/rts${vendor.id}/700/420` }} style={{ height: 160, width: "100%", backgroundColor: c.soft }} />
      <Pressable onPress={() => toggleFav(vendor.id)} hitSlop={10}
        style={{ position: "absolute", top: 12, right: 12, backgroundColor: "#0008", padding: 8, borderRadius: 20 }}>
        <Ionicons name={isFav(vendor.id) ? "heart" : "heart-outline"} size={20} color={isFav(vendor.id) ? "#FF6B81" : "#fff"} />
      </Pressable>
      <View style={{ padding: 14 }}>
        <Text style={{ color: c.primary, fontSize: 12, fontWeight: "700" }}>{vendor.category.toUpperCase()} • {vendor.city}</Text>
        <Text style={{ color: c.text, fontSize: 17, fontWeight: "700", marginTop: 2 }}>{vendor.name}</Text>
        <Text style={s.body}>{vendor.tagline}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
          <Text style={{ color: c.text, fontWeight: "600" }}>
            <Ionicons name="star" size={14} color={c.accent} /> {vendor.rating} ({vendor.reviews})
          </Text>
          <Text style={{ color: c.text, fontWeight: "700" }}>mulai {rupiah(vendor.priceFrom)}</Text>
        </View>
      </View>
    </Pressable>
  );
}
