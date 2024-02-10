/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import Vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  plugins: [
    Vue(),
    AutoImport({
      imports: ['vitest'],
      dts: true,
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    server: {
      deps: {
        inline: ["element-plus"],
      },
    },
  },
  root: ".",
});
