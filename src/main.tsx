import React from "react";
import ReactDOM from "react-dom/client";
import { MotionConfig } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import App from "@/App";
import { ThemeProvider } from "@/theme/ThemeProvider";
import "@/index.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Application root element was not found.");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
