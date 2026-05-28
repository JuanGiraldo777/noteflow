import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { useShallow } from "zustand/react/shallow";
import { useNotesStore } from "../../store/notesStore";
import { ChecklistCard } from "../../components/items/ChecklistCard";
import { EmptyState } from "../../components/EmptyState";
import { SearchBar } from "../../components/SearchBar";
import { ChecklistNote } from "../../types";
import { spacing } from "../../constants/theme";

export default function ChecklistsScreen() {
  const [search, setSearch] = useState("");

  const checklists = useNotesStore(
    useShallow((state) =>
      state.checklists
        .filter((c) => !c.isArchived)
        .filter(
          (c) =>
            search.trim() === "" ||
            c.title.toLowerCase().includes(search.toLowerCase()),
        ),
    ),
  );

  return (
    <View style={styles.container}>
      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar tareas..."
      />
      {checklists.length === 0 ? (
        <EmptyState
          icon="checkbox-marked-circle-outline"
          title={search ? "Sin resultados" : "Sin tareas aún"}
          subtitle={
            search
              ? "Prueba con otro término"
              : "Pulsa el botón + para crear tu primera lista"
          }
        />
      ) : (
        <FlashList
          data={checklists}
          renderItem={({
            item,
            index,
          }: {
            item: ChecklistNote;
            index: number;
          }) => (
            <ChecklistCard
              checklist={item}
              animationDelay={index * 80}
              onPress={() => router.push(`/(tabs)/checklists/${item.id}`)}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push("/nueva-nota?type=checklist")}
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
