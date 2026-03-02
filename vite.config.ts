import { defineConfig } from "vite";

export default defineConfig({
  base: "/async-race/",
  server: {
    port: 8080,
    open: true,
  },
});
