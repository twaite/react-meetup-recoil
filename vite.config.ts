import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@app": "/src",
      "@components": "/src/components",
      "@pages": "/src/pages",
    },
  },
  plugins: [react()],
});
