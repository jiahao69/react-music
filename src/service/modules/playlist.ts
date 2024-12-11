import { request } from ".."

// 获取歌单分类
export function getPlaylistCats() {
  return request.get({
    url: "/playlist/catlist"
  })
}
