// 数组相关的工具函数

/**
 * 移动数组指定元素到首位
 */
export const moveArrayElementToFirst = <T>(
  arr: T[],
  condition: (item: T) => boolean
) => {
  const index = arr.findIndex(condition)

  // 该元素在数组中不存在
  if (index === -1) return [...arr]

  return [arr[index], ...arr.slice(0, index), ...arr.slice(index + 1)]
}
