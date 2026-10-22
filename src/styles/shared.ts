import { StyleSheet } from "react-native";
import { Colors } from "@/constants/theme";

// External styling: dibuat per tema
export const shared = (c: Colors) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: c.bg },
  pad: { padding: 20 },
  h1: { fontSize: 28, fontWeight: "800", color: c.text, letterSpacing: -0.5 },
  h2: { fontSize: 18, fontWeight: "700", color: c.text, marginBottom: 10 },
  body: { fontSize: 14, lineHeight: 21, color: c.sub },
  card: { backgroundColor: c.card, borderRadius: 18, borderWidth: 1, borderColor: c.border, overflow: "hidden", elevation: 2, shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 3 } },
  btn: { backgroundColor: c.primary, paddingVertical: 14, borderRadius: 14, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8 },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  btnGhost: { borderWidth: 1.5, borderColor: c.primary, paddingVertical: 12, borderRadius: 14, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: c.soft, borderWidth: 1, borderColor: c.border },
  input: { backgroundColor: c.card, borderWidth: 1, borderColor: c.border, borderRadius: 12, padding: 12, color: c.text, fontSize: 15, marginBottom: 12 },
});
