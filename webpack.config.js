const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const libraryName = 'StockPhotoPicker';
const outputFile = libraryName + '.js';


module.exports = {
  entry: './src/index.js',
  output: {
    library: libraryName,
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: path.resolve(__dirname, 'dist'),
    filename: outputFile
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          'eslint-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', 
          'css-loader', 
          'postcss-loader', 
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
      new uglifyJsPlugin(), 
      new HTMLWebpackPlugin({
          template: path.resolve(__dirname, 'index.html')
      }),
      new webpack.HotModuleReplacementPlugin(),
  ]
};
