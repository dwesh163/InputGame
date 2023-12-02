import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: '/InputGameReact/', // see https://vitejs.dev/guide/static-deploy#github-pages
  plugins: [react()],
  server: {
    host: true,
    port: 5174,
    watch: {
      usePolling: true,
    },
  },
});
