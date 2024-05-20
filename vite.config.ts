import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
// import devtools from 'solid-devtools/vite';
import suidPlugin from "@suid/vite-plugin";
export default defineConfig({
  plugins: [suidPlugin(), solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
    outDir: "./docs",
  },
  base: "/luminostr/",
});
