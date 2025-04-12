import { createGlobalStyle } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { generateCSSVariables } from "./themeUtils";

const GlobalStyle = createGlobalStyle`
  :root {
    ${generateCSSVariables(lightTheme)}
  }

  [data-theme="dark"] { 
    ${generateCSSVariables(darkTheme)}
  }

  [data-theme='dark'] [data-hide-on-theme='dark'],
  [data-theme='light'] [data-hide-on-theme='light'] {
    display: none;
  }
`;
export default GlobalStyle;
