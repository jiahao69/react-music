import { memo } from "react"
import type { FC, ReactNode } from "react"
import { PlayCircleFilled } from "@ant-design/icons"
import { Image } from "antd"
import { IoPlayOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"

import { PlaylistItemWrapper } from "./playlist-item-style"
import { getImg } from "@/utils/files"

interface IProps {
  children?: ReactNode
  item: { id: number; coverImgUrl: string; name: string; playCount: number }
}

const PlaylistItem: FC<IProps> = (props) => {
  const { item } = props

  const navigate = useNavigate()

  const navigateToDetail = (id: number) => {
    navigate(`/playlist-detail/${id}`)
  }

  const getPlayCount = (count: number) => {
    if (count < 10000) return count

    return `${(count / 10000).toFixed(1)}万`
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
          <PlayCircleFilled
            className="play-icon"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      <div className="playlist-title" onClick={() => navigateToDetail(item.id)}>
        {item.name}
      </div>

      <div className="play-count-wrapper">
        <IoPlayOutline style={{ color: "#999999" }} />

        <div className="play-count">{getPlayCount(item.playCount)}</div>
      </div>
    </PlaylistItemWrapper>
  )
}

export default memo(PlaylistItem)
