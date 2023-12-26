const path = require("path");
const DependencyExtractionPlugin = require("@wordpress/dependency-extraction-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  entry: {
    app: path.resolve(process.cwd(), "assets/js", "index.tsx"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(process.cwd(), "assets/js/build"),
    publicPath: "http://localhost:3000/dist",
  },
  mode: isDevelopment ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx|svg|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              isDevelopment && require.resolve("react-refresh/babel"),
            ].filter(Boolean),
          },
        },
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve("url-loader"),
        options: {
          limit: 150000,
          name: "static/media/[name].[hash:8].[ext]",
        },
      },

      {
        test: /\.css$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
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
    new DependencyExtractionPlugin(),
  ].filter(Boolean),
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" },
    allowedHosts: ["test.test"],
    host: "localhost",
    port: 3000,
  },
  devtool: "cheap-module-source-map",
};