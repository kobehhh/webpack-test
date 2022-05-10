const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");

module.exports = merge(baseConfig, {
  mode: "development",
  devServer: {
    port: 8000,
    contentBase: "./dist", // 指向的目录
    open: true,
    hot: true,
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
});
