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
  entry: "./src/index.js",
  output: {
    filename: "bundle.[hash:8].js",
    path: path.resolve(rootDir, "dist"),
  },
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
    new MiniCssExtractPlugin({ filename: "css/index.css" }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "*.js",
          context: path.resolve(rootDir, "public/js"),
          to: path.resolve(rootDir, "dist/js"),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|tsx?)$/,
        exclude: /node_modules/,
        use: "babel-loader",
        // use: [
        //   {
        //     loader: "babel-loader",
        //     options: {
        //       presets: [["@babel/preset-env", { useBuiltIns: 'usage', corejs: 3}], "@babel/preset-typescript"],
        //       plugins: [
        //         [
        //           "@babel/plugin-proposal-decorators",
        //           { legacy: true },
        //           "@babel/plugin-transform-runtime",
        //         ],
        //       ],
        //     },
        //   },
        // ],
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
          outputPath: 'img/',
        },
      },
      // {
      //   test: /\.ts?$/,
      //   loader: ['babel-loader', 'ts-loader'],
      //   exclude: /node_modules/
      // }
    ],
  },
};
