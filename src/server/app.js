/**
 * Created by bona on 2017/1/18.
 */

const Koa = require('koa')
const json = require('koa-json')
const path = require('path')
// const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')

// const secure = require('./middleware/secure') // support permissions
// const validateRequest = require('./middleware/auth') // api token validate
// const config = require('./config')
// const router = require('./router')
// const idGen = require('./middleware/idGen')
// const home = require('./middleware/home')

const app = new Koa()

// middlewares

// app.use(home) // redirect to home

// app.use(webpack)

app.use(bodyparser(/*{ jsonLimit: config.jsonLimit }*/))

// Custom 401 handling
if (process.env === 'product') {
  app.use((ctx, next) => next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = 'Protected resource, use Authorization header to get access\n'
    } else {
      throw err
    }
  }))
}

// app.use(validateRequest) // support token api validate

app.use(json())

// app.use(idGen(
//   config.idGeneratorOpts || {
//     format: {
//       base: 'hex',
//       prefix: '0x'
//     }
//   }))

// app.use(secure(router)) // support feature permission validate

// app.use(router.routes(), router.allowedMethods())

// app.use(ctx => {
//  ctx.body = "Hello World";
//  // console.log(ctx);
//  });

module.exports = app
