const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(baseConfig, {
  mode: "production",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.min.css"
    })
  ]
});
