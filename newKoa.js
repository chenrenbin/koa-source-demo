const http = require('http')
const context = require('./lib/context')
const request = require('./lib/request')
const response = require('./lib/response')

class newKoa {
  constructor () {
    this.middlewares = []
  }
  listen(...args) {
    http.createServer(async (req, res) => {
      // 创建上下文对象
      const ctx = this.createContext(req, res)
      // 复合中间件
      const fn = this.compose(this.middlewares)
      await fn(ctx)
      // 做出响应
      res.end(ctx.body)

    }).listen(...args)
  }
  use(callback) {
    this.middlewares.push(callback)
  }
  createContext(req, res){
    // 继承
    const ctx = Object.create(context)
    ctx.request = Object.create(request)
    ctx.response = Object.create(response)

    ctx.req = ctx.request.req = req
    ctx.res= ctx.response.res = res

    return ctx
  }
  compose (middlewares) {
    return function (ctx) {
      return dispatch(0)
      function dispatch (i) {
        let fn = middlewares[i]
        if (!fn) {
          return Promise.resolve()
        }
        return Promise.resolve(
          fn(ctx, function next() {
            return dispatch(i + 1)
          })
        )
      }
    }
  }
}

module.exports = newKoa