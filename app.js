// Topic-One
// 1.创建提供use/listen实例
// 2.封装实例共享对象request/response/context
const newKoa = require('./newKoa')
const app = new newKoa()

app.use(async (ctx, next) => {
  ctx.body = 'hi,koa-souce-demo1'
  await next()
})

app.use(async (ctx, next) => {
  ctx.body = 'hi,koa-souce-demo2'
})

app.listen(3000)

// Topic-One
// const http = require('http')
//
// http.createServer((req, res) => {
//   res.writeHead(200)
//   res.end('hi,koa-souce-demo')
// }).listen(3000)

// Topic-Two
// const Koa = require('koa')
// const app = new Koa()
//
// app.use(async (ctx, next) => {
//   if (ctx.path === '/index.html') {
//     ctx.body = 'hi,koa-souce-demo1'
//   } else {
//     await next()
//   }
// })
//
// app.use(async (ctx, next) => {
//   ctx.body = 'hi,koa-souce-demo2'
// })
//
// app.listen(3000)

