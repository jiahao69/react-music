/**
 * 洗牌算法函数 可以打乱一个数组的顺序
 */
export function shuffle(arr: any[]) {
  let n = arr.length,
    random
  while (0 !== n) {
    random = (Math.random() * n--) >>> 0
    ;[arr[n], arr[random]] = [arr[random], arr[n]]
  }
  return arr
}
