const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (_env, argv) => {
  const isProd = argv.mode === 'production';
  const isDev = !isProd;

  const fileName = (ext) =>
    isProd ? `[name].[contenthash].bundle.${ext}` : `[name].${ext}`;

  const plugins = () => {
    const base = [
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src', 'favicon.ico'),
            to: path.resolve(__dirname, 'dist'),
          },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: fileName('css'),
      }),
      new CleanWebpackPlugin(),
    ];

    if (isDev) {
      base.push(new ESLintPlugin());
    }

    return base;
  };

  return {
    context: path.resolve(__dirname, 'src'),
    entry: {
      main: ['@babel/polyfill', './index.js'],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: fileName('js'),
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@core': path.resolve(__dirname, 'src', 'core'),
      },
    },
    target: 'web',
    devServer: {
      // contentBase: path.join(__dirname, 'dist'),
      // compress: true,
      port: 3000,
      open: true,
      hot: true,
      // watchContentBase: true,
    },
    plugins: plugins(),
    devtool: isDev ? 'source-map' : false,
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};

// npm install webpack webpack-cli --save-dev
// npm install --save-dev html-webpack-plugin
// npm install copy-webpack-plugin --save-dev
// npm install sass-loader sass --save-dev
// npm install --save-dev mini-css-extract-plugin
// npm install --save-dev css-loader
// npm install --save-dev babel-loader @babel/core
// npm install @babel/preset-env --save-dev
// npm install --save @babel/polyfill
// npm install --save-dev clean-webpack-plugin
// npm install webpack-dev-server --save-dev
// npm install eslint-webpack-plugin eslint --save-dev
// npm install @babel/eslint-parser --save-dev
// npm install --save-dev eslint-config-google
// npm install --save-dev @babel/plugin-proposal-class-properties
