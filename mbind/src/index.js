function bind1(asThis, ...args) {
  // this 就是函数因为是   fn.bind() 这样调用的，所以bind()函数中的this就是函数fn
  const fn = this
  return function (...args2) {
    return fn.call(asThis, ...args, ...args2)
  }
}
// -----------实际生产中，bind都没有的情况下，扩展运算符、const啥的肯定也都没有，所以需要一些改动
var slice = Array.prototype.slice
function bind2(asThis) {
  var fn = this
  var args = slice.call(arguments, 1)
  if (typeof fn !== 'function') {
    throw new Error('bind 必须调用在函数身上')
  }
  function resultFn() {
    var args2 = slice.call(arguments, 0)
    return fn.apply(
      resultFn.prototype.isPrototypeOf(this) ? this :
        asThis, args.concat(args2))
  }
  resultFn.prototype = fn.prototype
  return resultFn
}
// -----------上面两版本都不支持new 操作，所以还需要写第三版
/**
 * 当写 new fn(a) 时
 * 相当与执行了以下四步
 * var temp = {}
 * temp.__proto__ = fn.prototype
 * fn.call(tem,'x')
 * return this
 */

function bind3(asThis, ...args) {
  // this 就是函数因为是   fn.bind() 这样调用的，所以bind()函数中的this就是函数fn
  const fn = this
  function resultFn(...args2) {
    /** new操作的话会有以下操作
      * var temp = {}
      * temp.__proto__ = resultFn.prototype
      * fn.call(tem,'x')
      * return this
      * 由于有 temp.__proto__ = resultFn.prototype 
      * 这一句导致上个函数prototype（就是fn =this 的这个fn）上的方法没有了
      * 变成了 resultFn的prototype了
    */
    /**
      * 在这，判断是否是new 操作调用，可以通过 this.__proto__ === resultFn.prototype  来判断，
      * 如果true，则是new 操作
      * 但是请注意 __proto__ 不是标准属性，所以代码中最好不要出现这个东西。
      * __proto__ 是浏览器给加的，然后大部分浏览器都默认加上这个属性
      * 可以用 instanceof  或者 resultFn.prototype.isPrototypeOf(this)
    */
    return fn.call(
      this instanceof resultFn ?
        this : asThis,
      ...args, ...args2)
  }
  resultFn.prototype = fn.prototype
  return resultFn
}




module.exports = bind3

// if (Function.prototype.bind) { // 如果不存在，就给你搞一个，这就叫polyfill
//   Function.prototype.bind = bind
// }