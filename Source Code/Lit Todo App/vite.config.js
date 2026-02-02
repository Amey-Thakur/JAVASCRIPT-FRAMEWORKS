import { defineConfig } from 'vite';

export default defineConfig({
    base: './',
    server: {
        port: 3003,
        strictPort: true,
    },
    build: {
        outDir: 'dist',
    }
});
