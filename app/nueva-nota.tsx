import { useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Text, TextInput, Button, Chip } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import { z } from 'zod';
import { useNotesStore } from '../store/notesStore';
import { spacing, typography } from '../constants/theme';
import * as Crypto from 'expo-crypto';

// Schemas de validación
const noteSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  content: z.string().min(1, 'El contenido no puede estar vacío'),
});

const checklistSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
});

const ideaSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
});

// Colores disponibles para ideas
const IDEA_COLORS = ['#FFF0C2', '#E8DEF8', '#DCF0DC', '#FFE0E0', '#E0F0FF'];

export default function NuevaNotaScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();
  const { addNote, addChecklist, addIdea } = useNotesStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [items, setItems] = useState<string[]>(['']);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [selectedColor, setSelectedColor] = useState(IDEA_COLORS[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddItem = () => setItems([...items, '']);

  const handleItemChange = (text: string, index: number) => {
    const updated = [...items];
    updated[index] = text;
    setItems(updated);
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSubmit = () => {
    setErrors({});
    const now = new Date();
    const id = Crypto.randomUUID();

    if (type === 'note') {
      const result = noteSchema.safeParse({ title, content });
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
       result.error.issues.forEach((issue: z.ZodIssue) => {
        fieldErrors[String(issue.path[0])] = issue.message;
      });
        setErrors(fieldErrors);
        return;
      }
      addNote({
        id,
        title,
        content,
        createdAt: now,
        updatedAt: now,
        isArchived: false,
      });

    } else if (type === 'checklist') {
      const result = checklistSchema.safeParse({ title });
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
       result.error.issues.forEach((issue: z.ZodIssue) => {
        fieldErrors[String(issue.path[0])] = issue.message;
      });
        setErrors(fieldErrors);
        return;
      }
      const validItems = items.filter(i => i.trim().length > 0);
      if (validItems.length === 0) {
        setErrors({ items: 'Añade al menos una tarea' });
        return;
      }
      addChecklist({
        id,
        title,
        items: validItems.map(text => ({
          id: Crypto.randomUUID(),
          text,
          isCompleted: false,
        })),
        createdAt: now,
        updatedAt: now,
        isArchived: false,
      });

    } else if (type === 'idea') {
      const result = ideaSchema.safeParse({ title });
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.issues.forEach((issue: z.ZodIssue) => {
        fieldErrors[String(issue.path[0])] = issue.message;
      });
        setErrors(fieldErrors);
        return;
      }
      addIdea({
        id,
        title,
        tags,
        color: selectedColor,
        createdAt: now,
        updatedAt: now,
        isArchived: false,
      });
    }

    router.back();
  };

  const getTitle = () => {
    if (type === 'note') return 'Nueva nota';
    if (type === 'checklist') return 'Nueva tarea';
    return 'Nueva idea';
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.heading}>{getTitle()}</Text>

        {/* Campo título — común a los tres tipos */}
        <TextInput
          label="Título"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          style={styles.input}
          error={!!errors.title}
        />
        {errors.title && <Text style={styles.error}>{errors.title}</Text>}

        {/* Campos específicos por tipo */}
        {type === 'note' && (
          <>
            <TextInput
              label="Contenido"
              value={content}
              onChangeText={setContent}
              mode="outlined"
              multiline
              numberOfLines={6}
              style={styles.input}
              error={!!errors.content}
            />
            {errors.content && (
              <Text style={styles.error}>{errors.content}</Text>
            )}
          </>
        )}

        {type === 'checklist' && (
          <>
            {items.map((item, index) => (
              <TextInput
                key={index}
                label={`Tarea ${index + 1}`}
                value={item}
                onChangeText={text => handleItemChange(text, index)}
                mode="outlined"
                style={styles.input}
              />
            ))}
            {errors.items && (
              <Text style={styles.error}>{errors.items}</Text>
            )}
            <Button onPress={handleAddItem} style={styles.addButton}>
              + Añadir tarea
            </Button>
          </>
        )}

        {type === 'idea' && (
          <>
            {/* Selector de color */}
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

            {/* Campo de etiquetas */}
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
                  onClose={() => handleRemoveTag(tag)}
                  style={styles.chip}
                >
                  {tag}
                </Chip>
              ))}
            </View>
          </>
        )}

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
        >
          Guardar
        </Button>

        <Button onPress={() => router.back()} style={styles.cancelButton}>
          Cancelar
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: spacing.md, gap: spacing.sm },
  heading: {
    fontSize: typography.fontSizeXXL,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  input: { marginBottom: spacing.xs },
  error: { color: '#B3261E', fontSize: typography.fontSizeSM, marginBottom: spacing.xs },
  label: { fontSize: typography.fontSizeMD, marginBottom: spacing.xs },
  addButton: { alignSelf: 'flex-start', marginBottom: spacing.sm },
  submitButton: { marginTop: spacing.md },
  cancelButton: { marginTop: spacing.xs },
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
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginBottom: spacing.sm },
  chip: { marginBottom: spacing.xs },
});