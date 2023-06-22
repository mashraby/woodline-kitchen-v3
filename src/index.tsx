import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import GlobalStyle from "./globals/GlobalStyle";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReloadProvider } from "./context/reload.context";
import { Provider as TokenProvider } from "./context/token.context";
import { Provider as SearchProvider } from "./context/search.context";
import { CssBaseline, StyledEngineProvider, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const lightColors = {
  primary: "#425DCC",
  secondary: "#461a7f",
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: lightColors.primary,
    },
    secondary: {
      main: lightColors.secondary,
    },
    background: {
      default: "#EDF2F7",
    },
  },
  typography: {
    fontFamily: "Arial",
  },
});

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <TokenProvider>
      <ReloadProvider>
        <SearchProvider>
          <BrowserRouter>
            <StyledEngineProvider injectFirst>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
              </ThemeProvider>
            </StyledEngineProvider>
          </BrowserRouter>
        </SearchProvider>
      </ReloadProvider>
    </TokenProvider>
  </React.StrictMode>
);
