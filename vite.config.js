import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const PORT = env.VITE_DEV_PORT || 5173;
  const buildDir = env.VITE_BUILD_DIR || "dist"

  return {
    plugins: [react()],
    base: "./",
    build: {
      outDir: buildDir
    },
    server: {
      port: Number(PORT),
      strictPort: true
    }
  };
});