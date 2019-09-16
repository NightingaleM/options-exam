```js
Promise.resolve(2)// 创建一个成功的返回值为2的promise
Promise.reject(2) // 创建一个失败的返回值为2的promise
// promise.all()只要遇到一个失败，就会只返回那个失败的值
Promise.all(Promise.resolve(1),Promise.resolve(2),Promise.resolve(3)).then(resolve=>console.log(resolve)) // 返回一个成功的promise，值为[1,2,3]
Promise.all(Promise.reject(1),Promise.resolve(2),Promise.resolve(3)).then(null,reject=>console.log(reject)) // 返回一个失败的promise，值为[1]
// 
Promise.allSettled(Promise.reject(1),Promise.resolve(2),Promise.resolve(3))
      .then(resolve=>console.log(resolve)) // 返回一个成功的promise，值为[1,2,3]，但第一个的值的状态为rejected
// 因为很多浏览器不支持该方法，所以下面手写一个
task1=()=>new Promise((resolve,reject)=>{
  setTimeout(()=>{reject('伞兵一号，成盒')},2000)
})
task2=()=>new Promise((resolve,reject)=>{
  setTimeout(()=>{reject('伞兵二号，成盒')},2000)
})
task3=()=>new Promise((resolve,reject)=>{
  setTimeout(()=>{resolve('伞兵三号，洽鸡')},4000)
})
// 原理是.then()会返回一个新的promise，这样写，task*.then()后就永远返回一个成功的promise
Promise.all([
  task1().then(()=>({status:'ok'}),()=>({status:'not ok'})),
  task2().then(()=>({status:'ok'}),()=>({status:'not ok'})),
  task3().then(()=>({status:'ok'}),()=>({status:'not ok'}))
]).then(result=>console.log(result))
// 现在进行方法的封装
Promise.allSettled2 = (promiseLists) =>{
  const x = (promise) =>(promise.then((value)=>({status:'ok',value}),(reason)=>({status:'not ok',reason})))
  return Promise.all(promiseLists.map(e=>x(e))).then(result=>console.log(result))
}

// ------async await
async function fn(){
  let response 
  try {
    response = await ajax()
  }catch(e) {
    console.log(e)
    //...
  }
}
// 上面这个方法是常写的很丑的try-catch
// 下面这个就优雅很多，response只会获取到成功的结果，而错误只会在error函数中进行打印并且抛出错误不再向下执行
const error = e => {
    console.log(e)
    throw e
  }
async function fn(){
  let response = await ajax().then(null,error)
  console.log(response)
}
```
