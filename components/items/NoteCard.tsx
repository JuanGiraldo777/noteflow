import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, { FadeInDown, FadeOutLeft } from "react-native-reanimated";
import { Text, Surface } from "react-native-paper";
import { Note } from "../../types";
import { lightTheme } from "../../constants/theme";
import { spacing, typography } from "../../constants/theme";

interface NoteCardProps {
  note: Note;
  onPress: () => void;
  animationDelay?: number;
}

export function NoteCard({ note, onPress, animationDelay = 0 }: NoteCardProps) {
  return (
    <Animated.View
      entering={FadeInDown.delay(animationDelay).duration(300)}
      exiting={FadeOutLeft}
      collapsable={false}
    >
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <Surface style={styles.card}>
          <Text style={styles.title} numberOfLines={1}>
            {note.title}
          </Text>
          <Text style={styles.content} numberOfLines={3}>
            {note.content}
          </Text>
          <Text style={styles.date}>
            {new Date(note.updatedAt).toLocaleDateString("es-ES")}
          </Text>
        </Surface>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: lightTheme.custom.noteColor,
    borderRadius: 12,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    elevation: 2,
  },
  title: {
    fontSize: typography.fontSizeLG,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  content: {
    fontSize: typography.fontSizeMD,
    opacity: 0.8,
    marginBottom: spacing.sm,
  },
  date: {
    fontSize: typography.fontSizeXS,
    opacity: 0.5,
    textAlign: "right",
  },
});
