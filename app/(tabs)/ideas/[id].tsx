import { useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Text, TextInput, Button, Chip } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useNotesStore } from '../../../store/notesStore';
import { spacing, typography } from '../../../constants/theme';

const IDEA_COLORS = ['#FFF0C2', '#E8DEF8', '#DCF0DC', '#FFE0E0', '#E0F0FF'];

export default function IdeaDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { ideas, updateIdea, archiveIdea } = useNotesStore();
  const idea = ideas.find(i => i.id === id);

  const [title, setTitle] = useState(idea?.title ?? '');
  const [tags, setTags] = useState<string[]>(idea?.tags ?? []);
  const [tagInput, setTagInput] = useState('');
  const [selectedColor, setSelectedColor] = useState(idea?.color ?? IDEA_COLORS[0]);

  if (!idea) {
    return (
      <View style={styles.center}>
        <Text>Idea no encontrada</Text>
      </View>
    );
  }

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput('');
    }
  };

  const handleSave = () => {
    updateIdea(id, { title, tags, color: selectedColor });
    router.back();
  };

  const handleArchive = () => {
    Alert.alert(
      'Archivar idea',
      '¿Seguro que quieres archivar esta idea?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Archivar',
          style: 'destructive',
          onPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            archiveIdea(id);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <TextInput
          label="Título"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          style={styles.input}
        />

        <Text style={styles.label}>Color</Text>
        <View style={styles.colors}>
          {IDEA_COLORS.map(color => (
            <View
              key={color}
              onTouchEnd={() => setSelectedColor(color)}
              style={[
                styles.colorCircle,
                { backgroundColor: color },
                selectedColor === color && styles.colorSelected,
              ]}
            />
          ))}
        </View>

        <View style={styles.tagRow}>
          <TextInput
            label="Añadir etiqueta"
            value={tagInput}
            onChangeText={setTagInput}
            mode="outlined"
            style={styles.tagInput}
            onSubmitEditing={handleAddTag}
          />
          <Button onPress={handleAddTag} style={styles.tagButton}>
            Añadir
          </Button>
        </View>
        <View style={styles.tags}>
          {tags.map(tag => (
            <Chip
              key={tag}
              onClose={() => setTags(tags.filter(t => t !== tag))}
              style={styles.chip}
            >
              {tag}
            </Chip>
          ))}
        </View>

        <Button mode="contained" onPress={handleSave} style={styles.button}>
          Guardar cambios
        </Button>
        <Button
          mode="outlined"
          onPress={handleArchive}
          style={styles.button}
          textColor="#B3261E"
        >
          Archivar idea
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: spacing.md, gap: spacing.sm },
  input: { marginBottom: spacing.xs },
  label: { fontSize: typography.fontSizeMD, marginBottom: spacing.xs },
  colors: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
  colorCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorSelected: { borderColor: '#6750A4' },
  tagRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  tagInput: { flex: 1 },
  tagButton: { marginTop: spacing.xs },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  chip: { marginBottom: spacing.xs },
  button: { marginTop: spacing.sm },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});