// import dotenv from "dotenv";
// dotenv.config();
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

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <ReloadProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReloadProvider>
  </React.StrictMode>
);
