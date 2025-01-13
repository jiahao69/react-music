/**
 * 洗牌算法函数
 */
export function shuffle(arr: any[]) {
  let n = arr.length,
    random
  while (0 != n) {
    random = (Math.random() * n--) >>> 0 // 无符号右移位运算符向下取整
    ;[arr[n], arr[random]] = [arr[random], arr[n]] // ES6的结构赋值实现变量互换
  }
  return arr
}
