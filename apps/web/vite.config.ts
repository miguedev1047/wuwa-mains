import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { nitroV2Plugin } from "@tanstack/nitro-v2-vite-plugin";

export default defineConfig({
  plugins: [
    nitroV2Plugin(),
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart(),
    viteReact({ babel: { plugins: [["babel-plugin-react-compiler"]] } }),
  ],
});
