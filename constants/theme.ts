import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

// Paleta de colores de NoteFlow
const colors = {
  primary: '#6750A4',
  secondary: '#625B71',
  accent: '#7D5260',

  noteColor: '#E8DEF8',
  checklistColor: '#DCF0DC',
  ideaColor: '#FFF0C2',

  success: '#1D9E75',
  error: '#B3261E',
  warning: '#EF9F27',
};

// Escala tipográfica
export const typography = {
  fontSizeXS: 11,
  fontSizeSM: 13,
  fontSizeMD: 15,
  fontSizeLG: 17,
  fontSizeXL: 20,
  fontSizeXXL: 24,
};

// Espaciados base
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Tema claro
export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    tertiary: colors.accent,
  },
  custom: {
    noteColor: colors.noteColor,
    checklistColor: colors.checklistColor,
    ideaColor: colors.ideaColor,
    success: colors.success,
    error: colors.error,
    warning: colors.warning,
  },
};

// Tema oscuro
export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    tertiary: colors.accent,
  },
  custom: {
    noteColor: '#4A3F6B',
    checklistColor: '#2D4A2D',
    ideaColor: '#4A3F1A',
    success: colors.success,
    error: colors.error,
    warning: colors.warning,
  },
};