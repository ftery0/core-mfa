const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  eslint: {
    enable: false,
  },
  devServer: {
    port: 3003,
  },
  webpack: {
    configure: (config) => {
      config.output.publicPath = 'auto';
      return config;
    },
    plugins: {
      add: [
        new ModuleFederationPlugin({
          name: 'wakeupsong',
          filename: 'remoteEntry.js',
          exposes: { './App': './src/Root' },
          shared: {
            react: { singleton: true, requiredVersion: false, eager: false },
            'react-dom': { singleton: true, requiredVersion: false, eager: false },
            'react-router-dom': { singleton: true, requiredVersion: false, eager: false },
            'styled-components': { singleton: true, requiredVersion: false, eager: false },
          },
        }),
      ],
    },
  },
};
