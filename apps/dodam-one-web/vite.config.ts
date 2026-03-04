import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    federation({
      name: 'dodamOne',
      filename: 'remoteEntry.js',
      exposes: { './App': './src/App.tsx' },
      shared: {
        react: { singleton: true, requiredVersion: false, eager: false },
        'react-dom': { singleton: true, requiredVersion: false, eager: false },
        'react-router-dom': { singleton: true, requiredVersion: false, eager: false },
        'styled-components': { singleton: true, requiredVersion: false, eager: false },
      },
    }),
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "build",
    target: 'esnext',
  },
  resolve: {
    dedupe: ["react", "react-dom"],
  },
});
