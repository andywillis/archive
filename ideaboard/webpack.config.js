const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => ({
  entry: [
    '@babel/polyfill',
    './src/client/index.js',
  ],
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: argv.mode === 'development' ? '[name].bundle.js' : '[name].bundle.[chunkhash].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      // maxInitialRequests: Infinity,
      // minSize: 0,
      // cacheGroups: {
      //   vendor: {
      //     test: /[\\/]node_modules[\\/]/,
      //     name(module) {
      //       const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
      //       return `npm.${packageName.replace('@', '')}`;
      //     }
      //   }
      // }
    },
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
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  devServer: {
    historyApiFallback: true
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
    })
  ]

});
