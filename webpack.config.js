const Dotenv = require('dotenv-webpack');

const config = {
  entry: './src/main.jsx',
  output: {
    filename: 'index.js',
  },
  devServer: {
    contentBase: './public',
    inline: true,
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:9090',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    new Dotenv({
      path: './.env',
      safe: true,
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
};

module.exports = config;
