const serve = require('koa-static')
const convert = require('koa-convert')
const compose = require('koa-compose')

const Koa = require('koa')
const logger = require('koa-logger')
var path = require('path')
const cors = require('kcors')
// const favicon = require('koa-favicon')

const serviceApp = require('./server/app')

const globalConfig = require('../config')

const app = new Koa()

app.use(logger())
app.use(cors()) // support CORS

// favicon
// app.use(favicon(path.join(__dirname, '../client/assets/favicon.ico')))

// serve pure static assets
var staticPath = globalConfig.build.assetsRoot

// handle fallback for HTML5 history API
app.use(require('koa-connect-history-api-fallback')())

app.use(convert(serve(staticPath)))

app.use(compose(serviceApp.middleware))

if (!module.parent) {
  app.listen(globalConfig.options.port, globalConfig.options.ip, () => {
    console.log(`Koa server listening on ${globalConfig.options.port} , in ${globalConfig.build.env.NODE_ENV} mode`)
  })
} else {
  module.exports = app
}
