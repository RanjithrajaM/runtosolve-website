import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";


export default defineConfig({
  plugins: [react()],
  base: "/runtosolve-website/",
  build: {
    target: ["es2018", "safari14"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    open: false,
    watch: {
      usePolling: true,
      interval: 200,
    },
  },
});
