import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx'],  // Entry point aplikasi
            refresh: true,
            plugins: [react()],  // Tambahkan plugin React ke laravel-vite-plugin
        }),
    ],
    build: {
        outDir: 'public/build',  // Output ke dalam folder public/build
        emptyOutDir: true,  // Bersihkan folder output setiap kali build
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),  // Alias untuk path yang lebih mudah
        },
    },
});
