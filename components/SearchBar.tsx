import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { spacing } from '../constants/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChangeText, placeholder }: SearchBarProps) {
  return (
    <Searchbar
      placeholder={placeholder ?? 'Buscar...'}
      value={value}
      onChangeText={onChangeText}
      style={styles.searchbar}
    />
  );
}

const styles = StyleSheet.create({
  searchbar: {
    margin: spacing.md,
    marginBottom: spacing.xs,
  },
});