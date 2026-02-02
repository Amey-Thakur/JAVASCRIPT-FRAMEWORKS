import { defineConfig } from 'vite';

export default defineConfig({
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
