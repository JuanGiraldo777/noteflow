import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { Text, IconButton } from "react-native-paper";
import * as Haptics from "expo-haptics";
import { useShallow } from "zustand/react/shallow";
import { useNotesStore } from "../../store/notesStore";
import { NoteCard } from "../../components/items/NoteCard";
import { ChecklistCard } from "../../components/items/ChecklistCard";
import { IdeaCard } from "../../components/items/IdeaCard";
import { EmptyState } from "../../components/EmptyState";
import { spacing, typography } from "../../constants/theme";
import { router } from "expo-router";
import { Note, ChecklistNote, IdeaNote } from "../../types";

export default function ArchivadasScreen() {
  const notes = useNotesStore(
    useShallow((state) => state.notes.filter((n) => n.isArchived)),
  );
  const checklists = useNotesStore(
    useShallow((state) => state.checklists.filter((c) => c.isArchived)),
  );
  const ideas = useNotesStore(
    useShallow((state) => state.ideas.filter((i) => i.isArchived)),
  );

  const restoreNote = useNotesStore((state) => state.restoreNote);
  const restoreChecklist = useNotesStore((state) => state.restoreChecklist);
  const restoreIdea = useNotesStore((state) => state.restoreIdea);
  const deleteNote = useNotesStore((state) => state.deleteNote);
  const deleteChecklist = useNotesStore((state) => state.deleteChecklist);
  const deleteIdea = useNotesStore((state) => state.deleteIdea);

  const hasAny = notes.length > 0 || checklists.length > 0 || ideas.length > 0;

  if (!hasAny) {
    return (
      <View style={styles.container}>
        <EmptyState
          icon="archive-outline"
          title="Archivadas vacío"
          subtitle="No hay elementos archivados"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {notes.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notas archivadas</Text>
            {notes.map((item, index) => (
              <View key={item.id} style={styles.row}>
                <View style={styles.cardWrapper}>
                  <NoteCard
                    note={item}
                    onPress={() => router.push(`/(tabs)/notas/${item.id}`)}
                    animationDelay={index * 60}
                  />
                </View>
                <View style={styles.actions}>
                  <IconButton
                    icon="archive-arrow-up"
                    size={20}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      restoreNote(item.id);
                    }}
                  />
                  <IconButton
                    icon="delete-outline"
                    size={20}
                    onPress={() =>
                      Alert.alert(
                        "Eliminar definitivamente",
                        "¿Eliminar esta nota permanentemente?",
                        [
                          { text: "Cancelar", style: "cancel" },
                          {
                            text: "Eliminar",
                            style: "destructive",
                            onPress: () => {
                              Haptics.impactAsync(
                                Haptics.ImpactFeedbackStyle.Light,
                              );
                              deleteNote(item.id);
                            },
                          },
                        ],
                      )
                    }
                  />
                </View>
              </View>
            ))}
          </View>
        )}

        {checklists.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tareas archivadas</Text>
            {checklists.map((item, index) => (
              <View key={item.id} style={styles.row}>
                <View style={styles.cardWrapper}>
                  <ChecklistCard
                    checklist={item}
                    onPress={() => router.push(`/(tabs)/checklists/${item.id}`)}
                    animationDelay={index * 60}
                  />
                </View>
                <View style={styles.actions}>
                  <IconButton
                    icon="archive-arrow-up"
                    size={20}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      restoreChecklist(item.id);
                    }}
                  />
                  <IconButton
                    icon="delete-outline"
                    size={20}
                    onPress={() =>
                      Alert.alert(
                        "Eliminar definitivamente",
                        "¿Eliminar esta lista permanentemente?",
                        [
                          { text: "Cancelar", style: "cancel" },
                          {
                            text: "Eliminar",
                            style: "destructive",
                            onPress: () => {
                              Haptics.impactAsync(
                                Haptics.ImpactFeedbackStyle.Light,
                              );
                              deleteChecklist(item.id);
                            },
                          },
                        ],
                      )
                    }
                  />
                </View>
              </View>
            ))}
          </View>
        )}

        {ideas.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ideas archivadas</Text>
            {ideas.map((item, index) => (
              <View key={item.id} style={styles.row}>
                <View style={styles.cardWrapper}>
                  <IdeaCard
                    idea={item}
                    onPress={() => router.push(`/(tabs)/ideas/${item.id}`)}
                    animationDelay={index * 60}
                  />
                </View>
                <View style={styles.actions}>
                  <IconButton
                    icon="archive-arrow-up"
                    size={20}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      restoreIdea(item.id);
                    }}
                  />
                  <IconButton
                    icon="delete-outline"
                    size={20}
                    onPress={() =>
                      Alert.alert(
                        "Eliminar definitivamente",
                        "¿Eliminar esta idea permanentemente?",
                        [
                          { text: "Cancelar", style: "cancel" },
                          {
                            text: "Eliminar",
                            style: "destructive",
                            onPress: () => {
                              Haptics.impactAsync(
                                Haptics.ImpactFeedbackStyle.Light,
                              );
                              deleteIdea(item.id);
                            },
                          },
                        ],
                      )
                    }
                  />
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: spacing.sm },
  content: { paddingBottom: spacing.lg },
  section: { marginBottom: spacing.lg },
  sectionTitle: {
    fontSize: typography.fontSizeLG,
    fontWeight: "600",
    marginHorizontal: spacing.md,
    marginBottom: spacing.xs,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardWrapper: { flex: 1 },
  actions: {
    width: 56,
    justifyContent: "center",
    alignItems: "center",
  },
});
