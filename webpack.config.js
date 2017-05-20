const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { NODE_ENV = 'development' } = process.env;
const ROOT = resolve(__dirname);
const SRC = resolve(ROOT, 'src');

const onlyIn = env => plugin =>
  NODE_ENV === env ? plugin : null;
const onlyInDev = onlyIn('development');
const onlyInProd = onlyIn('production');

module.exports = {
  devtool: NODE_ENV !== 'production' ? 'cheap-module-eval-source-map' : false,
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
            babelrc: false,
            presets: [
              ["env", {
                "targets": {
                  "browsers": "last 2 versions"
                },
                "modules": false
              }],
              'react'
            ],
            plugins: [
              onlyInDev('react-hot-loader/babel')
            ].filter(Boolean)
          }
        }],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|eot|woff2?|ttf|svg)$/,
        use: ['url-loader?limit=10000']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(SRC, 'index.html')
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    onlyInDev(new webpack.HotModuleReplacementPlugin()),
    onlyInDev(new webpack.NoEmitOnErrorsPlugin()),
    onlyInDev(new webpack.NamedModulesPlugin())
  ].filter(Boolean)
}
