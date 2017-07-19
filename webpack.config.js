var path = require('path');
var buildPath = path.resolve(__dirname, 'dist');
var srcPath = path.resolve(__dirname, 'src');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var IS_PRODUCTION = process.env.NODE_ENV === 'production';
var webpack = require('webpack');

var webpackConfig = {
  entry: {
    index: path.join(srcPath, 'index.js'),
  },
  output: {
    path: buildPath,
    filename: '[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: "pre",
        loader: "eslint-loader",
        include: srcPath,
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'es2016', 'react'],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              module: true,
              camelCase: true,
              localIdentName: '[local]-[hash:5]',
            }
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024*15,
            },
          },
        ],
      },
      {
        test: /\.(woff|svg|eot|ttf|woff2)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'src/index.html',
      filename: 'index.html',
      chunks: ['index'],
    }),
  ],
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
  },
  resolve: {
    modules: [
      'node_modules',
      srcPath,
    ],
  },
  devtool: 'eval',
};

if (IS_PRODUCTION) {
  webpackConfig.devtool = 'source-map';
  webpackConfig.plugins = webpackConfig.plugins.concat([
    // define variable available in code
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
  ]);
}

module.exports = webpackConfig;
