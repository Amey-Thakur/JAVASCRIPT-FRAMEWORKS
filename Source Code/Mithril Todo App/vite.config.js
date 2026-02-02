import { defineConfig } from 'vite';

export default defineConfig({
    base: './',
    server: {
        port: 3004,
        strictPort: true,
    },
    esbuild: {
        jsx: "transform",
        jsxFactory: "m",
        jsxFragment: "\"[\"",
    },
});
