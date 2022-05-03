const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPugPlugin = require("html-webpack-pug-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = "development";
if (process.env.NODE_ENV === "production") {
  mode = "production";
}

console.log(mode + " mode");

module.exports = {
  mode,

  devtool: "source-map",
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },

  entry: {
    scripts: path.resolve(__dirname, "src/main.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    assetModuleFilename: "assets/[hash][ext][query]",
    clean: true,
  },

  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    compress: true,
    hot: true,
    port: 9000,
  },

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: "pug-loader",
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          mode === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env", {}]],
              },
            },
          },
          "sass-loader",
        ],
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },

      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "output.html",
      template: "src/template.pug",
      inject: "body",
      minify: false,
    }),
    new HtmlWebpackPugPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
};
