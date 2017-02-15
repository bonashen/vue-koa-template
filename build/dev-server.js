require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var Koa = require('koa')
var compose = require('koa-compose')
var convert = require('koa-convert')
const logger = require('koa-logger')
const cors = require('kcors')

var webpackConfig = require('./webpack.dev.conf')

var webpackMiddleware = require('./middleware/webpack')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable


var serviceApp = require('../src/server/app')
const app = new Koa()

app.use(logger())
app.use(cors()) // support CORS

// webpack middleware
app.use(webpackMiddleware)

// handle fallback for HTML5 history API
app.use(require('koa-connect-history-api-fallback')())

// use service application
app.use(compose(serviceApp.middleware))

// serve pure static assets
// var staticPath = path.posix.join(config.dev.assetsPublicPath,
//   config.dev.assetsSubDirectory)

app.use(convert(require('koa-static')(
  path.resolve(__dirname,`../`))))


var uri = 'http://localhost:' + port

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('listening :',uri)
  // when env is testing, don't need open it
  // if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
  //   opn(uri)
  // }
})
