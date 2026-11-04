import React from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/cormorant-garamond/latin-500-italic.css";
import "./i18n/i18n";
import "./styles/tokens.css";
import "./styles/base.css";
import { App } from "./app/App";
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
