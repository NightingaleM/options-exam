```js 
var fn = function(){console.log(this)}
fn()
// window
fn.call({name:'oy'})
// {name:'oy'}
new fn()
// fn{}

```

`new fn()` 操作主要做了以下四步
```js

var temp = {} 
temp.__proto__ = fn.prototype
// 怎么判断是new 调用的还是 call调用的，因为下面就有个call，那就只能从上面两句来看，
// 主要就是 temp.__proto__ = fn.prototype
fn.call(temp)
return this

```

```js 
var fn = function(){console.log(this),console.log(this.__proto__ === fn.prototype)}
fn()
// window false
fn.call({name:'oy'})
// {name: 'oy'} false
new fn()
// fn{} true


```
