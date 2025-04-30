import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  colors: {
    background: "#F9FAFB",
    text: "#1F2937",
    primary: "#3B82F6",
    secondary: "#6366F1",
    accent: "#10B981",
    headerMenu: "#3B82F6",
  },
  fonts: {
    body: "'Inter', sans-serif",
    heading: "'Poppins', sans-serif",
  },
} as const;

export const darkTheme: DefaultTheme = {
  colors: {
    background: "#282828",
    text: "#F9FAFB",
    primary: "#60A5FA",
    secondary: "#A78BFA",
    accent: "#34D399",
    headerMenu: "#0F172A",
  },
  fonts: {
    body: "'Inter', sans-serif",
    heading: "'Poppins', sans-serif",
  },
} as const;

export type ThemeType = typeof lightTheme;
