import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { useShallow } from "zustand/react/shallow";
import { useNotesStore } from "../../store/notesStore";
import { NoteCard } from "../../components/items/NoteCard";
import { EmptyState } from "../../components/EmptyState";
import { SearchBar } from "../../components/SearchBar";
import { Note } from "../../types";
import { spacing } from "../../constants/theme";

export default function NotasScreen() {
  const [search, setSearch] = useState("");

  const notes = useNotesStore(
    useShallow((state) =>
      state.notes
        .filter((n) => !n.isArchived)
        .filter(
          (n) =>
            search.trim() === "" ||
            n.title.toLowerCase().includes(search.toLowerCase()) ||
            n.content.toLowerCase().includes(search.toLowerCase()),
        ),
    ),
  );

  return (
    <View style={styles.container}>
      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar notas..."
      />
      {notes.length === 0 ? (
        <EmptyState
          icon="note-text-outline"
          title={search ? "Sin resultados" : "Sin notas aún"}
          subtitle={
            search
              ? "Prueba con otro término"
              : "Pulsa el botón + para crear tu primera nota"
          }
        />
      ) : (
        <FlashList
          data={notes}
          renderItem={({ item, index }: { item: Note; index: number }) => (
            <NoteCard
              note={item}
              animationDelay={index * 80}
              onPress={() => router.push(`/(tabs)/notas/${item.id}`)}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push("/nueva-nota?type=note")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  fab: {
    position: "absolute",
    right: spacing.md,
    bottom: spacing.lg,
  },
});
