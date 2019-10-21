module.exports = () => [
  {
    test: /\.(eot|svg|ttf|woff|woff2)$/,
    use: [
      {
        loader: "file-loader?name=./dist/fonts/webfonts/[name].[ext]"
      }
    ]
  }
];
