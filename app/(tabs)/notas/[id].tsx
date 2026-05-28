import { useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useNotesStore } from '../../../store/notesStore';
import { spacing, typography } from '../../../constants/theme';

export default function NotaDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { notes, updateNote, archiveNote } = useNotesStore();
  const nota = notes.find(n => n.id === id);

  const [title, setTitle] = useState(nota?.title ?? '');
  const [content, setContent] = useState(nota?.content ?? '');

  if (!nota) {
    return (
      <View style={styles.center}>
        <Text>Nota no encontrada</Text>
      </View>
    );
  }

  const handleSave = () => {
    updateNote(id, { title, content });
    router.back();
  };

  const handleArchive = () => {
    Alert.alert(
      'Archivar nota',
      '¿Seguro que quieres archivar esta nota?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Archivar',
          style: 'destructive',
          onPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            archiveNote(id);
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
        <TextInput
          label="Contenido"
          value={content}
          onChangeText={setContent}
          mode="outlined"
          multiline
          numberOfLines={8}
          style={styles.input}
        />
        <Button mode="contained" onPress={handleSave} style={styles.button}>
          Guardar cambios
        </Button>
        <Button
          mode="outlined"
          onPress={handleArchive}
          style={styles.button}
          textColor="#B3261E"
        >
          Archivar nota
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: spacing.md, gap: spacing.sm },
  input: { marginBottom: spacing.xs },
  button: { marginTop: spacing.sm },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});