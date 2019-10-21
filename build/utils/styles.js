const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const cssHandlers = [
  process.env.NODE_ENV === "production"
    ? MiniCssExtractPlugin.loader
    : "vue-style-loader",
  "css-loader"
];

module.exports = () => [
  {
    test: /\.s(c|a)ss$/,
    use: [
      ...cssHandlers,
      {
        loader: "sass-loader",
        // Requires sass-loader@^7.0.0
        options: {
          implementation: require("sass"),
          fiber: require("fibers")
        }
      }
    ]
  },
  {
    test: /\.css/,
    use: cssHandlers
  }
];
