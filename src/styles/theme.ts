import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  colors: {
    background: "#FFFFFF",
    text: "#000000",
    primary: "#4F46E5",
    secondary: "#06B6D4",
    accent: "#F59E0B",
  },
  fonts: {
    body: "'Inter', sans-serif",
    heading: "'Poppins', sans-serif",
  },
} as const;

export const darkTheme: DefaultTheme = {
  colors: {
    background: "#111827",
    text: "#FFFFFF",
    primary: "#818CF8",
    secondary: "#67E8F9",
    accent: "#FBBF24",
  },
  fonts: {
    body: "'Inter', sans-serif",
    heading: "'Poppins', sans-serif",
  },
} as const;

export type ThemeType = typeof lightTheme;
