const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(baseConfig, {
  mode: "production",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.min.css"
    }),
    new CopyPlugin([
      { from: 'public/favicons', to: 'dist/favicons' }
    ])
  ]
});
