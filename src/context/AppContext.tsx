import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import { Colors, palette } from "@/constants/theme";

interface Ctx {
  dark: boolean; c: Colors; toggleDark: () => void;
  favs: string[]; toggleFav: (id: string) => void; isFav: (id: string) => boolean;
}
const AppContext = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const system = useColorScheme();
  const [dark, setDark] = useState<boolean>(system === "dark");
  const [favs, setFavs] = useState<string[]>([]);
  const value = useMemo<Ctx>(() => ({
    dark, c: dark ? palette.dark : palette.light,
    toggleDark: () => setDark((d) => !d),
    favs, isFav: (id) => favs.includes(id),
    toggleFav: (id) => setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id])),
  }), [dark, favs]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp harus di dalam AppProvider");
  return ctx;
}
