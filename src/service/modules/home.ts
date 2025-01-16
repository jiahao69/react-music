import { request } from ".."

// 获取轮播图列表
export function getBanners() {
  return request.get({
    url: "/banner"
  })
}

// 获取榜单列表
export function getRankings() {
  return request.get({
    url: "/toplist"
  })
}
