import { memo } from "react"
import type { FC, ReactNode } from "react"
import { Image } from "antd"
import { useNavigate } from "react-router-dom"

import { PlaylistItemWrapper } from "./playlist-item-style"
import { getImg } from "@/utils/files"
import { getPlaylistDetail, getSongUrl } from "@/service/modules"
import { useHomeStore } from "@/store/modules"

interface IProps {
  children?: ReactNode
  item: { id: number; coverImgUrl: string; name: string; playCount: number }
}

const PlaylistItem: FC<IProps> = (props) => {
  const { item } = props

  const navigate = useNavigate()

  const setPlaylist = useHomeStore((state) => state.setPlaylist)

  const formatPlayCount = (count: number) => {
    if (count < 1e4) return count

    if (count >= 1e8) return `${(count / 1e8).toFixed(1)}亿`

    return `${(count / 1e4).toFixed(1)}万`
  }

  const navigateToDetail = (id: number) => {
    navigate(`/playlist-detail/${id}`)
  }

  // 播放全部歌曲
  const onPlayMusic = async (id: number) => {
    const { playlist } = await getPlaylistDetail({ id })

    const tracks = playlist.tracks

    const ids = tracks.map((item: any) => item.id).join(",")
    const { data: urls } = await getSongUrl({ id: ids })

    const newPlaylist = tracks.map((item: any) => {
      const { id, al, name, ar, dt } = item

      const { time, url } = urls.find((v: any) => v.id === item.id)

      return {
        id,
        picUrl: al.picUrl,
        name,
        artist: ar[0].name,
        duration: dt,
        playDuration: time,
        playUrl: url
      }
    })

    setPlaylist(newPlaylist)
  }

  return (
    <PlaylistItemWrapper>
      <div
        className="playlist-pic-wrapper"
        onClick={() => navigateToDetail(item.id)}
      >
        <Image
          className="playlist-pic"
          src={item.coverImgUrl}
          preview={false}
          placeholder={<Image src={getImg("placeholder_bg")} preview={false} />}
        />

        <div className="playlist-pic-mask">
          <div
            className="play-btn"
            onClick={(e) => {
              e.stopPropagation()

              onPlayMusic(item.id)
            }}
          >
            <i className="iconfont icon-icon_play_1"></i>
          </div>
        </div>
      </div>

      <div className="playlist-title" onClick={() => navigateToDetail(item.id)}>
        {item.name}
      </div>

      <div className="play-count-wrapper">
        <i className="iconfont icon-icon_play"></i>

        <div className="play-count">{formatPlayCount(item.playCount)}</div>
      </div>
    </PlaylistItemWrapper>
  )
}

export default memo(PlaylistItem)
