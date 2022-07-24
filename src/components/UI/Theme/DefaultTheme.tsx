import { FC } from "react";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./theme.default";

export const Theme: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};
