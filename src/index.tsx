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

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <TokenProvider>
      <ReloadProvider>
        <SearchProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SearchProvider>
      </ReloadProvider>
    </TokenProvider>
  </React.StrictMode>
);
