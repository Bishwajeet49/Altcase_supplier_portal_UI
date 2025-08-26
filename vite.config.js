import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    
    react({
    babel: {
      plugins: [
        // other Babel plugins
        [
          "@locator/babel-jsx/dist",
          {
            env: "development",
          },
        ],
      ],
    },
  }),

  
],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'build',
    sourcemap: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}); 