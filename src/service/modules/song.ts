import { request } from ".."

// 获取歌单详情
export function getSongDetail(params: { ids: string }) {
  return request.get({
    url: "/song/detail",
    params
  })
}
