import { request } from ".."

// 获取轮播图列表
export function getBanners() {
  return request.get({
    url: "/banner"
  })
}

// 获取推荐歌单列表
export function getRecommendedPlaylist(data: { cat: string }) {
  return request.get({
    url: "/top/playlist/highquality",
    params: {
      cat: data.cat,
      limit: 5
    }
  })
}
