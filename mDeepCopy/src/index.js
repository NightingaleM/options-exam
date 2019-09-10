/**
 * b 是 a 的一份拷贝，b 中没有对 a 中对象的引用
 * 先问清楚，不然容易被
 * 数据类型
 * 数据规模
 * 性能要求
 * 运行环境
 * 其他要求
 */

/**
 * 1、json序列化和反序列化
 * 忽略函数，忽略undefined，不支持循环引用
 */
var a = {
  b: 1,
  c: [1, 2, 3],
  d: { d1: 'd', d2: 'dd' },
  e: null,
  f: undefined, // 忽视
  g: () => { }, // 忽视
  h: new Date(), // 转化为 ios8601字符串
  i: /hi/, // 空对象
  j: Symbol() // 忽视
}
// @ts-ignore
// a.self = a // 报错
// var b = JSON.parse(JSON.stringify(a))
// console.log(b)

/**
 * 递归
 * 看节点的类型（number,string,boolean,undefind,null,symbol,object)
 * 如果是基本类型直接拷贝
 * 如果是object就分情况讨论
 * 
 * object分为
 * 普通： object- for in 
 * 数组： array  Array初始化
 * 函数： function - 怎么拷贝？ 闭包？
 * 日期： Date - 怎么拷贝？
 */
// cache 每次复制对象之后cache没有清空,所以可以改成用类，详见 ../finelyDeepClone.js
let cache = []
function deepClone(source) {
  if (source instanceof Object) {
    let cacheDist = findCache(source)
    if (cacheDist) {
      return cacheDist
    } else {
      let dist
      if (source instanceof Array) {
        dist = new Array()
      }
      else if (source instanceof Function) {
        dist = function () {
          return source.apply(this, arguments)
        }
        //  dist = source.bind(this, ...arguments)
      }
      else if (source instanceof RegExp) {
        dist = new RegExp(source.source, source.flags)
      }
      else if (source instanceof Date) {
        dist = new Date(source)
      }
      else {
        dist = new Object()
      }
      cache.push([source, dist])
      for (const key in source) {
        // for in 默认会遍历原型上的属性，所以需要加上
        if (source.hasOwnProperty(key)) {
          dist[key] = deepClone(source[key])
        }
      }
      return dist
    }
  }
  return source
}

const findCache = (source) => {
  for (let i = 0; i < cache.length; i++) {
    if (cache[i][0] === source) {
      return cache[i][1]
    }
  }
  return undefined
}
module.exports = deepClone