import { useRef, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import vendors from "@/app/index";
import { useApp } from "../context/AppContext";
import { shared } from "../styles/shared";
import { openMail, openWhatsApp } from "../utils/contact";

const EVENT_TYPES = ["Pernikahan", "Ulang Tahun", "Seminar", "Launching", "Lainnya"] as const;

export default function Booking() {
  const { vendorId } = useLocalSearchParams<{ vendorId?: string }>();
  const { c } = useApp();
  const s = shared(c);
  const router = useRouter();
  const vendorList = Array.isArray(vendors) ? (vendors as Array<{ id: string; name: string }>) : [];
  const vendor = vendorList.find((x) => x.id === vendorId);
  const phoneRef = useRef<TextInput>(null);
  const dateRef = useRef<TextInput>(null);
  const [form, setForm] = useState({ name: "", phone: "", date: "", place: "", notes: "" });
  const [type, setType] = useState<string>(EVENT_TYPES[0]);
  const set = (k: keyof typeof form) => (t: string) => setForm((f) => ({ ...f, [k]: t }));

  const build = () =>
    `Halo RealTime.Studio, saya ingin booking${vendor ? ` ${vendor.name}` : ""}.\nNama: ${form.name}\nWA: ${form.phone}\nJenis acara: ${type}\nTanggal: ${form.date}\nLokasi: ${form.place}\nCatatan: ${form.notes || "-"}`;
  const valid = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.date.trim()) {
      Alert.alert("Lengkapi data", "Nama, nomor WhatsApp, dan tanggal acara wajib diisi.");
      return false;
    }
    return true;
  };
  const done = () => Alert.alert("Terkirim 🎉", "Permintaanmu sudah diteruskan. Vendor akan segera membalas.", [{ text: "OK", onPress: () => router.replace("/") }]);

  const field = (label: string, key: keyof typeof form, extra: object = {}, ref?: any, next?: any) => (
    <>
      <Text style={{ color: c.text, fontWeight: "600", marginBottom: 6 }}>{label}</Text>
      <TextInput ref={ref} value={form[key]} onChangeText={set(key)} placeholderTextColor={c.sub} style={s.input}
        returnKeyType="next" onSubmitEditing={() => next?.current?.focus()} {...extra} />
    </>
  );

  return (
    <KeyboardAvoidingView style={s.screen} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={s.pad} keyboardShouldPersistTaps="handled">
        <Text style={s.h1}>Form Booking</Text>
        <Text style={[s.body, { marginBottom: 18 }]}>{vendor ? `Vendor: ${vendor.name}` : "Isi detail acaramu, kami bantu hubungkan ke vendor."}</Text>
        {field("Nama lengkap", "name", { placeholder: "Contoh: Jessi" }, undefined, phoneRef)}
        {field("Nomor WhatsApp", "phone", { placeholder: "08xxxxxxxxxx", keyboardType: "phone-pad" }, phoneRef, dateRef)}
        <Text style={{ color: c.text, fontWeight: "600", marginBottom: 6 }}>Jenis acara</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
          {EVENT_TYPES.map((t) => (
            <Pressable key={t} onPress={() => setType(t)} style={[s.chip, type === t && { backgroundColor: c.primary, borderColor: c.primary }]}>
              <Text style={{ color: type === t ? "#fff" : c.text, fontWeight: "600" }}>{t}</Text>
            </Pressable>
          ))}
        </View>
        {field("Tanggal acara", "date", { placeholder: "DD-MM-YYYY" }, dateRef)}
        {field("Lokasi acara", "place", { placeholder: "Gedung / kota" })}
        {field("Catatan", "notes", { placeholder: "Konsep, budget, kebutuhan khusus", multiline: true, style: [s.input, { height: 90, textAlignVertical: "top" }] })}

        <Pressable style={s.btn} onPress={() => valid() && openWhatsApp(build()).then(done)}><Text style={s.btnText}>Kirim via WhatsApp</Text></Pressable>
        <Pressable style={[s.btnGhost, { marginTop: 10 }]} onPress={() => valid() && openMail("Booking RealTime.Studio", build()).then(done)}>
          <Text style={{ color: c.primary, fontWeight: "700" }}>Kirim via Gmail</Text>
        </Pressable>
        <Pressable style={{ alignItems: "center", marginTop: 16 }} onPress={() => router.back()}><Text style={s.body}>Batal</Text></Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
