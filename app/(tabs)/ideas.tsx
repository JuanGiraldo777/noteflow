import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { useShallow } from "zustand/react/shallow";
import { useNotesStore } from "../../store/notesStore";
import { IdeaCard } from "../../components/items/IdeaCard";
import { EmptyState } from "../../components/EmptyState";
import { SearchBar } from "../../components/SearchBar";
import { IdeaNote } from "../../types";
import { spacing } from "../../constants/theme";

export default function IdeasScreen() {
  const [search, setSearch] = useState("");

  const ideas = useNotesStore(
    useShallow((state) =>
      state.ideas
        .filter((i) => !i.isArchived)
        .filter(
          (i) =>
            search.trim() === "" ||
            i.title.toLowerCase().includes(search.toLowerCase()) ||
            i.tags.some((tag) =>
              tag.toLowerCase().includes(search.toLowerCase()),
            ),
        ),
    ),
  );

  return (
    <View style={styles.container}>
      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar ideas o etiquetas..."
      />
      {ideas.length === 0 ? (
        <EmptyState
          icon="lightbulb-outline"
          title={search ? "Sin resultados" : "Sin ideas aún"}
          subtitle={
            search
              ? "Prueba con otro término"
              : "Pulsa el botón + para capturar tu primera idea"
          }
        />
      ) : (
        <FlashList
          data={ideas}
          renderItem={({ item, index }: { item: IdeaNote; index: number }) => (
            <IdeaCard
              idea={item}
              animationDelay={index * 80}
              onPress={() => router.push(`/(tabs)/ideas/${item.id}`)}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push("/nueva-nota?type=idea")}
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
