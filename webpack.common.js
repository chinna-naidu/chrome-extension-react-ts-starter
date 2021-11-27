const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    popup: path.join(__dirname, "src", "popup", "popup.tsx"),
    options: path.join(__dirname, "src", "options", "options.tsx"),
    background: path.join(__dirname, "src", "background", "background.ts"),
    contentScript: path.join(
      __dirname,
      "src",
      "content-scripts",
      "contentScript.ts"
    ),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },

  module: {
    rules: [
      {
        test: /\.tsx?/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /.css/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
        },
      ],
    }),
    // for popup
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "popup", "popup.html"),
      chunks: ["popup"],
      filename: "popup.html",
    }),
    // for options
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "options", "options.html"),
      chunks: ["options"],
      filename: "options.html",
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
