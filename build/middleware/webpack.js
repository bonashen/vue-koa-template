const convert = require('koa-convert')
const compose = require('koa-compose')
const unless = require('koa-unless')
const webpack = require('webpack')
const webpackDevMiddleware = require('koa-webpack-dev-middleware')
const webpackHotMiddleware = require('koa-webpack-hot-middleware')
const webpackDevConfig = require('../webpack.dev.conf')

// const log = require('debug')('app:webpack-middleware:log')

const compiler = webpack(webpackDevConfig)

let middleware = compose([
  convert(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    },
    quiet: true
  })),
  convert(webpackHotMiddleware(compiler))
])

middleware.unless = unless

module.exports = middleware.unless({
  path: [
    /^(\/api\/v\d).*$/
  ]
})
