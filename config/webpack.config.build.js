const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const cssFilename = "[name].[contenthash:8].css";

module.exports = {
  devtool: "source-map",
  mode: "production",
  entry: [path.join(__dirname, "../app/script.js")],
  output: {
    path: path.join(process.cwd(), "build"),
    filename: "[name].[chunkhash].js"
  },
  plugins: [
    new CleanWebpackPlugin(["build"]),
    new webpack.DefinePlugin({
      production: true
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../templates/html/index.build.html")
    })
  ],
  module: {
    strictExportPresence: true,
    rules: [
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
            options: {
              limit: 10000,
              name: "static/media/[name].[hash:8].[ext]"
            }
          },
          {
            test: /\.(js|jsx|mjs)$/,
            exclude: /(node_modules)/,
            loader: require.resolve("babel-loader"),
            options: {
              compact: true
            }
          },
          {
            test: /\.css$/,
            use: [
              require.resolve("style-loader"),
              {
                loader: require.resolve("css-loader"),
                options: {
                  importLoaders: 1,
                  minimize: true,
                  sourceMap: true
                }
              }
            ]
          },
          {
            loader: require.resolve("file-loader"),
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            options: {
              name: "static/media/[name].[hash:8].[ext]"
            }
          }
        ]
      }
    ]
  }
};
