const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const port = process.env.PORT || 3000;

const RESOLVE = {
  extensions: ['.js', '.jsx'],
  alias: {
    '@': path.resolve(__dirname, 'src/'),
  },
};
const ENTRY = './index.js';

module.exports = {
  mode: 'development',
  // import 시 확장자가 없으면 js, jsx로 해석한다.
  entry: ENTRY,
  resolve: RESOLVE,
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '/build'),
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },

      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new CleanWebpackPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
  devServer: {
    port: port,
    hot: true,
    open: true,
    historyApiFallback: {
      disableDotRule: true,
    },
  },
};
