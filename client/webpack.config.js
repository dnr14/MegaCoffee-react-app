const path = require('path');
const webpack = require('webpack');
const Bp = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { styles } = require('@ckeditor/ckeditor5-dev-utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const port = process.env.port || 3000;

const PRODUCTION = 'production';
const DEVELOPMENT = 'development';
const PRODUCT_PUBLIC_PATH = '/build/';
const DEV_PUBLIC_PATH = '/';

module.exports = (_, argv) => {
  const mode = argv.mode === PRODUCTION ? PRODUCTION : DEVELOPMENT;
  const nodeEnv = argv.mode === PRODUCTION ? PRODUCTION : DEVELOPMENT;
  const publicPath =
    argv.mode === PRODUCTION ? PRODUCT_PUBLIC_PATH : DEV_PUBLIC_PATH;
  const plugins =
    argv.mode === PRODUCTION
      ? ['@babel/plugin-transform-runtime']
      : ['@babel/plugin-transform-runtime', 'react-refresh/babel'];

  const htmlWebpackPluginConfig = {
    template: './public/index.ejs',
    favicon: './public/favicon.png',
    templateParameters: {
      title: mode === 'development' ? '(개발용)' : 'megacoffeClone',
    },
  };

  const CONFIG = {
    mode,
    entry: './index.js',
    output: {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js',
      clean: true,
      path: path.join(__dirname, '/dist/build'),
      publicPath,
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              ['@babel/preset-env', { modules: false }],
            ],
            plugins,
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
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          exclude: [
            /\.(js|jsx|mjs)$/,
            /\.html$/,
            /\.json$/,
            /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
            /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/,
          ],
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[hash].[ext]',
                publicPath: `${publicPath}images`,
                outputPath: '/images',
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          exclude: [/ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/],
          use: ['css-loader'],
        },
        {
          test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
          use: [
            {
              loader: 'style-loader',
              options: {
                injectType: 'singletonStyleTag',
                attributes: {
                  'data-cke': true,
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: styles.getPostCssConfig({
                themeImporter: {
                  themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
                },
                minify: true,
              }),
            },
          ],
        },
        {
          test: [/ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/],
          use: ['raw-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin(htmlWebpackPluginConfig),
      new CleanWebpackPlugin(),
      new ReactRefreshWebpackPlugin(),
      new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(nodeEnv),
      }),
      new MomentLocalesPlugin({
        localesToKeep: ['ko'],
      }),
    ],
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      },
    },

    devServer: {
      port,
      hot: true,
      open: true,
      historyApiFallback: true,
      devMiddleware: {
        publicPath,
      },
      proxy: {
        '/api': 'http://localhost:5000',
      },
    },
  };

  if (argv.mode === PRODUCTION) {
    htmlWebpackPluginConfig.filename = '../index.html';
    CONFIG.plugins.push(new Bp());
  }

  if (argv.mode === DEVELOPMENT) {
    CONFIG.devtool = 'eval-cheap-module-source-map';
  }

  return CONFIG;
};
