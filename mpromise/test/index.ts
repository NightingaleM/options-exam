// 文档 promise/A+

import * as chai from 'chai'
const assert = chai.assert
import Promise from '../src/promise'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
chai.use(sinonChai)
describe("Promise", () => {
  it("是一个类", () => {
    assert.isFunction(Promise)
    assert.isObject(Promise.prototype)
  })
  it('new Promise() 必须接受一个函数', () => {
    assert.throw(() => {
      // @ts-ignore
      new Promise()
    })
    assert.throw(() => {
      // @ts-ignore
      new Promise(1)
    })
    assert.throw(() => {
      // @ts-ignore
      new Promise(false)
    })
  })
  it('new Promise(fn) 会生成一个对象，对象方法有.then方法', () => {
    const promise = new Promise(() => { })
    assert.isFunction(promise.then)
  })
  it('new Promise(fn) 中的fn 必须会立即执行', () => {
    let fn = sinon.fake()
    new Promise(fn)
    assert(fn.called)
  })
  it('new Promise(fn) 中的fn 执行的时候接受 resolve 和 reject 两个函数', done => {
    const promise = new Promise((resolve, reject) => {
      assert.isFunction(resolve)
      assert.isFunction(reject)
    })
    done()
  })
  it('promise.then(success) 中的 success 会在 resolve 被调用时执行', done => {
    let success = sinon.fake()
    const promise = new Promise((resolve, reject) => {
      assert.isFalse(success.called)
      resolve()
      setTimeout(() => {
        assert.isTrue(success.called)
        done()
      }, 0);
    })
    // @ts-ignore
    promise.then(success)
  })
  it('promise.then(success) 中的 success 会在 reject 被调用时执行', done => {
    let fail = sinon.fake()
    const promise = new Promise((resolve, reject) => {
      assert.isFalse(fail.called)
      resolve()
      setTimeout(() => {
        assert.isTrue(fail.called)
        done()
      }, 0);
    })
    // @ts-ignore
    promise.then(fail)
  })
  it('2.2.1 onFulfilled 和 onRejected 都是可选参数', () => {
    const promise = new Promise((resolve) => {
      resolve()
    })
    promise.then(false, null)
    assert(1 === 1)
  })
  it('2.2.2 如果 onFulfilled 是一个函数', done => {
    const succeed = sinon.fake()
    const promise = new Promise((resolve) => {
      assert.isFalse(succeed.called)
      resolve(233)
      resolve(233333)
      setTimeout(() => {
        assert(promise.state === 'fulfilled')
        assert.isTrue(succeed.calledOnce)
        assert.isTrue(succeed.called)
        assert.isTrue(succeed.calledWith(233))
        done()
      }, 0)
    })
    promise.then(succeed)
  })
  it('2.2.3 如果 onRejected 是一个函数', done => {
    const fail = sinon.fake()
    const promise = new Promise((resolve, reject) => {
      assert.isFalse(fail.called)
      reject(233)
      reject(233333)
      setTimeout(() => {
        assert(promise.state === 'rejected')
        assert.isTrue(fail.calledOnce)
        assert.isTrue(fail.called)
        assert.isTrue(fail.calledWith(233))
        done()
      }, 0)
    })
    promise.then(null, fail)
  })
  it('2.2.4 自我的代码执行完之前不得调用.then 后面的两个函数(需要是一个微任务或宏任务)', done => {
    const succeed = sinon.fake()
    const promise = new Promise((resolve) => {
      resolve(233)
    })
    promise.then(succeed)
    assert.isFalse(succeed.called)
    setTimeout(() => {
      assert.isTrue(succeed.called)
      done()
    }, 0)
  })
  it('2.2.4 失败', done => {
    const fail = sinon.fake()
    const promise = new Promise((resolve, reject) => {
      reject(233)
    })
    promise.then(null, fail)
    assert.isFalse(fail.called)
    setTimeout(() => {
      assert.isTrue(fail.called)
      done()
    }, 0)
  })
  it('2.2.5 onFulfilled 和 onRejected 会作为函数形式调用 (也就是说，默认 this 指向 global，严格模式 undefined)', done => {
    const promise = new Promise((resolve) => {
      resolve(233)
    })
    promise.then(function () {
      'use strict'
      assert(this === undefined)
      done()
    })
  })
  it('2.2.6 在同一个 promise 实例中，then 可以链式调用多次', done => {
    const promise = new Promise((resolve) => {
      resolve()
    })
    const callbacks = [sinon.fake(), sinon.fake(), sinon.fake()]
    promise.then(callbacks[0])
    promise.then(callbacks[1])
    promise.then(callbacks[2])
    setTimeout(() => {
      assert.isTrue(callbacks[0].called)
      assert.isTrue(callbacks[1].called)
      assert.isTrue(callbacks[2].called)
      assert.isTrue(callbacks[1].calledAfter(callbacks[0]))
      assert.isTrue(callbacks[2].calledAfter(callbacks[1]))
      done()
    })
  })
  it('2.2.6 失败', done => {
    const promise = new Promise((resolve, reject) => {
      reject()
    })
    const callbacks = [sinon.fake(), sinon.fake(), sinon.fake()]
    promise.then(null, callbacks[0])
    promise.then(null, callbacks[1])
    promise.then(null, callbacks[2])
    setTimeout(() => {
      assert.isTrue(callbacks[0].called)
      assert.isTrue(callbacks[1].called)
      assert.isTrue(callbacks[2].called)
      assert.isTrue(callbacks[1].calledAfter(callbacks[0]))
      assert.isTrue(callbacks[2].calledAfter(callbacks[1]))
      done()
    })
  })
})