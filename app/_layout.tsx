import { useEffect } from "react";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { useColorScheme, View, ActivityIndicator } from "react-native";
import { lightTheme, darkTheme } from "../constants/theme";
import { useNotesStore } from "../store/notesStore";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  // Leemos isLoading y fetchNotes del store.
  const fetchNotes = useNotesStore((state) => state.fetchNotes);
  const isLoading = useNotesStore((state) => state.isLoading);

  // Al montar la app llamamos a la API una sola vez para cargar todas las notas activas.
  // El array vacío [] garantiza que solo se ejecuta en el primer render.
  useEffect(() => {
    fetchNotes();
  }, []);

  // Mientras la API responde mostramos un indicador de carga.
  // Esto evita que la app muestre contenido vacío un instante antes de cargar.
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <Stack />
    </PaperProvider>
  );
}
