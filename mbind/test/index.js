// const bind = require("../src/index")
const bind = require("../src/index")
console.log(bind)
test1('fn.bind 能用')
test2('this 绑定成功')
test3('this p1 p2 绑定成功')
test4('this 绑定成功后 p1 p2绑定成功')
test5('this p1 绑定成功后，p2绑定成功')
test6('new的时候绑定了p1,p2')
test7('new的时候绑定了p1,p2，并且有fn 有prototype.sayHi')
test8('不用new 但是用类似对象')

function test1(message) {
  console.log(message)
  Function.prototype.bind2 = bind
  console.assert(Function.prototype.bind2 !== undefined)
}

function test2(message) {
  console.log(message)
  Function.prototype.bind2 = bind
  const fn1 = function () {
    return this
  }
  const newFn1 = fn1.bind2({ name: 'oy' })
  console.assert(newFn1().name === 'oy')
}

function test3(message) {
  console.log(message)
  Function.prototype.bind2 = bind
  const fn2 = function (p1, p2) {
    return [this, p1, p2]
  }
  const newFn2 = fn2.bind2({ name: 'oy' }, 123, 456)
  console.assert(newFn2()[0].name === 'oy', 'this')
  console.assert(newFn2()[1] === 123, 'p1')
  console.assert(newFn2()[2] === 456, 'p2')
}

function test4(message) {
  console.log(message)
  Function.prototype.bind2 = bind
  const fn2 = function (p1, p2) {
    return [this, p1, p2]
  }
  const anotherFn2 = fn2.bind2({ name: 'oy' })
  console.assert(anotherFn2(233, 332)[0].name === 'oy', 'this')
  console.assert(anotherFn2(233, 332)[1] === 233, 'p11')
  console.assert(anotherFn2(233, 332)[2] === 332, 'p22')
}

function test5(message) {
  console.log(message)
  Function.prototype.bind2 = bind
  const fn3 = function (p1, p2) {
    return [this, p1, p2]
  }
  const anotherFn2 = fn3.bind2({ name: 'oy' }, 233)
  console.assert(anotherFn2(332)[0].name === 'oy', 'this')
  console.assert(anotherFn2(332)[1] === 233, 'p111')
  console.assert(anotherFn2(332)[2] === 332, 'p222')
}

function test6(message) {
  console.log(message)
  Function.prototype.bind2 = bind
  const fn = function (p1, p2) {
    this.p1 = p1
    this.p2 = p2
  }
  const fn2 = fn.bind2(undefined, 'x', 'y')
  const object = new fn2()
  console.assert(object.p1 === 'x', 'x')
  console.assert(object.p2 === 'y', 'y')
}


function test7(message) {
  console.log(message)
  Function.prototype.bind2 = bind
  const fn = function (p1, p2) {
    this.p1 = p1
    this.p2 = p2
  }
  fn.prototype.sayHi = function () { }
  const fn2 = fn.bind2(undefined, 'x', 'y')
  const object = new fn2()
  // console.assert(object.__proto__ === fn.prototype)
  console.assert(object.p1 === 'x', 'x')
  console.assert(object.p2 === 'y', 'y')
  console.assert(object.__proto__ === fn.prototype)
  console.assert(typeof object.sayHi === 'function', 'function')
}

function test8(message) {
  console.log(message)
  Function.prototype.bind2 = bind
  const fn = function (p1, p2) {
    this.p1 = p1
    this.p2 = p2
  }
  fn.prototype.sayHi = function () { }
  const object1 = new fn('a', 'b')
  const fn2 = fn.bind2(object1, 'x', 'y')
  const object = fn2()
  console.assert(object === undefined, 'object 为空')
  console.assert(object1.p1 === 'x', 'x')
  console.assert(object1.p2 === 'y', 'y')
  // console.assert(object.__proto__ === fn.prototype)
  // console.assert(typeof object.sayHi === 'function', 'function')
}

