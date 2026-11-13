import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./fonts.css";
import "./index.css";
import "./site.css";
import App from "./App";

const root = document.getElementById("root");
const app = (
  <React.StrictMode>
    <App path={window.location.pathname} />
  </React.StrictMode>
);
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);

// Visitor counts, real-user speed and enquiry clicks (Vercel Web Analytics and
// Speed Insights). Off unless the build sets VITE_ANALYTICS=on, because both
// must first be enabled in the Vercel project.
if (import.meta.env.VITE_ANALYTICS === "on") import("./analytics.js");
