import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    proxy: {
      "/api": {
        target: "https://blb-app-rzsrl.ondigitalocean.app",
        changeOrigin: true,
      },
    },
  },
});

