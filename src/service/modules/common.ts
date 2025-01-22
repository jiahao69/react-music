import { request } from ".."

// 获取歌单列表
export function getPlaylists(params: {
  cat: string
  limit: number
  offset?: number
}) {
  return request.get({
    url: "/top/playlist",
    params
  })
}

// 获取歌单详情
export function getPlaylistDetail(params: { id: number }) {
  return request.get({
    url: "/playlist/detail",
    params
  })
}
