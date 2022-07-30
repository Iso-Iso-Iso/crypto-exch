import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    optimizeDeps: {
        // exclude: ["swiper/vue", "swiper/types"],
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@assets": path.resolve(__dirname, "src", "assets"),
            "@components": path.resolve(__dirname, "src", "components"),
            "@composables": path.resolve(__dirname, "src", "composables"),
            "@layouts": path.resolve(__dirname, "src", "layouts"),
            "@router": path.resolve(__dirname, "src", "router"),
            "@scss": path.resolve(__dirname, "src", "scss"),
            "@store": path.resolve(__dirname, "src", "store"),
            "@views": path.resolve(__dirname, "src", "views"),
            "@interfaces": path.resolve(__dirname, "src", "interfaces"),
            "@services": path.resolve(__dirname, "src", "services"),
            "@utils": path.resolve(__dirname, "src", "utils"),
            "@features": path.resolve(__dirname, "src", "features"),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import '@scss/global.scss';`,
            },
        },
    },
    server: {
        proxy: {
            "/api": "http://excapi.7o7.co",
        },
    },
    // base: "./",
});
