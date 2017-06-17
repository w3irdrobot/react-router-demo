const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { NODE_ENV = 'development' } = process.env;
const ROOT = resolve(__dirname);
const SRC = resolve(ROOT, 'src');
const VENDORS = [
  'react',
  'react-dom',
  'axios',
  'lodash.times',
  'semantic-ui-react',
];
const HASH_TYPE = NODE_ENV === 'production' ? 'chunkhash' : 'hash';

const onlyIn = env => plugin =>
  NODE_ENV === env ? plugin : null;
const onlyInDev = onlyIn('development');
const onlyInProd = onlyIn('production');

module.exports = {
  devtool: NODE_ENV !== 'production' ? 'cheap-module-eval-source-map' : false,
  entry: {
    app: [
      onlyInDev('react-hot-loader/patch'),
      onlyInDev('webpack-hot-middleware/client'),
      resolve(SRC, 'fe', 'app.js'),
    ].filter(Boolean),
    vendors: VENDORS,
  },
  output: {
    filename: `[name].[${HASH_TYPE}].js`,
    path: resolve(ROOT, 'dist', 'client'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                camelCase: true,
                sourceMap: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          ],
        }),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        }),
        include: /node_modules/,
      },
      {
        test: /\.(png|eot|woff2?|ttf|svg)$/,
        use: ['url-loader?limit=10000'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(SRC, 'fe', 'index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
    new ExtractTextPlugin({
      filename: 'styles.[contenthash].css',
      allChunks: true,
      disable: NODE_ENV !== 'production',
    }),
    onlyInDev(new webpack.HotModuleReplacementPlugin()),
    onlyInDev(new webpack.NoEmitOnErrorsPlugin()),
    onlyInDev(new webpack.NamedModulesPlugin()),
    onlyInProd(new webpack.optimize.CommonsChunkPlugin({
      names: ['vendors', 'manifest'],
    })),
    onlyInProd(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    })),
  ].filter(Boolean),
};
