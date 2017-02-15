var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port

var uri = 'http://localhost:' + port + baseWebpackConfig.output.publicPath

// add hot-reload related code to entry chunks
let polyfill = 'eventsource-polyfill'
let hotClient = 'webpack-hot-middleware/client?reload=true&path=' + uri + '__webpack_hmr'
Object.keys(baseWebpackConfig.entry).forEach((name, i) => {
    let extras = i === 0 ? [polyfill, hotClient] : [hotClient]
    baseWebpackConfig.entry[name] = extras.concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  // devtool: '#cheap-module-eval-source-map',
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
