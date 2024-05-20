import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
// import devtools from 'solid-devtools/vite';
import suidPlugin from "@suid/vite-plugin";
export default defineConfig(({ command }) => {
  const isBuild = command === "build";

  return {
    plugins: [suidPlugin(), solidPlugin()],
    server: {
      port: 3000,
    },
    build: {
      target: "esnext",
      outDir: "./docs",
    },
    base: isBuild ? "/luminostr/" : "/",
  };
});
