import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, { FadeInDown, FadeOutLeft } from "react-native-reanimated";
import { Text, Surface, ProgressBar } from "react-native-paper";
import { ChecklistNote } from "../../types";
import { lightTheme, spacing, typography } from "../../constants/theme";

interface ChecklistCardProps {
  checklist: ChecklistNote;
  onPress: () => void;
  animationDelay?: number;
}

export function ChecklistCard({
  checklist,
  onPress,
  animationDelay = 0,
}: ChecklistCardProps) {
  const total = checklist.items.length;
  const completed = checklist.items.filter((i) => i.isCompleted).length;
  const progress = total > 0 ? completed / total : 0;

  return (
    <Animated.View
      entering={FadeInDown.delay(animationDelay).duration(300)}
      exiting={FadeOutLeft}
      collapsable={false}
    >
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <Surface style={styles.card}>
          <Text style={styles.title} numberOfLines={1}>
            {checklist.title}
          </Text>
          <Text style={styles.counter}>
            {completed} de {total} tareas completadas
          </Text>
          <ProgressBar progress={progress} style={styles.progress} />
          <Text style={styles.date}>
            {new Date(checklist.updatedAt).toLocaleDateString("es-ES")}
          </Text>
        </Surface>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: lightTheme.custom.checklistColor,
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
  counter: {
    fontSize: typography.fontSizeSM,
    opacity: 0.7,
    marginBottom: spacing.sm,
  },
  progress: {
    borderRadius: 4,
    marginBottom: spacing.sm,
  },
  date: {
    fontSize: typography.fontSizeXS,
    opacity: 0.5,
    textAlign: "right",
  },
});
