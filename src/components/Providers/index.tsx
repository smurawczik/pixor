import { createTheme, ThemeProvider } from "@mui/material";
import { indigo, purple } from "@mui/material/colors";
import React, { FC } from "react";
import { Provider } from "react-redux";
import { CanvasElementProvider } from "../../context/canvas";
import { store } from "../../redux/store";
import { Theme } from "../UI/Theme";

export const Providers: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          primary: { main: indigo["500"] },
          secondary: { main: purple["400"] },
        },
      })}
    >
      <Theme>
        <CanvasElementProvider>
          <Provider store={store}>{children}</Provider>
        </CanvasElementProvider>
      </Theme>
    </ThemeProvider>
  );
};
