const path = require("path");

const styleLoaders = require("./utils/styles");
const scriptLoaders = require("./utils/scripts");
const vueLoaders = require("./utils/vue");
const fileLoaders = require("./utils/files");
const fontsLoaders = require("./utils/fonts");
const plugins = require("./utils/plugins");

module.exports = {
  context: path.resolve(__dirname, ".."),
  entry: "./src/app.ts",
  output: {
    path: path.resolve(__dirname, "../dist/"),
    filename: "bundle.min.js"
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      ...vueLoaders(),
      ...scriptLoaders(),
      ...styleLoaders(),
      ...fileLoaders(),
      ...fontsLoaders()
    ]
  },
  plugins: plugins()
};
