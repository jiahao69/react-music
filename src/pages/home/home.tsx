import { memo, useEffect } from "react"
import type { FC, ReactNode } from "react"

import { HomeWrapper } from "./home-style"
import { useHomeStore } from "@/store/modules"

import HeaderCarousel from "./c-cpts/header-carousel/header-carousel"
import NavBar from "@/components/nav-bar/nav-bar"
import PlaylistItem from "./c-cpts/playlist-item/playlist-item"

interface IProps {
  children?: ReactNode
}

const playlistTypeList = [
  { name: "华语" },
  { name: "粤语" },
  { name: "摇滚" },
  { name: "民谣" },
  { name: "欧美" }
]

const Home: FC<IProps> = () => {
  const banners = useHomeStore((state: any) => state.banners)
  const recommendedPlaylist = useHomeStore(
    (state: any) => state.recommendedPlaylist
  )

  const getBanners = useHomeStore((state: any) => state.getBanners)
  const getRecommendedPlaylist = useHomeStore(
    (state: any) => state.getRecommendedPlaylist
  )

  useEffect(() => {
    getBanners()

    getRecommendedPlaylist("华语")
  }, [])

  return (
    <HomeWrapper>
      <HeaderCarousel banners={banners} />

      {/* 推荐歌单 */}
      <div className="recommend-playlist">
        <div className="playlist-header">
          <div className="playlist-header-title">推荐歌单</div>

          <NavBar
            list={playlistTypeList}
            onItemClick={(item: any) => {
              getRecommendedPlaylist(item.name)
            }}
          />

          <div className="more-btn">{`更多 >`}</div>
        </div>

        <div className="playlists">
          {recommendedPlaylist.map((item: any) => (
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
