import { memo } from "react"
import type { FC, ReactNode } from "react"
import { PlayCircleFilled } from "@ant-design/icons"
import { Image } from "antd"
import { IoPlayOutline } from "react-icons/io5"

import { PlaylistItemWrapper } from "./playlist-item-style"
import { getImg } from "@/utils/files"

interface IProps {
  children?: ReactNode
  item: { coverImgUrl: string; name: string; playCount: number }
}

const PlaylistsItem: FC<IProps> = (props) => {
  const { item } = props

  const getPlayCount = (count: number) => {
    if (count < 10000) return count

    return `${(count / 10000).toFixed(1)}万`
  }

  return (
    <PlaylistItemWrapper>
      <div className="playlist-pic-wrapper">
        <Image
          className="playlist-pic"
          src={item.coverImgUrl}
          preview={false}
          placeholder={<Image src={getImg("placeholder_bg")} preview={false} />}
        />

        <div className="playlist-pic-mask">
          <PlayCircleFilled className="play-icon" />
        </div>
      </div>

      <div className="playlist-title">{item.name}</div>

      <div className="playlist-count-wrapper">
        <IoPlayOutline style={{ color: "#999999" }} />

        <div className="playlist-count">{getPlayCount(item.playCount)}</div>
      </div>
    </PlaylistItemWrapper>
  )
}

export default memo(PlaylistsItem)
