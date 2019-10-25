const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'js/index_bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.(woff|woff2|otf|eot|png|svg|jpg|gif|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[hash:8].[ext]',
            },
          },
        ]
      }
    ]
  },
  resolve: {
    alias: {
      Images: path.resolve(__dirname, 'src/assets/images/'),
      Utils: path.resolve(__dirname, 'src/util/'),
      FormFields: path.resolve(__dirname, 'src/components/common/FormFields/'),
      Common: path.resolve(__dirname, 'src/components/common/'),
      Actions: path.resolve(__dirname, 'src/actions/'),
      Messages: path.resolve(__dirname, 'src/components/common/Messages/'),
      Components: path.resolve(__dirname, 'src/components/'),
      Pages: path.resolve(__dirname, 'src/pages/'),
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css",
      chunkFilename: "[name].css"
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new Dotenv({
      path: './.env',
      safe: true,
      systemvars: true,
      silent: true,
      defaults: false
    })
  ]
}
