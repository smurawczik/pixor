import { createTheme, ThemeProvider } from "@mui/material";
import { indigo, teal } from "@mui/material/colors";
import React, { FC } from "react";
import { Provider } from "react-redux";
import { CanvasElementProvider } from "../../context/canvas";
import { store } from "../../redux/store";
import { Theme } from "../UI/Theme";

export const theme = createTheme({
  palette: {
    primary: { main: teal["500"] },
    secondary: { main: indigo["400"] },
    mode: "dark",
  },
});

export const Providers: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Theme>
        <CanvasElementProvider>
          <Provider store={store}>{children}</Provider>
        </CanvasElementProvider>
      </Theme>
    </ThemeProvider>
  );
};
