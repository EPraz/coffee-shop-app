import React from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/cormorant-garamond/latin-500-italic.css";
import "./i18n/i18n";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/catalog.css";
import "./styles/home.css";
import "./features/admin/admin.css";
import { App } from "./app/App";
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

import "./styles/product.css";

import "./styles/filters.css";

import "./styles/cart.css";

import "./styles/coupon.css";

import "./styles/checkout.css";

import "./styles/payment.css";
