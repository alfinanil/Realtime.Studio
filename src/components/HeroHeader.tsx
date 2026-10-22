import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useApp } from "@/context/AppContext";

interface Props { title: string; subtitle: string; onSearch: () => void }
export default function HeroHeader({ title, subtitle, onSearch }: Props) {
  const { c } = useApp();
  return (
    <View style={{ backgroundColor: c.primary, padding: 24, paddingBottom: 28, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}>
      <Text style={{ color: "#fff", fontSize: 30, fontWeight: "800", letterSpacing: -0.5 }}>{title}</Text>
      <Text style={{ color: "#FFFFFFD0", marginTop: 6, fontSize: 14, lineHeight: 20 }}>{subtitle}</Text>
      <Pressable onPress={onSearch}
        style={{ flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "#fff", borderRadius: 14, padding: 14, marginTop: 18 }}>
        <Ionicons name="search" size={18} color="#7A6E66" />
        <Text style={{ color: "#7A6E66" }}>Cari fotografer, dekor, MC, katering…</Text>
      </Pressable>
    </View>
  );
}
