import path from "path";
import {defineConfig} from "vite";

module.exports = defineConfig({
    base: "./",
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: 'Uppload',
            formats: ['es', 'cjs', 'umd', 'iife'],
            fileName: 'uppload',
        },
        rollupOptions: {
            external: ["focus-trap", "mitt", "cropperjs"],
            output: {
                globals: {
                    "focus-trap": "createFocusTrap",
                    mitt: "mitt",
                    cropperjs: "Cropper",
                },
            },
        },
    },
});
