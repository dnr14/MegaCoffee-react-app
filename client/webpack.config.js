const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const PORT = 3000;
const PRODUCTION = 'production';
const PRODUCT_PUBLIC_PATH = '/build/';
const DEV_PUBLIC_PATH = '/';

module.exports = (_, { mode }) => {
  const publicPath = mode === PRODUCTION ? PRODUCT_PUBLIC_PATH : DEV_PUBLIC_PATH;

  const config = {
    name: 'mega',
    mode,
    entry: './index.js',
    devtool: mode === PRODUCTION ? 'source-map' : 'eval-source-map',
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, 'src/'),
        '@api': path.resolve(__dirname, 'src/api'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@containers': path.resolve(__dirname, 'src/containers'),
        '@hoc': path.resolve(__dirname, 'src/hoc'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@modules': path.resolve(__dirname, 'src/modules'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              ['@babel/preset-react', { runtime: 'automatic' }],
              ['@babel/preset-env', { modules: false }],
            ],
            plugins:
              mode === PRODUCTION
                ? ['@babel/plugin-transform-runtime']
                : ['@babel/plugin-transform-runtime', 'react-refresh/babel'],
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
      new CleanWebpackPlugin(),
      new MomentLocalesPlugin({ localesToKeep: ['ko'] }),
      new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(mode),
        PATH: JSON.stringify(mode === 'production' ? 'http://15.165.133.236:9500' : 'http://localhost:5000'),
      }),
    ],

    output: {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js',
      clean: true,
      path: path.join(__dirname, '/dist/build'),
      publicPath,
    },

    devServer: {
      port: PORT,
      // open: true,
      //hmr 있으니 안해도된다고 경고뜬다 해결
      hot: true,
      historyApiFallback: true,
      devMiddleware: {
        publicPath,
      },
      proxy: {
        '/api': 'http://localhost:5000',
      },
    },
  };

  const htmlWebpackPluginConfig = {
    template: './public/index.ejs',
    favicon: './public/favicon.png',
    templateParameters: {
      title: mode === PRODUCTION ? 'megacoffeClone' : '(개발용)',
    },
  };

  // 프로덕트
  if (mode === PRODUCTION && config.plugins) {
    htmlWebpackPluginConfig.filename = '../index.html';
    config.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
    // config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }));
    config.plugins.push(new HtmlWebpackPlugin(htmlWebpackPluginConfig));
  }
  if (mode !== PRODUCTION && config.plugins) {
    // webpack v4 이상 부턴 hmr이 기본으로 들어가있다.
    // config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new ReactRefreshWebpackPlugin());
    // config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'server', openAnalyzer: false }));
    config.plugins.push(new HtmlWebpackPlugin(htmlWebpackPluginConfig));
  }

  return config;
};
