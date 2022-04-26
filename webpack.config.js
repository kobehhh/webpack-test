const { resolve } = require("path");

let HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devServer: {
    port: 8000,
    contentBase: "./build", // 指向的目录
    open: true,
  },
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "build"),
  },
  // optimization: {
  //   minimizer: [
  //     new OptimizeCSSAssetsPlugin({}),
  //     new UglifyJsPlugin({
  //       cache: true,
  //       parallel: true,
  //       sourceMap: true,
  //       uglifyOptions: {
  //         warnings: false,
  //       },
  //     }),
  //   ],
  // },
  plugins: [
    new HtmlWebpackPlugin({
      // 复制./src/index.html的文件，引入打包输出的所有资源
      template: "./src/index.html",
      // 移除空格
      collapseWhitespace: true,
      // 移除注释
      removeComments: true,
    }),
    new OptimizeCSSAssetsPlugin({}),
    new MiniCssExtractPlugin({ filename: "index.css" }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                ["@babel/plugin-proposal-decorators", { legacy: true }, "@babel/plugin-transform-runtime"],
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          // "style-loader",
          "css-loader",
          // "postcss-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require("autoprefixer")({
                  overrideBrowserslist: ["last 5 version", ">1%", "ios 7"],
                }),
              ],
            },
          },
          "less-loader",
        ],
      },
    ],
  },
};
