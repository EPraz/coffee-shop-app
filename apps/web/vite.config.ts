import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  optimizeDeps: { include: ["@bruma/contracts/catalog", "@bruma/contracts/orders"] },
  build: { commonjsOptions: { include: [/node_modules/, /packages[\\/]contracts[\\/]dist/] } },
  server: {
    proxy: {
      "/api": {
        target: process.env.BRUMA_API_URL ?? "http://127.0.0.1:43175",
        changeOrigin: true,
      },
    },
  },
});
