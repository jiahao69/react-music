import { request } from ".."

// 获取轮播图列表
export function getBanners() {
  return request.get({
    url: "/banner"
  })
}

// 获取推荐歌单列表
export function getPlaylists(data: { cat: string; limit?: number }) {
  return request.get({
    url: "/top/playlist",
    params: {
      cat: data.cat,
      limit: data.limit
    }
  })
}

// 获取榜单列表
export function getRankings() {
  return request.get({
    url: "/toplist"
  })
}
