import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeOutLeft } from "react-native-reanimated";
import { Text, Surface, Chip } from "react-native-paper";
import { IdeaNote } from "../../types";
import { spacing, typography } from "../../constants/theme";

interface IdeaCardProps {
  idea: IdeaNote;
  onPress: () => void;
  animationDelay?: number;
}

export function IdeaCard({ idea, onPress, animationDelay = 0 }: IdeaCardProps) {
  return (
    <Animated.View
      entering={FadeInDown.delay(animationDelay).duration(300)}
      exiting={FadeOutLeft}
      collapsable={false}
    >
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <Surface style={[styles.card, { backgroundColor: idea.color }]}>
          <Text style={styles.title} numberOfLines={1}>
            {idea.title}
          </Text>
          {idea.tags.length > 0 && (
            <View style={styles.tags}>
              {idea.tags.slice(0, 3).map((tag) => (
                <Chip key={tag} style={styles.chip} textStyle={styles.chipText}>
                  {tag}
                </Chip>
              ))}
            </View>
          )}
          <Text style={styles.date}>
            {new Date(idea.updatedAt).toLocaleDateString("es-ES")}
          </Text>
        </Surface>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    elevation: 2,
  },
  title: {
    fontSize: typography.fontSizeLG,
    fontWeight: "600",
    marginBottom: spacing.sm,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  chip: {
    height: 28,
  },
  chipText: {
    fontSize: typography.fontSizeXS,
  },
  date: {
    fontSize: typography.fontSizeXS,
    opacity: 0.5,
    textAlign: "right",
  },
});
