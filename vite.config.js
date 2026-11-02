import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ isPreview }) => ({
  appType: isPreview ? "mpa" : "spa",
  plugins: [react()],
  server: { port: 5173 },
  build: { target: "es2020", cssMinify: true },
  test: { include: ["tests/**/*.test.js"] },
}));
