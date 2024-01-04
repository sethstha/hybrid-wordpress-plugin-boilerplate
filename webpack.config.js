const path = require('path');
const DependencyExtractionPlugin = require('@wordpress/dependency-extraction-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const DotEnv = require('dotenv').config();
const WebPackDotEnv = require('dotenv-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const Eslint = require('eslint-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    app: path.resolve(process.cwd(), 'assets/js', 'index.tsx'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(process.cwd(), 'assets/js/build'),
    publicPath: 'http://localhost:3000/dist',
  },
  mode: isDevelopment ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx|svg|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel'),
            ].filter(Boolean),
          },
        },
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 150000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },

      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    isDevelopment &&
      new ReactRefreshWebpackPlugin({
        overlay: false,
      }),
    new WebPackDotEnv(),
    new Eslint(),
    new ForkTsCheckerWebpackPlugin(),
    new DependencyExtractionPlugin(),
  ].filter(Boolean),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    allowedHosts: [DotEnv.parsed.WORDPRESS_URL.replace('http://', '')],
    host: 'localhost',
    port: 3000,
  },
  devtool: 'cheap-module-source-map',
};
