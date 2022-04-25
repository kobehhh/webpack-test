const { resolve } = require("path");

let HtmlWebpackPlugin = require("html-webpack-plugin");

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
  plugins: [
    new HtmlWebpackPlugin({
      // 复制./src/index.html的文件，引入打包输出的所有资源
      template: "./src/index.html",
      // 移除空格
      collapseWhitespace: true,
      // 移除注释
      removeComments: true,
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
};
