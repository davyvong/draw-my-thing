const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = require('./webpack.base.babel')({
  mode: 'development',

  entry: ['webpack-hot-middleware/client?reload=true', path.join(process.cwd(), 'app/app.js')],

  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'app/index.html',
    }),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      failOnError: false,
    }),
    new webpack.EnvironmentPlugin({
      GRAPHQL_HTTP_URL: 'http://localhost:5000/graphql',
      GRAPHQL_WS_URL: 'ws://localhost:5000/graphql',
      NODE_ENV: 'development',
    }),
  ],

  devtool: 'eval-source-map',

  performance: {
    hints: false,
  },
});
