import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@myPages": path.resolve(__dirname, "src/view"),
      "@store": path.resolve(__dirname, "src/store"),
      "@widgets": path.resolve(__dirname, "src/widgets")
    },
  }
});
