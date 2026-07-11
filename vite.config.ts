import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
