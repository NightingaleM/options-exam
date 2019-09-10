class Promise2 {
  state = 'pending'
  callbacks = []
  resolve = (result) => {
    if (this.state !== 'pending') return
    this.state = 'fulfilled'
    setTimeout(() => {
      this.callbacks.forEach(e => {
        if (typeof e[0] === 'function') {
          e[0].call(undefined, result)
        }
      })
    }, 0)
  }
  reject = (reason) => {
    if (this.state !== 'pending') return
    this.state = 'rejected'
    setTimeout(() => {
      this.callbacks.forEach(e => {
        if (typeof e[1] === 'function') {
          e[1].call(undefined, reason)
        }
      })
    }, 0);
  }
  constructor(fn) {
    if (typeof fn !== 'function') {
      throw new Error('我只接受函数')
    }

    fn(this.resolve.bind(this), this.reject.bind(this))
  }
  then(succeed?, fail?) {
    const handle = []
    if (typeof succeed === 'function') {
      handle[0] = succeed
    }
    if (typeof fail === 'function') {
      handle[1] = fail
    }
    this.callbacks.push(handle)// 把函数推到callbasks里
  }
}

export default Promise2