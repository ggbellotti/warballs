const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/ts/index.ts", // aqui é onde o seu arquivo principal reside
  output: {
    filename: "bundle.[contenthash].js", // o nome do arquivo JS minificado
    path: path.resolve(__dirname, "dist"), // o diretório de saída
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".js"], // extensões a serem resolvidas pelo webpack
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // aqui é onde seu arquivo HTML reside
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css", // o nome do arquivo CSS minificado
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // plugin para minimizar CSS
      new TerserPlugin(), // plugin para minimizar JS
    ],
  },
};
