const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({ template: './public/index.html' });
const path = require('path');
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/app.ts',
  output: {
    filename: './public/js/bundle.js'
  },
  //  Controls how Webpack looks up for modules on the project.
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [HTMLWebpackPluginConfig,
    new webpack.WatchIgnorePlugin([
      path.join(__dirname, "node_modules")
    ]),
    new CopyWebpackPlugin([
      { from: './public/assets', to: 'assets' }
    ])
  ],
  devServer: {
    contentBase: path.join(__dirname, '/'),
    compress: true,
    port: 9000,
    overlay: true,
    open: true
  }
};