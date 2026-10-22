import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AppProvider, useApp } from "../context/AppContext";

function Navigator() {
  const { c, dark } = useApp();
  return (
    <>
      <StatusBar style={dark ? "light" : "dark"} />
      <Stack screenOptions={{ headerStyle: { backgroundColor: c.bg }, headerTintColor: c.text, headerShadowVisible: false, contentStyle: { backgroundColor: c.bg } }}>
        <Stack.Screen name="index" options={{ title: "RealTime.Studio" }} />
        <Stack.Screen name="vendors" options={{ title: "Semua Vendor" }} />
        <Stack.Screen name="favorites" options={{ title: "Favorit" }} />
        <Stack.Screen name="vendor/[id]" options={{ title: "Detail Vendor" }} />
        <Stack.Screen name="booking" options={{ title: "Ajukan Booking", presentation: "modal" }} />
      </Stack>
    </>
  );
}
export default function RootLayout() {
  return <AppProvider><Navigator /></AppProvider>;
}
