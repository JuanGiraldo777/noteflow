import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { spacing, typography } from '../constants/theme';

interface EmptyStateProps {
  icon: string;
  title: string;
  subtitle: string;
}

export function EmptyState({ icon, title, subtitle }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={icon as any}
        size={72}
        color="#C4C4C4"
        style={styles.icon}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.sm,
  },
  icon: { marginBottom: spacing.md },
  title: {
    fontSize: typography.fontSizeXL,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.fontSizeMD,
    opacity: 0.5,
    textAlign: 'center',
  },
});