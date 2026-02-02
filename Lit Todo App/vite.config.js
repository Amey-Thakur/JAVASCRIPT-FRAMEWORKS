import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 3003,
        strictPort: true,
    },
    build: {
        lib: {
            entry: 'src/main.ts',
            formats: ['es']
        }
    }
});
