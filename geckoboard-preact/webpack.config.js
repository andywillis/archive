const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => ({
  entry: [
    '@babel/polyfill',
    './src/index.js',
  ],
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: argv.mode === 'development' ? '[name].bundle.js' : '[name].bundle.[hash].js',
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        cache: false
      })
    ]
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
          {
            loader: argv.mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[local]___[hash:base64:5]'
            }
          }
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      open: true,
      '/currencySymbols': 'http://localhost:3000'
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist/*.*']),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    }),
    new MiniCssExtractPlugin({
      filename: argv.mode === 'development' ? '[name].css' : '[name].[hash].css',
      chunkFilename: argv.mode === 'development' ? '[id].css' : '[id].[hash].css',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
      statsOptions: { source: false }
    })
  ]

});
