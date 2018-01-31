const config = {
  entry: './src/main.jsx',
  output: {
    filename: 'index.js',
  },
  devServer: {
    contentBase: './public',
    inline: true,
    port: 8080,
  },
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
