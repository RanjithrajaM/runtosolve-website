import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/runtosolve-website/",
  build: {
    // Safari 14 is the minimum because hero fallbacks use WebP.
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
    // Polling ensures HMR works reliably in sandboxed/virtualized filesystems
    // where native fs events (fsevents) may not fire on edits.
    watch: {
      usePolling: true,
      interval: 200,
    },
  },
});
