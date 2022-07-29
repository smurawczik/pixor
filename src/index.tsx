import { createTheme, ThemeProvider } from "@mui/material";
import { indigo, purple } from "@mui/material/colors";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import { Theme } from "./components/UI/Theme";
import { store } from "./redux/store";
import { GlobalStyle } from "./styles/GlobalStyle";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider
      theme={createTheme({
        palette: {
          primary: { main: indigo["500"] },
          secondary: { main: purple["400"] },
        },
      })}
    >
      <Theme>
        <Provider store={store}>
          <GlobalStyle />
          <App />
        </Provider>
      </Theme>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
