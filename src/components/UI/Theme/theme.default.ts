import { DefaultTheme } from "styled-components";

const defaultPadding = 8;

export const defaultTheme: DefaultTheme = {
  borderRadius: "4px",

  colors: {
    primary: "#673AB7",
    secondary: "#536DFE",
    textPrimary: "#212121",
    textSecondary: "#757575",
    divider: "#BDBDBD",
  },
  padding: defaultPadding,
  spacing: (padding) => `${defaultPadding * padding}px`,
};
