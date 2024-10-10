import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Externalize ethers.js to avoid bundling it into the final build
      external: ['ethers'], // This ensures ethers is treated as an external dependency
      output: {
        globals: {
          ethers: 'ethers', // Makes ethers available globally when externalized
        }
      }
    }
  }
});
