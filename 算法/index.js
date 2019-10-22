const arr = [4, 2, 1, 6, 8, 3, 5, 0, 9, 7]

// 冒泡算法
const bubbleSort = (arr) => {
  for (let j = 0; j < arr.length; j++) {
    for (let i = arr.length - 1; i > 0; i--) {
      if (arr[i] < arr[i - 1]) {
        let h = arr[i]
        arr[i] = arr[i - 1]
        arr[i - 1] = h
      }
    }
  }
  return arr
}
bubbleSort(arr)

/**
 * 选择性排序
 * 每次把最小的挑出来
 * @param {*} arr 
 */
const selectionSort = (arr) => {
  const cArr = [...arr]
  const _arr = []
  while (cArr.length) {
    let h = cArr[0]
    let k = 0
    for (let i = 1; i < cArr.length; i++) {
      if (h > cArr[i]) {
        h = cArr[i]
        k = i
      }
    }
    cArr.splice(k, 1)
    _arr.push(h)
  }
  return _arr
}
selectionSort(arr)

/**
 * 插入排序
 */
const insertionSort = (arr) => {
  const cArr = [...arr.slice(1)]
  const _arr = [arr[0]]
  while (cArr.length) {
    let k = 0
    for (let i = _arr.length; i < 0; i--) {
      console.log('---------------')
      console.log(cArr[0], _arr[i], i)
      if (cArr[0] > _arr[i]) {
        k = i + 1
        break
      }
    }
    _arr.splice(k, 0, cArr[0])
    cArr.shift()
    console.log(_arr)
  }
  return _arr
}
insertionSort(arr)

