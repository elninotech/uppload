/// <reference types="vitest" />
/// <reference types="vite/client" />
/// <reference types="vitest/config" />

import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const setupFile = fileURLToPath(new URL("./vitest.setup.ts", import.meta.url));
const focusTrapMock = resolve(
  fileURLToPath(new URL("./", import.meta.url)),
  "packages/uppload/tests/__mocks__/focus-trap.ts"
);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "focus-trap": focusTrapMock,
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [setupFile],
  },
});
