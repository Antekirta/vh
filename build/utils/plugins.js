const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const { isProduction } = require("./helpers");

module.exports = () => [
  new VueLoaderPlugin(),
  new VuetifyLoaderPlugin(),
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: "public/index.html",
    minify: isProduction() ? minifyOptions() : false,
    hash: isProduction(),
    cache: isProduction()
  })
];

function minifyOptions() {
  return {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true
  };
}
