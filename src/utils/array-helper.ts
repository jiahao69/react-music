/**
 * 洗牌算法函数 可以打乱一个数组的顺序
 */
export const shuffle = <T>(arr: T[]) => {
  let n = arr.length,
    random

  while (0 !== n) {
    random = (Math.random() * n--) | 0
    ;[arr[n], arr[random]] = [arr[random], arr[n]]
  }
  return arr
}

/**
 * 移动数组指定元素到首位
 */
export const moveArrayElToFirst = <T>(
  arr: T[],
  condition: (item: T) => boolean
) => {
  const index = arr.findIndex(condition)

  // 该元素在数组中不存在
  if (index === -1) return [...arr]

  return [arr[index], ...arr.slice(0, index), ...arr.slice(index + 1)]
}
