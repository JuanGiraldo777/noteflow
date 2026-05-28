import { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Checkbox, Button, Divider } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useNotesStore } from '../../../store/notesStore';
import { spacing, typography } from '../../../constants/theme';

export default function ChecklistDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { checklists, toggleChecklistItem, archiveChecklist } = useNotesStore();
  const checklist = checklists.find(c => c.id === id);

  if (!checklist) {
    return (
      <View style={styles.center}>
        <Text>Checklist no encontrado</Text>
      </View>
    );
  }

  const handleToggle = (itemId: string) => {
    toggleChecklistItem(id, itemId);

    // Haptic de éxito si se completan todos los items
    const updatedItems = checklist.items.map(i =>
      i.id === itemId ? { ...i, isCompleted: !i.isCompleted } : i
    );
    const allCompleted = updatedItems.every(i => i.isCompleted);
    if (allCompleted) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleArchive = () => {
    Alert.alert(
      'Archivar checklist',
      '¿Seguro que quieres archivar esta lista?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Archivar',
          style: 'destructive',
          onPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            archiveChecklist(id);
            router.back();
          },
        },
      ]
    );
  };

  const completed = checklist.items.filter(i => i.isCompleted).length;
  const total = checklist.items.length;

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Text style={styles.title}>{checklist.title}</Text>
      <Text style={styles.counter}>{completed} de {total} completadas</Text>
      <Divider style={styles.divider} />
      {checklist.items.map(item => (
        <View key={item.id} style={styles.item}>
          <Checkbox
            status={item.isCompleted ? 'checked' : 'unchecked'}
            onPress={() => handleToggle(item.id)}
          />
          <Text
            style={[
              styles.itemText,
              item.isCompleted && styles.itemCompleted,
            ]}
          >
            {item.text}
          </Text>
        </View>
      ))}
      <Button
        mode="outlined"
        onPress={handleArchive}
        style={styles.button}
        textColor="#B3261E"
      >
        Archivar lista
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: spacing.md, gap: spacing.sm },
  title: { fontSize: typography.fontSizeXXL, fontWeight: '600' },
  counter: { fontSize: typography.fontSizeSM, opacity: 0.6 },
  divider: { marginVertical: spacing.sm },
  item: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  itemText: { fontSize: typography.fontSizeMD, flex: 1 },
  itemCompleted: { textDecorationLine: 'line-through', opacity: 0.5 },
  button: { marginTop: spacing.lg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});