import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    federation({
      name: 'core',
      remotes: {
        dodamOne: {
          type: 'module',
          name: 'dodamOne',
          entry: 'http://localhost:3000/remoteEntry.js',
        },
        nightstudy: {
          name: 'nightstudy',
          entry: 'http://localhost:3002/remoteEntry.js',
        },
        wakeupsong: {
          name: 'wakeupsong',
          entry: 'http://localhost:3003/remoteEntry.js',
        },
      },
      shared: {
        react: { singleton: true, requiredVersion: false, eager: false },
        'react-dom': { singleton: true, requiredVersion: false, eager: false },
        'react-router-dom': { singleton: true, requiredVersion: false, eager: false },
        'styled-components': { singleton: true, requiredVersion: false, eager: false },
      },
    }),
  ],
  server: { port: 3001 },
  resolve: { dedupe: ['react', 'react-dom'] },
  build: { target: 'esnext', outDir: 'dist' },
});
