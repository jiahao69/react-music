import { memo, useState, useEffect } from "react"
import type { FC, ReactNode } from "react"
import { useNavigate } from "react-router-dom"

import { HomeWrapper } from "./home-style"
import {
  getBanners,
  getPlaylists,
  getRankings,
  getPlaylistDetail
} from "@/service/modules"

import HeaderCarousel from "./c-cpts/header-carousel/header-carousel"
import NavBar from "@/components/nav-bar/nav-bar"
import PlaylistItem from "@/components/playlist-item/playlist-item"

interface IProps {
  children?: ReactNode
}

// 歌单分类列表
const playlistCatetoryList = [
  { name: "华语" },
  { name: "流行" },
  { name: "摇滚" },
  { name: "民谣" },
  { name: "电子" }
]

const Home: FC<IProps> = () => {
  const navigate = useNavigate()

  const [banners, setBanners] = useState<any[]>([])
  const [playlists, setPlaylists] = useState<any[]>([])
  const [rankings, setRankings] = useState<any[]>([])

  // 获取轮播图列表
  const _getBanners = async () => {
    const { banners } = await getBanners()

    setBanners(banners)
  }

  // 获取推荐歌单列表
  const _getPlaylists = async (cat: string) => {
    const { playlists } = await getPlaylists({ cat, limit: 5 })

    const newPlaylist = playlists.map((item: any) => {
      const index = item.coverImgUrl.indexOf("?")

      const coverImgUrl = item.coverImgUrl.slice(0, index)

      return { ...item, coverImgUrl }
    })

    setPlaylists(newPlaylist)
  }

  // 获取榜单列表
  const _getRankings = async () => {
    const { list } = await getRankings()

    const ids: number[] = list.slice(0, 5).map((item: any) => item.id)

    const promises = ids.map((id) => getPlaylistDetail({ id }))

    const result = await Promise.all(promises)

    const rankings = result.map((item) => {
      const { playlist } = item

      return {
        ...playlist,
        tracks: playlist.tracks.slice(0, 5)
      }
    })

    setRankings(rankings)
  }

  useEffect(() => {
    _getBanners()

    _getPlaylists(playlistCatetoryList[0].name)

    // _getRankings()
  }, [])

  return (
    <HomeWrapper>
      <HeaderCarousel banners={banners} />

      {/* 推荐歌单 */}
      <div className="playlist-wrapper">
        <div className="playlist-header">
          <div className="playlist-header-title">推荐歌单</div>

          <NavBar
            list={playlistCatetoryList}
            onItemClick={(item) => {
              _getPlaylists(item.name)
            }}
          />

          <div className="more-btn" onClick={() => navigate("/playlists")}>
            <span>更多</span>
            <i className="iconfont icon-icon_pagedown"></i>
          </div>
        </div>

        <div className="playlists">
          {playlists.map((item: any) => (
            <PlaylistItem item={item} key={item.id} />
          ))}
        </div>
      </div>

      {/* 排行榜 */}
      <div className="rankings-wrapper">
        <div className="rankings-header">
          <div className="rankings-header-title">排行榜</div>

          <div className="more-btn" onClick={() => navigate("/rankings")}>
            <span>更多</span>
            <i className="iconfont icon-icon_pagedown"></i>
          </div>
        </div>

        <div className="rankings"></div>
      </div>
    </HomeWrapper>
  )
}

export default memo(Home)
