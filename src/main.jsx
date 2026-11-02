import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./fonts.css";
import "./index.css";
import App from "./App";

const root = document.getElementById("root");
const app = (
  <React.StrictMode>
    <App path={window.location.pathname} />
  </React.StrictMode>
);
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
