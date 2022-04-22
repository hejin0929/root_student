import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8081/",
        // target: 'http://localhost:9200',
        changeOrigin: true,
        rewrite: (path: string) => {
          // console.log('http://ali.testops.top:9199' + path.replace(/^\/api/, ''));
          return path.replace(/^\/api/, "");
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@myPages": path.resolve(__dirname, "src/view"),
      "@store": path.resolve(__dirname, "src/store"),
      "@widgets": path.resolve(__dirname, "src/widgets"),
    },
  },
  css: {
    postcss: {
      plugins: [
        require("autoprefixer"),
        require("postcss-px-to-viewport")({
          unitToConvert: "px",
          viewportWidth: 375,
          unitPrecision: 3,
          propList: ["*"],
          viewportUnit: "vw",
          fontViewportUnit: "vw",
          selectorBlackList: ["ignore-"],
          minPixelValue: 1,
          mediaQuery: false,
          replace: true,
          exclude: [],
          landscape: true,
          landscapeUnit: "vw",
          landscapeWidth: 750,
        }),
      ],
    },
  },
});
