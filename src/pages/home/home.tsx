import { memo, useState, useEffect } from "react"
import type { FC, ReactNode } from "react"

import { HomeWrapper } from "./home-style"
import { getBanners, getPlaylists } from "@/service/modules"

import HeaderCarousel from "./c-cpts/header-carousel/header-carousel"
import NavBar from "@/components/nav-bar/nav-bar"
import PlaylistItem from "@/components/playlist-item/playlist-item"

interface IProps {
  children?: ReactNode
}

const playlistCatetoryList = [
  { name: "华语" },
  { name: "翻唱" },
  { name: "古风" },
  { name: "伤感" },
  { name: "欧美" }
]

const Home: FC<IProps> = () => {
  const [banners, setBanners] = useState([])
  const [playlists, setPlaylists] = useState([])

  const _getBanners = async () => {
    const { banners } = await getBanners()

    setBanners(banners)
  }

  const _getPlaylists = async (cat: string) => {
    const { playlists } = await getPlaylists({ cat, limit: 5 })

    const newPlaylist = playlists.map((item: any) => {
      const index = item.coverImgUrl.indexOf("?")

      const coverImgUrl = item.coverImgUrl.slice(0, index)

      return { ...item, coverImgUrl }
    })

    setPlaylists(newPlaylist)
  }

  useEffect(() => {
    _getBanners()

    _getPlaylists(playlistCatetoryList[0].name)
  }, [])

  return (
    <HomeWrapper>
      <HeaderCarousel banners={banners} />

      {/* 推荐歌单 */}
      <div className="recommend-playlist">
        <div className="playlist-header">
          <div className="playlist-header-title">推荐歌单</div>

          <NavBar
            list={playlistCatetoryList}
            onItemClick={(item: any) => {
              _getPlaylists(item.name)
            }}
          />

          <div className="more-btn">{`更多 >`}</div>
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

          <div className="more-btn">{`更多 >`}</div>
        </div>

        <div className="rankings"></div>
      </div>
    </HomeWrapper>
  )
}

export default memo(Home)
