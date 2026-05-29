import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.VITE_BASE || "/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: "index.html",
    },
    chunkSizeWarningLimit: 4000,
  },
  server: {
    port: 5173,
  },
});
