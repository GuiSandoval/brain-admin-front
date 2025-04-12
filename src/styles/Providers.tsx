"use client";

import React from "react";
import StyledComponentsRegistry from "../../lib/registry";
import GlobalStyle from "./GlobalStyle";

function Providers({ children }: React.PropsWithChildren) {
  return (
    <StyledComponentsRegistry>
      <GlobalStyle />
      {children}
    </StyledComponentsRegistry>
  );
}

export default Providers;
