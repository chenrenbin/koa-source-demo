function add(x, y) {
  return  x + y
}

function square(z) {
  return  z * z
}

function double(x) {
  return  x * 2
}

function compose(mids) {
  return mids.reduce((left, right) => (...args) => right(left(...args)))
}

const args = [add, square, double]
const resetFn = compose(args)
console.log(resetFn(1,2))

// 函数复合-兼容异步函数：f3(f2(f1))
function newCompose(middlewares) {
  return function (ctx) {
    return dispatch(0)
    function dispatch(index) {
      let fn = middlewares[0]
      if (!fn) {
        return  Promise.resolve()
      }
      return Promise.resolve(
        fn(function next() {
          return dispatch(index + 1)
        })
      )
    }
  }
}