// styles/styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      text: string;
      primary: string;
      secondary: string;
      accent: string;
      headerMenu: string;
    };
    fonts: {
      body: string;
      heading: string;
    };
  }
}
