/**
 * 将以毫秒为单位的时长转化为 00:00 格式
 */
export function formatDuration(duration: number) {
  const durationSeconds = duration / 1000

  const minute = (Math.floor(durationSeconds / 60) + "").padStart(2, "0")

  const seconds = (Math.floor(durationSeconds % 60) + "").padStart(2, "0")

  return `${minute}:${seconds}`
}
