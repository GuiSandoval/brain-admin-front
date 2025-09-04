// styles/styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      text: string;
      textSecondary: string;
      primary: string;
      secondary: string;
      accent: string;
      headerMenu: string;
      border: string;
      backgroundHover: string;
      backgroundSection: string;
    };
    fonts: {
      body: string;
      heading: string;
    };
  }
}
