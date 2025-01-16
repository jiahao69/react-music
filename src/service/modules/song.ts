import { request } from ".."

// 获取歌单详情
export function getSongDetail(params: { ids: string }) {
  return request.get({
    url: "/song/detail",
    params
  })
}

// 获取歌曲url
export function getSongUrl(params: { id: number }) {
  return request.get({
    url: "/song/url",
    params
  })
}
