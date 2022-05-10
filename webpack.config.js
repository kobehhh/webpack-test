const path = require("path");

let HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const rootDir = process.cwd();

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devServer: {
    port: 8000,
    contentBase: "./dist", // 指向的目录
    open: true,
  },
  output: {
    filename: "bundle.[contenthash:8].js",
    path: path.resolve(__dirname, "dist"),
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
  devtool: "eval-cheap-module-source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // 复制./src/index.html的文件，引入打包输出的所有资源
      template: "./public/index.html",
      // 移除空格
      collapseWhitespace: true,
      // 移除注释
      removeComments: true,
    }),
    new OptimizeCSSAssetsPlugin({}),
    new MiniCssExtractPlugin({ filename: "index.css" }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "*.js",
          context: path.resolve(rootDir, "public/js"),
          to: path.resolve(rootDir, "dist/js"),
        },
      ],
    }),
    // new BundleAnalyzerPlugin(),
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
                [
                  "@babel/plugin-proposal-decorators",
                  { legacy: true },
                  "@babel/plugin-transform-runtime",
                ],
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
      {
        test: /\.(png|jpg?g|gif)$/i,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
          name: "[name]_[hash:8].[ext]",
        },
      },
    ],
  },
};
