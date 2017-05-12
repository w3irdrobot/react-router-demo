const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { NODE_ENV } = process.env;
const ROOT = resolve(__dirname);
const SRC = resolve(ROOT, 'src');

const onlyInDev = plugin =>
  NODE_ENV === 'development' ? plugin : null;

module.exports = {
  entry: [
    onlyInDev('react-hot-loader/patch'),
    onlyInDev('webpack-hot-middleware/client'),
    resolve(SRC, 'app.js')
  ].filter(Boolean),
  output: {
    filename: 'app.[hash].js',
    path: resolve(ROOT, 'dist', 'client')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            'presets': [
              'react'
            ],
            'plugins': [
              'transform-object-rest-spread',
              onlyInDev('react-hot-loader/babel')
            ].filter(Boolean)
          }
        }],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(SRC, 'index.html')
    }),
    onlyInDev(new webpack.HotModuleReplacementPlugin()),
    onlyInDev(new webpack.NamedModulesPlugin())
  ].filter(Boolean)
}
